<template>
  <!-- Greeting Section -->
  <div class="bg-green-50 p-6 md:p-9 rounded-lg flex flex-col md:flex-row items-center justify-between mt-5 m-2">
    <!-- Left Side - Text Content -->
    <div class="max-w-lg">
      <h1 class="text-2xl md:text-3xl font-semibold">
        Good afternoon <span class="inline-block">👋</span>
      </h1>
      <h2 class="text-3xl md:text-4xl font-bold mt-1">Reuben Kihiu</h2>
      <h2 class="text-base text-gray-600 mt-1"> Here are a few things to get your day started Here are a few things to get your day started</h2>
<!--      <h1 class="text-gray-600 mt-1">
        Here are a few things you can do to get your day started
      </h1>-->

      <div class="mt-6 flex gap-4">
        <button @click="$router.push('/coffeedelivery')"
  class="bg-primary-800-main text-white px-4 py-2 rounded-lg text-sm"
>
  Record Coffee Delivery
</button>

<button @click="$router.push('/farmerdetails')"
  class="bg-secondary-400-main text-white px-4 py-2 rounded-lg text-sm"
>
  Add New Farmer
</button>

      </div>
    </div>

    <!-- Right Side - Illustration -->
    <div class="hidden md:block w-48">
      <img src="@/assets/images/header.svg" alt="Illustration" class="w-full h-auto" />
    </div>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: 'Content'
  }
});
</script>
