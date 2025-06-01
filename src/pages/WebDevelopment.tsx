
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Code, 
  Smartphone, 
  Search,
  ShoppingCart,
  Database,
  Zap
} from "lucide-react";

const WebDevelopment = () => {
  const features = [
    "Custom React/Next.js applications",
    "Progressive Web Apps (PWA)",
    "Responsive design for all devices",
    "Performance optimization & SEO",
    "Content management systems",
    "E-commerce solutions with Stripe/PayPal",
    "Third-party API integrations",
    "Analytics and tracking setup"
  ];

  const technologies = [
    { name: "React", description: "Modern UI framework" },
    { name: "Next.js", description: "Full-stack framework" },
    { name: "TypeScript", description: "Type-safe development" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "Node.js", description: "Server-side runtime" },
    { name: "PostgreSQL", description: "Robust database" }
  ];

  const projects = [
    {
      type: "E-commerce Platform",
      description: "Full-featured online store with payment processing",
      tech: ["React", "Node.js", "Stripe"],
      price: "Starting at $3,500"
    },
    {
      type: "Business Website",
      description: "Professional corporate website with CMS",
      tech: ["Next.js", "Headless CMS"],
      price: "Starting at $1,500"
    },
    {
      type: "SaaS Application",
      description: "Complete web application with user management",
      tech: ["React", "Node.js", "PostgreSQL"],
      price: "Starting at $5,000"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Web Development Services - Abdul Moeed"
        description="Professional web development services including React, Next.js, and custom web applications. Modern, responsive websites that drive results."
        keywords="web development, react development, next.js, custom websites, responsive design"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Web Development Services
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Modern <span className="gradient-text">Web Development</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Create powerful, responsive web applications that engage users and drive business growth with cutting-edge technologies and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/estimate">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Discuss Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive web development services that cover every aspect of your online presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <p className="font-medium">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Technologies I Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern, proven technologies that ensure your website is fast, secure, and scalable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8 text-center">
                  <Code className="h-12 w-12 mx-auto mb-4 text-black" />
                  <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                  <p className="text-gray-600">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Project Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple websites to complex web applications, I build solutions that fit your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{project.type}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-4">{project.price}</div>
                  <Button className="w-full" asChild>
                    <Link to="/estimate">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Website?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's discuss your web development project and create a solution that perfectly fits your business needs and goals.
          </p>
          <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/estimate">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WebDevelopment;
