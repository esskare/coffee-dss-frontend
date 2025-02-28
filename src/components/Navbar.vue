<template>
  <div class="h-screen bg-gray-500 text-white transition-all duration-200 md:relative z-10 shadow-lg"
       :class="[
         isNavOpen ? 'w-48 md:w-1/6 fixed' : 'w-16 md:fixed ',
         // Hide completely on mobile when closed
         !isNavOpen && isMobile ? 'hidden' : ''
       ]">
    <div class="p-4 flex justify-between items-center border-b border-gray-700">
      <h1 class="font-bold text-xl truncate" :class="{ 'hidden': !isNavOpen }">Navigation</h1>
      <button @click="handleToggle" class="p-2 rounded hover:bg-gray-700 focus:outline-none flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="isNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <nav class="mt-6 border-amber-700 border-2" style="max-height: calc(100vh - 70px);">
      <ul>
        <li v-for="(item, index) in navItems" :key="index"
            class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
          <div class="flex items-center justify-between" @click="toggleSubmenu(index)">
            <div class="flex items-center">
              <span class="mr-3 text-xl flex-shrink-0">{{ item.icon }}</span>
              <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap">{{ item.name }}</span>
            </div>
            <span v-if="item.children && item.children.length && isNavOpen" class="ml-2">
            {{ item.isOpen ? '▼' : '▶' }}
          </span>
          </div>

          <!-- Submenu -->
          <div v-if="item.children && item.children.length && item.isOpen"
               class="mt-2 ml-6 pl-2 border-l border-gray-500">
            <div v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`"
                 class="py-2 hover:bg-gray-600 cursor-pointer transition-colors duration-150 flex items-center"
                 @click.stop="handleSubmenuItemClick(child)">
              <span class="mr-3 text-md flex-shrink-0">{{ child.icon }}</span>
              <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm">{{ child.name }}</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
<!--    <nav class="mt-6 overflow-y-auto border-amber-700 border-2" style="max-height: calc(100vh - 70px);">
      <ul>
        <li v-for="(item, index) in navItems" :key="index"
            class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
          <div class="flex items-center">
            <span class="mr-3 text-xl flex-shrink-0">{{ item.icon }}</span>
            <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </nav>-->
  </div>

  <!-- Overlay to close navigation on mobile when opened -->
  <div v-if="isNavOpen"
       class="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
       @click="handleToggle"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Define props for component
const props = defineProps({
  isNavOpen: {
    type: Boolean,
    required: true
  }
});

// Define emits
const emit = defineEmits(['toggle']);

// Define navigation items
/*const navItems = [
  { name: 'Dashboard', icon: '📊' },
  { name: 'Projects', icon: '📁' },
];*/
const navItems = ref([
  {
    name: 'Dashboard',
    icon: '📊',
    isOpen: false,
    children: []
  },
  {
    name: 'Projects',
    icon: '📁',
    isOpen: false,
    children: [
      { name: 'Active Projects', icon: '🟢' },
      { name: 'Archived Projects', icon: '📦' }
    ]
  },
  {
    name: 'Tasks',
    icon: '✅',
    isOpen: false,
    children: [
      { name: 'My Tasks', icon: '📝' },
      { name: 'Assigned to Me', icon: '👤' },
      { name: 'Completed', icon: '✓' }
    ]
  },
  {
    name: 'Reports',
    icon: '📈',
    isOpen: false,
    children: [
      { name: 'Weekly Report', icon: '📊' },
      { name: 'Monthly Report', icon: '📆' }
    ]
  }
]);

function toggleSubmenu(index) {
  if (!props.isNavOpen){
    emit('toggle');
  }
  // Only toggle if the item has children
  if (navItems.value[index].children && navItems.value[index].children.length) {
    navItems.value[index].isOpen = !navItems.value[index].isOpen;
  }
}

// function toggleSubmenu(index) {
//   // Only toggle if the item has children
//   if (navItems.value[index].children && navItems.value[index].children.length) {
//     navItems.value[index].isOpen = !navItems.value[index].isOpen;
//   }
// }

function handleSubmenuItemClick(child) {
  // Handle submenu item click without closing the submenu
  console.log(`Clicked on submenu item: ${child.name}`);
  // Add your navigation logic here
  // For example: router.push({ name: child.routeName });
}

const openSubmenuCount = computed(() => {
  return navItems.value.filter(item =>
    item.children &&
    item.children.length > 0 &&
    item.isOpen
  ).length;
});

// Track if we're on mobile
const isMobile = ref(false);

const navbarOpenedSubmenus = computed(() =>
  navItems.value
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.children && item.children.length > 0 && item.isOpen)
    .map(({ index }) => index)
);

// Handle toggle
const handleToggle = () => {

  // If there are open submenus during collapse, close them
  navbarOpenedSubmenus.value.forEach(index => {
    navItems.value[index].isOpen = false
  })

  emit('toggle');
};

// Initialize values safely after component is mounted
onMounted(() => {
  // Set initial mobile state
  isMobile.value = window.innerWidth < 768;

  // Handle window resize
  window.addEventListener('resize', handleResize);
});

// Handle window resize
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;

  // Instead of directly modifying isNavOpen, we emit an event if needed
  if (isMobile.value && props.isNavOpen) {
    emit('toggle'); // Close nav when resizing to mobile
  } else if (!isMobile.value && !props.isNavOpen) {
    console.log("testing>>")
    emit('toggle'); // Open nav when resizing to desktop
  }
};

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
