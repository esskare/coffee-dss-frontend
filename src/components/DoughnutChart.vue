<template>
  <div class="h-64">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";

// Define props for dynamic data
defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>
