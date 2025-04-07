<template>
<Navigation class="w-16 md:w-1/6 flex-shrink-0" />
  <div class="container mx-auto p-4 overflow-x-scroll">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold">All batches</h1>
        <span class="text-gray-500 text-sm">These are the batches of coffee currently in the pipeline</span>
      </div>
      <div>
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Bulk Batches
        </button>
      </div>
    </div>

    <div class="flex justify-between mb-4">
      <div class="relative w-1/3">
        <input
          type="text"
          placeholder="Search by Out-turn Number"
          class="pl-10 pr-4 py-2 border rounded w-full"
          v-model="search"
          @input="filterTable"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <div class="flex space-x-4">
        <div class="w-40">
          <div class="text-sm text-gray-500 mb-1">Stage</div>
          <select class="w-full border rounded p-2 bg-white" v-model="stageFilter" @change="applyFilters">
            <option value="All">All</option>
            <option value="Ready for Dispatch">Ready for Dispatch</option>
            <option value="Received">Received</option>
            <option value="Milling">Milling</option>
          </select>
        </div>
        <div class="w-40">
          <div class="text-sm text-gray-500 mb-1">Dispatch Date</div>
          <select class="w-full border rounded p-2 bg-white" v-model="dateFilter" @change="applyFilters">
            <option value="All">All</option>
            <option value="Recent">Recent</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto shadow-md rounded-lg">
      <div class="max-h-[70vh] overflow-y-auto">
        <table id="batchesTable" class="min-w-full bg-white table-auto">
          <thead class="sticky top-0 bg-gray-100 z-10">
          <tr class="text-left">
            <th class="w-10 py-3 px-4">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('outturnNumber')">
              Outturn Number
              <span v-if="sortColumn === 'outturnNumber'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('grade')">
              Grade
              <span v-if="sortColumn === 'grade'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('weight')">
              Weight
              <span v-if="sortColumn === 'weight'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('bags')">
              Number of Bags
              <span v-if="sortColumn === 'bags'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('grower')">
              Grower
              <span v-if="sortColumn === 'grower'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('growerCode')">
              Grower Code
              <span v-if="sortColumn === 'growerCode'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('dateReceived')">
              DateReceived
              <span v-if="sortColumn === 'dateReceived'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4 cursor-pointer" @click="sortTable('stage')">
              Stage
              <span v-if="sortColumn === 'stage'">&nbsp;{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="py-3 px-4">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="batch in filteredBatches" :key="batch.id" class="border-t hover:bg-gray-50">
            <td class="py-3 px-4">
              <input type="checkbox" v-model="batch.selected" />
            </td>
            <td class="py-3 px-4">{{ batch.outturnNumber }}</td>
            <td class="py-3 px-4">
                <span
                  :class="{
                    'px-2 py-1 rounded text-xs font-medium': true,
                    'bg-purple-100 text-purple-700': batch.grade === 'P2',
                    'bg-red-100 text-red-700': batch.grade === 'P3',
                    'bg-yellow-100 text-yellow-700': batch.grade === 'P1',
                    'bg-gray-100 text-gray-700': batch.grade === 'Mbuni'
                  }"
                >
                  {{ batch.grade }}
                </span>
            </td>
            <td class="py-3 px-4">{{ batch.weight }}</td>
            <td class="py-3 px-4">{{ batch.bags }}</td>
            <td class="py-3 px-4">{{ batch.grower }}</td>
            <td class="py-3 px-4">{{ batch.growerCode }}</td>
            <td class="py-3 px-4">{{ batch.dateReceived }}</td>
            <td class="py-3 px-4">
                <span
                  v-if="batch.stage === 'Ready for Dispatch'"
                  class="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700"
                >
                  Ready for Dispatch
                </span>
              <span
                v-else-if="batch.stage === 'Received'"
                class="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700"
              >
                  Received
                </span>
              <span
                v-else-if="batch.stage === 'Milling'"
                class="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700"
              >
                  Milling
                </span>
            </td>
            <td class="py-3 px-4">
              <button
  v-if="batch.action === 'Dispatch'"
  @click="$router.push('/receivedbatches')"
  class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded flex items-center"
>
  Dispatch
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>
</button>

              <button
                v-else-if="batch.action === 'Mill Batch'"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded flex items-center"
              >
                Mill Batch
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navigation from '@/components/views/base/Navbar.vue';
const search = ref('');
const selectAll = ref(false);
const stageFilter = ref('All');
const dateFilter = ref('All');
const sortColumn = ref('');
const sortDirection = ref('asc');

