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

// If both params exist -> fetch restaurantDATA ---->
if (route.params.restID && route.params.tableID) {
  (async ()=>{
    const result = await orderAPIService.getRestaurantData(String(route.params.restID), String(route.params.tableID))
    console.log("result:" ,result)
    if (result !== null) {
      dishes.value = result.dishes;
      restaurantName.value = result.name;
    }loading.value = false;
  } 
  )()
}
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>

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
          <DishCardMobile :dish="dish"></DishCardMobile>
        </div>
      </div>
  
      <div v-if="(orderStore.currentOrder)" class="flex bg-gray-300 z-40 fixed bottom-0 w-full h-20 bg-amber-200 flex justify-center">
        <button @click="orderAPIService.newOrder(toRaw(orderStore.currentOrder) as any, orderStore.currentTotal, route.params.restID, route.params.tableID)">ORDER</button>
        <div v-for="dish in orderStore.currentOrder">
          <div>{{dish.id}}, {{dish.amount}} - </div>
        </div>
        <div>TOTAL: {{orderStore.currentTotal}}</div>
      </div>
    </div>
  </div>
  <div v-else>Couldn't load the menu :(</div>
</template>
