<template>
  <div class="w-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white p-5 border-r border-gray-200">
      <header class="text-green-700 font-bold text-lg">Personal Details</header>
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'flex items-center gap-3 py-3 transition-opacity',
          currentStep === index ? 'opacity-100 font-bold' : 'opacity-60'
        ]"
      >
        <div class="bg-green-900 text-white text-sm flex items-center justify-center">
          {{ index + 1 }}
        </div>
        <div>
          <p class="text-sm text-green-900">{{ step.title }}</p>
          <p v-if="step.subtitle" class="text-xs text-gray-500">{{ step.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="flex flex-1 justify-center items-center h-screen">
      <div class="w-96 bg-white p-6 rounded-lg shadow-md">
        <!-- Close Button -->
        <button
          @click="router.push('/dashboard')"
          class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Close
        </button>
        <h2 class="text-xl font-bold mb-4">{{ steps[currentStep].header }}</h2>

        <!-- Step Content -->
        <div v-if="currentStep === 0">
          <label for="id-number" class="text-sm font-bold text-gray-700">ID Number</label>
          <p class="text-xs text-gray-500 mb-2">
            Enter the farmer’s ID Number to automatically get their details.
          </p>
          <input
            type="text"
            id="id-number"
            v-model="idNumber"
            class="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter ID Number"
          />
        </div>

        <!-- Personal Details Form -->
        <div v-if="currentStep === 1" class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-bold text-gray-700">First Name</label>
            <input type="text" v-model="firstName" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Middle Name</label>
            <input type="text" v-model="middleName" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Last Name</label>
            <input type="text" v-model="lastName" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Gender</label>
            <input type="text" v-model="gender" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">KRA PIN</label>
            <input type="text" v-model="kraPin" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">ID Number</label>
            <input type="text" v-model="idNumber" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Year of Birth</label>
            <input type="text" v-model="yearOfBirth" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Member Number (Auto Generated)</label>
            <input type="text" v-model="memberNumber" class="w-full p-2 border border-gray-300 rounded-md text-sm" disabled />
          </div>

          <div class="col-span-2">
            <h3 class="text-md font-bold text-gray-700">More Details</h3>
            <p class="text-sm text-gray-500">Add the following details about the farmer</p>
          </div>

          <div class="col-span-2">
            <label class="text-sm font-bold text-gray-700">Mobile Number</label>
            <input type="text" v-model="mobileNumber" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>
        </div>

        <!-- Farm Details Form -->
        <div v-if="currentStep === 2" class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-bold text-gray-700">Location of Farm</label>
            <input type="text" v-model="farmLocation" class="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter farm location" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Acreage</label>
            <input type="text" v-model="acreage" class="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter acreage" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Coffee Variety</label>
            <input type="text" v-model="coffeeVariety" class="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter coffee variety" />
          </div>

          <div>
            <label class="text-sm font-bold text-gray-700">Historical Deliveries</label>
            <input type="text" v-model="historicalDeliveries" class="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter historical deliveries" />
          </div>


        </div>


        <!-- Payment Details Form -->
        <div v-if="currentStep === 3">
          <label class="text-sm font-bold text-gray-700">Payment Method</label>
          <select v-model="paymentMethod" class="w-full p-2 border border-gray-300 rounded-md text-sm">
            <option>Bank Account</option>
            <option>Mobile Money</option>
            <option>SACCO</option>
            <option>Micro Finance</option>
          </select>
          <label class="text-sm font-bold text-gray-700">Account Name</label>
          <input type="text" v-model="accountName" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
          <label class="text-sm font-bold text-gray-700">Account Number</label>
          <input type="text" v-model="accountNumber" class="w-full p-2 border border-gray-300 rounded-md text-sm" />
        </div>

        <div class="flex justify-between mt-4">
          <button
            class="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
            @click="handleCancel"
          >
            {{ currentStep === 0 ? "Cancel" : "Back" }}
          </button>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-md"
            @click="nextStep"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const steps = ref([
  { title: "ID Number", subtitle: "Enter ID Number", header: "Register New Farmer" },
  { title: "Personal Details", subtitle: "Confirm Personal Details", header: "Confirm Details" },
  { title: "Farm", subtitle: "Enter Farm Details", header: "Enter Farm Details" },
  { title: "Payment", subtitle: "Enter Payment Details", header: "Enter Payment Information" },
]);

const currentStep = ref(0);
const idNumber = ref("");
const firstName = ref("");
const lastName = ref("");
const mobileNumber = ref("");
const farmLocation = ref("");
const acreage = ref("");
const coffeeVariety = ref("");
const paymentMethod = ref("");
const accountName = ref("");
const accountNumber = ref("");

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const handleCancel = () => {
  if (currentStep.value === 0) {
    router.push("/dashboard");
  } else {
    currentStep.value--;
  }
};
</script>
