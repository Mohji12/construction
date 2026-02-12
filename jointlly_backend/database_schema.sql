-- MySQL Database Schema for Jointly Real Estate Platform
-- Generated from SQLAlchemy models
-- Note: This converts PostgreSQL-specific types to MySQL equivalents

-- Drop database if exists (optional - uncomment if needed)
-- DROP DATABASE IF EXISTS jointly_db;
-- CREATE DATABASE jointly_db;
-- USE jointly_db;

-- Set charset
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- ENUMS (MySQL ENUM types)
-- ============================================

-- Note: MySQL ENUMs are created inline with table definitions

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `hashed_password` VARCHAR(255) NOT NULL,
    `role` ENUM('LANDOWNER', 'PROFESSIONAL', 'ADMIN') NOT NULL,
    `is_active` VARCHAR(10) NOT NULL DEFAULT 'true',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: landowner_profiles
-- ============================================
CREATE TABLE IF NOT EXISTS `landowner_profiles` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `city` VARCHAR(100) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_landowner_profiles_user_id` (`user_id`),
    CONSTRAINT `fk_landowner_profiles_user_id` 
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: professional_profiles
-- ============================================
CREATE TABLE IF NOT EXISTS `professional_profiles` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL UNIQUE,
    `company_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `city` VARCHAR(100) NULL,
    `experience_years` INT NULL,
    `rera_experience` BOOLEAN NOT NULL DEFAULT FALSE,
    `wallet_size` DECIMAL(15, 2) NULL,
    `preferred_jv_model` VARCHAR(255) NULL,
    `location_preferences` JSON NULL,
    `workforce_capacity` INT NULL,
    `business_entity_type` ENUM('INDIVIDUAL', 'PARTNERSHIP', 'LLP', 'PRIVATE_LIMITED') NULL,
    `office_address` VARCHAR(500) NULL,
    `google_maps_location` VARCHAR(500) NULL,
    `gst_number` VARCHAR(50) NULL,
    `rera_project_count` INT NULL,
    `project_size_range` VARCHAR(100) NULL,
    `team_size_category` ENUM('SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE') NULL,
    `total_projects_completed` INT NULL,
    `credibility_score` DECIMAL(5, 4) NULL DEFAULT 0.0,
    `onboarding_status` ENUM('IN_PROGRESS', 'COMPLETED', 'VERIFIED') NOT NULL DEFAULT 'IN_PROGRESS',
    `onboarding_step` INT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_professional_profiles_user_id` (`user_id`),
    INDEX `idx_professional_profiles_onboarding_status` (`onboarding_status`),
    CONSTRAINT `fk_professional_profiles_user_id` 
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: properties
-- ============================================
CREATE TABLE IF NOT EXISTS `properties` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `landowner_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `city` VARCHAR(100) NOT NULL,
    `ward` VARCHAR(100) NULL,
    `landmark` VARCHAR(255) NULL,
    `google_maps_pin` VARCHAR(500) NULL,
    `width_ft` DECIMAL(10, 2) NULL,
    `length_ft` DECIMAL(10, 2) NULL,
    `facing` VARCHAR(50) NULL,
    `is_corner_plot` BOOLEAN NOT NULL DEFAULT FALSE,
    `facings` JSON NULL,
    `road_width_ft` DECIMAL(10, 2) NULL,
    `khatha_type` VARCHAR(100) NULL,
    `e_khatha_status` VARCHAR(100) NULL,
    `tax_paid` BOOLEAN NOT NULL DEFAULT FALSE,
    `pid_number` VARCHAR(100) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_properties_landowner_id` (`landowner_id`),
    INDEX `idx_properties_pid_number` (`pid_number`),
    CONSTRAINT `fk_properties_landowner_id` 
        FOREIGN KEY (`landowner_id`) REFERENCES `landowner_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: projects
-- ============================================
CREATE TABLE IF NOT EXISTS `projects` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `property_id` CHAR(36) NOT NULL,
    `project_type` ENUM('CONTRACT_CONSTRUCTION', 'JV_JD', 'INTERIOR', 'RECONSTRUCTION') NOT NULL,
    `intent` ENUM('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL') NULL,
    `timeline` VARCHAR(100) NULL,
    `scope` TEXT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'MATCHED', 'COMPLETED') NOT NULL DEFAULT 'DRAFT',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_projects_property_id` (`property_id`),
    INDEX `idx_projects_project_type` (`project_type`),
    INDEX `idx_projects_status` (`status`),
    CONSTRAINT `fk_projects_property_id` 
        FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: jv_preferences
-- ============================================
CREATE TABLE IF NOT EXISTS `jv_preferences` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `project_id` CHAR(36) NOT NULL UNIQUE,
    `post_construction_expectation` ENUM('BUILT_UP_AREA_SHARING', 'REVENUE_SHARING') NULL,
    `development_vision` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_jv_preferences_project_id` (`project_id`),
    CONSTRAINT `fk_jv_preferences_project_id` 
        FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: capabilities
-- ============================================
CREATE TABLE IF NOT EXISTS `capabilities` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_capabilities_professional_id` (`professional_id`),
    INDEX `idx_capabilities_capability_type` (`capability_type`),
    CONSTRAINT `fk_capabilities_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: licenses
