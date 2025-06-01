import React from 'react';
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

      <main className="container-custom py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Let's Connect
          </h1>
          <p className="text-gray-600">
            I'm always open to discussing new projects, ideas, or opportunities.
            Feel free to reach out!
          </p>
        </div>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
