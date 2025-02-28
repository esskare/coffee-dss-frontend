<template>
  <div class="h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Line } from "vue-chartjs";

// Define props for dynamic data
defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>
