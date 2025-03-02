<template>
  <div :class="['p-3 rounded-lg shadow-md flex flex-col w-full', bgColor]">
    <div class="flex items-center space-x-2">
      <div class="py-2 flex items-center justify-center rounded-full">
        <VsxIcon :iconName="icon"  size="19" type="linear" />
      </div>
      <span class="text-gray-700 font-medium text-sm">{{ title }}</span>
    </div>

    <div class="mt-1 flex items-end">
      <span class="text-2xl font-bold text-gray-900">{{ weight }}</span>
      <span class="text-gray-500 ml-1 text-sm font-bold">{{extra1}}</span>
    </div>

    <div class="flex items-center mt-1">
      <span :class="['h-5 w-5', strokeColor]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" :stroke="strokeColorLine">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </span>
      <span :class="[strokeColor, 'font-medium ml-1 text-sm']">{{ percentage }}%</span>
      <div class="flex-1 flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-20 text-green-500" fill="none" viewBox="0 0 24 24" :stroke="strokeColorLine">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17c2.5-3 5-6 8-4s3.5 5 7 4 4.5-4 5-5"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { VsxIcon } from 'vue-iconsax'

export default {
  components: { VsxIcon },
  props: {
    title: { type: String, required: true },
    weight: { type: String, required: true },
    percentage: { type: String, required: true },
    extra1: { type: String, default: "" },
    bgColor: { type: String, default: "bg-green-100" },
    strokeColor: { type: String, default: "text-green-600" },
    strokeColorLine: { type: String, default: "#16a34a" },
    icon: { type: String, required: true },
    iconBg: { type: String, required: true },
  },
};
</script>
