
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    priority: "",
    message: "",
    budget: "",
    timeline: ""
  });

  const [estimateData, setEstimateData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user came from estimate page
    const savedEstimate = localStorage.getItem('estimateData');
    if (savedEstimate) {
      const data = JSON.parse(savedEstimate);
      setEstimateData(data);
      setFormData(prev => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        subject: "Project Inquiry - Estimate Follow-up",
        message: `Hi Moeed,

I just completed your estimate form for a ${data.projectType} project. Here are the details:

Project Type: ${data.projectType}
Estimated Cost: $${data.estimatedCost?.min} - $${data.estimatedCost?.max}
Selected Features: ${data.features?.join(', ') || 'None'}
Budget Range: $${data.budget || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

Project Description:
${data.description || 'No additional description provided'}

I'd like to discuss this project further and move forward with the next steps.

Best regards,
${data.name}`,
        budget: data.budget || "",
        timeline: data.timeline || ""
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log("Contact form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
    });

    // Clear form and stored estimate data
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      priority: "",
      message: "",
      budget: "",
      timeline: ""
    });
    
    localStorage.removeItem('estimateData');
    setEstimateData(null);
  };

  const contactInfo = [
    {
      title: "Email",
      value: "hello@hiremoeed.com",
      description: "Best way to reach me"
    },
    {
      title: "Response Time",
      value: "Within 24 hours",
      description: "Usually much faster"
    },
    {
      title: "Availability",
      value: "Monday - Friday",
      description: "9 AM - 6 PM (Your timezone)"
    },
    {
      title: "Consultation",
      value: "Free 30-min call",
      description: "Let's discuss your project"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Ready to bring your project to life? I'd love to hear from you.
            </p>
            
            {estimateData && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8 animate-slide-up">
                <p className="text-green-800">
                  <strong>Great!</strong> I've pre-filled the form with your estimate details. 
                  Feel free to modify anything before sending.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  I'm always excited to discuss new projects and opportunities. 
                  Whether you have a detailed brief or just an idea, let's talk!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={index} 
                    className="hover-lift animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg">{info.title}</h3>
                      <p className="text-black font-medium">{info.value}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="animate-scale-in">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief subject line"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={formData.priority} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, priority: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Just exploring</SelectItem>
                            <SelectItem value="medium">Medium - Planning ahead</SelectItem>
                            <SelectItem value="high">High - Ready to start</SelectItem>
                            <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, budget: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Budget range" />
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
                            <SelectValue placeholder="When needed" />
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

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                        className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
