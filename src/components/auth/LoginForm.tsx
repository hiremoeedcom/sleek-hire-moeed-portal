
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, sanitizeInput } from '@/utils/validation';
import { logger } from '@/utils/logger';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { signIn, requestPasswordReset } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    const sanitizedEmail = sanitizeInput(email);
    if (!validateEmail(sanitizedEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!showForgotPassword && (!password || password.length < 3)) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check your input and try again",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const sanitizedEmail = sanitizeInput(email);
      logger.info('Attempting admin login', { email: sanitizedEmail });
      
      const result = await signIn(sanitizedEmail, password);

      if (!result.success) {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return;
      }

      logger.info('Admin login successful');
      
      // Clear form for security
      setEmail('');
      setPassword('');
      setValidationErrors({});
      
      toast({
        title: "Success",
        description: "Welcome to the admin dashboard!",
      });
      
      // Navigation will be handled automatically by the Admin component
      
    } catch (error) {
      logger.error('Login exception', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(sanitizeInput(email))) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const result = await requestPasswordReset(sanitizeInput(email));
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setShowForgotPassword(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send reset instructions",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{showForgotPassword ? 'Reset Password' : 'Admin Login'}</CardTitle>
        <CardDescription>
          {showForgotPassword 
            ? 'Enter your email to receive reset instructions'
            : 'Enter your credentials to access the admin dashboard'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors(prev => ({...prev, email: ''}));
                }
              }}
              placeholder="Enter your email"
              required
              disabled={loading}
              autoComplete="email"
            />
            {validationErrors.email && (
              <p className="text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>
          
          {!showForgotPassword && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors(prev => ({...prev, password: ''}));
                  }
                }}
                placeholder="Enter your password"
                required
                disabled={loading}
                autoComplete="current-password"
              />
              {validationErrors.password && (
                <p className="text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading 
              ? (showForgotPassword ? "Sending..." : "Signing in...") 
              : (showForgotPassword ? "Send Reset Link" : "Sign In")
            }
          </Button>
          
          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setShowForgotPassword(!showForgotPassword);
                setValidationErrors({});
              }}
              className="text-sm"
            >
              {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
