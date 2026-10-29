-- ============================================================================
-- JCLS Church Website — PostgreSQL Relational Database Schema
-- Production-Ready, Normalized, Indexed & Audited
-- ============================================================================

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. ADMINISTRATORS (Private dashboard access)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS administrators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'pastor', 'staff')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_administrators_email ON administrators(email);
CREATE INDEX IF NOT EXISTS idx_administrators_is_active ON administrators(is_active);

-- ----------------------------------------------------------------------------
-- 2. MINISTRIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ministries (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    schedule VARCHAR(255) NOT NULL,
    audience VARCHAR(150),
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ministries_slug ON ministries(slug);
CREATE INDEX IF NOT EXISTS idx_ministries_is_active ON ministries(is_active);
CREATE INDEX IF NOT EXISTS idx_ministries_order ON ministries(display_order ASC);

-- ----------------------------------------------------------------------------
-- 3. EVENTS (Upcoming and past events)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    date_display VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    rsvp_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date ASC);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, is_archived);

-- ----------------------------------------------------------------------------
-- 4. MESSAGES / SERMONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(150) NOT NULL,
    speaker_title VARCHAR(100),
    date DATE NOT NULL,
    series VARCHAR(150),
    scripture VARCHAR(100) NOT NULL,
    scripture_verse TEXT,
    video_url VARCHAR(255),
    audio_url VARCHAR(255),
    thumbnail VARCHAR(255),
    summary TEXT,
    key_takeaways JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NOW() DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_date ON messages(date DESC);
CREATE INDEX IF NOT EXISTS idx_messages_featured ON messages(is_featured);
CREATE INDEX IF NOT EXISTS idx_messages_published ON messages(is_published, is_archived);

-- ----------------------------------------------------------------------------
-- 5. LEADERSHIP MEMBERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leadership (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    bio TEXT,
    image VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leadership_order ON leadership(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_leadership_is_active ON leadership(is_active);

-- ----------------------------------------------------------------------------
-- 6. VISITOR CONNECTIONS (Ministry Connection Submissions)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS visitor_connections (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    ministry VARCHAR(150) NOT NULL,
    message TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'contacted', 'completed', 'archived')),
    admin_notes TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitor_conn_status ON visitor_connections(status);
CREATE INDEX IF NOT EXISTS idx_visitor_conn_submitted ON visitor_connections(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_conn_ministry ON visitor_connections(ministry);

-- ----------------------------------------------------------------------------
-- 7. PLANNED VISITS (Plan Your Visit Submissions)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS planned_visits (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_name VARCHAR(255) NOT NULL,
    gathering_time VARCHAR(100),
    party_size VARCHAR(20) NOT NULL DEFAULT '1',
    has_kids BOOLEAN NOT NULL DEFAULT FALSE,
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'welcomed', 'archived')),
    admin_notes TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_planned_visits_status ON planned_visits(status);
CREATE INDEX IF NOT EXISTS idx_planned_visits_submitted ON planned_visits(submitted_at DESC);

-- ----------------------------------------------------------------------------
-- 8. PRAYER REQUESTS (Strictly Confidential Pastoral Data)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS prayer_requests (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) DEFAULT 'Anonymous',
    contact VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    request TEXT NOT NULL,
    confidentiality VARCHAR(50) NOT NULL DEFAULT 'pastoral' CHECK (confidentiality IN ('pastoral', 'prayer-team')),
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed', 'archived')),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    admin_notes TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prayer_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_confidentiality ON prayer_requests(confidentiality);
CREATE INDEX IF NOT EXISTS idx_prayer_submitted ON prayer_requests(submitted_at DESC);

-- ----------------------------------------------------------------------------
-- 9. CONTACT INQUIRIES (General Questions & Messages)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    topic VARCHAR(150),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'contacted', 'completed', 'archived')),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    admin_notes TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON contact_inquiries(submitted_at DESC);

-- ----------------------------------------------------------------------------
-- 10. WEBSITE SETTINGS (Editable church information, service times, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS website_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 11. AUDIT TIMESTAMP TRIGGER (Auto-update updated_at column)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN
        SELECT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'updated_at'
          AND table_name != 'update_updated_at_column'
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trg_update_%I_timestamp ON %I;
            CREATE TRIGGER trg_update_%I_timestamp
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', tbl, tbl, tbl, tbl);
    END LOOP;
END;
$$;
