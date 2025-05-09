import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request) {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://apparellglow.store';
  
  // Define your static routes
  const staticPages = [
    '',
    '/about',
    '/shop',
    '/contact',
    '/consultation',
    '/cart',
    '/checkout',
    '/wishlist',
    '/signin',
    '/signup',
    '/dashboard',
  ];

  // Create sitemap entries for static pages
  const staticFields = staticPages.map(path => ({
    loc: `${baseUrl}${path}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: path === '' ? 1.0 : 0.7, // Homepage gets highest priority
  }));

  // You can add dynamic routes here
  // For example, if you have product pages with dynamic IDs:
  // const products = await fetchProductsFromDatabase();
  // const productFields = products.map(product => ({
  //   loc: `${baseUrl}/product/${product.id}`,
  //   lastmod: new Date(product.updatedAt).toISOString(),
  //   changefreq: 'weekly',
  //   priority: 0.8,
  // }));

  // Combine all fields
  const fields = [
    ...staticFields,
    // ...productFields, // Uncomment when you implement dynamic routes
  ];

  // Return the sitemap
  return getServerSideSitemap(fields);
}

// This ensures Next.js doesn't try to statically optimize this route
export const dynamic = 'force-dynamic';
