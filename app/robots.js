export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        // allow: '/',
        // disallow: ['/admin', '/privacy'],
        disallow: '/',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
