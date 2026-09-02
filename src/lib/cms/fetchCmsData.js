/**
 * Utility to fetch CMS data on the server with Next.js ISR (revalidate & tags)
 */
export async function getCmsData(endpoint, fallbackData = null) {
  try {
    const backendUrl =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      'http://localhost:5000';

    const res = await fetch(`${backendUrl}${endpoint}`, {
      next: {
        revalidate: 60,
        tags: ['cms-data'],
      },
    });

    if (!res.ok) {
      return fallbackData;
    }

    const json = await res.json();
    return json?.data || fallbackData;
  } catch (error) {
    console.warn(`[CMS Server Fetch Warning] Failed to fetch from ${endpoint}:`, error.message);
    return fallbackData;
  }
}
