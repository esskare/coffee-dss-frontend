<!-- Warehouse Menu Navbar -->
<template>
    <div class="h-screen bg-custom-grey text-white transition-all duration-200 md:relative z-50 shadow-lg flex flex-col flex-shrink-0"
         :class="[
           isMobile ? (isNavOpen ? 'w-48 fixed top-0 left-0 bottom-0' : 'w-0 fixed top-0 left-0 bottom-0') : (isNavOpen ? 'w-48 md:w-1/6 fixed' : 'w-16 md:fixed')
         ]">

      <!-- Mobile Hamburger Button -->
      <button v-if="isMobile" @click="handleToggle" class="absolute top-4 left-4 p-2 rounded-md bg-primary-800-main text-white z-60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24  " stroke="currentColor">
          <path v-if="!isNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-4 flex justify-between items-center border-b border-gray-300">
        <img src="@/assets/images/navcoffeedss.svg" alt="Navigation Icon" class="w-6 h-6" :class="{ 'hidden': !isNavOpen }">
        <h1 class="font-bold text-base truncate text-primary-800-main" :class="{ 'hidden': !isNavOpen }">Coffee DSS</h1>

        <!-- Desktop Sidebar Toggle Button -->
        <button v-if="!isMobile" @click="handleToggle" class="p-2 rounded hover:bg-gray-300 focus:outline-none flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-primary-800-main" fill="none" viewBox="0 0 24 24">
            <path v-if="isNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Rest of the Navbar content remains the same -->
      <div class="flex-grow overflow-y-auto">
        <nav class="mt-3 p-2">
          <ul>
            <li v-for="(item, index) in navItems" :key="index"
                class="hover:bg-primary-800-main cursor-pointer transition-colors duration-400 text-primary-500-neutral hover:text-white rounded-md group">
              <!-- Main Navigation Items -->
              <router-link
                v-if="item.route"
                :to="item.route"
                class="px-3 py-2 flex items-center justify-between">
                <div class="flex items-center">
                  <VsxIcon :iconName="item.icon" class="hover:text-white" size="15" type="linear" />
                  <span v-if="isNavOpen" class="whitespace-nowrap text-sm duration-100 px-2">{{ item.name }}</span>
                </div>
              </router-link>
              <div v-else class="px-3 py-2 flex items-center justify-between" @click="toggleSubmenu(index)">
                <div class="flex items-center">
                  <VsxIcon :iconName="item.icon" class="hover:text-white" size="15" type="linear" />
                  <span v-if="isNavOpen" class="whitespace-nowrap text-sm duration-100 px-2">{{ item.name }}</span>
                </div>
                <span v-if="item.children && item.children.length && isNavOpen" class="ml-2 transform transition-transform duration-300 text-primary-500-neutral group-hover:text-white text-base">
                  {{ item.isOpen ? 'v' : '>' }}
                </span>
              </div>
              <!-- Submenu Items -->
              <div v-if="item.children && item.children.length"
                   class="overflow-hidden transition-all duration-300 ease-in-out"
                   :class="item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                   :style="{ 'margin-left': '1.5rem' }">
                <div class="pl-2 border-l border-gray-500">
                  <router-link
                    v-for="(child, childIndex) in item.children"
                    :key="`${index}-${childIndex}`"
                    :to="child.route"
                    class="py-2 cursor-pointer transition-colors duration-150 flex items-center">
                    <span v-if="isNavOpen" class="whitespace-nowrap text-sm">{{ child.name }}</span>
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Bottom Section (Settings & Logout) -->
      <div class="p-4 border-t border-gray-300">
        <ul>
          <!-- Settings Link -->
          <li>
            <router-link
              to="/Settings"
              class="hover:bg-primary-800-main cursor-pointer transition-colors duration-400 text-primary-500-neutral hover:text-white rounded-md group p-2 flex items-center">
              <VsxIcon iconName="Settings" size="15" type="linear" />
              <span v-if="isNavOpen" class="whitespace-nowrap text-sm duration-100 px-2">Settings</span>
            </router-link>
          </li>

          <!-- Logout Button -->
          <li @click="handleLogout">
          <span class="hover:bg-red-500 cursor-pointer transition-colors duration-400 text-red-500 hover:text-white rounded-md group p-2 flex items-center mt-2">
            <VsxIcon iconName="Logout" size="15" type="linear" />
            <span v-if="isNavOpen" class="whitespace-nowrap text-sm duration-100 px-2">Logout</span>
          </span>
          </li>
        </ul>
      </div>

    </div>

    <!-- Overlay for Mobile -->
    <div v-if="isMobile && isNavOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" @click="handleToggle"></div>
  </template>

  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { VsxIcon } from "vue-iconsax";
  import router from '@/router/index.js'

  const isNavOpen = ref(false);
  const isMobile = ref(false);

  const navItems = ref([
    { name: 'Dashboard', icon: 'Home', isOpen: false, route: '/dashboard', children: [] },
    { name: 'Coffee in Store', icon: 'Paperclip2', isOpen: false, children: [{ name: 'View', route: '/store', }] },
    { name: 'Societies', icon: 'Verify', isOpen: false, children: [{ name: 'Upload', route: '/societies' }, { name: 'View' }] },
    { name: 'Oranization', icon: 'Wallet', isOpen: false, children: [{ name: 'Upload' }, { name: 'View' }] }
  ]);

  const toggleSubmenu = (index) => {
    if (!isNavOpen.value) isNavOpen.value = true;
    navItems.value.forEach((item, i) => {
      if (i !== index) item.isOpen = false;
    });
    if (navItems.value[index].children.length) {
      navItems.value[index].isOpen = !navItems.value[index].isOpen;
    }
  };

  const handleSubmenuItemClick = (child) => {
    console.log(`Clicked on submenu item: ${child.name}`);
  };

  const handleToggle = () => {
    isNavOpen.value = !isNavOpen.value;
  };

  const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
    if (isMobile.value) {
      isNavOpen.value = false;
    } else {
      isNavOpen.value = true;
    }
  };

  onMounted(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  const handleLogout = () => {
    // Clear authentication data (e.g., remove token, reset user state)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    router.push('/');
  };
  </script>
