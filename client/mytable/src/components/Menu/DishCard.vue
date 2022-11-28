<script setup lang="ts">
const props = defineProps({
  dish: Object,
});
</script>

<template>
  <li
    class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move border border-white"
  >
    <div class="flex items-center">
      <img
        class="w-20 h-20 rounded-full"
        :src="props.dish.img"
        :alt="props.dish.title"
      />
    </div>
    <p class="ml-5 text-gray-700 font-semibold font-sans tracking-wide">
      {{ props.dish.title }}
    </p>
    <div class="flex items-center">
      <p class="ml-8 text-gray-700 font-sans tracking-wide">
        {{ props.dish.description }}
      </p>
    </div>
    <div class="flex"></div>
  </li>
</template>
