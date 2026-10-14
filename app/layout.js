import '@fontsource/anton';
import '@fontsource-variable/inter-tight';
import './globals.css';
import { SITE, FAQ } from '@/lib/data';

const title = 'The Zocial Media | Social Media Agency for Shoot, Content, Edit & Strategy';
const description = 'We’re not an agency. We’re a team of artists who help businesses grow online. The Zocial Media shoots, writes, edits and plans social media content that delivers real results.';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: '%s | The Zocial Media' },
  description,
  keywords: ['social media agency', 'content creation', 'video shoot', 'reels editing', 'social media marketing', 'brand strategy', 'meta ads', 'The Zocial Media'],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: { type: 'website', url: '/', siteName: SITE.name, title: 'The Zocial Media | We’re not an agency. We’re a team of artists.', description: 'Shoot. Content. Edit. Strategy. We help businesses grow online with content that makes real impact.', images: [{ url: '/og-image.jpg', width: 512, height: 640, alt: 'We’re not an agency. We’re a team of artists who help businesses grow online.' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: 'The Zocial Media | Social media agency', description: 'Shoot. Content. Edit. Strategy. Real impact for your brand.', images: ['/og-image.jpg'] },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
};
export const viewport = { themeColor: '#e3262e', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.name, alternateName: 'thezocialmedia', url: SITE.url, logo: `${SITE.url}/icon-512.png`, description: 'A team of artists who help businesses grow online through shoot, content, edit and strategy.', founder: { '@type': 'Person', name: SITE.founder }, sameAs: [SITE.instagram] },
    { '@type': 'ProfessionalService', '@id': `${SITE.url}/#service`, name: SITE.name, url: SITE.url, image: `${SITE.url}/og-image.jpg`, serviceType: ['Social media marketing', 'Video production', 'Reels editing', 'Content strategy', 'Branding and creatives', 'Meta advertising'], parentOrganization: { '@id': `${SITE.url}/#org` } },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': `${SITE.url}/#org` } },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
