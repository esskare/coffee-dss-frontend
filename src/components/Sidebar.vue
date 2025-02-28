<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div>
      <slot>
        <!-- Default content if no slot content provided -->
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <span class="text-blue-500 dark:text-blue-300">{{ ['📌', '📊', '📝'][i-1] }}</span>
              </div>
              <div>
                <h4 class="font-medium">Widget {{ i }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Sidebar item description</p>
              </div>
            </div>
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
    default: 'Sidebar'
  }
});
</script>
