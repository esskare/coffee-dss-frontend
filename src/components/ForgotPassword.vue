<template>
  <div class="flex flex-col md:flex-row h-screen w-full relative">
    <!-- Left side - Image -->
    <div class="hidden md:block md:w-1/2 bg-cover bg-center">
      <img src="@/assets/images/forgotpassword.svg" class="w-full h-full object-cover" />
    </div>

    <!-- Right side - Login Form -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center relative">
      <!-- Centered Top Navigation -->
<!--      <nav class="absolute top-5 left-1/2 -translate-x-1/2">-->
      <nav class="absolute top-4">
        <ul class="flex space-x-6 text-sm font-medium text-primary-800-main">
          <li><a target="_blank" href="https://onlinebanking.co-opbank.co.ke/" class="hover:text-green-600 font-bold">Coop-Online</a></li>
          <li><a target="_blank" href="https://www.nairobicoffeeexchange.co.ke/" class="hover:text-green-600 font-bold">NCE</a></li>
          <li><a target="_blank" href="https://www.agricultureauthority.go.ke//" class="hover:text-green-600 font-bold">AFA</a></li>
          <li><a target="_blank" href="https://www.cma.or.ke/" class="hover:text-green-600 font-bold">CMA</a></li>
          <li><a href="#" class="hover:text-green-600 font-bold">Contact</a></li>
        </ul>
      </nav>

      <div class="w-full max-w-md mt-12">
        <h1 class="text-3xl font-bold text-center mb-2">Forgot Password</h1>
        <p class="text-center text-gray-600 mb-8">Enter your email to receive a rest code</p>

        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          Need help signing in?
          <a href="#" class="font-medium text-green-600 hover:text-green-500">Contact support</a>
        </p>
      </div>
    </div>
  </div>
</template>
