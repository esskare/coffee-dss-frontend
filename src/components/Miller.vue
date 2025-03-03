<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Tabs Navigation -->
    <div class="flex space-x-2 border-b pb-2">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-4 py-2 text-sm font-medium rounded-full transition duration-300"
        :class="activeTab === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-4 p-4 border rounded-lg bg-white shadow">
<!--      <p>{{ tabs[activeTab].content }}</p>-->
      <DataTable/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '@/components/DataTable.vue'
import DataTableDashboard from '@/components/DataTableDashboard.vue'

const tabs = ref([
  { label: "Home", content: "This is the Home tab content." },
  { label: "Profile", content: "This is the Profile tab content." },
  { label: "Settings", content: "This is the Settings tab content." },
]);

const activeTab = ref(0);
</script>

