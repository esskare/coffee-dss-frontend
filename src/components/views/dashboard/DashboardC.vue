<!-- Dashboard.vue -->
<template>
    <BaseLayout>
      <div class="w-full bg-white p-2">
  <!--      <Stepper/>-->
       
       <CoffeeDelivery/>
      
  
  <!--      <DataTable/>-->
      </div>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  
  import BaseLayout from '@/components/views/base/BaseLayout.vue'
  import CoffeeDelivery from '@/components/views/pages/CoffeeDelivery.vue'
 
  
  </script>
  