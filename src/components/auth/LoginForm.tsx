
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check admin_users table for credentials
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (fetchError || !adminUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email or account not found",
          variant: "destructive",
        });
        return;
      }

      // Here you would typically verify the password hash
      // For demo purposes, we'll do a simple comparison
      if (password === 'admin123') { // Replace with proper hash verification
        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminUser.id);

        // Set user session in localStorage for demo
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });

        // Trigger a reload to update the auth state
        window.location.reload();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryLoading(true);

    try {
      // Check if admin user exists
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_users')
        .select('email, name')
        .eq('email', recoveryEmail)
        .eq('is_active', true)
        .single();

      if (fetchError || !adminUser) {
        toast({
          title: "Email Not Found",
          description: "No admin account found with this email address",
          variant: "destructive",
        });
        return;
      }

      // Generate a recovery link (in production, this would be a secure token)
      const recoveryLink = `${window.location.origin}/admin/reset-password?token=demo-token&email=${encodeURIComponent(recoveryEmail)}`;

      // Send recovery email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-password-recovery', {
        body: {
          email: recoveryEmail,
          resetLink: recoveryLink,
        },
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        toast({
          title: "Email Service Unavailable",
          description: "Unable to send recovery email. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Recovery Email Sent",
        description: "Please check your email for password recovery instructions",
      });

      setRecoveryMode(false);
      setRecoveryEmail('');
    } catch (error) {
      console.error('Password recovery error:', error);
      toast({
        title: "Recovery Failed",
        description: "An error occurred while sending recovery email",
        variant: "destructive",
      });
    } finally {
      setRecoveryLoading(false);
    }
  };

  if (recoveryMode) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordRecovery} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recovery-email">Email Address</Label>
              <Input
                id="recovery-email"
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
                disabled={recoveryLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={recoveryLoading}>
              {recoveryLoading ? "Sending..." : "Send Recovery Email"}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={() => setRecoveryMode(false)}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Lock className="h-6 w-6 text-gray-600" />
        </div>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Button 
            type="button" 
            variant="link" 
            className="w-full" 
            onClick={() => setRecoveryMode(true)}
          >
            Forgot your password?
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo Credentials:</strong><br />
            Email: admin@example.com<br />
            Password: admin123
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
