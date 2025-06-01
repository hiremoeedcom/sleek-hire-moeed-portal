
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Database,
  Shield,
  Zap,
  Globe,
  Code
} from "lucide-react";

const APIDevelopment = () => {
  const services = [
    "RESTful API development",
    "GraphQL implementation",
    "Database design & optimization",
    "Authentication & authorization",
    "Payment gateway integration",
    "Cloud deployment (AWS/Vercel)",
    "Microservices architecture",
    "Real-time features with WebSockets"
  ];

  const apiTypes = [
    {
      title: "REST APIs",
      description: "Standard RESTful APIs for web and mobile applications",
      icon: Server,
      features: ["CRUD operations", "JSON responses", "HTTP methods", "Status codes"]
    },
    {
      title: "GraphQL APIs",
      description: "Flexible query language for efficient data fetching",
      icon: Database,
      features: ["Single endpoint", "Type-safe queries", "Real-time subscriptions", "Schema-first"]
    },
    {
      title: "Microservices",
      description: "Scalable service-oriented architecture",
      icon: Globe,
      features: ["Service separation", "Independent deployment", "Load balancing", "Fault tolerance"]
    }
  ];

  const technologies = [
    { name: "Node.js", description: "JavaScript runtime" },
    { name: "Express.js", description: "Web framework" },
    { name: "PostgreSQL", description: "Relational database" },
    { name: "MongoDB", description: "NoSQL database" },
    { name: "Redis", description: "Caching & sessions" },
    { name: "AWS", description: "Cloud services" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="API Development Services - Abdul Moeed"
        description="Professional API development services. Build robust, scalable backend APIs and microservices for your applications."
        keywords="api development, rest api, graphql, backend development, microservices, node.js"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Server className="w-4 h-4 mr-2" />
              API Development Services
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Robust <span className="gradient-text">Backend APIs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Build scalable, secure APIs that power your applications. From simple REST APIs to complex microservices architectures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/estimate">Get API Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Discuss Requirements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">API Development Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive backend development services for modern applications
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

      {/* API Types Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Types of APIs I Build</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple APIs to complex distributed systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {apiTypes.map((type, index) => (
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

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Technologies & Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern backend technologies for reliable, scalable solutions
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Why Choose My APIs</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Shield className="h-16 w-16 mx-auto mb-6 text-black" />
                <h3 className="text-2xl font-bold mb-4">Secure</h3>
                <p className="text-gray-600">Built with security best practices, authentication, and data protection</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 mx-auto mb-6 text-black" />
                <h3 className="text-2xl font-bold mb-4">Fast</h3>
                <p className="text-gray-600">Optimized for performance with caching, indexing, and efficient queries</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Database className="h-16 w-16 mx-auto mb-6 text-black" />
                <h3 className="text-2xl font-bold mb-4">Scalable</h3>
                <p className="text-gray-600">Designed to grow with your business and handle increasing loads</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Robust API?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's build the backend infrastructure your application needs to succeed and scale.
          </p>
          <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/estimate">
              Start API Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default APIDevelopment;
