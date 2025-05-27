
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites that drive results",
      features: [
        "Custom React/Next.js applications",
        "Responsive design for all devices",
        "Performance optimization",
        "SEO-friendly architecture",
        "Content management systems",
        "E-commerce solutions"
      ],
      startingPrice: "$1,500"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      features: [
        "React Native development",
        "iOS and Android compatibility",
        "Native performance",
        "App Store deployment",
        "Push notifications",
        "Offline functionality"
      ],
      startingPrice: "$3,000"
    },
    {
      title: "Backend Development",
      description: "Robust server-side solutions and APIs",
      features: [
        "RESTful API development",
        "Database design & optimization",
        "Authentication systems",
        "Payment integration",
        "Cloud deployment",
        "Scalable architecture"
      ],
      startingPrice: "$2,000"
    },
    {
      title: "Full-Stack Solutions",
      description: "Complete end-to-end development",
      features: [
        "Frontend + Backend integration",
        "Database management",
        "DevOps and deployment",
        "Maintenance & support",
        "Performance monitoring",
        "Security implementation"
      ],
      startingPrice: "$4,000"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
      features: [
        "User research & analysis",
        "Wireframing & prototyping",
        "Visual design",
        "Design systems",
        "Usability testing",
        "Responsive layouts"
      ],
      startingPrice: "$1,000"
    },
    {
      title: "Consulting & Support",
      description: "Expert guidance and ongoing maintenance",
      features: [
        "Technical consulting",
        "Code reviews",
        "Performance audits",
        "Security assessments",
        "Training & documentation",
        "Ongoing support"
      ],
      startingPrice: "$150/hr"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We discuss your project requirements, goals, and timeline to create a detailed plan."
    },
    {
      step: "02",
      title: "Design",
      description: "I create wireframes and designs that align with your brand and user needs."
    },
    {
      step: "03",
      title: "Development",
      description: "Clean, efficient code is written with regular updates and communication."
    },
    {
      step: "04",
      title: "Testing",
      description: "Thorough testing ensures everything works perfectly across all devices."
    },
    {
      step: "05",
      title: "Launch",
      description: "Your project goes live with full deployment and optimization."
    },
    {
      step: "06",
      title: "Support",
      description: "Ongoing maintenance and support to keep everything running smoothly."
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
              My <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Comprehensive development services to bring your digital vision to life
            </p>
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
                className="hover-lift animate-slide-up group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Starting from</p>
                    <p className="text-2xl font-bold text-black">{service.startingPrice}</p>
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
            <h2 className="text-4xl font-bold mb-6 gradient-text">My Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach that ensures quality results and smooth collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-scale-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
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
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that meets your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              <Link to="/estimate">Get Free Estimate</Link>
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
        </div>
      </section>
    </div>
  );
};

export default Services;
