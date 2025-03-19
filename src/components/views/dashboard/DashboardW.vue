<!-- Dashboard.vue -->
<template>
    <BaseLayout>
      <div class="w-full bg-white p-2">
  <!--      <Stepper/>-->
       
        <RegisterSociety/>
      
  
  <!--      <DataTable/>-->
      </div>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  
  import BaseLayout from '@/components/views/base/BaseLayout.vue'
  import Stepper from '@/components/views/ui/Stepper.vue'
  import RegisterSociety from '@/components/views/pages/RegisterSociety.vue'
  import DataTable from '@/components/views/ui/DataTable.vue'
  
  </script>
  