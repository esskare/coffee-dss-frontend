<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden">
    <Navigation :is-nav-open="isNavOpen" @toggle="toggleNav" />
    <Header/>
<!--    &lt;!&ndash; Tabs Navigation &ndash;&gt;
    <div class="flex space-x-2 border-b pb-2">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-4 py-2 text-sm font-medium rounded-full transition duration-300"
        :class="activeTab === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        {{ tab.label }}
      </button>
    </div>

    &lt;!&ndash; Tab Content &ndash;&gt;
    <div class="mt-4 p-4 border rounded-lg bg-white shadow">
&lt;!&ndash;      <p>{{ tabs[activeTab].content }}</p>&ndash;&gt;
      <DataTable/>
    </div>-->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Navigation from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'

const tabs = ref([
  { label: "Home", content: "This is the Home tab content." },
  { label: "Profile", content: "This is the Profile tab content." },
  { label: "Settings", content: "This is the Settings tab content." },

]);

const activeTab = ref(0);

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

<style>
@import "datatables.net-dt/css/dataTables.dataTables.min.css"; /* Ensure DataTable styling */
</style>
