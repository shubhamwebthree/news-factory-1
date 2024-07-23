<script lang="ts">
    let title = '';
    let content = '';
    let image = '';
    let userEmail = ''; // Set this to the logged-in user's email
  
    async function publishNews() {
      try {
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, image, userEmail }),
        });
  
        if (response.ok) {
          alert('News published successfully!');
          title = '';
          content = '';
          image = '';
        } else {
          alert('Error publishing news');
        }
      } catch (error) {
        console.error('Error publishing news:', error);
        alert('Error publishing news');
      }
    }
  </script>
  
  <main class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4">Publish News</h1>
      <form on:submit|preventDefault={publishNews} class="space-y-4">
        <div class="flex flex-col">
          <label for="title" class="font-medium mb-1">Title:</label>
          <input
            id="title"
            bind:value={title}
            required
            class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the title"
          />
        </div>
  
        <div class="flex flex-col">
          <label for="content" class="font-medium mb-1">Content:</label>
          <textarea
            id="content"
            bind:value={content}
            required
            class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the content"
            rows="6"
          />
        </div>
  
        <div class="flex flex-col">
          <label for="image" class="font-medium mb-1">Image URL (optional):</label>
          <input
            id="image"
            bind:value={image}
            class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the image URL"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Publish
        </button>
      </form>
    </div>
  </main>
  