-- ============================================
CREATE TABLE IF NOT EXISTS `licenses` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `license_number` VARCHAR(255) NOT NULL,
    `issuing_authority` VARCHAR(255) NULL,
    `expiry_date` DATE NULL,
    `document_url` VARCHAR(500) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_licenses_professional_id` (`professional_id`),
    CONSTRAINT `fk_licenses_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: portfolios
-- ============================================
CREATE TABLE IF NOT EXISTS `portfolios` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `project_name` VARCHAR(255) NOT NULL,
    `project_type` ENUM('CONTRACT_CONSTRUCTION', 'JV_JD', 'INTERIOR', 'RECONSTRUCTION') NULL,
    `location` VARCHAR(255) NULL,
    `area_sqft` DECIMAL(10, 2) NULL,
    `completion_date` DATE NULL,
    `duration_months` INT NULL,
    `images` JSON NULL,
    `description` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_portfolios_professional_id` (`professional_id`),
    CONSTRAINT `fk_portfolios_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: pricing_tiers
-- ============================================
CREATE TABLE IF NOT EXISTS `pricing_tiers` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NOT NULL,
    `min_area_sqft` DECIMAL(10, 2) NULL,
    `max_area_sqft` DECIMAL(10, 2) NULL,
    `price_per_sqft` DECIMAL(10, 2) NOT NULL,
    `tier_name` VARCHAR(100) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_pricing_tiers_professional_id` (`professional_id`),
    INDEX `idx_pricing_tiers_capability_type` (`capability_type`),
    CONSTRAINT `fk_pricing_tiers_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: far_calculations
-- ============================================
CREATE TABLE IF NOT EXISTS `far_calculations` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `property_id` CHAR(36) NOT NULL,
    `road_width_ft` DECIMAL(10, 2) NOT NULL,
    `zone_type` VARCHAR(100) NULL,
    `calculated_far` DECIMAL(5, 2) NOT NULL,
    `total_buildable_area` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_far_calculations_property_id` (`property_id`),
    CONSTRAINT `fk_far_calculations_property_id` 
        FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: feasibility_reports
-- ============================================
CREATE TABLE IF NOT EXISTS `feasibility_reports` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `property_id` CHAR(36) NOT NULL,
    `plot_category` VARCHAR(100) NULL,
    `front_setback_m` DECIMAL(5, 2) NULL,
    `rear_setback_m` DECIMAL(5, 2) NULL,
    `side_setback_m` DECIMAL(5, 2) NULL,
    `net_buildable_area_sqft` DECIMAL(12, 2) NULL,
    `allowed_floors` INT NULL,
    `total_built_up_area_sqft` DECIMAL(12, 2) NULL,
    `saleable_area_sqft` DECIMAL(12, 2) NULL,
    `number_of_units` INT NULL,
    `is_unlocked` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_feasibility_reports_property_id` (`property_id`),
    INDEX `idx_feasibility_reports_is_unlocked` (`is_unlocked`),
    CONSTRAINT `fk_feasibility_reports_property_id` 
        FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: pid_verifications
