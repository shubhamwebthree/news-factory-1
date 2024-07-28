<script>
    export let article;
  
    /**
     * @param {any} articleId
     */
    async function likeArticle(articleId) {
      try {
        const response = await fetch(`/api/articles/${articleId}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
  
        if (response.ok) {
          // Refresh the news feed after a successful like
          dispatch('like');
        } else {
          console.error('Failed to like article');
        }
      } catch (error) {
        console.error('Error liking article:', error);
      }
    }
  </script>
  
  <div class="news-article p-4 border-b">
    <h2 class="text-xl font-semibold">{article.title}</h2>
    <p class="mt-2">{article.content}</p>
    <button
      class="like-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
      on:click={() => likeArticle(article.id)}
    >
      👍 {article.likes}
    </button>
  </div>
  