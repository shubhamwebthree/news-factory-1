import type { PageServerLoad } from './$types';

// Server-side load function for the feeds page
export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Use event.fetch instead of global fetch
    const response = await fetch('/api/news');

    if (response.ok) {
      const news = await response.json();
      return { news }; // Return the fetched news articles
    } else {
      console.error('Failed to fetch news');
      return { news: [] }; // Return empty array if fetch fails
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return { news: [] }; // Return empty array if error occurs
  }
};
