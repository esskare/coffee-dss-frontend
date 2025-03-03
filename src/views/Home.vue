<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden">
    <Navigation :is-nav-open="isNavOpen" @toggle="toggleNav" />
    <MainContent :is-nav-open="isNavOpen" @toggle="toggleNav" />
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import Navigation from '@/components/Navbar.vue'
import MainContent from '@/components/MainContent.vue';

// Navigation state management - default to false (closed on mobile)
const isNavOpen = ref(false);

// Set initial state on mount
onMounted(() => {
  // Initialize nav to open on desktop, closed on mobile
  isNavOpen.value = window.innerWidth >= 768;
});

// Toggle navigation function
const toggleNav = () => {
  console.log("App - ", isNavOpen.value)
  isNavOpen.value = !isNavOpen.value;
};
</script>
