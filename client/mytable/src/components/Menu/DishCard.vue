<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  dish: Object,
});

const isActive = ref(false);
</script>

<template>
  <li
    class="relative p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move border border-white"
  >
    <div class="flex items-center">
      <img
        class="w-20 h-20 rounded-full"
        :src="props.dish?.img"
        :alt="props.dish?.title"
      />
    </div>
    <p class="ml-5 text-gray-700 font-semibold font-sans tracking-wide">
      {{ props.dish?.title }}
    </p>
    <div class="flex items-center">
      <p class="ml-8 text-gray-700 font-sans tracking-wide">
        {{ props.dish?.description }}
      </p>
    </div>
    <div class="flex">
      <p class="ml-8 text-gray-700 font-sans tracking-wide">
        {{ props.dish?.price }}
      </p>
    </div>
    <label
      class="inline-flex absolute items-center cursor-pointer bottom-px right-px"
    >
      <input type="checkbox" value="" v-model="isActive" class="sr-only peer" />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        isActive
      }}</span>
    </label>
  </li>
</template>
