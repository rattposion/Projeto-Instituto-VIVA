/*
  # Initial Schema for Meta Pixel Platform

  1. New Tables
    - `workspaces` - Organization/company workspaces
    - `users` - User accounts with authentication
    - `workspace_members` - Many-to-many relationship between users and workspaces
    - `pixels` - Meta Pixel configurations
    - `events` - Pixel events tracking
    - `conversions` - Custom conversion definitions
    - `diagnostics` - Pixel health and diagnostic information
    - `integrations` - Third-party integrations
    - `api_keys` - API access keys for workspaces
    - `audit_logs` - Audit trail for all actions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for workspace-based access control
*/

-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  owner_id uuid,
  settings jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'viewer')),
  avatar text,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workspace_members table
CREATE TABLE IF NOT EXISTS workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'viewer')),
  invited_by uuid REFERENCES users(id),
  joined_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- Create pixels table
CREATE TABLE IF NOT EXISTS pixels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  pixel_id text NOT NULL,
  meta_account text NOT NULL,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error')),
  last_activity timestamptz,
  events_count integer DEFAULT 0,
  conversions_count integer DEFAULT 0,
  revenue decimal(12,2) DEFAULT 0,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, pixel_id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pixel_id uuid REFERENCES pixels(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  event_type text DEFAULT 'standard' CHECK (event_type IN ('standard', 'custom')),
  parameters jsonb DEFAULT '{}',
  source text DEFAULT 'web' CHECK (source IN ('web', 'server', 'mobile')),
  user_agent text,
  ip_address inet,
  timestamp timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create conversions table
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  pixel_id uuid REFERENCES pixels(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  rules jsonb DEFAULT '[]',
  conversion_rate decimal(5,2) DEFAULT 0,
  total_conversions integer DEFAULT 0,
  total_value decimal(12,2) DEFAULT 0,
  average_value decimal(12,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diagnostics table
CREATE TABLE IF NOT EXISTS diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pixel_id uuid REFERENCES pixels(id) ON DELETE CASCADE,
  severity text NOT NULL CHECK (severity IN ('error', 'warning', 'info', 'success')),
  category text NOT NULL CHECK (category IN ('implementation', 'events', 'performance', 'connection')),
  title text NOT NULL,
  description text NOT NULL,
  url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
  last_checked timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(pixel_id, title)
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('gtm', 'wordpress', 'shopify', 'webhook')),
  name text NOT NULL,
  description text,
  config jsonb DEFAULT '{}',
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error')),
  last_sync timestamptz,
  pixels_connected integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  permissions text[] DEFAULT '{}',
  last_used timestamptz,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_workspace_id ON users(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_pixels_workspace_id ON pixels(workspace_id);
CREATE INDEX IF NOT EXISTS idx_pixels_pixel_id ON pixels(pixel_id);
CREATE INDEX IF NOT EXISTS idx_events_pixel_id ON events(pixel_id);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_conversions_pixel_id ON conversions(pixel_id);
CREATE INDEX IF NOT EXISTS idx_diagnostics_pixel_id ON diagnostics(pixel_id);
CREATE INDEX IF NOT EXISTS idx_integrations_workspace_id ON integrations(workspace_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_workspace_id ON api_keys(workspace_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_workspace_id ON audit_logs(workspace_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Update workspace owner reference
ALTER TABLE workspaces ADD CONSTRAINT fk_workspaces_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pixels_updated_at BEFORE UPDATE ON pixels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversions_updated_at BEFORE UPDATE ON conversions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();