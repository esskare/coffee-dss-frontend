<template>
    <div class="p-1 md:p-1">
      <!-- Greeting Section -->
      <div class="bg-green-50 p-3 md:p-3 rounded-lg flex flex-col md:flex-row items-center justify-between">
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
          <img src="@/assets/images/header.svg" alt="Illustration" class="w-full h-auto" />
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