-- ============================================
CREATE TABLE IF NOT EXISTS `pid_verifications` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `property_id` CHAR(36) NOT NULL,
    `pid_number` VARCHAR(100) NOT NULL,
    `owner_name` VARCHAR(255) NULL,
    `location_details` JSON NULL,
    `tax_history` JSON NULL,
    `e_khatha_status` VARCHAR(100) NULL,
    `verification_status` ENUM('PENDING', 'VERIFIED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `verification_fee` DECIMAL(10, 2) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_pid_verifications_property_id` (`property_id`),
    INDEX `idx_pid_verifications_pid_number` (`pid_number`),
    INDEX `idx_pid_verifications_verification_status` (`verification_status`),
    CONSTRAINT `fk_pid_verifications_property_id` 
        FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: transactions
-- ============================================
CREATE TABLE IF NOT EXISTS `transactions` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL,
    `project_id` CHAR(36) NULL,
    `transaction_type` ENUM('PID_VERIFICATION', 'FEASIBILITY_UNLOCK', 'PRIORITY_LISTING') NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `razorpay_order_id` VARCHAR(255) NULL UNIQUE,
    `razorpay_payment_id` VARCHAR(255) NULL UNIQUE,
    `razorpay_signature` VARCHAR(500) NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_transactions_user_id` (`user_id`),
    INDEX `idx_transactions_project_id` (`project_id`),
    INDEX `idx_transactions_transaction_type` (`transaction_type`),
    INDEX `idx_transactions_status` (`status`),
    INDEX `idx_transactions_razorpay_order_id` (`razorpay_order_id`),
    INDEX `idx_transactions_razorpay_payment_id` (`razorpay_payment_id`),
    CONSTRAINT `fk_transactions_user_id` 
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 
        ON DELETE CASCADE,
    CONSTRAINT `fk_transactions_project_id` 
        FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) 
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: payments
-- ============================================
CREATE TABLE IF NOT EXISTS `payments` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `transaction_id` CHAR(36) NOT NULL,
    `payment_method` VARCHAR(100) NULL,
    `status` VARCHAR(50) NULL,
    `payment_metadata` JSON NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_payments_transaction_id` (`transaction_id`),
    CONSTRAINT `fk_payments_transaction_id` 
        FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: matches
-- ============================================
CREATE TABLE IF NOT EXISTS `matches` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `project_id` CHAR(36) NOT NULL,
    `professional_id` CHAR(36) NOT NULL,
    `match_score` DECIMAL(5, 4) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_matches_project_id` (`project_id`),
    INDEX `idx_matches_professional_id` (`professional_id`),
    INDEX `idx_matches_match_score` (`match_score`),
    INDEX `idx_matches_status` (`status`),
    CONSTRAINT `fk_matches_project_id` 
        FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) 
        ON DELETE CASCADE,
    CONSTRAINT `fk_matches_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: match_scores
-- ============================================
CREATE TABLE IF NOT EXISTS `match_scores` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `match_id` CHAR(36) NOT NULL UNIQUE,
    `project_type_score` DECIMAL(5, 4) NULL,
    `location_score` DECIMAL(5, 4) NULL,
    `project_size_score` DECIMAL(5, 4) NULL,
    `pricing_score` DECIMAL(5, 4) NULL,
    `capability_score` DECIMAL(5, 4) NULL,
    `verification_score` DECIMAL(5, 4) NULL,
    `total_score` DECIMAL(5, 4) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_match_scores_match_id` (`match_id`),
    CONSTRAINT `fk_match_scores_match_id` 
        FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: location_preferences
-- ============================================
CREATE TABLE IF NOT EXISTS `location_preferences` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `location_name` VARCHAR(255) NOT NULL,
    `radius_km` DECIMAL(5, 2) NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_location_preferences_professional_id` (`professional_id`),
    INDEX `idx_location_preferences_capability_type` (`capability_type`),
    CONSTRAINT `fk_location_preferences_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: subcontractor_scopes
-- ============================================
CREATE TABLE IF NOT EXISTS `subcontractor_scopes` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `scope_type` ENUM('CIVIL_WORKS', 'FLOORING_FINISHING', 'PAINTING_SURFACE', 'CARPENTRY_WOODWORK', 'OTHER') NOT NULL,
    `description` TEXT NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_subcontractor_scopes_professional_id` (`professional_id`),
    INDEX `idx_subcontractor_scopes_scope_type` (`scope_type`),
    INDEX `idx_subcontractor_scopes_capability_type` (`capability_type`),
    CONSTRAINT `fk_subcontractor_scopes_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: project_size_categories
-- ============================================
CREATE TABLE IF NOT EXISTS `project_size_categories` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NOT NULL,
    `size_category` ENUM('UP_TO_5000', '5000_25000', '25000_100000', '100000_PLUS', 'CUSTOM') NOT NULL,
    `custom_range` VARCHAR(255) NULL,
    `wallet_size_range` ENUM('SMALL_UP_TO_5CR', 'MEDIUM_5_20CR', 'LARGE_20_50CR', 'VERY_LARGE_50CR_PLUS') NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_project_size_categories_professional_id` (`professional_id`),
    INDEX `idx_project_size_categories_capability_type` (`capability_type`),
    CONSTRAINT `fk_project_size_categories_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: professional_pricing
-- ============================================
CREATE TABLE IF NOT EXISTS `professional_pricing` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `capability_type` ENUM('CONSTRUCTION', 'INTERIOR', 'JV_JD', 'RECONSTRUCTION') NOT NULL,
    `project_type` ENUM('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL') NULL,
    `pricing_tier` ENUM('BASIC_REGULAR', 'STANDARD', 'LUXURY') NULL,
    `price_per_sqft` DECIMAL(10, 2) NULL,
    `custom_pricing` JSON NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_professional_pricing_professional_id` (`professional_id`),
    INDEX `idx_professional_pricing_capability_type` (`capability_type`),
    CONSTRAINT `fk_professional_pricing_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: jv_jd_preferences
-- ============================================
CREATE TABLE IF NOT EXISTS `jv_jd_preferences` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL UNIQUE,
    `preferred_jv_models` JSON NULL,
    `rera_registered_projects_count` INT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_jv_jd_preferences_professional_id` (`professional_id`),
    CONSTRAINT `fk_jv_jd_preferences_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: reconstruction_work_types
-- ============================================
CREATE TABLE IF NOT EXISTS `reconstruction_work_types` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `professional_id` CHAR(36) NOT NULL,
    `work_type` ENUM('MAJOR_RECONSTRUCTION', 'MINOR_REPAIR_MAINTENANCE', 'PAINTING_FINISHING', 'CUSTOM') NOT NULL,
    `custom_description` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_reconstruction_work_types_professional_id` (`professional_id`),
    INDEX `idx_reconstruction_work_types_work_type` (`work_type`),
    CONSTRAINT `fk_reconstruction_work_types_professional_id` 
        FOREIGN KEY (`professional_id`) REFERENCES `professional_profiles` (`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- END OF SCHEMA
-- ============================================
