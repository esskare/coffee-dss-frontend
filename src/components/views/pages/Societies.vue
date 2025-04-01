<template>
  <Navigation class="w-16 md:w-1/6 flex-shrink-0" />
  <div class="p-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-900">Societies</h1>
    <p class="text-gray-500">Below is all the societies you mill for</p>

    <!-- Tabs -->
    <div class="flex space-x-4 mt-4">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="selectedTab = tab.name"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium',
          selectedTab === tab.name ? 'bg-green-200 text-green-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ tab.name }} <span v-if="tab.count" class="text-xs ml-1 px-2 py-0.5 bg-green-600 text-white rounded-full">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Search & Bulk Upload -->
    <div class="flex justify-between items-center mt-6">
      <input
        type="text"
        placeholder="Search by Grower Code"
        v-model="searchQuery"
        class="border rounded-md px-4 py-2 w-1/3 text-sm"
      />
      <button class="bg-green-500 text-white px-6 py-2 rounded-md text-sm flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
        </svg>
        Bulk Upload
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow-md p-4 mt-6">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">All Societies <span class="text-gray-500">{{ filteredSocieties.length }} Societies</span></h2>

        <!-- Region Filter -->
        <select v-model="selectedRegion" class="border px-4 py-2 rounded-md text-sm">
          <option value="All">All</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
      </div>

      <table class="w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="text-left p-2 border">Grower Name</th>
            <th class="text-left p-2 border">Grower Code</th>
            <th class="text-left p-2 border">Milling Charge</th>
            <th class="text-left p-2 border">Clean Handsorting</th>
            <th class="text-left p-2 border">Clean Storage</th>
            <th class="text-left p-2 border">Parchment Handling</th>
            <th class="text-left p-2 border">Color Sorting</th>
            <th class="text-left p-2 border">Transport Charge</th>
            <th class="text-left p-2 border">Drying Charge</th>
            <th class="text-left p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="society in filteredSocieties" :key="society.code" class="border">
            <td class="p-2 border">{{ society.name }}</td>
            <td class="p-2 border">{{ society.code }}</td>
            <td class="p-2 border">{{ society.millingCharge }}</td>
            <td class="p-2 border">{{ society.cleanHandsorting }}</td>
            <td class="p-2 border">{{ society.cleanStorage }}</td>
            <td class="p-2 border">{{ society.parchmentHandling }}</td>
            <td class="p-2 border">{{ society.colorSorting }}</td>
            <td class="p-2 border">{{ society.transportCharge }}</td>
            <td class="p-2 border">{{ society.dryingCharge }}</td>
            <td class="p-2 border">
              <span
                :class="society.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'"
                class="px-2 py-1 rounded-md text-xs font-medium"
              >
                {{ society.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navigation from '@/components/views/base/Navbar.vue';

// Tabs for filtering
const tabs = ref([
  { name: "All Societies" },
  { name: "Pending", count: 4 },
  { name: "Confirmed" },
  { name: "Archive" },
]);
const selectedTab = ref("All Societies");

// Sample societies data
const societies = ref([
  { name: "Kipkelion Growers", code: "05KK0005", region: "Kipkelion", millingCharge: 20, cleanHandsorting: 6, cleanStorage: 8, parchmentHandling: 8, colorSorting: 5, transportCharge: 4, dryingCharge: 4, status: "Pending" },
  { name: "Thika Growers", code: "999534", region: "Thika", millingCharge: 25, cleanHandsorting: 8, cleanStorage: 4, parchmentHandling: 5, colorSorting: 4, transportCharge: 4, dryingCharge: 6, status: "Confirmed" },
  { name: "Nandi Growers", code: "05KK0005", region: "Nandi", millingCharge: 14, cleanHandsorting: 8, cleanStorage: 3, parchmentHandling: 8, colorSorting: 4, transportCharge: 3, dryingCharge: 8, status: "Confirmed" },
  { name: "Meru Growers", code: "05KK0005", region: "Meru", millingCharge: 25, cleanHandsorting: 8, cleanStorage: 4, parchmentHandling: 5, colorSorting: 4, transportCharge: 4, dryingCharge: 6, status: "Pending" },
]);

// Extract unique regions from societies data
const regions = computed(() => {
  const uniqueRegions = new Set(societies.value.map(s => s.region));
  return ["All", ...uniqueRegions];
});

// Search and filter logic
const searchQuery = ref("");
const selectedRegion = ref("All");

const filteredSocieties = computed(() => {
  return societies.value.filter(society => {
    const matchesSearch = society.code.includes(searchQuery.value);
    const matchesRegion = selectedRegion.value === "All" || society.region === selectedRegion.value;
    return matchesSearch && matchesRegion;
  });
});
</script>
