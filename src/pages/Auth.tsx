import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { login as apiLogin, register as apiRegister, type BackendRole } from "@/lib/api";
import logo from "@/assets/image-removebg-preview.png";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: location.state?.userType || "builder", // builder or landowner
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || (formData.userType === "builder" ? "/builder/options" : "/landowner/options");
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, formData.userType, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[e.target.name] || errors.general) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        delete newErrors.general;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (isLogin && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: "" }));

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (isLogin) {
        const response = await apiLogin(formData.email, formData.password);
        login(response);
      } else {
        const role: BackendRole = formData.userType === "builder" ? "PROFESSIONAL" : "LANDOWNER";
        const response = await apiRegister(
          formData.name.trim(),
          formData.email.trim(),
          formData.password,
          role
        );
        login(response);
      }
      const redirectTo =
        location.state?.from ||
        (formData.userType === "builder" ? "/builder/options" : "/landowner/options");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, general: message }));
    } finally {
      setSubmitting(false);
    }
  };

  const userTypeLabel = formData.userType === "builder" ? "Construction Company" : "Landowner";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-green-50 to-teal-50/90" />
        <div className="absolute inset-0 jointlly-grid opacity-30" />
        
        <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border border-glass-border"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src={logo} alt="Jointlly" className="h-10 w-auto" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Login" : "Create Account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? `Login to continue as ${userTypeLabel}` : `Sign up to get started as ${userTypeLabel}`}
              </p>
            </div>

            {/* Toggle Login/Signup */}
            <div className="flex items-center gap-2 mb-6 p-1 bg-secondary/50 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setErrors((prev) => ({ ...prev, general: "" }));
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setErrors((prev) => ({ ...prev, general: "" }));
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {errors.general && (
              <p className="text-sm text-destructive mb-4 p-3 rounded-lg bg-destructive/10">
                {errors.general}
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="mb-2 block">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 block">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword" className="mb-2 block">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Account type dropdown */}
              <div>
                <Label className="mb-2 block">Account type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value: "builder" | "landowner") =>
                    setFormData((prev) => ({ ...prev, userType: value }))
                  }
                >
                  <SelectTrigger className="h-12 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-2">
                      {formData.userType === "builder" ? (
                        <Building2 className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <User className="w-5 h-5 text-primary shrink-0" />
                      )}
                      <SelectValue placeholder="Select account type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="builder">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Construction Company
                      </span>
                    </SelectItem>
                    <SelectItem value="landowner">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Landowner
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-premium"
                disabled={submitting}
              >
                {submitting ? "Please wait..." : isLogin ? "Login" : "Create Account"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="/legal/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/legal/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
