<template>
  <div class="flex-1 p-2 md:px-5 bg-white overflow-y-auto transition-all duration-300"
       :class="{'md:ml-[8px]': !isNavOpen, 'ml-0': true, 'md:ml-1/5': isNavOpen}">
    <div class="flex items-center">
      <button @click="handleToggle" class="mr-4 p-2 rounded bg-gray-200 hover:bg-gray-300 md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <!-- Your main content goes here -->
    <Header/>
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Main Content Area - 70% width on desktop -->
      <div class="w-full md:w-7/10">
        <Greetings/>
        <DashboardMetrics/>
        <DataTable/>
        <DashboardChart/>
      </div>

      <!-- Sidebar - 30% width on desktop -->
      <div class="w-full md:w-3/10">
        <Sidebar/>
<!--        <Sidebar :title="`${pageTitle} Sidebar`">
          <slot name="sidebar">
            &lt;!&ndash; Default sidebar content goes here &ndash;&gt;
            <p>This is the sidebar for {{ pageTitle }}. It occupies 30% of the width.</p>
          </slot>
        </Sidebar>-->
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


const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  },
  isNavOpen: {
    type: Boolean,
    required: true
  }
});

// Define emits
const emit = defineEmits(['toggle']);

// Handle toggle
const handleToggle = () => {
  emit('toggle');
};
</script>
