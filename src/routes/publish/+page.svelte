<script>
  import { onMount } from 'svelte';

    /** @type {import('./$types').ActionData} */;
    export let form;

  let title = '';
  let content = '';
  let category = '';
  let image = '';
  let successMessage = '';
  let walletAddress = '';
  let email = '';
  let password = '';

  // List of categories for the news article
  let categories = [
    { name: 'World' },
    { name: 'Business' },
    { name: 'India' },
    { name: 'Sports' },
    { name: 'Entertainment' },
    { name: 'Politics' }
  ];

  // Fetch user data on component mount
  onMount(async () => {
    try {
      const response = await fetch('/api/user-wallet');
      if (response.ok) {
        const data = await response.json();
        walletAddress = data.walletAddress;
        email = data.email;
        password = data.password;
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });

  // Function to submit news article data
  async function submitNews() {
    const data = {
      title,
      content,
      category,
      image: image || null,
      userWallet: walletAddress,
      userEmail: email,
      userPassword: password
    };

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        successMessage = 'News article successfully created!';
        console.log('News created:', result);
      } else {
        const errorData = await response.json();
        console.error('Error creating news:', errorData.error);
        successMessage = `Failed to create news article: ${errorData.error}`;
      }
    } catch (error) {
      console.error('Error creating news article:', error);
      successMessage = 'An unexpected error occurred';
    }
  }
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
    <header class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Publish News
      </h1>
    </header>

    <div class="flex flex-col lg:flex-row">
      <main class="flex-1 lg:mr-8">
        <form on:submit|preventDefault={submitNews} class="space-y-8">
          
          <form method="POST" action="?/pay" class="space-y-6">
          
            <div>
            <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input id="email" type="text" bind:value={email} readonly class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          </div>
          
            <div>
              <label for="wallet-address" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Wallet Address</label>
              <input id="wallet-address" type="text" bind:value={walletAddress} readonly class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
            </div>
            
            
            <div>
              <label for="password" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Password</label>
              <input id="password" type="password" bind:value={password} readonly class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
            </div> 
          </form>
          


          <div>
            <label for="title" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input id="title" type="text" bind:value={title} required class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          </div>
          <div>
            <label for="content" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Content</label>
            <textarea id="content" bind:value={content} required class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div>
            <label for="category" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Category</label>
            <select id="category" bind:value={category} required class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="" disabled>Select a category</option>
              {#each categories as cat}
                <option value={cat.name}>{cat.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="image" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Image URL</label>
            <input id="image" type="text" bind:value={image} class="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          </div>
          <button type="submit" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
            Submit
          </button>

          {#if successMessage}
            <p class="mt-4 text-lg font-medium {successMessage.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">{successMessage}</p>
          {/if}
        
          {#if form?.success}
          <p class="mt-4 text-lg font-medium">The Payment was successful. Here is your <a href="https://whatsonchain.com/tx/{form?.payment}"><p class="mt-4 text-lg font-medium text-green-600 dark:text-green-400"
          >Transaction</p></a></p>
          {/if}


        </form>
      </main>

      <aside class="mt-8 lg:mt-0 lg:w-1/4 lg:ml-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 text-left mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Publishing Guidelines</h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Ensure your article is factual, well-researched, and relevant.</p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Use proper grammar and punctuation.</p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Avoid plagiarism and cite your sources properly.</p>
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 text-left">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tips for Writing</h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Start with a strong headline that captures attention.</p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Keep your paragraphs short and to the point.</p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">Use images and videos to complement your story.</p>
        </div>
      </aside>
    </div>
  </div>
</section>
