<template>
  <div class="flex-1 p-1 md:px-5 bg-white overflow-y-auto transition-all duration-300">
    <!-- Your main content goes here -->
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Main Content Area - 70% width on desktop -->
      <div class="w-full md:w-7/10">
        <Greetings/>
        <DashboardMetrics/>
        <DataTableDashboard/>
        <DashboardChart/>
      </div>

      <!-- Vertical Divider -->
      <div class="hidden md:block w-[1px] bg-custom-grey2 my-5"></div>

      <!-- Sidebar - 30% width on desktop -->
      <div class="w-full md:w-3/10">
        <Sidebar/>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props for component
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Dashboard from '@/components/Dashboard.vue'
import DashboardMetrics from '@/components/DashboardMetrics.vue'
import DataTable from '@/components/DataTable.vue'
import Greetings from '@/components/Greetings.vue'
import DashboardChart from '@/components/DashboardChart.vue'
import DataTableDashboard from '@/components/DataTableDashboard.vue'


const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  }
});

// Define emits
const emit = defineEmits(['toggle']);

// Handle toggle
const handleToggle = () => {
  emit('toggle');
};
</script>
