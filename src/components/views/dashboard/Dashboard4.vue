<!-- Dashboard.vue -->
<template>
  <BaseLayout>
    <div class="w-full bg-white p-2">
<!--      <Stepper/>-->
<!--      <RegisterFarmer/>-->
      <DataTable/>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from '@/components/views/base/BaseLayout.vue'
import Stepper from '@/components/views/ui/Stepper.vue'
import RegisterFarmer from '@/components/views/pages/RegisterFarmer.vue'
import RegisterSociety from '../pages/RegisterSociety.vue'
import DataTable from '@/components/views/ui/DataTable.vue'
</script>
