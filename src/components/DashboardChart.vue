<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 mb-9">
    <!-- Coffee Sales Card -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="font-bold text-base">Coffee Sales</h2>

      <!-- Year Selection -->
      <div class="flex space-x-3 mt-2">
        <button v-for="year in years" :key="year"
                class="px-4 py-1 rounded-full text-sm font-bold"
                :class="selectedYear === year ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'"
                @click="selectedYear = year">
          {{ year }}
        </button>
      </div>

      <!-- Stats -->
      <div class="flex justify-between items-center mt-1">
        <div>
          <p class="text-gray-500 text-sm">Coffee sold (Kgs)</p>
          <p class="text-lg font-bold text-green-800">6,500,856</p>
        </div>
        <div>
          <p class="text-purple-600 text-sm">Money paid</p>
          <p class="text-lg font-bold text-purple-600">64.9M</p>
        </div>
      </div>

      <!-- Line Chart -->
      <div class="mt-6">
        <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />
      </div>
    </div>

    <!-- Top Factories Card -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-base font-bold">Top Factories</h2>

      <!-- Doughnut Chart -->
      <div class="w-64 mx-auto my-4">
        <DoughnutChart :chart-data="doughnutChartData" :chart-options="chartOptions" />
      </div>

      <!-- Factory List -->
      <div class="space-y-2">
        <div class="flex justify-between text-gray-700">
          <span class="flex items-center">
            <span class="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
            Lari Factory
          </span>
          <span>1,670,000 Kgs</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span class="flex items-center">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Gachie Factory
          </span>
          <span>4,200,200 Kgs</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span class="flex items-center">
            <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Limuru Factory
          </span>
          <span>1,300,676 Kgs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";
import DoughnutChart from '@/components/DoughnutChart.vue'
import LineChart from '@/components/LineChart.vue'

// Register chart.js modules
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement);

const years = ref([2024, 2023, 2022]);
const selectedYear = ref(2024);

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Coffee Sold",
      data: [20, 40, 60, 50, 70, 30, 50, 40, 60, 30, 70, 50],
      borderColor: "#0f3d3e",
      backgroundColor: "rgba(15, 61, 62, 0.2)",
      fill: true,
    },
    {
      label: "Money Paid",
      data: [10, 30, 50, 60, 40, 70, 30, 60, 50, 70, 40, 60],
      borderColor: "#9C27B0",
      backgroundColor: "rgba(156, 39, 176, 0.2)",
      fill: true,
    },
  ],
};

const doughnutChartData = {
  labels: ["Lari Factory", "Gachie Factory", "Limuru Factory"],
  datasets: [
    {
      data: [1670000, 4200200, 1300676],
      backgroundColor: ["#F59E0B", "#2563EB", "#EF4444"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
