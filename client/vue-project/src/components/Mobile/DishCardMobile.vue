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
    <div class="flex flex-col gap-1 " style="width: 120%">
      <p class="ml-5 text-gray-700 font-semibold font-sans tracking-wide">
        {{ props.dish?.title }}
      </p>
        <p class="ml-5 text-gray-700 font-sans tracking-wide">
        {{ props.dish?.description }}
      </p>
      <p class="ml-5 text-gray-700 font-sans font-semibold tracking-wide">
        {{ props.dish?.price }} {{ props.dish.currency }}
      </p>
    </div>
    
    <div :style="{ backgroundImage: `url(${props.dish?.imgUrl})`}" style="background-size: cover; background-position: center;" class="w-full h-full rounded-r-lg relative">
        <!-- <img class="w-full rounded-r-lg" :src="props.dish?.imgUrl" :alt="props.dish?.title" style="object-fit: cover"/> -->
        <!-- <div class="flex flex-col content-end mt-4 ml-16 p-2" style="width: 3.4rem"> -->
          <div class="absolute top-3 right-3 flex flex-col items-end gap-2">
            <div class="flex gap-2 bg-white rounded-full items-center justify-center">
              <p v-if="(orderStore.amountById(props.dish.id)> 0)" class="font-semibold text-gray-500 pl-2">{{orderStore.amountById(props.dish.id)}}</p>
              <button class="p-2 bg-white rounded-full w-8 h-8 flex justify-center items-center"
                @click="orderStore.addToOrder({ id: props.dish.id, name: props.dish.title, img: props.dish.imgUrl, amount: 1 }, props.dish.price)">
                <font-awesome-icon icon="fa-solid fa-plus fa-xs" class="text-gray-500"/></button>
            </div>
              
            <button class="p-2 bg-white  rounded-full w-8 h-8 flex justify-center items-center" v-show="orderStore.amountById(props.dish.id)"
            @click="orderStore.decrementAmountById(props.dish.id, props.dish.price)">
            <font-awesome-icon icon="fa-solid fa-minus fa-xs" class="text-gray-500"/></button>
          </div>
        <!-- <label class="inline-flex absolute items-center cursor-pointer bottom-3 right-3"> -->
        <!-- </label> -->
       <!--  </div> -->
    </div>

  </div>
</template>

