
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { validatePassword } from '@/utils/security';

const PasswordResetForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or incomplete.",
        variant: "destructive",
      });
      navigate('/admin');
      return;
    }

    // Verify token validity
    verifyToken();
  }, [token, email, navigate, toast]);

  const verifyToken = async () => {
    if (!token) return;

    try {
      const { data, error } = await supabase
        .from('password_reset_tokens')
        .select('expires_at, used, admin_users!inner(email, is_active)')
        .eq('token', token)
        .eq('used', false)
        .eq('admin_users.is_active', true)
        .maybeSingle();

      if (error || !data) {
        setTokenValid(false);
        toast({
          title: "Invalid Token",
          description: "This password reset token is invalid.",
          variant: "destructive",
        });
        return;
      }

      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        setTokenValid(false);
        toast({
          title: "Token Expired",
          description: "This password reset token has expired. Please request a new one.",
          variant: "destructive",
        });
        return;
      }

      setTokenValid(true);
    } catch (error) {
      console.error('Token verification error:', error);
      setTokenValid(false);
      toast({
        title: "Verification Failed",
        description: "Unable to verify the reset token.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast({
        title: "Invalid Password",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Call the reset password function using a direct SQL query approach
      const { data, error } = await supabase
        .rpc('reset_admin_password' as any, {
          reset_token: token,
          new_password: password
        }) as { data: any, error: any };

      if (error) {
        throw new Error(error.message);
      }

      // Parse the result since it's returned as JSONB
      const result = typeof data === 'string' ? JSON.parse(data) : data;
      
      if (result && result.success) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated successfully. You can now log in with your new password.",
        });
        
        // Redirect to admin login after successful reset
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        toast({
          title: "Reset Failed",
          description: result?.error || "Unable to reset password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Reset Failed",
        description: "An error occurred while resetting your password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Verifying reset token...</div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/admin')} 
              className="w-full"
            >
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Lock className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it's strong and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  disabled={loading}
                  maxLength={128}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 text-left">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                  disabled={loading}
                  maxLength={128}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <p className="font-medium mb-1">Password requirements:</p>
              <ul className="text-xs space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={() => navigate('/admin')}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetForm;
