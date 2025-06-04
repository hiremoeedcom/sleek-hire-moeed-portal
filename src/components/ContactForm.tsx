
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user came from estimate page and prefill the form
    const savedEstimate = localStorage.getItem('estimateData');
    if (savedEstimate) {
      try {
        const estimateData = JSON.parse(savedEstimate);
        setFormData(prev => ({
          ...prev,
          name: estimateData.name || '',
          email: estimateData.email || '',
          company: estimateData.company || '',
          subject: `Project Estimate Follow-up - ${estimateData.projectType || 'Web Development'}`,
          message: `Hi Moeed,

I've submitted an estimate request for my ${estimateData.projectType || 'project'} with the following details:

Project Type: ${estimateData.projectType || 'Not specified'}
Budget Range: ${estimateData.budget || 'Not specified'}
Timeline: ${estimateData.timeline || 'Not specified'}
Features: ${estimateData.features?.join(', ') || 'None specified'}

${estimateData.description ? `Project Description: ${estimateData.description}` : ''}

${estimateData.estimate ? `Estimated Cost Range: $${estimateData.estimate.min?.toLocaleString()} - $${estimateData.estimate.max?.toLocaleString()}` : ''}

I'd love to discuss this project further with you. When would be a good time for a call?

Best regards,
${estimateData.name || ''}`
        }));
        
        // Clear the estimate data after using it
        localStorage.removeItem('estimateData');
      } catch (error) {
        console.error('Error parsing estimate data:', error);
        localStorage.removeItem('estimateData');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          subject: formData.subject,
          message: formData.message,
          status: 'new',
          priority: 'medium'
        });

      if (error) {
        console.error('Contact submission error:', error);
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            Ready to start your project? Have questions? I'd love to hear from you. 
            Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">hello@hiremoeed.me</p>
              <p className="text-sm text-gray-500 mt-1">I'll respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-gray-600">Available upon request</p>
              <p className="text-sm text-gray-500 mt-1">Let's schedule a call to discuss your project</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p className="text-gray-600">Remote Worldwide</p>
              <p className="text-sm text-gray-500 mt-1">Working with clients across all time zones</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Response Time</h3>
              <p className="text-gray-600">Within 24 hours</p>
              <p className="text-sm text-gray-500 mt-1">Usually much faster during business hours</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Why Work With Me?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Clear communication throughout the project</li>
            <li>• Modern, scalable solutions built to last</li>
            <li>• Competitive pricing with transparent quotes</li>
            <li>• Post-launch support and maintenance</li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Send Me a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="What's this about?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Tell me about your project, timeline, and requirements..."
                className="min-h-[120px]"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
