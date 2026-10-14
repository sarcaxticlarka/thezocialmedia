import { SITE } from '@/lib/data';
export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/customers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
