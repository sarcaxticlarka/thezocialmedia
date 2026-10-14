import Nav from '@/components/Nav';
import CustomersHero from '@/components/CustomersHero';
import Segments from '@/components/Segments';
import Journey from '@/components/Journey';
import Stories from '@/components/Stories';
import Form from '@/components/Form';
import Footer, { Faq } from '@/components/Footer';
import Cursor from '@/components/Cursor';
import TransitionLayer from '@/components/TransitionLayer';
import Motion from '@/components/Motion';
import PageIntro from '@/components/PageIntro';
import { CUSTOMER_FAQ, SEGMENTS, SITE } from '@/lib/data';

const description = 'Who The Zocial Media makes content for: events and festivals, hospitality and lifestyle brands, businesses on the festive calendar and new businesses finding their voice online. See what each needs and how a project runs.';

export const metadata = {
  title: 'Customers: who we make content for',
  description,
  alternates: { canonical: '/customers' },
  openGraph: { type: 'website', url: '/customers', title: 'Customers | The Zocial Media', description, images: [{ url: '/og-image.jpg', width: 512, height: 640, alt: 'The Zocial Media: we’re not an agency, we’re a team of artists' }] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': `${SITE.url}/customers#page`, url: `${SITE.url}/customers`, name: 'Customers | The Zocial Media', description, isPartOf: { '@id': `${SITE.url}/#website` }, about: { '@id': `${SITE.url}/#org` } },
    { '@type': 'ItemList', name: 'Customers we make content for', itemListElement: SEGMENTS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, description: s.needs })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url }, { '@type': 'ListItem', position: 2, name: 'Customers', item: `${SITE.url}/customers` }] },
    { '@type': 'FAQPage', mainEntity: CUSTOMER_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
};

export default function Customers() {
  return (
    <div className="page-wrapper">
      <Nav />
      <main id="main">
        <CustomersHero />
        <Segments />
        <Journey />
        <Stories />
        <Faq items={CUSTOMER_FAQ} label="[customer questions]" />
        <Form />
      </main>
      <Footer />
      <TransitionLayer />
      <Cursor />
      <Motion />
      <PageIntro />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
