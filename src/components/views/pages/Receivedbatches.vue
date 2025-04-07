<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg p-6 flex flex-col">
      <h2 class="text-lg font-bold text-gray-700 mb-6">Milling Status</h2>
      <ol class="relative border-l border-gray-300">
        <li
          v-for="(step, index) in millingStatus"
          :key="index"
          class="mb-10 ml-4"
        >
          <div
            class="absolute w-3 h-3 bg-white border-2 rounded-full -left-1.5 top-1.5"
            :class="step.current ? 'border-blue-500 bg-blue-500' : 'border-gray-300'"
          ></div>
          <h3
            class="text-sm font-semibold"
            :class="step.current ? 'text-blue-600' : 'text-gray-600'"
          >
            {{ step.name }}
          </h3>
          <p v-if="step.date" class="text-xs text-gray-400">
            {{ step.date }}
          </p>
        </li>
      </ol>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <!-- Bulk Lot Section -->
      <div class="bg-white p-6 shadow-lg rounded-lg">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">New Bulk Lot: 5543</h2>
            <p class="text-sm text-gray-500">Containing 3 source lots</p>
          </div>
          <span class="text-green-600 font-medium">✔ Ready for Storage</span>
        </div>
        <div class="mt-4 p-4 bg-green-100 rounded-lg flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-700">Bulk Outturn Number</p>
            <p class="text-lg font-bold text-gray-900">06KK2001</p>
          </div>
          <button class="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600">
            Proceed to Storage →
          </button>
        </div>
      </div>

      <!-- Source Lots Table -->
      <div class="bg-white p-6 mt-6 shadow-lg rounded-lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Source Lots</h3>
          <span class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full">Milling</span>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b bg-gray-100">
              <th class="py-3 px-4 text-gray-600">Outturn Number</th>
              <th class="py-3 px-4 text-gray-600">Commodity</th>
              <th class="py-3 px-4 text-gray-600">Grower Name</th>
              <th class="py-3 px-4 text-gray-600">Grower Code</th>
              <th class="py-3 px-4 text-gray-600">P.L. Weight (Kg)</th>
              <th class="py-3 px-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lot in sourceLots" :key="lot.id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4">{{ lot.outturn }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 bg-pink-200 text-pink-800 rounded-lg">{{ lot.commodity }}</span>
              </td>
              <td class="py-3 px-4">{{ lot.grower }}</td>
              <td class="py-3 px-4">{{ lot.growerCode }}</td>
              <td class="py-3 px-4">{{ lot.weight }}</td>
              <td class="py-3 px-4">
                <button class="text-red-500 hover:text-red-700">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      sourceLots: [
        { id: 1, outturn: '09KK0001', commodity: 'AA', grower: 'Kahawa Coffee Society', growerCode: '984683', weight: 30 },
        { id: 2, outturn: '09KK0004', commodity: 'AA', grower: 'Kabete Growers', growerCode: '564433', weight: 70 },
        { id: 3, outturn: '09KK0006', commodity: 'AA', grower: 'Kahawa Coffee Society', growerCode: '984683', weight: 40 }
      ],
      millingStatus: [
        { name: 'Received', date: '16th Jun, 2025', current: false },
        { name: 'Bulking', current: true },
        { name: 'Milling', current: false },
        { name: 'Storage', current: false },
        { name: 'Awaiting Dispatch', current: false },
        { name: 'Dispatched', current: false }
      ]
    };
  }
};
</script>
