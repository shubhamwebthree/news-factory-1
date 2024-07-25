<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    /**
     * @type {string}
     */
    let newsId;
    /**
     * @type {any[]}
     */
    let comments = [];
    let commentContent = '';
    let userEmail = '';
  
    // Fetch the newsId from the URL parameters
    $: {
      newsId = $page.params.newsId;
    }
  
    // Fetch comments when the component mounts
    onMount(async () => {
      if (newsId) {
        const response = await fetch(`/api/comments/${newsId}`);
        comments = await response.json();
      }
    });
  
    // Submit a new comment
    async function submitComment() {
      const data = {
        content: commentContent,
        userEmail: userEmail || null,
        newsId: parseInt(newsId, 10),
      };
  
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const newComment = await response.json();
        comments = [newComment, ...comments]; // Add new comment to the top of the list
        commentContent = '';
        userEmail = '';
      } else {
        console.error('Error creating comment');
      }
    }
  </script>
  
  <h2>Comments</h2>
  
  <div>
    {#each comments as comment}
      <div>
        <p><strong>{comment.userEmail || 'Anonymous'}:</strong> {comment.content}</p>
      </div>
    {/each}
  </div>
  
  <form on:submit|preventDefault={submitComment}>
    <label>
      Comment:
      <textarea bind:value={commentContent} required></textarea>
    </label>
  
    <label>
      Email (optional):
      <input type="email" bind:value={userEmail} />
    </label>
  
    <button type="submit">Submit Comment</button>
  </form>
  