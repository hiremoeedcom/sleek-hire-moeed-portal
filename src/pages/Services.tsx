import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Smartphone, 
  Server, 
  Palette, 
  Headphones, 
  Database,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  Code,
  Shield,
  Zap
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites that drive results and engage users",
      features: [
        "Custom React/Next.js applications",
        "Progressive Web Apps (PWA)",
        "Responsive design for all devices",
        "Performance optimization & SEO",
        "Content management systems",
        "E-commerce solutions with Stripe/PayPal",
        "Third-party API integrations",
        "Analytics and tracking setup"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      startingPrice: "$1,500",
      timeline: "2-4 weeks",
      examples: ["Corporate websites", "Landing pages", "E-commerce stores", "SaaS platforms"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "React Native development",
        "iOS and Android compatibility",
        "Native performance optimization",
        "App Store and Play Store deployment",
        "Push notifications & analytics",
        "Offline functionality",
        "Biometric authentication",
        "In-app purchases integration"
      ],
      technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
      startingPrice: "$3,000",
      timeline: "4-8 weeks",
      examples: ["Business apps", "Social platforms", "E-commerce apps", "Productivity tools"]
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Robust server-side solutions and APIs that scale with your business",
      features: [
        "RESTful API development",
        "GraphQL implementation",
        "Database design & optimization",
        "Authentication & authorization",
        "Payment gateway integration",
        "Cloud deployment (AWS/Vercel)",
        "Microservices architecture",
        "Real-time features with WebSockets"
      ],
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "AWS"],
      startingPrice: "$2,000",
      timeline: "3-6 weeks",
      examples: ["API services", "Microservices", "Data processing", "Real-time systems"]
    },
    {
      icon: Code,
      title: "Full-Stack Solutions",
      description: "Complete end-to-end development from concept to deployment",
      features: [
        "Frontend + Backend integration",
        "Database architecture & management",
        "DevOps and CI/CD pipelines",
        "Performance monitoring",
        "Security implementation",
        "Maintenance & support packages",
        "Feature updates & enhancements",
        "Technical documentation"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      startingPrice: "$4,000",
      timeline: "6-12 weeks",
      examples: ["SaaS platforms", "Enterprise apps", "Complex web systems", "B2B solutions"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that convert visitors to customers",
      features: [
        "User research & analysis",
        "Wireframing & prototyping",
        "Visual design & branding",
        "Design systems & style guides",
        "Usability testing & optimization",
        "Mobile-first responsive design",
        "Accessibility compliance",
        "Design handoff to developers"
      ],
      technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision"],
      startingPrice: "$1,000",
      timeline: "2-4 weeks",
      examples: ["Website redesigns", "App interfaces", "Design systems", "Brand identity"]
    },
    {
      icon: Headphones,
      title: "Consulting & Support",
      description: "Expert guidance and ongoing maintenance to keep your systems running smoothly",
      features: [
        "Technical consulting & strategy",
        "Code reviews & audits",
        "Performance optimization",
        "Security assessments",
        "Team training & mentorship",
        "Documentation & best practices",
        "Ongoing maintenance packages",
        "Emergency support & bug fixes"
      ],
      technologies: ["Various based on project needs"],
      startingPrice: "$150/hr",
      timeline: "Ongoing",
      examples: ["Code audits", "Performance optimization", "Team training", "Technical strategy"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We discuss your project requirements, goals, and timeline to create a detailed roadmap and technical specification.",
      icon: Users,
      deliverables: ["Project scope document", "Technical requirements", "Timeline & milestones"]
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "I create wireframes, mockups, and system architecture that align with your brand and technical needs.",
      icon: Palette,
      deliverables: ["Wireframes & mockups", "System architecture", "Database design"]
    },
    {
      step: "03",
      title: "Development & Implementation",
      description: "Clean, efficient code is written with regular updates, progress reports, and collaborative feedback.",
      icon: Code,
      deliverables: ["Working prototypes", "Regular progress updates", "Code repositories"]
    },
    {
      step: "04",
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing ensures everything works perfectly across all devices and use cases.",
      icon: Shield,
      deliverables: ["Test reports", "Bug fixes", "Performance optimization"]
    },
    {
      step: "05",
      title: "Deployment & Launch",
      description: "Your project goes live with full deployment, monitoring setup, and launch support.",
      icon: Zap,
      deliverables: ["Live deployment", "Monitoring setup", "Launch documentation"]
    },
    {
      step: "06",
      title: "Support & Maintenance",
      description: "Ongoing maintenance, updates, and support to ensure long-term success and growth.",
      icon: Headphones,
      deliverables: ["Maintenance plan", "Regular updates", "Technical support"]
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "$1,500",
      description: "Perfect for small businesses and personal projects",
      features: [
        "Responsive website (up to 5 pages)",
        "Basic SEO optimization",
        "Contact form integration",
        "Mobile-friendly design",
        "2 rounds of revisions",
        "30 days of support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$3,500",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Custom web application",
        "Database integration",
        "User authentication",
        "Admin dashboard",
        "API development",
        "Payment integration",
        "90 days of support",
        "Performance optimization"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$7,500+",
      description: "Comprehensive solutions for large-scale projects",
      features: [
        "Full-stack application",
        "Microservices architecture",
        "Cloud deployment & scaling",
        "Advanced security features",
        "Third-party integrations",
        "Comprehensive testing",
        "6 months of support",
        "Team training & documentation"
      ],
      popular: false
    }
  ];

  const guarantees = [
    {
      icon: CheckCircle,
      title: "100% Satisfaction Guarantee",
      description: "If you're not completely satisfied, I'll work until you are or provide a full refund."
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "I respect your timeline and deliver projects on schedule with regular progress updates."
    },
    {
      icon: Shield,
      title: "Secure & Reliable Code",
      description: "All code follows industry best practices with comprehensive testing and security measures."
    },
    {
      icon: Headphones,
      title: "Ongoing Support",
      description: "Post-launch support and maintenance to ensure your project continues to perform optimally."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              🚀 Comprehensive Development Services
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              My <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              End-to-end development services designed to transform your ideas into powerful digital solutions that drive business growth and user engagement
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline">💡 Free Consultation</Badge>
              <Badge variant="outline">⚡ Fast Turnaround</Badge>
              <Badge variant="outline">🛡️ Quality Guarantee</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover-lift animate-slide-up group relative overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <service.icon className="h-12 w-12 mb-4 text-black group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-black">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-black">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Starting from</span>
                      <span className="text-2xl font-bold text-black">{service.startingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Timeline</span>
                      <span className="text-sm font-medium">{service.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">My Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures quality results, transparent communication, and successful project delivery every time
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <Card 
                key={index} 
                className="hover-lift animate-scale-in relative"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl font-bold gradient-text mr-4">{item.step}</div>
                    <item.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-black">Deliverables:</h4>
                    <ul className="space-y-1">
                      {item.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2 text-black" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Service Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the package that best fits your project needs and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`hover-lift animate-slide-up relative ${
                  pkg.popular ? 'ring-2 ring-black scale-105' : ''
                }`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold mb-4">{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'variant-outline border-black text-black hover:bg-black hover:text-white'
                    }`}
                    asChild
                  >
                    <Link to="/estimate">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">My Guarantees</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your success and satisfaction are my top priorities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-6">
                  <guarantee.icon className="h-12 w-12 mx-auto mb-4 text-black" />
                  <h3 className="text-lg font-bold mb-2">{guarantee.title}</h3>
                  <p className="text-gray-600 text-sm">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's discuss your project requirements and create a custom solution that perfectly fits your needs, timeline, and budget. Start with a free consultation to explore the possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              <Link to="/estimate">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
            >
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <Clock className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm text-gray-600">Free 30-min consultation</span>
            </div>
            <div className="flex items-center justify-center">
              <DollarSign className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm text-gray-600">Transparent, fixed pricing</span>
            </div>
            <div className="flex items-center justify-center">
              <Shield className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm text-gray-600">100% satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
