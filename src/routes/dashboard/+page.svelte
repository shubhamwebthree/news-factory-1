<!-- <script>
    let menuOpen = false;
  
    function toggleMenu() {
      menuOpen = !menuOpen;
    }
  </script> -->
  
  <div class="flex h-screen bg-gray-200">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-60 bg-white text-gray-900 -transform transform lg:transform-none lg:static z-30">
      <nav class="mt-50">
          <a class="flex items-center justify-center h-10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" href="/feeds">News Feed</a>
        <a class="flex items-center justify-center h-10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" href="/publish">Publish News</a>
        <a class="flex items-center justify-center h-10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" href="/profiles">Profile</a>
        <a class="flex items-center justify-center h-10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" href="/settings">Settings</a>
      </nav>
    </div>
  
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
     
        <button class="lg:hidden text-gray-500 focus:outline-none" >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div class="flex items-center">
          <!-- <h1 class="text-xl font-bold text-gray-700">Welcome</h1> -->
        </div>
      
  
      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          </div>
        </div>
      </main>
    </div>
  </div>
  