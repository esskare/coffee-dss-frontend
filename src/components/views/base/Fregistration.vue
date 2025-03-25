<!-- Farmer Registration Successful Message -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6">
    <div class="bg-green-100 rounded-full p-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
    </div>
    <h2 class="text-xl font-semibold mt-4">Farmer Registration Successful!</h2>
    <p class="text-gray-600 text-center mt-2 max-w-md">
      The new farmer was successfully registered. They will receive details via SMS on how to log in to the farmer app.
    </p>
    <div class="flex gap-4 mt-6">
      <button class="px-6 py-2 rounded-md bg-gray-100 text-gray-600" @click="close">
        Close
      </button>
      <button class="px-6 py-2 rounded-md bg-green-600 text-white flex items-center gap-2" @click="addNewFarmer">
        <span>+</span> Add New Farmer
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const close = () => {
  router.push('/dashboard'); 
};

const addNewFarmer = () => {
  router.push('/farmerdetails'); 
};
</script>