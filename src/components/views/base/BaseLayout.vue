<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-y-auto">
    <Navbar class="w-16 md:w-1/6 flex-shrink-0" />
    <div class="flex-grow overflow-y-auto flex flex-col">
      <Header class="z-40"/>
      <div class="flex flex-col md:flex-row overflow-hidden">
        <slot />
      </div>
      <!-- You can add main content area here later -->
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/views/base/Navbar.vue'
import Header from '@/components/views/base/Header.vue'
</script>
