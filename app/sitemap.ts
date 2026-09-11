import type { MetadataRoute } from 'next';
const siteUrl = ['https:', '', 'healthflowclinic.demo'].join('/');
export default function sitemap(): MetadataRoute.Sitemap { const routes = ['', 'about', 'services', 'doctors', 'appointment', 'track', 'live-queue', 'portal', 'faq', 'contact', 'blog', 'privacy', 'terms']; return routes.map((path) => ({ url: `${siteUrl}/${path}`, lastModified: new Date() })); }
