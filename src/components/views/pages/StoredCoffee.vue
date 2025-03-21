<template>
            <Navigation class="w-16 md:w-1/6 flex-shrink-0" />
    <div class="rounded-lg border border-gray-300 md:ml-10 md:mr-10">

      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 ml-10 mr-10">
        <div class="px-1 py-4">
            
          <h1 class="text-sm font-bold">All batches</h1>
          <span class=" text-xs">These are the batches of coffee currently in the pipeline</span>
        </div>
        <div class="w-full sm:w-auto">
          <button class="w-full sm:w-auto bg-gray-200 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded">
            Bulk Batches
          </button>
        </div>
      </div>
  
      <div class="flex flex-col lg:flex-row justify-between py-3 px-3">
        <div class="relative w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Out-turn Number"
            class="pl-10 pr-4 py-2 border rounded w-full text-xs"
            id="customSearch"
          />
          <div class="absolute left-3 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
  
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div class="w-full sm:w-40">
            <select class="w-full border rounded p-2 text-xs" id="stageFilter">
              <option>Stage</option>
              <option>Stage</option>
              <option>Stage</option>
            </select>
          </div>
          <div class="w-full sm:w-40">
            <select class="w-full border rounded p-2 text-xs" id="dateFilter">
              <option>Dispatch Date</option>
            </select>
          </div>
        </div>
      </div>
  
      <div class="overflow-x-auto overflow-y-auto max-h-96 rounded-lg mb-6 md:overflow-visible md:max-h-full">
      <!-- Table -->
      <table id="batchesTable" ref="dataTable" class="min-w-full table-auto">
        <thead class="">
        <tr class="text-left">
          <th class="w-10 py-3 px-2 sm:px-4">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          </th>
          <th class="py-2 px-1 sm:px-4 text-xs">Outturn</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Grade</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Weight</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Bags</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Grower</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Code</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Date</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Stage</th>
          <th class="py-2 px-1 sm:px-4 text-xs">Action</th>
        </tr>
        </thead>
        <tbody class="text-xs">
        <!-- DataTables will populate this -->
        </tbody>
        
      </table>

    </div>
    </div>
    <Sidebar/>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { nextTick } from 'vue';
  import Navigation from '@/components/views/base/Navbar.vue'
  import Sidebar from '@/components/views/dashboard/Sidebar.vue'
  
  import api from '@/components/services/api.js';
  
  const dataTable = ref(null);
  const selectAll = ref(false);
  let tableInstance = null;
  
  const toggleSelectAll = () => {
    if (tableInstance) {
      const data = tableInstance.data().toArray();
      data.forEach(row => {
        row.selected = selectAll.value;
      });
      tableInstance.rows().invalidate().draw();
    }
  };
  
  // Fetch users with pagination
  async function fetchUsers(start, length, searchValue = '') {
    console.log("Fetching users...");
    try {
      // Encode query parameters
      const params = new URLSearchParams({
        start: start / length, // Convert start to page number
        length,
        searchValue,
      }).toString();
  
      const response = await api.get(`/api/sca/v1/auth/vuetest2?${params}`);
      console.log("Response:", response);
      console.log("Response2:", response.content);
      return response;
    } catch (err) {
      console.error('Failed to fetch users:', err);
      return { data: [], totalRecords: 0 }; // Return empty data if the request fails
    }
  }
  
  // Initialize DataTable with server-side processing
  const initializeDataTable = async () => {
    // Load jQuery and DataTables scripts dynamically
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/jquery.dataTables.min.js');
    await loadScript('https://cdn.datatables.net/responsive/2.4.1/js/dataTables.responsive.min.js');
  
    // Load CSS files
    const addStylesheet = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };
  
    addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/css/jquery.dataTables.min.css');
    addStylesheet('https://cdn.datatables.net/responsive/2.4.1/css/responsive.dataTables.min.css');
  
    // Wait for the next tick to ensure Vue has finished rendering
    await nextTick();
  
    // Initialize DataTable with server-side processing
    tableInstance = $(dataTable.value).DataTable({
      serverSide: true,
      processing: true,
      destroy: true,
      retrieve: true,
      scrollX: true,
      buttons: [],
      ajax: async (data, callback) => {
        const start = data.start;
        const length = data.length;
        const searchValue = $('#customSearch').val();;
  
        const response = await fetchUsers(start, length, searchValue);
        console.log("-------------", response)
        callback({
          data: response.content,
          recordsTotal: response.totalElements,
          recordsFiltered: response.totalElements,
        });
      },
      columns: [
        { data: 'selected', render: renderCheckbox, orderable: false },
        { data: 'outturnnumber', className: 'all' },
        { data: 'grade', render: renderGrade, className: 'all' },
        { data: 'weight', className: 'all' },
        { data: 'bags', className: 'all' },
        { data: 'grower', className: 'all' },
        { data: 'growercode', className: 'all' },
        { data: 'datereceived', className: 'all' },
        // { data: 'grower', className: 'min-lg' },
        // { data: 'growercode', className: 'min-lg' },
        // { data: 'datereceived', className: 'min-md' },
        { data: 'stage', render: renderStage, className: 'all' },
        { data: 'action', render: renderAction, orderable: false, className: 'all' }
      ],
      responsive: true,
      paging: true,
      searching: false,
      ordering: true,
      lengthChange: false,
      pageLength: 10,
      language: {
        search: "",
        searchPlaceholder: "Search...",
        paginate: {
          next: "→",
          previous: "←"
        },
        info: "_START_ - _END_ of _TOTAL_"
      }
    });
  
    // Custom search with the search box at the top
    $('#customSearch').on('keyup', function() {
      console.log("this - ", this.value)
      tableInstance.search(this.value).draw();
    });
  };
  
  // Load external scripts
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Render functions
  const renderCheckbox = (data, type, row) => {
    return `<input type="checkbox" class="batch-checkbox" data-id="${row.id}" ${row.selected ? 'checked' : ''}>`;
  };
  
  const renderGrade = (data, type, row) => {
    let colorClass = 'bg-gray-100 text-gray-700';
    if (data === 'P1') colorClass = 'bg-yellow-100 text-yellow-700';
    else if (data === 'P2') colorClass = 'bg-purple-100 text-purple-700';
    else if (data === 'P3') colorClass = 'bg-red-100 text-red-700';
    return `<span class="px-2 py-1 rounded text-xs font-medium ${colorClass}">${data}</span>`;
  };
  
  const renderStage = (data, type, row) => {
    let colorClass = '';
    if (data === 'Ready for Dispatch') colorClass = 'bg-orange-100 text-orange-700';
    else if (data === 'Received') colorClass = 'bg-green-100 text-green-700';
    else if (data === 'Milling') colorClass = 'bg-blue-100 text-blue-700';
    return `<span class="px-2 py-1 rounded text-xs font-sm ${colorClass}">${data}</span>`;
  };
  
  const renderAction = (data, type, row) => {
    if (data === 'Dispatch') {
      return `<button class="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-1 rounded flex items-center text-xs sm:text-sm">
                <span class="text-xs">Dispatch</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>`;
    } else if (data === 'Mill Batch') {
      return `<button class="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-1 rounded flex items-center text-xs sm:text-sm">
                <span class="text-xs">Mills</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>`;
    }
    return '';
  };
  
  // On mounted lifecycle hook
  onMounted(async () => {
    try {
      await initializeDataTable();
    } catch (error) {
      console.error("Error initializing DataTable:", error);
    }
  });
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  