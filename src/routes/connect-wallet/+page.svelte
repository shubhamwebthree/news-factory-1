<script>
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div
class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg   bg-white/30 ring-2 ring-gray-900/50 "
> 
<form method="POST" action="?/login">
  <div class="">
    <div class="mb-4 block text-xl font-medium text-gray-700">
      <label
      class=""
      for="paymail"
 
      >
        Paymail
      </label>
      <input
        class="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        id="paymail"
        type="text"
        placeholder="Enter Paymail"
        name="email"
      />

    </div>
    <div class="mb-4 block text-xl font-medium text-gray-700">
      <label
        class=""
        for="paymail"
      >
        Password
      </label>
      <input
        class="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
    </div>
    <button
    type="submit"
    class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <!-- <a href="/dashboard"> --> 
    LogIn</button>
  </div>
</form>
{#if form?.success}
  <!-- this message is ephemeral; it exists because the page was rendered in
     response to a form submission. it will vanish if the user reloads -->
  <p class="pt-2">Logged In. Your Balance is {form?.balance}</p>
  <p class= "pt-2">Your Address is {form?.address}</p>
{/if}
</div>

<h1 class="text-3xl  text-gray-700 text-center mt-8">OR</h1>

<div
class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg   bg-white/30 ring-2 ring-gray-900/50 "
>
<form method="POST" action="?/signup">
  <div class="">
    
    <div class="mb-4 block text-xl font-medium text-gray-700">
      <label
        class=""
        for="paymail"
      >
        Paymail
      </label>
      <input
        class="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        id="paymail"
        type="text"
        placeholder="Enter Paymail"
        name="email"
      />

    </div>
    <div class="mb-4 block text-xl font-medium text-gray-700">
      <label
        class=""
        for="paymail"
      >
        Password
      </label>
      <input
        class="block w-full px-3 py-2 border mt-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign Up
    </button>
  </div>
</form>
{#if form?.success}
  <!-- this message is ephemeral; it exists because the page was rendered in
     response to a form submission. it will vanish if the user reloads -->
  <p class="pt-2">Sign Up Done </p>
{/if}
</div>







<!-- <h1 method = "GET" action = "?/pubkey" ></h1> -->