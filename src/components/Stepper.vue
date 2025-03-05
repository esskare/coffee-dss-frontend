<template>
  <div class="container mx-auto px-4 py-8">
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

      <!-- Steps Indicator -->
      <div class="flex justify-center mb-8">
        <div class="flex space-x-4">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300"
              :class="[
                currentStep >= index
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              v-if="index < steps.length - 1"
              class="w-8 h-0.5 mx-2"
              :class="currentStep > index ? 'bg-blue-500' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Current Step Form -->
      <div class="max-w-md mx-auto">
        <div
          v-for="(step, index) in steps"
          :key="index"
        >
          <form
            v-if="currentStep === index"
            @submit.prevent="handleStepSubmit"
            class="bg-white border rounded-lg shadow-lg p-6"
          >
            <h3 class="text-xl font-semibold mb-4">{{ step.title }}</h3>

            <template v-for="(field, fieldIndex) in step.fields" :key="fieldIndex">
              <!-- Input Fields -->
              <div class="mb-4">
                <label
                  :for="`step-${index}-${fieldIndex}`"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  {{ field.label }}
                </label>
                <input
                  :id="`step-${index}-${fieldIndex}`"
                  :type="field.type"
                  :name="field.name"
                  v-model="formData[field.name]"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :required="field.required"
                />
              </div>
            </template>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-6">
              <button
                v-if="currentStep > 0"
                type="button"
                @click="prevStep"
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {{ currentStep === steps.length - 1 ? 'Submit' : 'Next' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive state for current step and form data
const currentStep = ref(0)
const formData = reactive({})

// Step configuration
const steps = [
  {
    title: 'Personal Information',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true
      }
    ]
  },
  {
    title: 'Contact Details',
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true
      }
    ]
  },
  {
    title: 'Address Information',
    fields: [
      {
        name: 'street',
        label: 'Street Address',
        type: 'text',
        required: true
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        required: true
      }
    ]
  },
  {
    title: 'Additional Details',
    fields: [
      {
        name: 'occupation',
        label: 'Occupation',
        type: 'text',
        required: false
      },
      {
        name: 'interests',
        label: 'Interests',
        type: 'text',
        required: false
      }
    ]
  }
]

// Method to handle step submission
const handleStepSubmit = () => {
  // Validate current step
  const currentStepFields = steps[currentStep.value].fields

  // Simple validation
  const isStepValid = currentStepFields.every(field =>
    !field.required || formData[field.name]
  )

  if (isStepValid) {
    // Move to next step or submit if last step
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    } else {
      // Final submission logic
      submitForm()
    }
  } else {
    alert('Please fill in all required fields')
  }
}

// Move to previous step
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Final form submission method
const submitForm = () => {
  console.log('Submitted Form Data:', formData)
  // Add your submission logic here (e.g., API call)
  alert('Form Submitted Successfully!')
}
</script>
