<template>
<!--  <div
    v-if="isVisible"
    class="fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500"
    :class="toastClasses"
  >
    {{ message }}
  </div>-->
<!--  <Transition name="slide-down">
    <div
      v-if="isVisible"
      class="fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 flex items-center space-x-2 z-50"
      role="alert"
      :class="toastClass"
    >
      <VsxIcon :iconName="iconName" size="18" type="linear" :stroke-width="3" />
      <span class="text-sm font-medium">{{ message }}</span>
    </div>
  </Transition>-->
  <Transition name="slide-down">
    <div
      v-if="isVisible"
      class="fixed top-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 opacity-100 z-50"
      role="alert"
      :class="toastClass"
    >
      <div class="flex items-center space-x-2">
        <VsxIcon :iconName="iconName" size="15" type="linear" :stroke-width="3"/>
        <span class="text-sm font-medium">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { VsxIcon } from "vue-iconsax";

const isVisible = ref(false);
const message = ref("");
const type = ref("success");

// const showToast = (msg, toastType = "success", duration = 3000) => {
//   message.value = msg;
//   type.value = toastType;
//   isVisible.value = true;
//
//   setTimeout(() => {
//     isVisible.value = false;
//   }, duration);
// };

const showToast = (msg, toastType = "success") => {
  message.value = msg;
  type.value = toastType;
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
};

const toastClass = computed(() => {
  switch (type.value) {
    case "success":
      return "bg-green-800";
    case "error":
      return "bg-red-800";
    case "warning":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500";
  }
});

const iconName = computed(() => {
  switch (type.value) {
    case "success":
      return "TickCircle"; // Success icon
    case "error":
      return "CloseCircle"; // Error icon
    case "warning":
      return "Warning2"; // Warning icon
    default:
      return "InfoCircle"; // Default icon
  }
});

defineExpose({ showToast });
</script>
<style scoped>
/* Vue Transition Classes */
.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-in-out;
}

.slide-down-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
