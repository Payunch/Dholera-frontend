import React from 'react';
import { Helmet } from 'react-helmet-async';
import { fullLogo } from '../config/branding';
import { siteContact } from '../data/siteContact';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

const Seo = ({ title, description, path = '/', image = fullLogo, type = 'website', articleData = null }) => {
  const resolvedTitle = title ? `${title} | Dholera Platform` : 'Dholera Platform | Growth Evidence & Planning Maps';
  const url = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  const defaultDesc = 'Official Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dholera Platform",
    "url": SITE_URL,
    "logo": `${SITE_URL.replace(/\/$/, '')}${fullLogo.startsWith('/') ? fullLogo : `/${fullLogo}`}`,
    "sameAs": [
      "https://www.facebook.com/dholeraplatform",
      "https://twitter.com/dholeraplatform",
      "https://www.instagram.com/dholeraplatform",
      "https://www.youtube.com/@dholeraplatform"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteContact.phoneDisplay,
      "contactType": "customer service",
      "email": siteContact.email,
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "gu"]
    }
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dholera Platform",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/updates?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  let articleLd = null;
  if (type === 'article' && articleData) {
    articleLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title,
      "image": [
        `${SITE_URL.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`
      ],
      "datePublished": articleData.createdAt || new Date().toISOString(),
      "dateModified": articleData.updatedAt || articleData.createdAt || new Date().toISOString(),
      "author": [{
          "@type": "Organization",
          "name": "Dholera Growth Team",
          "url": SITE_URL
        }]
    };
  }

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${SITE_URL.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="keywords" content="Dholera Platform, Dholera Smart City, Dholera Maps, Dholera Planning, TP Map Dholera, Dholera Investment, Dholera Growth Evidence" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteLd)}
      </script>
      {articleLd && (
        <script type="application/ld+json">
          {JSON.stringify(articleLd)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
