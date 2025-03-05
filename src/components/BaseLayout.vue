<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-y-auto">
    <Navigation class="w-16 md:w-1/6 flex-shrink-0" />
    <div class="flex-grow overflow-y-auto flex flex-col">
      <Header class="z-40"/>
      <div class="flex flex-col md:flex-row">
        <slot />
      </div>
      <!-- You can add main content area here later -->
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import MainContent from '@/components/MainContent.vue'
import Warehouse from '@/components/Warehouse.vue'
import Greetings from '@/components/Greetings.vue'
import DataTableDashboard from '@/components/DataTableDashboard.vue'
import Sidebar from '@/components/Sidebar.vue'
import DashboardMetrics from '@/components/DashboardMetrics.vue'
import DashboardChart from '@/components/DashboardChart.vue'
</script>
