import type { MetadataRoute } from 'next';
const siteUrl = ['https:', '', 'healthflowclinic.demo'].join('/');
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` }; }
