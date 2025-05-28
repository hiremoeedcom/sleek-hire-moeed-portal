
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { CheckCircle, ArrowRight, Code, Smartphone, Globe, Database, Shield, Zap } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies like React, Next.js, and TypeScript",
      features: ["React/Next.js", "Node.js", "Database Design", "API Integration"],
      icon: Globe,
      price: "From $1,500"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences",
      features: ["React Native", "iOS/Android", "UI/UX Design", "App Store Deployment"],
      icon: Smartphone,
      price: "From $3,000"
    },
    {
      title: "Full-Stack Solutions",
      description: "Complete end-to-end development services from frontend to backend with cloud deployment",
      features: ["Frontend & Backend", "Cloud Deployment", "DevOps", "Maintenance"],
      icon: Code,
      price: "From $4,000"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Moeed delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise was outstanding.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Digital Solutions LLC",
      text: "Working with Moeed was a game-changer for our business. The mobile app he developed increased our user engagement by 200%.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Creative Agency",
      text: "Professional, reliable, and incredibly skilled. Moeed transformed our ideas into a beautiful, functional website that drives results.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with security best practices and robust architecture"
    },
    {
      icon: Database,
      title: "Scalable Solutions",
      description: "Future-proof applications that grow with your business"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32 pb-20 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative container-custom">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              ⚡ Available for new projects
            </Badge>
            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
                isLoaded ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <span className="gradient-text">Premium</span>
              <br />
              <span className="text-black">Development Services</span>
            </h1>
            <p 
              className={`text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
                isLoaded ? "animate-fade-in" : "opacity-0"
              }`}
            >
              I'm Moeed, a passionate full-stack developer who transforms innovative ideas into exceptional digital experiences using modern technology and elegant design principles.
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-600 ${
                isLoaded ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
              >
                <Link to="/estimate">Get Free Estimate</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
              >
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free revisions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-black rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Why Choose Me?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I combine technical expertise with business understanding to deliver solutions that drive real results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <benefit.icon className="h-12 w-12 mx-auto mb-4 text-black" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              What I Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive development services tailored to bring your vision to life with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover-lift border-0 shadow-lg animate-slide-up group relative overflow-hidden"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <service.icon className="h-12 w-12 mb-4 text-black group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-lg font-bold text-black">{service.price}</p>
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
            <h2 className="text-4xl font-bold mb-6">Technologies I Use</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I stay up-to-date with the latest technologies to ensure your project uses the best tools available
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Client Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take my word for it - hear what my clients have to say about working with me
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover-lift animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's discuss your requirements and create something amazing together. I offer free consultations to understand your needs and provide the best solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
            >
              <Link to="/contact">
                Start Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">Free Consultation</h4>
              <p className="text-sm text-gray-600">30-minute call to discuss your project needs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">Detailed Proposal</h4>
              <p className="text-sm text-gray-600">Comprehensive project plan with timeline and pricing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">Ongoing Support</h4>
              <p className="text-sm text-gray-600">Post-launch maintenance and feature updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Hire Moeed</h3>
              <p className="text-gray-300 mb-4">
                Premium development services for modern businesses looking to make a digital impact.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">Web Development</Link>
                <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">Mobile Apps</Link>
                <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">Full-Stack Solutions</Link>
                <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">UI/UX Design</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About</Link>
                <Link to="/portfolio" className="block text-gray-300 hover:text-white transition-colors">Portfolio</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
                <Link to="/estimate" className="block text-gray-300 hover:text-white transition-colors">Get Estimate</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>hello@hiremoeed.com</p>
                <p>Available 24/7</p>
                <p>Response within 2 hours</p>
                <p>Free initial consultation</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hire Moeed. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
