import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'JavaLab';
const SITE_URL = 'https://javalab.app';
const OG_IMAGE = `${SITE_URL}/Javalab-whatsapp-og.png`;

export const SEO = ({
  title,
  description = 'Master Object-Oriented Programming in Java with a structured collection of theory, coding, viva, and exam-focused questions. Search by topic, track your progress, bookmark important concepts, and study smarter—all in one place.',
  ogImage = OG_IMAGE,
  ogType = 'website',
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Master OOPs W/ Java`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="application-name" content={SITE_NAME} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={SITE_URL} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Theme */}
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    </Helmet>
  );
};

export default SEO;
