
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Estimate = () => {
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    features: [] as string[],
    description: "",
    name: "",
    email: "",
    company: ""
  });
  
  const [showEstimate, setShowEstimate] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  const projectTypes = [
    { value: "website", label: "Website Development", basePrice: 1500 },
    { value: "webapp", label: "Web Application", basePrice: 3000 },
    { value: "mobile", label: "Mobile App", basePrice: 4000 },
    { value: "fullstack", label: "Full-Stack Solution", basePrice: 5000 },
    { value: "ecommerce", label: "E-commerce Platform", basePrice: 4500 },
    { value: "api", label: "API Development", basePrice: 2000 }
  ];

  const featureOptions = [
    { id: "auth", label: "User Authentication", cost: 500 },
    { id: "payment", label: "Payment Integration", cost: 800 },
    { id: "admin", label: "Admin Dashboard", cost: 1200 },
    { id: "api", label: "API Integration", cost: 600 },
    { id: "realtime", label: "Real-time Features", cost: 1000 },
    { id: "mobile", label: "Mobile Responsive", cost: 400 },
    { id: "seo", label: "SEO Optimization", cost: 300 },
    { id: "analytics", label: "Analytics Integration", cost: 250 }
  ];

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter(f => f !== featureId)
      }));
    }
  };

  const calculateEstimate = () => {
    const selectedProject = projectTypes.find(p => p.value === formData.projectType);
    if (!selectedProject) return;

    let basePrice = selectedProject.basePrice;
    
    // Add feature costs
    const featureCost = formData.features.reduce((total, featureId) => {
      const feature = featureOptions.find(f => f.id === featureId);
      return total + (feature?.cost || 0);
    }, 0);

    const totalEstimate = basePrice + featureCost;
    
    // Strategic pricing: show estimate slightly lower than budget but not below $400
    const userBudget = parseInt(formData.budget) || 0;
    let finalMin = Math.max(400, totalEstimate * 0.8);
    let finalMax = totalEstimate * 1.2;

    if (userBudget > 0) {
      // If user has a budget, show estimate 10-20% lower but respect minimum
      finalMax = Math.min(userBudget * 0.9, finalMax);
      finalMin = Math.max(400, Math.min(finalMin, userBudget * 0.7));
    }

    setEstimatedCost({ 
      min: Math.round(finalMin), 
      max: Math.round(finalMax) 
    });
    setShowEstimate(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectType || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    calculateEstimate();
  };

  const proceedToContact = () => {
    // Store estimate data for contact form
    localStorage.setItem('estimateData', JSON.stringify({
      ...formData,
      estimatedCost
    }));
    
    toast({
      title: "Estimate Generated!",
      description: "Redirecting you to complete your inquiry...",
    });
    
    setTimeout(() => {
      navigate("/contact");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Get Your <span className="gradient-text">Estimate</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Tell me about your project and get an instant estimate
            </p>
          </div>
        </div>
      </section>

      {/* Estimate Form */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {!showEstimate ? (
              <Card className="animate-slide-up">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, projectType: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Budget */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range (USD)</Label>
                        <Select value={formData.budget} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, budget: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000">$500 - $1,000</SelectItem>
                            <SelectItem value="2500">$1,000 - $2,500</SelectItem>
                            <SelectItem value="5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="20000">$10,000 - $20,000</SelectItem>
                            <SelectItem value="50000">$20,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, timeline: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Project timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1week">1-2 weeks</SelectItem>
                            <SelectItem value="1month">1 month</SelectItem>
                            <SelectItem value="2months">2-3 months</SelectItem>
                            <SelectItem value="6months">3-6 months</SelectItem>
                            <SelectItem value="longer">6+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <Label>Additional Features</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {featureOptions.map((feature) => (
                          <div key={feature.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature.id}
                              checked={formData.features.includes(feature.id)}
                              onCheckedChange={(checked) => 
                                handleFeatureChange(feature.id, checked as boolean)
                              }
                            />
                            <Label htmlFor={feature.id} className="text-sm">
                              {feature.label} (+${feature.cost})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description</Label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell me more about your project..."
                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your company name"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      Get My Estimate
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="animate-scale-in text-center">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">Your Project Estimate</h2>
                  <div className="text-6xl font-bold text-black mb-4">
                    ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                  </div>
                  <p className="text-gray-600 mb-8">
                    Based on your requirements, this is an estimated price range for your project. 
                    Final pricing will depend on detailed specifications and may include additional features.
                  </p>
                  
                  <div className="space-y-4 text-left bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="font-bold text-lg">Project Summary:</h3>
                    <p><strong>Type:</strong> {projectTypes.find(p => p.value === formData.projectType)?.label}</p>
                    <p><strong>Features:</strong> {formData.features.length} additional features selected</p>
                    <p><strong>Timeline:</strong> {formData.timeline}</p>
                    {formData.budget && <p><strong>Budget:</strong> ${formData.budget}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={proceedToContact}
                      size="lg" 
                      className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      Proceed with This Estimate
                    </Button>
                    <Button 
                      onClick={() => setShowEstimate(false)}
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-black text-black hover:bg-black hover:text-white"
                    >
                      Modify Requirements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Estimate;
