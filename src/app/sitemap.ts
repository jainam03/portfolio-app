import { MetadataRoute } from 'next';
import { personalInfo } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain once deployed
  const baseUrl = 'https://jainamchheda.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
