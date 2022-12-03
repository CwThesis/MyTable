<script setup lang="ts">
import type { Dish, DishIdWithAmount } from "../types";
import DishCardMobile from "../components/Mobile/DishCardMobile.vue";
import type { Ref } from 'vue';
import { ref, toRaw, watch } from "vue";
import { useOrderStore } from "../stores/order.store";
import orderAPIService from "../services/orderAPI";
import { useRoute } from "vue-router";
import LoadingSpinner from '../components/LoadingSpinner.vue';


const orderStore = useOrderStore();
const route = useRoute();
const dishes: Ref<Dish[]> = ref([]);
const restaurantName: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const menuName: Ref<string> = ref("");
const banner: Ref<string> = ref("");

// If both params exist -> fetch restaurantDATA ---->
if (route.params.restID && route.params.tableID) {
  (async ()=>{
    const result = await orderAPIService.getRestaurantData(String(route.params.restID), String(route.params.tableID))
    console.log("result:" ,result)
    if (result !== null) {
      dishes.value = result.dishes;
      restaurantName.value = result.name;
      banner.value = result.banner.url
    }
    loading.value = false;
  } 
  )()
}

async function sendOrder () {
  const res = await orderAPIService.newOrder(toRaw(orderStore.currentOrder) as any, orderStore.currentTotal, route.params.restID, route.params.tableID)
  //handle response
  orderStore.emptyOrder();
}
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <img :src="banner" >
  <div v-if="dishes.length">
    <div class="py-2">
      <div class="bg-gray-300">
        <h1 class="space-y-4 py-5 sm:py-6 text-xl">Menu - {{restaurantName}}</h1>
      </div>
      <div>
        <h2></h2>
        <div
          v-for="dish in dishes"
          :key="dish.title"
          class="bg-gray-50 px-4 py-3"
        >
          <DishCardMobile :dish="dish"/>
        </div>
      </div>
  
      <div v-if="(orderStore.currentOrder)" class="flex bg-gray-300 z-40 fixed bottom-0 w-full h-20 bg-amber-200 flex justify-center">
        <button @click="sendOrder">ORDER</button>
        <ul class="flex flex-col items-center p-4">
        <div v-for="dish in orderStore.currentOrder">
          <li>{{dish.name}}, {{dish.amount}} u's</li>
        </div>
      </ul>
        <div class="flex items-center">TOTAL: {{orderStore.currentTotal}}</div>
      </div>
    </div>
  </div>

</template>
