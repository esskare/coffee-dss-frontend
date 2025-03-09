<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden">
<!--    <Navigation :is-nav-open="isNavOpen" @toggle="toggleNav" />
    <MainContent :is-nav-open="isNavOpen" @toggle="toggleNav" />-->
<!--    <Login/>-->
<!--    <Miller/>-->
    <Toast ref="toastRef" />
    <RouterView/>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import Toast from '@/components/views/ui/Toast.vue'

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

const toastRef = ref(null);
provide("toast", toastRef); // 👈 Makes toast available globally
</script>
