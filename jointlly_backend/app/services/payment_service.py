"""
Payment service with Razorpay integration
"""
from uuid import UUID
from typing import Optional
import razorpay
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.models.payment import Transaction, Payment
from app.models.user import User
from app.utils.constants import TransactionType, TransactionStatus
from app.exceptions import NotFoundError, ValidationError


class PaymentService:
    """Service for payment operations with Razorpay"""
    
    def __init__(self):
        """Initialize Razorpay client"""
        self.client = razorpay.Client(
            auth=(settings.razorpay_key_id, settings.razorpay_key_secret)
        )
    
    async def create_order(
        self,
        db: AsyncSession,
        user_id: UUID,
        amount: float,
        transaction_type: TransactionType,
        project_id: Optional[UUID] = None,
        currency: str = "INR"
    ) -> dict:
        """Create Razorpay order"""
        # Create transaction record
        transaction = Transaction(
            user_id=user_id,
            project_id=project_id,
            transaction_type=transaction_type,
            amount=amount,
            currency=currency,
            status=TransactionStatus.PENDING
        )
        
        db.add(transaction)
        await db.commit()
        await db.refresh(transaction)
        
        # Create Razorpay order
        order_data = {
            "amount": int(amount * 100),  # Convert to paise
            "currency": currency,
            "receipt": f"txn_{transaction.id}",
            "notes": {
                "transaction_id": str(transaction.id),
                "transaction_type": transaction_type.value,
                "user_id": str(user_id)
            }
        }
        
        try:
            razorpay_order = self.client.order.create(data=order_data)
            
            # Update transaction with order ID
            transaction.razorpay_order_id = razorpay_order["id"]
            await db.commit()
            await db.refresh(transaction)
            
            return {
                "transaction_id": str(transaction.id),
                "order_id": razorpay_order["id"],
                "amount": amount,
                "currency": currency,
                "razorpay_key_id": settings.razorpay_key_id
            }
        except Exception as e:
            transaction.status = TransactionStatus.FAILED
            await db.commit()
            raise ValidationError(f"Failed to create Razorpay order: {str(e)}")
    
    async def verify_payment(
        self,
        db: AsyncSession,
        transaction_id: UUID,
        razorpay_payment_id: str,
        razorpay_signature: str
    ) -> Transaction:
        """Verify Razorpay payment"""
        # Get transaction
        result = await db.execute(
            select(Transaction).where(Transaction.id == transaction_id)
        )
        transaction = result.scalar_one_or_none()
        
        if not transaction:
            raise NotFoundError("Transaction", str(transaction_id))
        
        if not transaction.razorpay_order_id:
            raise ValidationError("Transaction does not have a Razorpay order")
        
        # Verify signature
        params_dict = {
            "razorpay_order_id": transaction.razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature
        }
        
        try:
            self.client.utility.verify_payment_signature(params_dict)
            
            # Update transaction
            transaction.razorpay_payment_id = razorpay_payment_id
            transaction.razorpay_signature = razorpay_signature
            transaction.status = TransactionStatus.SUCCESS
            
            await db.commit()
            await db.refresh(transaction)
            
            # Create payment record
            payment = Payment(
                transaction_id=transaction.id,
                payment_method="razorpay",
                status="success",
                payment_metadata={"razorpay_payment_id": razorpay_payment_id}
            )
            
            db.add(payment)
            await db.commit()
            
            return transaction
        except razorpay.errors.SignatureVerificationError:
            transaction.status = TransactionStatus.FAILED
            await db.commit()
            raise ValidationError("Payment signature verification failed")
        except Exception as e:
            transaction.status = TransactionStatus.FAILED
            await db.commit()
            raise ValidationError(f"Payment verification failed: {str(e)}")
    
    async def handle_webhook(
        self,
        db: AsyncSession,
        webhook_data: dict
    ) -> Optional[Transaction]:
        """Handle Razorpay webhook"""
        # Verify webhook signature
        webhook_signature = webhook_data.get("razorpay_signature")
        if not webhook_signature:
            return None
        
        # Get order ID from webhook
        order_id = webhook_data.get("payload", {}).get("payment", {}).get("entity", {}).get("order_id")
        if not order_id:
            return None
        
        # Find transaction by order ID
        result = await db.execute(
            select(Transaction).where(Transaction.razorpay_order_id == order_id)
        )
        transaction = result.scalar_one_or_none()
        
        if not transaction:
            return None
        
        # Update transaction status based on webhook event
        event = webhook_data.get("event")
        if event == "payment.captured":
            transaction.status = TransactionStatus.SUCCESS
            payment_id = webhook_data.get("payload", {}).get("payment", {}).get("entity", {}).get("id")
            if payment_id:
                transaction.razorpay_payment_id = payment_id
        elif event == "payment.failed":
            transaction.status = TransactionStatus.FAILED
        
        await db.commit()
        await db.refresh(transaction)
        
        return transaction
    
    async def get_transactions(
        self,
        db: AsyncSession,
        user_id: UUID
    ) -> list:
        """Get all transactions for a user"""
        result = await db.execute(
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .order_by(Transaction.created_at.desc())
        )
        return list(result.scalars().all())
    
    async def unlock_feasibility(
        self,
        db: AsyncSession,
        transaction: Transaction
    ) -> None:
        """Unlock feasibility report after payment"""
        if transaction.transaction_type != TransactionType.FEASIBILITY_UNLOCK:
            return
        
        if transaction.status != TransactionStatus.SUCCESS:
            return
        
        if not transaction.project_id:
            return
        
        # Get project and property
        from app.models.landowner import Project as ProjectModel
        project_result = await db.execute(
            select(ProjectModel).where(ProjectModel.id == transaction.project_id)
        )
        project = project_result.scalar_one_or_none()
        
        if not project:
            return
        
        # Unlock feasibility report
        from app.services.feasibility_service import FeasibilityService
        await FeasibilityService.unlock_feasibility_report(db, project.property_id)
