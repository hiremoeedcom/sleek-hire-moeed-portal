import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, User, Mail, Building2, MessageSquare } from 'lucide-react';
import { validateEmail, sanitizeInput, validateRequired, validateLength } from '@/utils/validation';
import { logger } from '@/utils/logger';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    priority: '',
    budget: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Required field validations
    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) errors.name = nameError;
    
    const emailError = validateRequired(formData.email, 'Email');
    if (emailError) errors.email = emailError;
    else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const subjectError = validateRequired(formData.subject, 'Subject');
    if (subjectError) errors.subject = subjectError;
    
    const messageError = validateRequired(formData.message, 'Message');
    if (messageError) errors.message = messageError;
    
    // Length validations
    const nameLengthError = validateLength(formData.name, 2, 100, 'Name');
    if (nameLengthError) errors.name = nameLengthError;
    
    const subjectLengthError = validateLength(formData.subject, 5, 200, 'Subject');
    if (subjectLengthError) errors.subject = subjectLengthError;
    
    const messageLengthError = validateLength(formData.message, 10, 2000, 'Message');
    if (messageLengthError) errors.message = messageLengthError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      // Sanitize all input data
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        company: sanitizeInput(formData.company),
        phone: sanitizeInput(formData.phone),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        priority: formData.priority,
        budget: formData.budget,
        timeline: formData.timeline,
      };

      logger.info('Submitting contact form');

      const { error } = await supabase
        .from('contacts')
        .insert([sanitizedData]);

      if (error) throw error;

      logger.info('Contact form submitted successfully');

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        priority: '',
        budget: '',
        timeline: '',
      });
      setValidationErrors({});
    } catch (error) {
      logger.error('Contact form submission failed', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Get In Touch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                required
                disabled={loading}
                maxLength={100}
              />
              {validationErrors.name && (
                <p className="text-sm text-red-600">{validationErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                maxLength={255}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Your company name"
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Your phone number"
                disabled={loading}
                maxLength={20}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Brief subject line"
              required
              disabled={loading}
              maxLength={200}
            />
            {validationErrors.subject && (
              <p className="text-sm text-red-600">{validationErrors.subject}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< $5k">Less than $5,000</SelectItem>
                  <SelectItem value="$5k - $15k">$5,000 - $15,000</SelectItem>
                  <SelectItem value="$15k - $50k">$15,000 - $50,000</SelectItem>
                  <SelectItem value="$50k+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASAP">ASAP</SelectItem>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={5}
              placeholder="Tell us about your project requirements..."
              required
              disabled={loading}
              maxLength={2000}
            />
            {validationErrors.message && (
              <p className="text-sm text-red-600">{validationErrors.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
