<script setup lang="ts">
import { ref, toRaw } from "vue";
import type { Dish } from "../../types";

const props = defineProps({
  dish: Object,
});

const emit = defineEmits(['addToOrder', 'removeFromOrder']);

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
    <button class="p-2 bg-gray-200 rounded-sm" @click="$emit('removeFromOrder', props.dish)">➖</button>
    <label
      class="inline-flex absolute items-center cursor-pointer bottom-3 right-3"
    > num
    <button class="p-2 bg-gray-200 rounded-sm" @click="$emit('addToOrder', props.dish)">➕</button>
    </label>

  </li>
</template>
