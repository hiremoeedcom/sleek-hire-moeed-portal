
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Loader2, Calculator } from 'lucide-react';

const EstimateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const projectTypes = [
    { value: 'website', label: 'Website' },
    { value: 'webapp', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'fullstack', label: 'Full Stack Application' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'api', label: 'API Development' }
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months'
  ];

  const featureOptions = [
    'User Authentication',
    'Payment Processing',
    'Database Integration',
    'API Development',
    'Admin Dashboard',
    'Real-time Features',
    'Mobile Responsive',
    'SEO Optimization',
    'Analytics Integration',
    'Third-party Integrations',
    'Content Management',
    'Multi-language Support'
  ];

  const calculateEstimate = (type: string, features: string[], budget: string) => {
    let baseMin = 2000;
    let baseMax = 5000;

    // Adjust based on project type
    switch (type) {
      case 'website':
        baseMin = 2000;
        baseMax = 8000;
        break;
      case 'webapp':
        baseMin = 5000;
        baseMax = 15000;
        break;
      case 'mobile':
        baseMin = 8000;
        baseMax = 25000;
        break;
      case 'fullstack':
        baseMin = 10000;
        baseMax = 35000;
        break;
      case 'ecommerce':
        baseMin = 8000;
        baseMax = 30000;
        break;
      case 'api':
        baseMin = 3000;
        baseMax = 12000;
        break;
    }

    // Adjust based on features
    const featureMultiplier = 1 + (features.length * 0.15);
    baseMin = Math.round(baseMin * featureMultiplier);
    baseMax = Math.round(baseMax * featureMultiplier);

    return { min: baseMin, max: baseMax };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const estimate = calculateEstimate(formData.projectType, formData.features, formData.budget);

      const { error } = await supabase
        .from('estimates')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          project_type: formData.projectType,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          features: formData.features,
          description: formData.description || null,
          estimated_cost_min: estimate.min,
          estimated_cost_max: estimate.max,
          status: 'pending'
        });

      if (error) {
        console.error('Estimate submission error:', error);
        throw error;
      }

      toast({
        title: "Estimate Submitted!",
        description: "Thank you! I'll review your requirements and get back to you soon.",
      });

      // Store estimate data for contact page
      localStorage.setItem('estimateData', JSON.stringify({
        ...formData,
        estimate
      }));

      // Navigate to contact page
      navigate('/contact');

    } catch (error) {
      console.error('Estimate form error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your estimate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          Project Estimate Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                disabled={loading}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                disabled={loading}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              disabled={loading}
              placeholder="Your company name"
            />
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Project Type *</Label>
              <Select 
                value={formData.projectType} 
                onValueChange={(value) => handleChange('projectType', value)}
                disabled={loading}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select 
                value={formData.budget} 
                onValueChange={(value) => handleChange('budget', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timeline</Label>
              <Select 
                value={formData.timeline} 
                onValueChange={(value) => handleChange('timeline', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map(timeline => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Label>Features & Requirements</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {featureOptions.map(feature => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    disabled={loading}
                  />
                  <Label htmlFor={feature} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={loading}
              placeholder="Describe your project in detail..."
              className="min-h-[100px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !formData.name || !formData.email || !formData.projectType}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Get My Estimate'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EstimateForm;
