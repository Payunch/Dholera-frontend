import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

const Seo = ({ title, description, path = '/', image = '/logo.png' }) => {
  const resolvedTitle = title ? `${title} | Dholera Platform` : 'Dholera Platform | Growth Evidence & Planning Maps';
  const url = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  const defaultDesc = 'Official Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.';

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="keywords" content="Dholera Platform, Dholera Smart City, Dholera Maps, Dholera Planning, TP Map Dholera, Dholera Investment, Dholera Growth Evidence" />
    </Helmet>
  );
};

export default Seo;