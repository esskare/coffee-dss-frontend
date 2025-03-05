<template>
  <div class="w-full h-screen overflow-auto p-2">
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
  { id: 3, name: "Ali Khan", age: 35, country: "Pakistan" },
  { id: 3, name: "Ali Khan", age: 35, country: "Pakistan" },
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
