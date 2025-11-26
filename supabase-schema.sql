-- =============================================
-- SYDNEY PEST CONTROL DIRECTORY - DATABASE SCHEMA
-- =============================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Go to: SQL Editor → New Query → Paste this → Run

-- =============================================
-- 1. OPERATORS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS operators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Basic Info
  business_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  trading_name VARCHAR(255),

  -- License Info (from EPA)
  license_number VARCHAR(50),
  license_type VARCHAR(100),
  license_status VARCHAR(50) DEFAULT 'active',
  license_expiry DATE,
  epa_verified BOOLEAN DEFAULT false,
  epa_verified_date TIMESTAMP,

  -- Contact Details
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(500),

  -- Address
  address_street VARCHAR(255),
  address_suburb VARCHAR(100),
  address_postcode VARCHAR(10),
  address_state VARCHAR(10) DEFAULT 'NSW',

  -- Business Details
  abn VARCHAR(20),
  years_in_business INTEGER,
  employee_count VARCHAR(20),
  insurance_verified BOOLEAN DEFAULT false,

  -- Services & Areas (JSON arrays)
  services JSONB DEFAULT '[]'::jsonb,
  service_areas JSONB DEFAULT '[]'::jsonb,

  -- Reviews
  google_rating DECIMAL(2,1),
  google_review_count INTEGER DEFAULT 0,

  -- Pricing
  pricing JSONB DEFAULT '{}'::jsonb,

  -- Features & Description
  features JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  short_description VARCHAR(500),

  -- Operating Hours
  operating_hours JSONB DEFAULT '{}'::jsonb,

  -- Images
  logo_url VARCHAR(500),
  images JSONB DEFAULT '[]'::jsonb,

  -- Listing Management
  listing_tier VARCHAR(20) DEFAULT 'basic', -- basic, featured, premium, enterprise
  featured BOOLEAN DEFAULT false,
  claimed BOOLEAN DEFAULT false,
  claimed_by UUID,
  claimed_at TIMESTAMP,

  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, pending, suspended, inactive

  -- SEO
  seo_title VARCHAR(70),
  seo_description VARCHAR(160),

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_operators_suburb ON operators USING GIN (service_areas);
CREATE INDEX idx_operators_services ON operators USING GIN (services);
CREATE INDEX idx_operators_status ON operators (status);
CREATE INDEX idx_operators_featured ON operators (featured);
CREATE INDEX idx_operators_slug ON operators (slug);

-- =============================================
-- 2. LEADS TABLE (Quote Requests)
-- =============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Request Details
  suburb VARCHAR(100),
  postcode VARCHAR(10),
  service VARCHAR(100),
  property_type VARCHAR(50), -- house, apartment, commercial
  urgency VARCHAR(50), -- urgent, this_week, flexible
  message TEXT,

  -- Tracking
  source VARCHAR(50) DEFAULT 'website', -- website, suburb_page, operator_page
  source_url VARCHAR(500),
  ip_address VARCHAR(50),
  user_agent TEXT,

  -- Distribution
  distributed_to JSONB DEFAULT '[]'::jsonb, -- operator IDs this lead was sent to
  distributed_at TIMESTAMP,

  -- Status
  status VARCHAR(20) DEFAULT 'new', -- new, distributed, converted, closed

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_suburb ON leads (suburb);
CREATE INDEX idx_leads_created ON leads (created_at DESC);

-- =============================================
-- 3. CONTACTS TABLE (Direct Operator Contact)
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,

  -- Operator Reference
  operator_id UUID REFERENCES operators(id),

  -- Tracking
  source_url VARCHAR(500),

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contacts_operator ON contacts (operator_id);

-- =============================================
-- 4. OPERATOR CLAIMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS operator_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Claim Details
  operator_id UUID REFERENCES operators(id),

  -- Claimant Info
  claimant_name VARCHAR(255) NOT NULL,
  claimant_email VARCHAR(255) NOT NULL,
  claimant_phone VARCHAR(20),
  claimant_role VARCHAR(100), -- owner, manager, employee

  -- Verification
  verification_method VARCHAR(50), -- email, phone, document
  verification_code VARCHAR(50),
  verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, rejected
  verified_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_claims_operator ON operator_claims (operator_id);
CREATE INDEX idx_claims_status ON operator_claims (verification_status);

-- =============================================
-- 5. SUBSCRIPTIONS TABLE (Future - Payments)
-- =============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Operator Reference
  operator_id UUID REFERENCES operators(id),

  -- Subscription Details
  tier VARCHAR(20) NOT NULL, -- featured, premium, enterprise
  price_monthly DECIMAL(10,2),

  -- Stripe Integration
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, cancelled, past_due

  -- Dates
  started_at TIMESTAMP DEFAULT NOW(),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_operator ON subscriptions (operator_id);
CREATE INDEX idx_subscriptions_status ON subscriptions (status);

-- =============================================
-- 6. PAGE VIEWS TABLE (Analytics)
-- =============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Page Info
  page_type VARCHAR(50), -- home, suburb, service, operator
  page_slug VARCHAR(255),

  -- Optional References
  operator_id UUID REFERENCES operators(id),

  -- Tracking
  ip_address VARCHAR(50),
  user_agent TEXT,
  referrer VARCHAR(500),

  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pageviews_type ON page_views (page_type);
CREATE INDEX idx_pageviews_operator ON page_views (operator_id);
CREATE INDEX idx_pageviews_created ON page_views (created_at DESC);

-- =============================================
-- 7. ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE operator_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Public read access to operators
CREATE POLICY "Public can view active operators" ON operators
  FOR SELECT USING (status = 'active');

-- Public can insert leads
CREATE POLICY "Public can submit leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Public can insert contacts
CREATE POLICY "Public can submit contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Public can insert claims
CREATE POLICY "Public can submit claims" ON operator_claims
  FOR INSERT WITH CHECK (true);

-- Public can insert page views
CREATE POLICY "Public can log page views" ON page_views
  FOR INSERT WITH CHECK (true);

-- =============================================
-- 8. HELPER FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON operator_claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DONE!
-- =============================================
-- Your database is ready. Tables created:
-- 1. operators - 700+ pest control businesses
-- 2. leads - Quote requests from visitors
-- 3. contacts - Direct operator contact forms
-- 4. operator_claims - Business claim requests
-- 5. subscriptions - Future payment tracking
-- 6. page_views - Analytics tracking
