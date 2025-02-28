<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div>
      <slot>
        <!-- Default content if no slot content provided -->
        <p>Main content area. This section occupies 70% of the width.</p>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 class="font-medium mb-2">Item {{ i }}</h4>
            <p class="text-gray-600 dark:text-gray-300">
              This is a sample content block. You can replace these with your actual content.
            </p>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Content'
  }
});
</script>
