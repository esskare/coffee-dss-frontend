<!-- Dashboard.vue -->
<template>
  <BaseLayout>
    <div class="w-full bg-white p-2">
<!--      <Stepper/>-->
<!--      <RegisterFarmer/>-->
      <Receivedbatches/>
      <DataTable/>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from '@/components/views/base/BaseLayout.vue'
import Receivedbatches from '@/components/views/pages/Receivedbatches.vue';
import DataTable from '@/components/views/ui/DataTable.vue'
</script>
