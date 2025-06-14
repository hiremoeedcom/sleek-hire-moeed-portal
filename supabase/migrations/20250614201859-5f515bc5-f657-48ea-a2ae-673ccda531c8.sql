
-- Update the admin user credentials
UPDATE public.admin_users 
SET 
  email = 'beingabdulmoeed@gmail.com',
  password_hash = public.hash_password('Khudakabanda_211')
WHERE email = 'admin@example.com';
