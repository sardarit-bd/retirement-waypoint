export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.BETTER_AUTH_PUBLIC_URL ||
    'https://retirementwaypoint.com';
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  const staticRoutes = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/assessment', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/book', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/coaching', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/resources', changeFrequency: 'weekly', priority: 0.8 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Fetch assessment slugs
  let assessmentRoutes = [];
  try {
    const res = await fetch(`${backendUrl}/api/assessments/public`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const assessments = Array.isArray(json?.data) ? json.data : [];
      assessmentRoutes = assessments.map((item) => ({
        url: `${baseUrl}/assessment/${item.slug}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch assessment slugs for sitemap:', error);
  }

  // Fallback assessment slugs if API didn't return any
  if (assessmentRoutes.length === 0) {
    const defaultSlugs = ['pre-retiree', 'recent-retiree', 'established-retiree'];
    assessmentRoutes = defaultSlugs.map((slug) => ({
      url: `${baseUrl}/assessment/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  }

  // Fetch book slugs
  let bookRoutes = [];
  try {
    const res = await fetch(`${backendUrl}/api/public/books?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const books = Array.isArray(json?.data) ? json.data : [];
      bookRoutes = books
        .filter((b) => b.slug)
        .map((book) => ({
          url: `${baseUrl}/book/${book.slug}`,
          lastModified: book.updatedAt ? new Date(book.updatedAt).toISOString() : new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error('Failed to fetch book slugs for sitemap:', error);
  }

  return [...staticRoutes, ...assessmentRoutes, ...bookRoutes];
}
