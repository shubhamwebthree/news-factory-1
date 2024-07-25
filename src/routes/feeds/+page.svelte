<script lang="ts">
  import { onMount } from 'svelte';

  interface Category {
    name: string;
  }

  interface NewsArticle {
    title: string;
    content: string;
    image?: string;
    userEmail?: string;
    category: Category;
    popularity?: string;
  }

  let news: NewsArticle[] = [];
  let errorMessage = '';
  let isLoading = true;

  const categories = [
    'World',
    'Business',
    'India',
    'Sports',
    'Entertainment',
    'Politics'
  ];

  async function fetchNews() {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        news = await response.json();
      } else {
        const errorData = await response.json();
        errorMessage = `Failed to fetch news: ${errorData.error}`;
      }
    } catch (error) {
      console.error('Network error:', error);
      errorMessage = 'Failed to fetch news due to network error.';
    } finally {
      isLoading = false;
    }
  }

  onMount(fetchNews);
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
    <header class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        News Feed
      </h1>
    </header>

    <div class="flex flex-col lg:flex-row">
      <!-- Main Content -->
      <main class="flex-1 lg:mr-8">
        {#if isLoading}
          <p class="text-lg font-medium text-gray-600 dark:text-gray-400">Loading...</p>
        {:else if errorMessage}
          <p class="text-red-600 dark:text-red-400">{errorMessage}</p>
        {:else if news.length === 0}
          <p class="text-lg font-medium text-gray-600 dark:text-gray-400">No news articles available.</p>
        {:else}
          {#each news as article}
            <div class="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
              <h2 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
              <p class="mb-4 text-gray-700 dark:text-gray-300">{article.content}</p>
              {#if article.image}
                <img src={article.image} alt={article.title} class="w-full h-auto mb-4 rounded-lg"/>
              {/if}
              <div class="flex items-center justify-between mt-4">
                <span class="text-sm text-gray-600 dark:text-gray-400">Published by: {article.userEmail || 'Anonymous'}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">Category: {article.category.name}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">Popularity: {article.popularity || 'N/A'}</span>
              </div>
            </div>
          {/each}
        {/if}
      </main>

      <!-- Sidebar -->
      <aside class="mt-8 lg:mt-0 lg:w-1/4 lg:ml-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 text-left mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
          <form class="space-y-4">
            <div>
              <label for="category" class="block text-lg font-medium text-gray-900 dark:text-gray-300">Category</label>
              <select id="category" class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">All Categories</option>
                {#each categories as cat}
                  <option value={cat}>{cat}</option>
                {/each}
              </select>
            </div>
            <div>
              <label for="date" class="block text-lg font-medium text-gray-900 dark:text-gray-300">Date</label>
              <input id="date" type="date" class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
            </div>
            <div>
              <label for="popularity" class="block text-lg font-medium text-gray-900 dark:text-gray-300">Popularity</label>
              <select id="popularity" class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">All Popularity Levels</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </form>
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 text-left">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Trending News</h2>
          <!-- Add trending news content here -->
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 text-left">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Comments</h2>
          <!-- Add recent comments content here -->
        </div>
      </aside>
    </div>
  </div>
</section>
