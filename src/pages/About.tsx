import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Award, Users, Clock, Star, Coffee, Code2, Lightbulb, Target } from "lucide-react";

const About = () => {
  const skills = [
    { name: "React & Next.js", level: 95 },
    { name: "Node.js & Express", level: 90 },
    { name: "TypeScript", level: 92 },
    { name: "Python & Django", level: 88 },
    { name: "React Native", level: 85 },
    { name: "AWS & Docker", level: 87 },
    { name: "PostgreSQL & MongoDB", level: 90 },
    { name: "UI/UX Design", level: 82 }
  ];

  const experience = [
    {
      role: "Senior Full-Stack Developer",
      company: "TechVision Solutions",
      period: "2022 - Present",
      description: "Lead developer for enterprise applications serving 50k+ users. Architected scalable microservices, implemented CI/CD pipelines, and mentored junior developers.",
      achievements: [
        "Reduced application load time by 60%",
        "Led team of 5 developers",
        "Implemented automated testing reducing bugs by 75%"
      ]
    },
    {
      role: "Frontend Developer",
      company: "Digital Innovation Agency",
      period: "2021 - 2022",
      description: "Specialized in creating responsive web applications and mobile apps for diverse clients ranging from startups to Fortune 500 companies.",
      achievements: [
        "Delivered 15+ client projects on time",
        "Improved client satisfaction score to 98%",
        "Reduced development time by 40% through reusable components"
      ]
    },
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      period: "2020 - 2021",
      description: "Built custom solutions for small and medium businesses, focusing on e-commerce platforms and business automation tools.",
      achievements: [
        "Successfully delivered 25+ projects",
        "Generated $2M+ in client revenue",
        "Maintained 100% client retention rate"
      ]
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "I believe in delivering exceptional quality over quantity. Every line of code is written with purpose and precision."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is my success. I work closely with clients to understand their unique needs and deliver tailored solutions."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "I stay ahead of technology trends and continuously learn new tools to provide cutting-edge solutions."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Consistent communication, on-time delivery, and transparent processes are the foundation of my work ethic."
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "React Advanced Certification",
    "Node.js Professional Certification"
  ];

  const hobbies = [
    { icon: Code2, text: "Contributing to open-source projects" },
    { icon: Users, text: "Mentoring aspiring developers" },
    { icon: Coffee, text: "Exploring new coffee shops while coding" },
    { icon: Star, text: "Writing technical blogs and tutorials" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              👨‍💻 Full-Stack Developer
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              About <span className="gradient-text">Moeed</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Passionate developer with 3+ years of experience creating exceptional digital experiences that drive business growth and user satisfaction
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline">🏆 Top 1% Developer</Badge>
              <Badge variant="outline">⚡ 48hr Turnaround</Badge>
              <Badge variant="outline">🌟 98% Client Satisfaction</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">My Journey</h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  My journey into software development began during my computer science studies when I was fascinated by the power of code to solve real-world problems. What started as curiosity quickly evolved into a deep passion for creating digital solutions that make a meaningful impact.
                </p>
                <p className="text-lg leading-relaxed">
                  Over the past three years, I've had the privilege of working with startups disrupting their industries, established companies modernizing their tech stack, and individual entrepreneurs bringing their visions to life. Each project has taught me something new and reinforced my belief in the transformative power of well-crafted software.
                </p>
                <p className="text-lg leading-relaxed">
                  I specialize in modern web technologies and mobile app development, always staying current with industry trends and best practices. My approach combines technical excellence with strong business acumen, ensuring that every solution I build drives real value for my clients.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me contributing to open-source projects, mentoring aspiring developers in the community, or exploring new technologies that could benefit my clients' future projects.
                </p>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <Card className="p-8 shadow-2xl hover-lift">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Award className="mr-3 h-6 w-6 text-yellow-500" />
                    Technical Expertise
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="animate-fade-in"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{width: `${skill.level}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">My Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every project and client relationship
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center hover-lift animate-scale-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-black" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Professional Experience</h2>
          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <Card 
                key={index} 
                className="mb-8 hover-lift animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-black">{exp.role}</h3>
                      <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="outline" className="text-sm self-start">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-black">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {achievement}
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

      {/* Certifications & Personal Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Certifications */}
            <div className="animate-slide-up">
              <h3 className="text-3xl font-bold mb-8">Certifications & Education</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Award className="h-6 w-6 text-yellow-500 mr-3" />
                        <span className="font-medium">{cert}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mt-6 hover-lift">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-2">Bachelor of Computer Science</h4>
                  <p className="text-gray-600">University of Technology • 2017-2021</p>
                  <p className="text-sm text-gray-500 mt-2">Graduated Magna Cum Laude</p>
                </CardContent>
              </Card>
            </div>

            {/* Personal Interests */}
            <div className="animate-slide-up">
              <h3 className="text-3xl font-bold mb-8">Beyond Code</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I believe that the best developers are well-rounded individuals who bring diverse perspectives to their work. Here's what I'm passionate about outside of client projects:
              </p>
              <div className="space-y-4">
                {hobbies.map((hobby, index) => (
                  <div key={index} className="flex items-center">
                    <hobby.icon className="h-6 w-6 text-black mr-4" />
                    <span className="text-gray-700">{hobby.text}</span>
                  </div>
                ))}
              </div>
              
              <Card className="mt-8 hover-lift">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-2 text-black">Community Involvement</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    I'm an active member of several developer communities and regularly speak at local tech meetups.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Tech Meetup Speaker</Badge>
                    <Badge variant="secondary">Open Source Contributor</Badge>
                    <Badge variant="secondary">Coding Bootcamp Mentor</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Build Something Amazing Together</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? I'd love to hear about your project and discuss how my expertise can help you achieve your goals. Let's start with a free consultation to explore the possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Free 30-min consultation</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              <span>No project too small or large</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Direct communication</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
