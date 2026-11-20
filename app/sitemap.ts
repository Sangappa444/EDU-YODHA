import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://eduyodha.com';
  const now = new Date();

  const staticRoutes = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/internships`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${base}/career-guide`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/learning`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/careers`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: 'yearly' as const },
    { url: `${base}/partnerships`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/privacy-policy`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${base}/terms-and-conditions`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${base}/refund-policy`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${base}/disclaimer`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const internshipSlugs = [
    'web-development','full-stack-development','python-programming','java-development',
    'artificial-intelligence','machine-learning','data-science','data-analytics',
    'cyber-security','cloud-computing','ui-ux-design','digital-marketing',
  ];

  const internshipRoutes = internshipSlugs.map(slug => ({
    url: `${base}/internships/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }));

  return [
    ...staticRoutes.map(r => ({ ...r, lastModified: now })),
    ...internshipRoutes,
  ];
}
