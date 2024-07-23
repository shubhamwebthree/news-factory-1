<!-- src/routes/feeds/+page.svelte -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let news: string | any[] = [];
  
    onMount(async () => {
      try {
        const response = await fetch('/api/news');
        if (response.ok) {
          news = await response.json();
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    });
  </script>
  
  <main class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4">News Feeds</h1>
      {#if news.length === 0}
        <p>No news articles available</p>
      {:else}
        {#each news as article}
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">{article.title}</h2>
            <p class="mb-2">{article.content}</p>
            {#if article.image}
              <img src={article.image} alt={article.title} class="w-full h-auto mb-2 rounded-lg" />
            {/if}
            <p class="text-sm text-gray-600">Published by: {article.userEmail}</p>
          </div>
        {/each}
      {/if}
    </div>
  </main>
  