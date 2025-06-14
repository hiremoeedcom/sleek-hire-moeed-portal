
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { validateEmail, checkRateLimit } from '@/utils/security';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const { toast } = useToast();
  const { signIn, requestPasswordReset } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 1) {
      toast({
        title: "Password Required",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting
    const rateLimitKey = `login_${email}`;
    if (!checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000)) {
      toast({
        title: "Too Many Attempts",
        description: "Too many login attempts. Please try again in 15 minutes.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        setAttemptCount(0);
        // The useAuth hook will handle the redirect
      } else {
        setAttemptCount(prev => prev + 1);
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setAttemptCount(prev => prev + 1);
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
    
    if (!validateEmail(recoveryEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting for password recovery
    const rateLimitKey = `recovery_${recoveryEmail}`;
    if (!checkRateLimit(rateLimitKey, 3, 60 * 60 * 1000)) { // 3 attempts per hour
      toast({
        title: "Too Many Requests",
        description: "Too many password recovery requests. Please try again in 1 hour.",
        variant: "destructive",
      });
      return;
    }

    setRecoveryLoading(true);

    try {
      const result = await requestPasswordReset(recoveryEmail);
      
      if (result.success) {
        toast({
          title: "Recovery Email Sent",
          description: result.message || "Please check your email for password recovery instructions",
        });
        setRecoveryMode(false);
        setRecoveryEmail('');
      } else {
        toast({
          title: "Recovery Failed",
          description: result.error || "Unable to send recovery email",
          variant: "destructive",
        });
      }
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
        <CardHeader className="text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-left">Forgot Password?</CardTitle>
          <CardDescription className="text-left">
            Enter your email address and we'll send you a secure link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordRecovery} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="recovery-email">Email Address</Label>
              <Input
                id="recovery-email"
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
                disabled={recoveryLoading}
                maxLength={254}
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
      <CardHeader className="text-left">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Lock className="h-6 w-6 text-gray-600" />
        </div>
        <CardTitle className="text-left">Admin Login</CardTitle>
        <CardDescription className="text-left">
          Enter your credentials to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attemptCount >= 3 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              Multiple failed attempts detected. Please ensure you're using the correct credentials.
            </div>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
              maxLength={254}
            />
          </div>
          <div className="space-y-2 text-left">
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
      </CardContent>
    </Card>
  );
};

export default LoginForm;
