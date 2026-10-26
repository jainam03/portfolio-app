import { MetadataRoute } from 'next';
import { personalInfo } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = personalInfo.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
