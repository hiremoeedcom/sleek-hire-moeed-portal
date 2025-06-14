
-- Enable Row Level Security on all admin-related tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id::text = current_setting('app.current_admin_id', true)
    AND is_active = true
  );
$$;

-- Create policies for admin_users table
CREATE POLICY "Admin users can view all admin users" 
  ON public.admin_users FOR SELECT 
  USING (public.is_admin_user());

CREATE POLICY "Admin users can update all admin users" 
  ON public.admin_users FOR UPDATE 
  USING (public.is_admin_user());

CREATE POLICY "No one can insert admin users via RLS" 
  ON public.admin_users FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "No one can delete admin users via RLS" 
  ON public.admin_users FOR DELETE 
  USING (false);

-- Create policies for password_reset_tokens
CREATE POLICY "Admin users can view password reset tokens" 
  ON public.password_reset_tokens FOR SELECT 
  USING (public.is_admin_user());

CREATE POLICY "System can insert password reset tokens" 
  ON public.password_reset_tokens FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "System can update password reset tokens" 
  ON public.password_reset_tokens FOR UPDATE 
  USING (true);

-- Create policies for contacts
CREATE POLICY "Admin users can manage contacts" 
  ON public.contacts FOR ALL 
  USING (public.is_admin_user());

-- Create policies for estimates
CREATE POLICY "Admin users can view estimates" 
  ON public.estimates FOR SELECT 
  USING (public.is_admin_user());

CREATE POLICY "Anyone can insert estimates" 
  ON public.estimates FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin users can update estimates" 
  ON public.estimates FOR UPDATE 
  USING (public.is_admin_user());

-- Create policies for quotations and related tables
CREATE POLICY "Admin users can manage quotations" 
  ON public.quotations FOR ALL 
  USING (public.is_admin_user());

CREATE POLICY "Admin users can manage quotation items" 
  ON public.quotation_items FOR ALL 
  USING (public.is_admin_user());

-- Create policies for projects
CREATE POLICY "Admin users can manage projects" 
  ON public.projects FOR ALL 
  USING (public.is_admin_user());

-- Create policies for tasks
CREATE POLICY "Admin users can manage tasks" 
  ON public.tasks FOR ALL 
  USING (public.is_admin_user());

-- Create policies for analytics
CREATE POLICY "Admin users can view analytics" 
  ON public.analytics FOR SELECT 
  USING (public.is_admin_user());

CREATE POLICY "Anyone can insert analytics" 
  ON public.analytics FOR INSERT 
  WITH CHECK (true);

-- Create policies for site_settings
CREATE POLICY "Admin users can manage site settings" 
  ON public.site_settings FOR ALL 
  USING (public.is_admin_user());

-- Add password hashing function
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This is a simple hash for demonstration. In production, use proper bcrypt
  RETURN encode(digest(password || 'salt_' || extract(epoch from now()), 'sha256'), 'hex');
END;
$$;

-- Add function to verify password
CREATE OR REPLACE FUNCTION public.verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN hash = encode(digest(password || 'salt_' || extract(epoch from now()), 'sha256'), 'hex');
END;
$$;

-- Update existing admin user with hashed password
UPDATE public.admin_users 
SET password_hash = public.hash_password('admin123') 
WHERE email = 'admin@example.com';
