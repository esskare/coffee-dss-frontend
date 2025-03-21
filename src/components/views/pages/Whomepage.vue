<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-y-auto">
    <Navigation class="w-16 md:w-1/6 flex-shrink-0" />
    <div class="flex-grow overflow-y-auto flex flex-col">
    <Header class="z-40"/>
      <!--           <Greetings/>
           <DataTableDashboard/>-->
      <div class="flex flex-col md:flex-row">
        <!-- Main Content Area - 70% width on desktop -->
        <div class="md:w-7/10">
          <Greetings/>
          <DashboardMetrics/>
          <DataTableDashboard/>
<!--                  <DashboardChart/>-->
        </div>

        <!-- Vertical Divider -->
        <div class="hidden md:block w-[1px] bg-custom-grey2 my-5"></div>

        <!-- Sidebar - 30% width on desktop -->
        <div class="w-full md:w-3/10">
          <Sidebar/>
        </div>
      </div>
      <!-- You can add main content area here later -->
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/views/base/Navbar.vue'
import Header from '@/components/views/base/Header.vue'
import Greetings from '@/components/views/dashboard/Greetings.vue'
import DataTableDashboard from '@/components/views/dashboard/DataTableDashboard.vue'
import Sidebar from '@/components/views/dashboard/Sidebar.vue'
import DashboardMetrics from '@/components/views/dashboard/DashboardMetrics.vue'
</script>
