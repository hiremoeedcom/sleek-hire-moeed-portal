
-- Fix the password hashing function to be deterministic for verification
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Use a fixed salt for consistency in verification
  RETURN encode(digest(password || 'moeed_admin_salt_2024', 'sha256'), 'hex');
END;
$$;

-- Fix the password verification function
CREATE OR REPLACE FUNCTION public.verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN hash = encode(digest(password || 'moeed_admin_salt_2024', 'sha256'), 'hex');
END;
$$;

-- Update the existing admin user with the new hash
UPDATE public.admin_users 
SET password_hash = public.hash_password('Khudakabanda_211')
WHERE email = 'beingabdulmoeed@gmail.com';

-- Add function to reset password using token
CREATE OR REPLACE FUNCTION public.reset_admin_password(
  reset_token TEXT,
  new_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token_record RECORD;
  admin_id UUID;
BEGIN
  -- Check if token exists and is valid
  SELECT prt.*, au.id as admin_user_id
  INTO token_record
  FROM public.password_reset_tokens prt
  JOIN public.admin_users au ON prt.admin_user_id = au.id
  WHERE prt.token = reset_token
    AND prt.expires_at > NOW()
    AND prt.used = false
    AND au.is_active = true;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired token');
  END IF;

  -- Update the password
  UPDATE public.admin_users
  SET 
    password_hash = public.hash_password(new_password),
    updated_at = NOW()
  WHERE id = token_record.admin_user_id;

  -- Mark token as used
  UPDATE public.password_reset_tokens
  SET used = true
  WHERE token = reset_token;

  RETURN jsonb_build_object('success', true, 'message', 'Password updated successfully');
END;
$$;
