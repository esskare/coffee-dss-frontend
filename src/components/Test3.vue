<!-- Dashboard.vue -->
<template>
  <BaseLayout>
    <div class="w-full bg-white p-2">
      <Stepper/>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from '@/components/BaseLayout.vue'
import Sidebar from '@/components/Sidebar.vue'
import Greetings from '@/components/Greetings.vue'
import DataTableDashboard from '@/components/DataTableDashboard.vue'
import DashboardMetrics from '@/components/DashboardMetrics.vue'
import Stepper from '@/components/Stepper.vue'
</script>
