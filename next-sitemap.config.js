/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://apparellglow.com', // Replace with your actual domain
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/server-sitemap.xml'], // Exclude server-side sitemap from indexing
  generateIndexSitemap: false,
  outDir: 'public',
  // Add any additional configuration options here
  changefreq: 'daily',
  priority: 0.7,
};
