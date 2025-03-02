<template>
  <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
    <Card
      title="Coffee Delivered Today"
      weight="5,370"
      percentage="15.4%"
      bgColor="bg-accent-pastel-green"
      strokeColor="text-green-500"
      icon="Coffee"
      iconBg="bg-accent-pastel-violet1"
      extra1="Kgs"
    />
    <Card
      title="Orders Processed"
      weight="1,245"
      percentage="8.2%"
      bgColor="bg-accent-pastel-tangerine"
      strokeColor="text-blue-500"
      icon="People"
      iconBg="#F7EBFD"
    />
    <Card
      title="Revenue Generated"
      weight="$12,450"
      percentage="22.3%"
      bgColor="bg-accent-pastel-violet"
      strokeColor="text-yellow-500"
      icon="Wallet"
      iconBg="accent-pastel-violet1"
    />
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'

defineProps({
  title: {
    type: String,
    default: 'Content'
  }
});
</script>
