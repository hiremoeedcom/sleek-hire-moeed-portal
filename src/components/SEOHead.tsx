
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  customCode?: {
    header?: string;
    body?: string;
    footer?: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Hire Moeed - Professional Full Stack Developer & Software Engineer",
  description = "Hire Abdul Moeed for professional web development, mobile apps, UI/UX design, API development, and custom software solutions. Expert full stack developer available worldwide.",
  keywords = "hire full stack developer, web development services, mobile app development, UI UX design, API development, software engineer, react developer, node.js developer, hire moeed, abdul moeed",
  image = "https://hiremoeed.com/lovable-uploads/f23285d7-3240-46fd-a294-3e5e897c9ae2.png",
  url = "https://hiremoeed.com",
  type = "website",
  customCode
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Abdul Moeed" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hire Moeed" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@hiremoeed" />
      <meta name="twitter:site" content="@hiremoeed" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Hire Moeed" />
      <link rel="canonical" href={url} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Abdul Moeed",
          "alternateName": "Hire Moeed",
          "jobTitle": "Full Stack Developer & Software Engineer",
          "description": "Professional full stack developer specializing in web development, mobile apps, UI/UX design, and custom software solutions",
          "url": "https://hiremoeed.com",
          "email": "hello@hiremoeed.com",
          "image": "https://hiremoeed.com/lovable-uploads/f23285d7-3240-46fd-a294-3e5e897c9ae2.png",
          "sameAs": [
            "https://github.com/moeedshaikh",
            "https://linkedin.com/in/moeedshaikh",
            "https://twitter.com/hiremoeed"
          ],
          "knowsAbout": [
            "Web Development",
            "Mobile App Development",
            "UI/UX Design",
            "API Development",
            "Software Engineering",
            "React",
            "Node.js",
            "TypeScript",
            "Full Stack Development",
            "Database Design",
            "Cloud Computing"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Full Stack Developer",
            "description": "Develops complete web and mobile applications from frontend to backend"
          },
          "offers": {
            "@type": "Service",
            "serviceType": "Software Development",
            "name": "Full Stack Development Services",
            "description": "Custom web and mobile application development, UI/UX design, API development, and consulting services",
            "provider": {
              "@type": "Person",
              "name": "Abdul Moeed"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom web applications using modern technologies"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Cross-platform mobile applications"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design",
                    "description": "User interface and experience design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "API Development",
                    "description": "RESTful API development and integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Technical Consulting",
                    "description": "Software architecture and technical consulting"
                  }
                }
              ]
            }
          }
        })}
      </script>

      {/* Website Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Hire Moeed",
          "alternateName": "Abdul Moeed Portfolio",
          "url": "https://hiremoeed.com",
          "description": "Professional full stack developer available for hire worldwide",
          "inLanguage": "en-US",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://hiremoeed.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Hire Moeed",
          "description": "Professional software development services",
          "url": "https://hiremoeed.com",
          "logo": "https://hiremoeed.com/lovable-uploads/f23285d7-3240-46fd-a294-3e5e897c9ae2.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-XXX-XXX-XXXX",
            "contactType": "customer service",
            "email": "hello@hiremoeed.com",
            "availableLanguage": "English"
          },
          "founder": {
            "@type": "Person",
            "name": "Abdul Moeed"
          },
          "serviceArea": "Worldwide",
          "priceRange": "$$"
        })}
      </script>

      {/* Custom Header Code */}
      {customCode?.header && (
        <div dangerouslySetInnerHTML={{ __html: customCode.header }} />
      )}
    </Helmet>
  );
};

export default SEOHead;
