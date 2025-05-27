
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const skills = [
    "React & Next.js",
    "Node.js & Express",
    "TypeScript",
    "Python & Django",
    "React Native",
    "AWS & Docker",
    "PostgreSQL & MongoDB",
    "UI/UX Design"
  ];

  const experience = [
    {
      role: "Senior Full-Stack Developer",
      company: "Tech Startup",
      period: "2022 - Present",
      description: "Led development of multiple web applications serving 10k+ users"
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      description: "Built responsive websites and mobile apps for various clients"
    },
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      period: "2020 - 2021",
      description: "Delivered custom solutions for small and medium businesses"
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
              About <span className="gradient-text">Moeed</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Passionate developer with 3+ years of experience creating exceptional digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm a passionate full-stack developer who believes in the power of clean code and elegant design. 
                  My journey began with a curiosity about how websites work, which evolved into a deep love for 
                  creating digital solutions that make a real impact.
                </p>
                <p>
                  Over the years, I've had the privilege of working with startups, established companies, and 
                  individual entrepreneurs to bring their visions to life. I specialize in modern web technologies 
                  and mobile app development, always staying up-to-date with the latest industry trends.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or mentoring aspiring developers in the community.
                </p>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <Card className="p-8 shadow-2xl hover-lift">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-2 animate-fade-in"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Experience</h2>
          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <Card 
                key={index} 
                className="mb-6 hover-lift animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to bring your project to life? I'd love to hear about your ideas and discuss how we can make them reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
            >
              <Link to="/portfolio">View My Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
