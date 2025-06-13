
-- Create a table for password reset tokens
CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_expires_at ON public.password_reset_tokens(expires_at);

-- Create function to clean up expired tokens
CREATE OR REPLACE FUNCTION clean_expired_reset_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM public.password_reset_tokens 
  WHERE expires_at < now() OR used = true;
END;
$$ LANGUAGE plpgsql;
