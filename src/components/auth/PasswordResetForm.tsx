
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Key, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PasswordResetForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token || !email) {
        throw new Error('Invalid reset link');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Verify token and check if it's still valid
      const { data: resetToken, error: tokenError } = await supabase
        .from('password_reset_tokens')
        .select('id, admin_user_id, expires_at, used')
        .eq('token', token)
        .eq('used', false)
        .maybeSingle();

      if (tokenError || !resetToken) {
        throw new Error('Invalid or expired reset token');
      }

      if (new Date(resetToken.expires_at) < new Date()) {
        throw new Error('Reset token has expired');
      }

      // Update the admin user's password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: newPassword })
        .eq('id', resetToken.admin_user_id)
        .eq('email', email);

      if (updateError) {
        throw new Error('Failed to update password');
      }

      // Mark token as used
      await supabase
        .from('password_reset_tokens')
        .update({ used: true })
        .eq('id', resetToken.id);

      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });

      // Redirect to login page
      navigate('/admin');
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Invalid Reset Link</CardTitle>
            <CardDescription>
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/admin')} 
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password for {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
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
