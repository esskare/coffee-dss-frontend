<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden rounded-lg mt-3 md:ml-14 md:mr-14 border border-gray-300">
    <!-- Sidebar - visible only on desktop -->
    <div
      class="hidden md:block md:w-80 bg-custom-grey3 border-r border-gray-200 md:top-24 md:left-64"
    >
      <!-- Steps list -->
      <div class="p-8 space-y-8 relative">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-start text-sm gap-4 relative"
          @click="goToStep(index + 1)"
        >
          <!-- Vertical dotted line -->
          <div
            v-if="index < steps.length - 1 && currentStep > index + 1"
            class="absolute left-5 top-10 h-[calc(100%-1.8rem)] w-0.5 border-l-2 border-dotted border-gray-400"
            style="top: 3.2rem;"
          ></div>

          <!-- Step number or tick icon -->
          <div
            class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md text-black font-bold cursor-pointer z-10"
            :class="[
              currentStep >= index + 1
                ? 'bg-green-800 text-white'
                : 'bg-gray-200 text-gray-500'
            ]"
          >
            <!-- Tick icon for completed steps -->
            <svg
              v-if="currentStep > index + 1"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Circle -->
              <circle cx="12" cy="12" r="10" stroke="currentColor" />
              <!-- Tick -->
              <path d="M8 12l3 3 5-5" />
            </svg>

            <!-- Step number for incomplete steps -->
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Step details -->
          <div class="space-y-1">
            <div class="text-xs text-gray-500"
                 :class="[
              currentStep >= index + 1
                ? 'text-primary-500-main'
                : 'text-gray-500'
            ]">{{ step.category }}</div>
            <div class="font-sm">{{ step.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-hidden flex flex-col">
      <!-- Fixed Header -->
      <div class="p-4 md:p-5 bg-custom-grey4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h1 class="text-xl md:text-base font-bold">Onboard New Society </h1>
          <button
            class="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-red-100 text-red-500 hover:bg-red-500"
          >
            <span class="hidden md:inline">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto bg-custom-grey3 p-4 md:p-5 md:ml-4">
        <!-- Mobile step indicator -->
        <div class="flex items-center md:hidden mb-6">
          <div class="flex-1 h-2 bg-gray-200 rounded-full">
            <div
              class="h-2 bg-green-500 rounded-full"
              :style="{ width: `${(currentStep / steps.length) * 100}%` }"
            ></div>
          </div>
          <div class="ml-3 text-sm font-bold text-gray-600">
            Step {{ currentStep }}/{{ steps.length }}
          </div>
        </div>

        <!-- Step content -->
        <div class="mb-6 md:mb-8">
          <h2 class="text-sm md:text-sm font-bold mb-2">{{ currentStepData.title }}</h2>
          <p class="text-gray-500 text-sm">
            {{ currentStepData.description }}
          </p>
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="mb-4 p-4 text-sm bg-red-50 text-red-600 rounded-md">
          {{ errorMessage }}
        </div>

        <!-- Step form fields -->
        <div class="mb-8 md:mb-12">
          <!-- Step 1: Grower Code Form -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div>

              
              <input
                id="growerCode"
                v-model="formData.growerCode"
                type="text"
                placeholder="Enter Grower code"
                class="w-full border border-gray-300 font-sm text-sm rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <!-- Step 2: Confirm Grower Code Details -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Transport Charge </label>
                <input
                  v-model="formData.transportfees"
                  type="text"
                  placeholder="Storage fees"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Parchment Transport Charge</label>
                <input
                  v-model="formData.parchmentcharges"
                  type="text"
                  placeholder="Enter parchment transport charge"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
             
            </div>
          </div>

          <!-- Step 3: Farm Details -->
          <div v-if="currentStep === 3" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input
                  v-model="formData.farmName"
                  type="text"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Farm Size (Hectares)</label>
                <input
                  v-model="formData.farmSize"
                  type="number"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Primary Crop</label>
                <select
                  v-model="formData.primaryCrop"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a crop</option>
                  <option value="corn">Corn</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="coffee">Coffee</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                <input
                  v-model="formData.farmLocation"
                  type="text"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <!-- Step 4: Payment Details -->
          <div v-if="currentStep === 4" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  v-model="formData.bankName"
                  type="text"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  v-model="formData.accountNumber"
                  type="text"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  v-model="formData.paymentMethod"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select payment method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                <input
                  v-model="formData.taxId"
                  type="text"
                  class="w-full border border-gray-300 rounded-md text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step navigation buttons -->
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
import { ref, computed } from 'vue'

// Step configuration
const steps = [
  {
    category: 'Society Details',
    title: 'Grower Code',
    description: "Enter the society’s grower code to automatically get their details"
  },
  {
    category: 'Contract Details',
    title: 'Add Contract Details',
    description: "Add the following charges per bag as agreed with the grower"
  },
  {
    category: 'Contract',
    title: 'Upload Contract',
    description: "Add the following charges per bag as agreed with the grower"
  }
]

// Form state
const currentStep = ref(1)
const formData = ref({
  // Step 1
  growerCode: '',

  // Step 2
  transportfees: '',
  parchmentcharges: '',


  // Step 3
  farmName: '',
  farmSize: null,
  primaryCrop: '',
  farmLocation: '',

})

// Error message
const errorMessage = ref('')

// Computed properties
const currentStepData = computed(() => steps[currentStep.value - 1])

// Methods
const goToStep = (stepNumber) => {
  // Only allow going to steps that have been unlocked
  if (stepNumber <= currentStep.value || stepNumber === 1) {
    currentStep.value = stepNumber
    window.scrollTo(0, 0)
  }
}

const validateStep = () => {
  errorMessage.value = '' // Reset error message

  switch (currentStep.value) {
    case 1:
      if (!formData.value.growerCode.trim()) {
        errorMessage.value = 'Grower Code is required.'
        return false
      }
      break
    case 2:
      if (
        !formData.value.transportfees.trim() ||
        !formData.value.parchmentchargesr.trim()
       
      ) {
        errorMessage.value = 'All fields are required.'
        return false
      }
      break
    case 3:
      if (
        !formData.value.farmName.trim() ||
        !formData.value.farmSize ||
        !formData.value.primaryCrop.trim() ||
        !formData.value.farmLocation.trim()
      ) {
        errorMessage.value = 'All fields are required.'
        return false
      }
      break
   
  }

  return true
}

const goToNextStep = async () => {
  if (!validateStep()) {
    return // Stop if validation fails
  }

  if (currentStep.value === 1) {
    // In a real app, you would fetch farmer details based on ID
    // and pre-populate the formData
    // await fetchFarmerDetails()


   
  }

  if (currentStep.value < steps.length) {
    currentStep.value++
    // Scroll to top when changing steps
    window.scrollTo(0, 0)
  } else {
    // Submit the form
    console.log(formData.value)
    alert('Form submitted!')
    // handleSubmit()
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    // Scroll to top when changing steps
    window.scrollTo(0, 0)
  }
}
</script>
