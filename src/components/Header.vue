<template>
  <div class="w-full dark:bg-gray-800">
    <div class="flex flex-col md:flex-row items-center justify-between py-3">
      <!-- Search Box -->
      <div class="relative w-full md:w-auto mb-2 md:mb-0">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
        <input
          type="text"
          placeholder="Search"
          class="w-full md:w-96 pl-10 pr-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <button class="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
          <span class="font-bold">Take a Tour</span>
          <span>⏳</span>
        </button>

        <button class="text-gray-500">
          🔔
        </button>

        <!-- Profile Section -->
        <!-- Profile Section -->
        <div class="relative">
          <button class="flex items-center space-x-2 focus:outline-none">
            <img src="@/assets/images/martha.svg" alt="Profile" class="w-8 h-8 md:w-10 md:h-10 rounded-full" />
            <span @click="toggleDropdown" class="text-sm"><span class="font-bold">Reuben</span> v</span>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <ul class="py-2 text-gray-700">
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  }
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown when clicking outside
// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (!dropdownRef.value?.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", closeDropdown);
});
</script>
