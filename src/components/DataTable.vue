<template>
  <div class="container mx-auto p-4">
    <table id="myTable" class="display w-full border border-gray-300 rounded-lg shadow-md">
      <thead>
      <tr class="bg-gray-200">
        <th class="p-2">Name</th>
        <th class="p-2">Age</th>
        <th class="p-2">Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td class="p-2">{{ user.name }}</td>
        <td class="p-2">{{ user.age }}</td>
        <td class="p-2">{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import $ from 'jquery';
import 'datatables.net';

const users = ref([
  { name: 'Alice', age: 25, email: 'alice@example.com' },
  { name: 'Bob', age: 30, email: 'bob@example.com' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com' },
]);

let dataTableInstance;

onMounted(() => {
  dataTableInstance = $('#myTable').DataTable();
});

onUnmounted(() => {
  if (dataTableInstance) {
    dataTableInstance.destroy();
  }
});
</script>

<style>
/* Tailwind already applies some styling, but you can customize further */
</style>
