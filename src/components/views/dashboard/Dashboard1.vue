<!-- Dashboard.vue -->
<template>
  <BaseLayout>
    <div class="flex h-full">
      <!-- Center Component (70% of Main) -->
      <div class="w-7/10 bg-gray-100 p-4">
        <Greetings />
      </div>

      <!-- Side Component (30% of Main) -->
      <div class="w-3/10 bg-gray-200 p-4">
        <Sidebar />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from '@/components/views/base/BaseLayout.vue'
import Sidebar from '@/components/views/dashboard/Sidebar.vue'
import Greetings from '@/components/views/dashboard/Greetings.vue'
</script>
