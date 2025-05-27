
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React/Next.js", "Node.js", "Database Design", "API Integration"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      features: ["React Native", "iOS/Android", "UI/UX Design", "App Store Deployment"]
    },
    {
      title: "Full-Stack Solutions",
      description: "Complete end-to-end development services",
      features: ["Frontend & Backend", "Cloud Deployment", "DevOps", "Maintenance"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32 pb-20 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative container-custom">
          <div className="text-center max-w-4xl mx-auto">
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
              className={`text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                isLoaded ? "animate-fade-in" : "opacity-0"
              }`}
            >
              Transforming ideas into exceptional digital experiences with modern technology and elegant design
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
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

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              What I Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive development services tailored to bring your vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover-lift border-0 shadow-lg animate-slide-up group"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
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
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
            >
              <Link to="/contact">Start Conversation</Link>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Hire Moeed</h3>
              <p className="text-gray-300">
                Premium development services for modern businesses
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">Services</Link>
                <Link to="/portfolio" className="block text-gray-300 hover:text-white transition-colors">Portfolio</Link>
                <Link to="/estimate" className="block text-gray-300 hover:text-white transition-colors">Get Estimate</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>hello@hiremoeed.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hire Moeed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