const batches = ref([
  {
    id: 1,
    selected: false,
    outturnNumber: '05KK0005',
    grade: 'P2',
    weight: '40kg',
    bags: 1,
    grower: 'Kipkelion Growers',
    growerCode: '115554',
    dateReceived: '10-02-2025',
    stage: 'Ready for Dispatch',
    action: 'Dispatch'
  },
  {
    id: 2,
    selected: false,
    outturnNumber: '05KK0002',
    grade: 'P2',
    weight: '600kg',
    bags: 10,
    grower: 'Thika Growers',
    growerCode: '999534',
    dateReceived: '02-02-2025',
    stage: 'Received',
    action: 'Mill Batch'
  },
  {
    id: 3,
    selected: false,
    outturnNumber: '05KK0009',
    grade: 'P3',
    weight: '800kg',
    bags: 13,
    grower: 'Meru Growers',
    growerCode: '885533',
    dateReceived: '17-02-2025',
    stage: 'Milling',
    action: null
  },
  {
    id: 4,
    selected: false,
    outturnNumber: '05KK0006',
    grade: 'P1',
    weight: '40kg',
    bags: 1,
    grower: 'Kahawa Coffee Society',
    growerCode: '984683',
    dateReceived: '15-02-2025',
    stage: 'Received',
    action: 'Mill Batch'
  },
  {
    id: 5,
    selected: false,
    outturnNumber: '05KK0003',
    grade: 'Mbuni',
    weight: '690kg',
    bags: 11,
    grower: 'Kahawa Coffee Society',
    growerCode: '984683',
    dateReceived: '06-02-2025',
    stage: 'Milling',
    action: null
  },
  {
    id: 6,
    selected: false,
    outturnNumber: '05KK0004',
    grade: 'P1',
    weight: '70kg',
    bags: 1,
    grower: 'Kabete Growers',
    growerCode: '564433',
    dateReceived: '06-02-2025',
    stage: 'Received',
    action: 'Mill Batch'
  },
  {
    id: 7,
    selected: false,
    outturnNumber: '05KK0007',
    grade: 'P3',
    weight: '1,600kg',
    bags: 26,
    grower: 'Gatundu Growers',
    growerCode: '777342',
    dateReceived: '12-02-2025',
    stage: 'Ready for Dispatch',
    action: 'Dispatch'
  },
  {
    id: 8,
    selected: false,
    outturnNumber: '05KK0008',
    grade: 'Mbuni',
    weight: '300kg',
    bags: 5,
    grower: 'Nandi Growers',
    growerCode: '992233',
    dateReceived: '12-02-2025',
    stage: 'Milling',
    action: null
  },
  {
    id: 9,
    selected: false,
    outturnNumber: '05KK0001',
    grade: 'P1',
    weight: '30kg',
    bags: 1,
    grower: 'Kahawa Coffee Society',
    growerCode: '984683',
    dateReceived: '02-02-2025',
    stage: 'Received',
    action: 'Mill Batch'
  }
]);

const filteredBatches = computed(() => {
  let result = [...batches.value];

  // Apply search filter
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    result = result.filter(batch =>
      batch.outturnNumber.toLowerCase().includes(searchTerm) ||
      batch.grower.toLowerCase().includes(searchTerm) ||
      batch.growerCode.toLowerCase().includes(searchTerm)
    );
  }

  // Apply stage filter
  if (stageFilter.value !== 'All') {
    result = result.filter(batch => batch.stage === stageFilter.value);
  }

  // Apply date filter
  if (dateFilter.value !== 'All') {
    result.sort((a, b) => {
      const dateA = new Date(a.dateReceived.split('-').reverse().join('-'));
      const dateB = new Date(b.dateReceived.split('-').reverse().join('-'));
      return dateFilter.value === 'Recent' ? dateB - dateA : dateA - dateB;
    });
  }

  // Apply sorting
  if (sortColumn.value) {
    result.sort((a, b) => {
      let valA = a[sortColumn.value];
      let valB = b[sortColumn.value];

      // Handle numeric values
      if (sortColumn.value === 'bags') {
        valA = parseInt(valA);
        valB = parseInt(valB);
      }

      // Handle weight with units
      if (sortColumn.value === 'weight') {
        valA = parseInt(valA.replace(/[^\d]/g, ''));
        valB = parseInt(valB.replace(/[^\d]/g, ''));
      }

      // Handle dates
      if (sortColumn.value === 'dateReceived') {
        valA = new Date(valA.split('-').reverse().join('-'));
        valB = new Date(valB.split('-').reverse().join('-'));
      }

      if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const toggleSelectAll = () => {
  batches.value.forEach(batch => {
    batch.selected = selectAll.value;
  });
};

const filterTable = () => {
  // Implementation handled by computed property
};

const applyFilters = () => {
  // Implementation handled by computed property
};

const sortTable = (column) => {
  if (sortColumn.value === column) {
    // Toggle direction if clicking the same column
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Set new column and default to ascending
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
};

onMounted(() => {
  // No need for DataTables initialization - we're using Vue's reactivity instead
});
</script>
