
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
  title = "Abdul Moeed - Full Stack Developer & Software Engineer",
  description = "Professional full stack developer specializing in modern web applications, mobile apps, and custom software solutions. Available for hire worldwide.",
  keywords = "full stack developer, web development, mobile apps, software engineer, react, node.js, hire developer",
  image = "/og-image.jpg",
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

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Abdul Moeed" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@hiremoeed" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <link rel="canonical" href={url} />

      {/* Structured Data for Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Abdul Moeed",
          "jobTitle": "Full Stack Developer",
          "description": "Professional full stack developer and software engineer",
          "url": "https://hiremoeed.com",
          "email": "hello@hiremoeed.com",
          "sameAs": [
            "https://github.com/moeedshaikh",
            "https://linkedin.com/in/moeedshaikh"
          ],
          "knowsAbout": [
            "Web Development",
            "Mobile App Development",
            "Software Engineering",
            "React",
            "Node.js",
            "Full Stack Development"
          ],
          "offers": {
            "@type": "Service",
            "name": "Web Development Services",
            "description": "Custom web and mobile application development"
          }
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
