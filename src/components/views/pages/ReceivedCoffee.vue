<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden rounded-lg mt-3 md:ml-14 md:mr-14 border border-gray-300">
    <!-- Sidebar - visible only on desktop -->
    <div class="hidden md:block md:w-80 bg-custom-grey3 border-r border-gray-200 md:top-24 md:left-64">
      <div class="p-8 space-y-8 relative">
        <div v-for="(step, index) in steps" :key="index" class="flex items-start text-sm gap-4 relative" @click="goToStep(index + 1)">
          <!-- Step Number / Checkmark -->
          <div
            class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md font-bold cursor-pointer z-10"
            :class="currentStep > index + 1 ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-500'"
          >
            <svg v-if="currentStep > index + 1" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l3 3 5-5" />
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Step Details -->
          <div>
            <div :class="currentStep >= index + 1 ? 'text-green-500' : 'text-gray-500'" class="text-xs">{{ step.category }}</div>
            <div class="font-sm">{{ step.title }}</div>
          </div>

          <!-- Vertical Line -->
          <div v-if="index < steps.length - 1" class="absolute left-5 top-10 h-[calc(100%-1.8rem)] w-0.5 border-l-2 border-dotted border-gray-400"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-hidden flex flex-col">
      <div class="p-4 md:p-5 bg-custom-grey4 border-b border-gray-200 flex justify-between items-center">
        <h1 class="text-xl md:text-base font-bold">Coffee Collection</h1>
        <router-link to="/dashboard" class="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200">
          <span class="hidden md:inline">Close</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </router-link>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto bg-custom-grey3 p-4 md:p-5 md:ml-4">
        <!-- Mobile Step Indicator -->
        <div class="flex items-center md:hidden mb-6">
          <div class="flex-1 h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-green-500 rounded-full" :style="{ width: `${(currentStep / steps.length) * 100}%` }"></div>
          </div>
          <div class="ml-3 text-sm font-bold text-gray-600">
            Step {{ currentStep }}/{{ steps.length }}
          </div>
        </div>

        <!-- Step Content -->
        <div class="mb-6 md:mb-8">
          <h2 class="text-sm md:text-sm font-bold mb-2">{{ currentStepData.title }}</h2>
          <p class="text-gray-500 text-sm">{{ currentStepData.description }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 p-4 text-sm bg-red-50 text-red-600 rounded-md">
          {{ errorMessage }}
        </div>

        <!-- Step 1: Member Number -->
        <div v-if="currentStep === 1" class="space-y-4">
          <label for="memberNumber" class="block text-sm font-sm text-gray-700 mb-1">Enter the farmer’s member number</label>
          <input id="memberNumber" v-model="formData.memberNumber" type="text" placeholder="Enter Member Number" class="w-full border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <!-- Step 2: Weight Delivered -->
<div v-if="currentStep === 2" class="p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-lg font-semibold">Enter Weight Delivered</h2>
  <p class="text-sm text-gray-500">Enter the weight delivered in Kgs</p>

  <div class="mt-4">
    <!-- Header Row -->
    <div class="grid grid-cols-6 gap-x-6 text-sm font-medium text-gray-600 border-b pb-2">
      <div class="text-center">Lot Number</div>
      <div class="text-center">Outturn Number</div>
      <div class="text-center">Grade</div>
      <div class="text-center">Number of Bags</div>
      <div class="text-center">Pkt. Weight</div>
      <div class="text-center">Action</div>
    </div>

    <!-- Input Rows -->
    <div v-for="(entry, index) in formData.deliveries" :key="index" class="grid grid-cols-6 gap-x-6 items-center mt-3">
      <input v-model="entry.lotNumber" type="text" class="px-4  border rounded"  />
      <input v-model="entry.outturnNumber" type="text" class="px-4  border rounded" />
      <select v-model="entry.grade" class="px-2 py-1 border rounded">
        <option value=""> </option>
        <option value="A">AA</option>
        <option value="B">AB</option>
        <option value="C">E</option>
        <option value="D">MH/ML</option>
      </select>
      <input v-model="entry.numberOfBags" type="number" class="px-4  border rounded" />
      <input v-model="entry.pktWeight" type="text" class="px-4  border rounded" />
      <button @click="removeEntry(index)" class="text-red-500 hover:text-red-700 text-center">🗑️</button>
    </div>

    <!-- Add Entry Button -->
    <button @click="addEntry" class="mt-4 px-4 py-2 border rounded text-green-600 border-green-600 hover:bg-green-50">
      + Add Another Entry
    </button>
  </div>
</div>


        <!-- Step Navigation -->
        <div class="flex justify-between bottom-0 bg-custom-grey3 py-4 pb-32">
          <button
            @click="goToPreviousStep"
            class="px-7 py-2 md:px-7 md:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
            v-if="currentStep > 1"
          >
            Back
          </button>
          <div v-else class="w-24"></div>

          <button
            @click="goToNextStep"
            class="px-7 py-2 md:px-7 md:py-2 bg-secondary-400-main text-white rounded-md hover:bg-secondary-400-main text-sm font-medium"
          >
            {{ currentStep === steps.length ? 'Submit' : 'Continue' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Steps definition
const steps = [
  { category: 'Member Details', title: 'Member Number' },
  { category: 'Delivery', title: 'Lots Delivered' },
];

// Current step tracker
const currentStep = ref(1);

// Form data
const formData = ref({
  memberNumber: '',
  deliveries: [{ lotNumber: '', outturnNumber: '', grade: '', numberOfBags: '', pktWeight: '' }],
});

// Error message state
const errorMessage = ref('');

// Compute current step details
const currentStepData = computed(() => steps[currentStep.value - 1]);

// Step navigation function
const goToStep = (stepNumber) => {
  if (stepNumber <= currentStep.value || stepNumber === 1) {
    currentStep.value = stepNumber;
    window.scrollTo(0, 0);
  }
};

// Form validation for each step
const validateStep = () => {
  errorMessage.value = '';

  if (currentStep.value === 1 && !formData.value.memberNumber.trim()) {
    errorMessage.value = 'Member Number is required.';
    return false;
  }

  return true;
};

// Navigate to next step
const goToNextStep = () => {
  if (!validateStep()) return;

  if (currentStep.value < steps.length) {
    currentStep.value++;
    window.scrollTo(0, 0);
  } else {
    console.log('Form Data:', formData.value);
    alert('Form submitted!');
  }
};

// Navigate to previous step
const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo(0, 0);
  }
};

// Manage delivery entries
const addEntry = () => {
  formData.value.deliveries.push({ lotNumber: '', outturnNumber: '', grade: '', numberOfBags: '', pktWeight: '' });
};

const removeEntry = (index) => {
  if (formData.value.deliveries.length > 1) {
    formData.value.deliveries.splice(index, 1);
  }
};
</script>
