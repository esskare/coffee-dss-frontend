<template>
  <div class="w-full bg-white dark:bg-gray-800 shadow-sm mb-4 p-4 rounded-lg border-2 border-amber-700">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span class="absolute right-3 top-2.5">🔍</span>
        </div>
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span>🔔</span>
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span>👤</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  }
});
</script>
