<script setup lang="ts">
import { ref, toRaw } from "vue";
import type { Dish } from "../../types";
import { useOrderStore } from "../../stores/order.store";

const props = defineProps({
  dish: Object,
});
const orderStore = useOrderStore();
</script>

<template>
  <li
    class="relative p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move border border-white">
    <div class="flex items-center">
      <img class="w-20 h-20 rounded-full" :src="props.dish?.imgUrl" :alt="props.dish?.title" />
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
        {{ props.dish?.price }} {{ props.dish.currency }}
      </p>
    </div>
    <button class="p-2 bg-gray-200 rounded-sm" v-show="orderStore.amountById(props.dish.id)"
      @click="orderStore.decrementAmountById(props.dish.id, props.dish.price)">➖</button>
    <label class="inline-flex absolute items-center cursor-pointer bottom-3 right-3">
      <button class="p-2 bg-gray-200 rounded-sm"
        @click="orderStore.addToOrder({ id: props.dish.id, name: props.dish.title, img: props.dish.imgUrl, amount: 1 }, props.dish.price)">➕</button>
    </label>
  </li>
</template>
