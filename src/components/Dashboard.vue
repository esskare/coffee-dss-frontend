<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
<!--    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>-->
    <div class="p-1 md:p-1 bg-gray-50 min-h-screen">
      <!-- Greeting Section -->
      <div class="bg-green-50 p-6 md:p-10 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <!-- Left Side - Text Content -->
        <div class="max-w-lg">
          <h1 class="text-2xl md:text-3xl font-semibold">
            Good afternoon <span class="inline-block">👋</span>
          </h1>
          <h2 class="text-3xl md:text-4xl font-bold mt-1">Reuben Kihiu</h2>
          <p class="text-gray-600 mt-3">
            Here are a few things you can do to get your afternoon started
          </p>

          <!-- Buttons -->
          <div class="mt-6 flex gap-4">
            <button class="bg-green-900 text-white px-6 py-3 rounded-lg">
              Record Coffee Delivery
            </button>
            <button class="bg-green-500 text-white px-6 py-3 rounded-lg">
              Add New Farmer
            </button>
          </div>
        </div>

        <!-- Right Side - Illustration -->
        <div class="hidden md:block w-64">
          <img src="@/assets/logo.svg" alt="Illustration" class="w-full h-auto" />
        </div>
      </div>

      <!-- Cards Section -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card
          title="Coffee Delivered Today"
          weight="5,370"
          percentage="15.4%"
          bgColor="bg-green-100"
          strokeColor="text-green-500"
        />
        <Card
          title="Orders Processed"
          weight="1,245"
          percentage="8.2%"
          bgColor="bg-blue-100"
          strokeColor="text-blue-500"
        />
        <Card
          title="Revenue Generated"
          weight="$12,450"
          percentage="22.3%"
          bgColor="bg-yellow-100"
          strokeColor="text-yellow-500"
        />
      </div>
    </div>
<!--    <div class="bg-green-50 p-6 md:p-10 rounded-lg flex flex-col md:flex-row items-center justify-between">
      &lt;!&ndash; Left Side - Text Content &ndash;&gt;
      <div class="max-w-lg">
        <h1 class="text-2xl md:text-3xl font-semibold">
          Good afternoon <span class="inline-block">👋</span>
        </h1>
        <h2 class="text-3xl md:text-4xl font-bold mt-1">Reuben Kihiu</h2>
        <p class="text-gray-600 mt-3">
          Here are a few things you can do to get your afternoon started
        </p>

        &lt;!&ndash; Buttons &ndash;&gt;
        <div class="mt-6 flex gap-4">
          <button class="bg-green-900 text-white px-6 py-3 rounded-lg">
            Record Coffee Delivery
          </button>
          <button class="bg-green-500 text-white px-6 py-3 rounded-lg">
            Add New Farmer
          </button>
        </div>
      </div>

      &lt;!&ndash; Right Side - Illustration &ndash;&gt;
      <div class="hidden md:block w-64">
        <img src="@/assets/logo.svg" alt="Illustration" class="w-full h-auto" />
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card
        title="Coffee Delivered"
        weight="5,370"
        extra1="Kgs"
        percentage="15.4"
        bgColor="bg-green-100"
        strokeColor="text-amber-600"
        strokeColorLine="#d97706"/>
      <Card
        title="No. of Farmers"
        weight="60,370"
        percentage="75.4"
        bgColor="bg-orange-100"
        strokeColor="text-green-600"
      stroke-color-line="#ea580c"/>
      <Card
        title="Total Coffee Sales"
        weight="KES 4,670"
        percentage="18.4"
        bgColor="bg-amber-100"
        strokeColor="text-blue-600" />
    </div>-->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Card from '@/components/Card.vue'

defineProps({
  title: {
    type: String,
    default: 'Content'
  }
});
</script>
