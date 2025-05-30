
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calculator, CheckCircle } from 'lucide-react';

type ProjectType = 'website' | 'webapp' | 'mobile' | 'fullstack' | 'ecommerce' | 'api';

const EstimateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project_type: '' as ProjectType,
    budget: '',
    timeline: '',
    features: [] as string[],
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const projectFeatures = [
    'User Authentication',
    'Database Integration',
    'Payment Processing',
    'Real-time Features',
    'API Development',
    'Admin Dashboard',
    'Mobile Responsive',
    'SEO Optimization',
    'Email Integration',
    'File Upload',
    'Social Media Integration',
    'Analytics Integration',
  ];

  const calculateEstimate = () => {
    let basePrice = 0;
    let multiplier = 1;

    // Base price by project type
    switch (formData.project_type) {
      case 'website':
        basePrice = 2000;
        break;
      case 'webapp':
        basePrice = 5000;
        break;
      case 'mobile':
        basePrice = 8000;
        break;
      case 'fullstack':
        basePrice = 10000;
        break;
      case 'ecommerce':
        basePrice = 7000;
        break;
      case 'api':
        basePrice = 3000;
        break;
      default:
        basePrice = 3000;
    }

    // Feature complexity multiplier
    const featureCount = formData.features.length;
    if (featureCount > 8) multiplier = 1.8;
    else if (featureCount > 5) multiplier = 1.5;
    else if (featureCount > 3) multiplier = 1.3;
    else if (featureCount > 0) multiplier = 1.1;

    const minCost = Math.round(basePrice * multiplier);
    const maxCost = Math.round(minCost * 1.5);

    return { minCost, maxCost };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { minCost, maxCost } = calculateEstimate();

      // Use type assertion to bypass TypeScript errors temporarily
      const { error } = await (supabase as any)
        .from('estimates')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          project_type: formData.project_type,
          budget: formData.budget,
          timeline: formData.timeline,
          features: formData.features,
          description: formData.description,
          estimated_cost_min: minCost,
          estimated_cost_max: maxCost,
        });

      if (error) throw error;

      toast({
        title: "Estimate Request Submitted!",
        description: `Estimated cost: $${minCost.toLocaleString()} - $${maxCost.toLocaleString()}. We'll review and send you a detailed quote.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        project_type: '' as ProjectType,
        budget: '',
        timeline: '',
        features: [],
        description: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit estimate request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === 'project_type') {
      setFormData(prev => ({ ...prev, [name]: value as ProjectType }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const { minCost, maxCost } = calculateEstimate();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Project Estimate Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type *</Label>
              <Select value={formData.project_type} onValueChange={(value) => handleChange('project_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="webapp">Web Application</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="fullstack">Full Stack Application</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="api">API Development</SelectItem>
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

          <div className="space-y-4">
            <Label>Required Features</Label>
            <div className="grid md:grid-cols-3 gap-3">
              {projectFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <Label htmlFor={feature} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              placeholder="Describe your project requirements in detail..."
            />
          </div>

          {formData.project_type && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-lg">Estimated Cost Range</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  This is a preliminary estimate. Final pricing will be provided after detailed requirements analysis.
                </p>
              </CardContent>
            </Card>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Get Detailed Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EstimateForm;
