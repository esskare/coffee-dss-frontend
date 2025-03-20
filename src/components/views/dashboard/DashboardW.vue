<!-- Dashboard.vue -->
<template>
    <BaseW>
      <div class="w-full bg-white p-2">
  <!--      <Stepper/>-->
       
        <RegisterSociety/>
      
  
  <!--      <DataTable/>-->
      </div>
    </BaseW>
  </template>
  
  <script setup lang="ts">
  
  import BaseW from '@/components/views/base/BaseW.vue'
  import Stepper from '@/components/views/ui/Stepper.vue'
  import RegisterSociety from '@/components/views/pages/RegisterSociety.vue'
  import DataTable from '@/components/views/ui/DataTable.vue'
  
  </script>
  