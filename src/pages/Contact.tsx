
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const [estimateData, setEstimateData] = useState<any>(null);

  useEffect(() => {
    // Check if user came from estimate page
    const savedEstimate = localStorage.getItem('estimateData');
    if (savedEstimate) {
      const data = JSON.parse(savedEstimate);
      setEstimateData(data);
      // Clear the stored data after using it
      localStorage.removeItem('estimateData');
    }
  }, []);

  const contactInfo = [
    {
      title: "Email",
      value: "hello@hiremoeed.com",
      description: "Best way to reach me"
    },
    {
      title: "Response Time",
      value: "Within 24 hours",
      description: "Usually much faster"
    },
    {
      title: "Availability",
      value: "Monday - Friday",
      description: "9 AM - 6 PM (Your timezone)"
    },
    {
      title: "Consultation",
      value: "Free 30-min call",
      description: "Let's discuss your project"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Contact Moeed Shaikh - Get Your Project Quote"
        description="Contact professional full stack developer Moeed Shaikh for your web development project. Get a free consultation and custom quote for your requirements."
        keywords="contact developer, hire developer, web development quote, project consultation, full stack developer contact"
        url="https://hiremoeed.com/contact"
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Ready to bring your project to life? I'd love to hear from you.
              </p>
              
              {estimateData && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8 animate-slide-up">
                  <p className="text-green-800">
                    <strong>Great!</strong> I've received your estimate details. 
                    Please fill out the contact form below and I'll get back to you with a detailed quote.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    I'm always excited to discuss new projects and opportunities. 
                    Whether you have a detailed brief or just an idea, let's talk!
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      className="hover-lift animate-slide-up"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{info.title}</h3>
                        <p className="text-black font-medium">{info.value}</p>
                        <p className="text-gray-500 text-sm">{info.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
