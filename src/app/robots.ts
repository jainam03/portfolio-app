import { MetadataRoute } from 'next';
import { personalInfo } from '@/data/content';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = personalInfo.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
