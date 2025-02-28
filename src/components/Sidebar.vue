<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Activity View</h2>

    <div v-for="(activity, index) in activities" :key="index" class="border-b pb-4 mb-4">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 flex items-center justify-center rounded-lg" :class="activity.bgColor">
          <img :src="activity.icon" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <div class="flex justify-between text-sm text-gray-500">
            <span class="font-semibold text-gray-900">{{ activity.title }}</span>
            <span>1 Hours Ago</span>
          </div>
          <p class="text-gray-600 text-sm">{{ activity.description }}</p>

          <div class="mt-2 flex gap-2" v-if="activity.buttons">
            <button class="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg" v-if="activity.buttons.reject">Reject</button>
            <button class="px-4 py-2 text-white bg-green-600 rounded-lg" v-if="activity.buttons.approve">{{ activity.buttons.approve }}</button>
          </div>
        </div>
      </div>
    </div>

    <a href="#" class="text-green-600 font-semibold flex items-center gap-1">
      View All Notifications →
    </a>

    <div class="mt-6 p-4 bg-green-100 rounded-lg">
      <p class="font-semibold text-green-900">You can now send announcements to your farmers</p>
      <p class="text-sm text-gray-600">Send notifications directly to your farmers through the new DSS Mobile App</p>
      <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Learn How</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activities = ref([
  {
    title: 'Review Contract',
    description: 'Kahawa Brokers Shared a contract with you to review',
    icon: 'icon_contract.png',
    bgColor: 'bg-purple-100',
    buttons: { reject: true, approve: 'Review' }
  },
  {
    title: 'Loan Application',
    description: 'Boniface Githaiga Applied for a Cherry Loan of KES 12,000',
    icon: 'icon_loan.png',
    bgColor: 'bg-blue-100',
    buttons: { reject: true, approve: 'Review' }
  },
  {
    title: 'Auction Results',
    description: 'Today’s Auction at NCE was successful!',
    icon: 'icon_auction.png',
    bgColor: 'bg-red-100',
    buttons: { approve: 'See Results' }
  },
  {
    title: 'Loan Application',
    description: 'Simon Nganga Applied for a Cherry Loan of KES 4,700',
    icon: 'icon_loan.png',
    bgColor: 'bg-blue-100',
    buttons: { reject: true, approve: 'Review' }
  }
]);
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
