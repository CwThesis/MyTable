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
  <div
    class="overflow-y flex flex-row relative p-0 mb-3 justify-between items-center bg-white shadow rounded-lg cursor-move border border-white" style="width: 100%; height:10rem">
    <div class="flex flex-col" style="width: 120%">
      <p class="ml-5 text-gray-700 font-semibold font-sans tracking-wide">
        {{ props.dish?.title }}
      </p>
        <p class="ml-8 text-gray-700 font-sans tracking-wide">
        {{ props.dish?.description }}
      </p>
      <p class="ml-8 text-gray-700 font-sans tracking-wide">
        {{ props.dish?.price }} {{ props.dish.currency }}
      </p>
    </div>
      
    
    <div :style="{ backgroundImage: `url(${props.dish?.imgUrl})`}" style="background-size: cover; background-position: center;" class="w-full h-full rounded-r-lg">
        <!-- <img class="w-full rounded-r-lg" :src="props.dish?.imgUrl" :alt="props.dish?.title" style="object-fit: cover"/> -->
        <div class="flex flex-col content-end mt-4 ml-16 p-2" style="width: 3.4rem">
          <div>
            <div>
              <button class="p-2 mb-8 bg-gray-200 rounded-full"
                @click="orderStore.addToOrder({ id: props.dish.id, name: props.dish.title, img: props.dish.imgUrl, amount: 1, price: props.dish.price }, props.dish.price)">➕</button>
            </div>
            <button class="p-2 bg-gray-200 rounded-full" v-show="orderStore.amountById(props.dish.id)"
            @click="orderStore.decrementAmountById(props.dish.id, props.dish.price)">➖</button>
          </div>
        <!-- <label class="inline-flex absolute items-center cursor-pointer bottom-3 right-3"> -->
        <!-- </label> -->
        </div>
    </div>

  </div>
</template>

