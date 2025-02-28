<template>
  <div class="h-screen bg-custom-grey text-white transition-all duration-200 md:relative z-10 shadow-lg flex flex-col"
       :class="[
         isNavOpen ? 'w-48 md:w-1/6 fixed' : 'w-16 md:fixed ',
         !isNavOpen && isMobile ? 'hidden' : ''
       ]">
    <div class="p-4 flex justify-between items-center border-b border-gray-300">
      <img src="@/assets/images/navcoffeedss.svg" alt="Navigation Icon" class="w-6 h-6" :class="{ 'hidden': !isNavOpen }">
      <h1 class="font-bold text-base truncate text-primary-800-main" :class="{ 'hidden': !isNavOpen }">Coffee DSS</h1>
      <button @click="handleToggle" class="p-2 rounded hover:bg-gray-300 focus:outline-none flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-primary-800-main" fill="none" viewBox="0 0 24 24">
          <path v-if="isNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Navigation Items -->
    <div class="flex-grow overflow-y-auto">
      <nav class="mt-3 p-2">
        <ul>
          <li v-for="(item, index) in navItems" :key="index"
              class="hover:bg-primary-800-main cursor-pointer transition-colors duration-400 text-primary-500-neutral hover:text-white rounded-md group">
            <div class="px-3 py-2 flex items-center justify-between" @click="toggleSubmenu(index)">
              <div class="flex items-center">
                <VsxIcon :iconName="item.icon" :class="`hover:text-white`" size="15" type="linear" />
                <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm duration-100 px-2">{{ item.name }}</span>
              </div>
              <span
                v-if="item.children && item.children.length && isNavOpen"
                class="ml-2 transform transition-transform duration-300 text-black group-hover:text-white text-base"
              >
                {{ item.isOpen ? 'v' : '>' }}
              </span>
            </div>
            <div v-if="item.children && item.children.length"
                 class="overflow-hidden transition-all duration-300 ease-in-out"
                 :class="item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                 :style="{ 'margin-left': '1.5rem' }">
              <div class="pl-2 border-l border-gray-500">
                <div v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`"
                     class="py-2 cursor-pointer transition-colors duration-150 flex items-center"
                     @click.stop="handleSubmenuItemClick(child, index, childIndex)">
                  <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm">{{ child.name }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Bottom Section (Settings & Logout) -->
    <div class="p-4 border-t border-gray-300">
      <ul>
        <li class="hover:bg-primary-800-main cursor-pointer transition-colors duration-400 text-primary-500-neutral hover:text-white rounded-md group p-2 flex items-center">
          <VsxIcon iconName="Settings" size="15" type="linear" />
          <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm duration-100 px-2">Settings</span>
        </li>
        <li class="hover:bg-red-500 cursor-pointer transition-colors duration-400 text-red-500 hover:text-white rounded-md group p-2 flex items-center mt-2">
          <VsxIcon iconName="Logout" size="15" type="linear" />
          <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm duration-100 px-2">Logout</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Overlay to close navigation on mobile when opened -->
  <div v-if="isNavOpen"
       class="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
       @click="handleToggle"></div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { VsxIcon } from "vue-iconsax";
// import { Home2 } from 'iconsax-vue'
import { defineComponent } from 'vue'
// Define props for component
const props = defineProps({
  iconName: String,
  isNavOpen: {
    type: Boolean,
    required: true
  }
});

// Define emits
const emit = defineEmits(['toggle']);

const navItems = ref([
  {
    name: 'Dashboard',
    icon: 'Home',
    isOpen: false,
    children: []
  },
  {
    name: 'Farmer',
    icon: 'People',
    isOpen: false,
    children: [
      { name: 'Onboard', icon: 'Home' },
      { name: 'View', icon: 'Home' }
    ]
  },
  {
    name: 'Miller',
    icon: 'Coffee',
    isOpen: false,
    children: [
      { name: 'Upload', icon: 'Home' },
      { name: 'View', icon: 'Home' },
    ]
  },
  {
    name: 'Warehouse',
    icon: 'UserAdd',
    isOpen: false,
    children: [
      { name: 'Upload', icon: 'Home' },
      { name: 'View', icon: 'Home' }
    ]
  },
  {
    name: 'Broker',
    icon: 'Paperclip2',
    isOpen: false,
    children: [
      { name: 'Upload', icon: 'Home' },
      { name: 'View', icon: 'Home' }
    ]
  },
  {
    name: 'NCE',
    icon: 'Verify',
    isOpen: false,
    children: [
      { name: 'Upload', icon: 'Home' },
      { name: 'View', icon: 'Home' }
    ]
  },
  {
    name: 'Payments',
    icon: 'Wallet',
    isOpen: false,
    children: [
      { name: 'Upload', icon: 'Home' },
      { name: 'View', icon: 'Home' }
    ]
  },
]);


function toggleSubmenu(index) {
  console.log("hhh")
  if (!props.isNavOpen){
    emit('toggle');
  }

  navItems.value.forEach((item, i) => {
    if (i !== index) {
      item.isOpen = false;
    }
  });
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


<!--
<template>
  <div class="h-screen bg-gray-500 text-white transition-all duration-200 md:relative z-10 shadow-lg flex flex-col"
       :class="[isNavOpen ? 'w-48 md:w-1/6 fixed' : 'w-16 md:fixed', !isNavOpen && isMobile ? 'hidden' : '']">

    &lt;!&ndash; Top Section &ndash;&gt;
    <div class="p-4 flex justify-between items-center border-b border-gray-700">
      <h1 class="font-bold text-xl truncate" :class="{ 'hidden': !isNavOpen }">Navigation</h1>
      <button @click="handleToggle" class="p-2 rounded hover:bg-gray-700 focus:outline-none flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="isNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    &lt;!&ndash; Navigation Menu (Pushed to the top using flex-grow) &ndash;&gt;
    <nav class="mt-6 flex-grow overflow-y-auto">
      <ul>
        <li v-for="(item, index) in navItems" :key="index"
            class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
          <div class="flex items-center justify-between" @click="toggleSubmenu(index)">
            <div class="flex items-center">
              <span class="mr-3 text-xl flex-shrink-0">{{ item.icon }}</span>
              <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap">{{ item.name }}</span>
            </div>
            <span v-if="item.children && item.children.length && isNavOpen"
                  class="ml-2 transform transition-transform duration-300">
              {{ item.isOpen ? '▼' : '▶' }}
            </span>
          </div>

          &lt;!&ndash; Submenu &ndash;&gt;
          <div v-if="item.children && item.children.length"
               class="overflow-hidden transition-all duration-300 ease-in-out"
               :class="item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
            <div class="pl-2 border-l border-gray-500">
              <div v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`"
                   class="py-2 hover:bg-gray-600 cursor-pointer transition-colors duration-150 flex items-center"
                   @click.stop="handleSubmenuItemClick(child, index, childIndex)">
                <span class="mr-3 text-md flex-shrink-0">{{ child.icon }}</span>
                <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap text-sm">{{ child.name }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    &lt;!&ndash; Bottom Menu &ndash;&gt;
    <div class="border-t border-gray-700 p-4 mt-auto">
      <ul>
        <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center"
            @click="handleSettings">
          <span class="mr-3 text-xl">⚙️</span>
          <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap">Settings</span>
        </li>
        <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center"
            @click="handleLogout">
          <span class="mr-3 text-xl">🚪</span>
          <span :class="{ 'hidden': !isNavOpen }" class="whitespace-nowrap">Logout</span>
        </li>
      </ul>
    </div>
  </div>

  &lt;!&ndash; Overlay to close navigation on mobile when opened &ndash;&gt;
  <div v-if="isNavOpen"
       class="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
       @click="handleToggle"></div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const handleSettings = () => {
  console.log("Navigating to Settings...");
  // Add your settings navigation logic here
};

const handleLogout = () => {
  console.log("Logging out...");
  // Add your logout logic here
};

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

<style scoped>

</style>
-->
