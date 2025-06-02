
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import SEOHead from '@/components/SEOHead';
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div>
      <SEOHead
        title="Contact Abdul Moeed - Let's Connect"
        description="Contact Abdul Moeed for web development, mobile apps, and software engineering inquiries. Reach out to discuss your project!"
      />

      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 gradient-text">
                Let's Build Something Amazing Together
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to turn your ideas into reality? I'm here to help you create 
                exceptional digital experiences that drive results.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <ContactForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't let your great ideas wait. Let's discuss your project and 
              see how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@hiremoeed.com"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Email Me Directly
              </a>
              <a 
                href="/estimate"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Get Project Estimate
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
