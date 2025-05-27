
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Full-Stack Web App",
      description: "Modern e-commerce platform with React, Node.js, and Stripe integration. Features include product management, user authentication, shopping cart, and payment processing.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "#"
    },
    {
      title: "Task Management App",
      category: "Mobile Application",
      description: "Cross-platform mobile app built with React Native. Includes real-time collaboration, push notifications, and offline functionality.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      technologies: ["React Native", "Firebase", "Redux", "Push Notifications"],
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      category: "Data Visualization",
      description: "Real-time analytics dashboard with interactive charts and reports. Built with React and integrated with multiple data sources.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=300&fit=crop",
      technologies: ["React", "D3.js", "Python", "PostgreSQL", "Docker"],
      link: "#"
    },
    {
      title: "Restaurant Booking System",
      category: "Web Application",
      description: "Complete reservation system for restaurants with online booking, table management, and customer notifications.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=300&fit=crop",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Twilio"],
      link: "#"
    },
    {
      title: "Real Estate Platform",
      category: "Full-Stack Application",
      description: "Property listing platform with advanced search, virtual tours, and agent management system.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      technologies: ["React", "Express", "MongoDB", "Cloudinary", "Maps API"],
      link: "#"
    },
    {
      title: "Learning Management System",
      category: "Educational Platform",
      description: "Comprehensive LMS with course creation, student progress tracking, and interactive assignments.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "AWS S3"],
      link: "#"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Moeed delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and clean code quality was outstanding.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Digital Solutions",
      text: "Working with Moeed was a pleasure. He understood our requirements perfectly and delivered a robust mobile app on time and within budget.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "CreativeAgency",
      text: "The analytics dashboard Moeed built for us has transformed how we handle data. The interface is intuitive and the performance is excellent.",
      rating: 5
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
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              A showcase of successful projects and satisfied clients
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover-lift animate-slide-up group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-scale-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-black rounded-full mr-1"></div>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Like What You See?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              <Link to="/estimate">Get Your Estimate</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
