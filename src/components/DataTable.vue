<!--
<template>
  <div>
    <table ref="dataTable" class="display w-full border rounded-lg"></table>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import $ from "jquery";
import "datatables.net-dt";

const dataTable = ref(null);
let tableInstance = null;

const columns = [
  { title: "ID", data: "id" },
  { title: "Name", data: "name" },
  { title: "Age", data: "age" },
  { title: "Country", data: "country" },
];

const data = [
  { id: 1, name: "John Doe", age: 30, country: "USA" },
  { id: 2, name: "Jane Smith", age: 25, country: "Canada" },
  { id: 3, name: "Ali Khan", age: 35, country: "Pakistan" },
];

onMounted(() => {
  tableInstance = $(dataTable.value).DataTable({
    data,
    columns,
    responsive: true,
    paging: true,
    searching: true,
    ordering: true,
    lengthChange: false,
    pageLength: 5,
    dom: "Bfrtip", // Enables buttons (optional)
  });
});

onBeforeUnmount(() => {
  if (tableInstance) {
    tableInstance.destroy();
  }
});
</script>

<style>
@import "datatables.net-dt/css/dataTables.dataTables.min.css"; /* Ensure DataTable styling */
</style>
-->
<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-3">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">
        Coffee in Pipeline
      </h2>
      <span class="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg">
        13 Batches
      </span>
    </div>
    <p class="text-gray-600 mt-1">These are the batches of coffee currently in the pipeline</p>

    <!-- Filters -->
    <div class="mt-4 flex items-center space-x-4">
      <div class="relative flex-grow">
        <input
          type="text"
          placeholder="Search by Out-turn Number"
          class="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <svg class="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z">
          </path>
        </svg>
      </div>
      <select class="border border-gray-300 rounded-lg p-2">
        <option>All</option>
        <option>Miller</option>
        <option>Warehouse</option>
      </select>
      <select class="border border-gray-300 rounded-lg p-2">
        <option>All</option>
        <option>02-02-2025</option>
      </select>
    </div>

    <!-- Table -->
    <div class="mt-4 overflow-x-auto">
      <table class="w-full border-collapse rounded-lg shadow-sm">
        <thead>
        <tr class="bg-gray-100 text-gray-700 text-left text-sm">
          <th class="p-3"><input type="checkbox" /></th>
          <th class="p-3">Outturn Number</th>
          <th class="p-3">Grade</th>
          <th class="p-3">Weight</th>
          <th class="p-3">Number of Bags</th>
          <th class="p-3">Dispatch Date</th>
          <th class="p-3">Stage</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="batch in batches" :key="batch.id" class="border-b">
          <td class="p-3"><input type="checkbox" /></td>
          <td class="p-3">{{ batch.outturn }}</td>
          <td class="p-3">
              <span :class="batch.gradeClass" class="text-xs font-medium px-2 py-1 rounded">
                {{ batch.grade }}
              </span>
          </td>
          <td class="p-3">{{ batch.weight }}</td>
          <td class="p-3">{{ batch.bags }}</td>
          <td class="p-3">{{ batch.dispatchDate }}</td>
          <td class="p-3">
              <span :class="batch.stageClass" class="text-xs font-medium px-2 py-1 rounded">
                {{ batch.stage }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Button -->
    <div class="mt-4">
      <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        View All Batches →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      batches: [
        { id: 1, outturn: "05KK0001", grade: "P1", weight: "200kg", bags: 4, dispatchDate: "02-02-2025", stage: "Miller",
          gradeClass: "bg-yellow-100 text-yellow-700", stageClass: "bg-orange-100 text-orange-700" },
        { id: 2, outturn: "05KK0002", grade: "P2", weight: "180kg", bags: 3, dispatchDate: "02-02-2025", stage: "Miller",
          gradeClass: "bg-purple-100 text-purple-700", stageClass: "bg-orange-100 text-orange-700" },
        { id: 3, outturn: "05KK0003", grade: "P3", weight: "30kg", bags: 1, dispatchDate: "02-02-2025", stage: "Warehouse",
          gradeClass: "bg-red-100 text-red-700", stageClass: "bg-purple-100 text-purple-700" },
      ]
    };
  }
};
</script>

<style scoped>
table th,
table td {
  text-align: left;
}
</style>
