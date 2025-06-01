
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Headphones, 
  CheckCircle, 
  ArrowRight, 
  Users,
  Code,
  Shield,
  Zap,
  BookOpen,
  Settings
} from "lucide-react";

const Consulting = () => {
  const services = [
    "Technical consulting & strategy",
    "Code reviews & audits",
    "Performance optimization",
    "Security assessments",
    "Team training & mentorship",
    "Documentation & best practices",
    "Ongoing maintenance packages",
    "Emergency support & bug fixes"
  ];

  const consultingTypes = [
    {
      title: "Technical Strategy",
      description: "High-level technical guidance and architecture planning",
      icon: Settings,
      features: ["Technology selection", "Architecture design", "Scalability planning", "Best practices"]
    },
    {
      title: "Code Review & Audit",
      description: "Comprehensive analysis of existing codebases",
      icon: Code,
      features: ["Code quality assessment", "Security vulnerabilities", "Performance bottlenecks", "Recommendations"]
    },
    {
      title: "Team Training",
      description: "Skill development and knowledge transfer",
      icon: Users,
      features: ["Technology workshops", "Best practices training", "Mentorship programs", "Documentation"]
    }
  ];

  const packages = [
    {
      name: "One-time Consultation",
      price: "$150/hour",
      description: "Perfect for specific questions or project guidance",
      features: [
        "1-hour video consultation",
        "Technical assessment",
        "Recommendations document",
        "Follow-up email support"
      ]
    },
    {
      name: "Monthly Retainer",
      price: "$1,200/month",
      description: "Ongoing support and guidance for your team",
      features: [
        "8 hours monthly consultation",
        "Priority email/chat support",
        "Monthly code reviews",
        "Strategic planning sessions",
        "Team training sessions"
      ]
    },
    {
      name: "Project Consultation",
      price: "Custom pricing",
      description: "Complete project oversight and guidance",
      features: [
        "Full project assessment",
        "Architecture planning",
        "Development guidance",
        "Quality assurance",
        "Post-launch support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Technical Consulting Services - Abdul Moeed"
        description="Expert technical consulting and support services. Get guidance on architecture, code reviews, team training, and technical strategy."
        keywords="technical consulting, code review, team training, technical strategy, software architecture"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Headphones className="w-4 h-4 mr-2" />
              Technical Consulting & Support
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Expert <span className="gradient-text">Technical Guidance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Get professional technical advice, code reviews, and ongoing support to ensure your projects succeed and your team grows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/estimate">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Consulting Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technical support and guidance for your development needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <p className="font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Types Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Types of Consulting</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored consulting services to meet your specific technical needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {consultingTypes.map((type, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8 text-center">
                  <type.icon className="h-16 w-16 mx-auto mb-6 text-black" />
                  <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="mr-2 mb-2">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Consulting Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the consulting package that best fits your needs and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold mb-4 gradient-text">{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Why Choose My Consulting</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Experience</h3>
                <p className="text-gray-600 text-sm">Years of hands-on development experience across various technologies</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Quick Solutions</h3>
                <p className="text-gray-600 text-sm">Fast identification of issues and practical solutions</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Best Practices</h3>
                <p className="text-gray-600 text-sm">Industry-standard practices and security guidelines</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Team Growth</h3>
                <p className="text-gray-600 text-sm">Focus on knowledge transfer and team skill development</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Need Technical Guidance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get expert advice and support to overcome technical challenges and accelerate your development process.
          </p>
          <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/contact">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Consulting;
