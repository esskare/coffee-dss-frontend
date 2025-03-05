<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden relative">
    <Navigation />
    <div class="flex-grow overflow-hidden flex flex-col">
<!--      <Header class="z-40"/>-->
<!--      <DataTable/>-->
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import DataTable from '@/components/DataTable.vue'
</script>
