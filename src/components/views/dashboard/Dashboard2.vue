<!-- Dashboard.vue -->
<template>
  <BaseLayout>
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
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from '@/components/views/base/BaseLayout.vue'
import Sidebar from '@/components/views/dashboard/Sidebar.vue'
import Greetings from '@/components/views/dashboard/Greetings.vue'
import DataTableDashboard from '@/components/views/dashboard/DataTableDashboard.vue'
import DashboardMetrics from '@/components/views/dashboard/DashboardMetrics.vue'
</script>
