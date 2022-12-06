<script setup lang="ts">
import type { Dish, DishIdWithAmount } from "../types";
import DishCardMobile from "../components/Mobile/DishCardMobile.vue";
import type { Ref } from 'vue';
import { ref, toRaw, watch } from "vue";
import { useOrderStore } from "../stores/order.store";
import orderAPIService from "../services/orderAPI";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from '../components/LoadingSpinner.vue';


const orderStore = useOrderStore();
const route = useRoute();
const router= useRouter();
const dishes: Ref<Dish[]> = ref([]);
const restaurantName: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const menuName: Ref<string> = ref("");
const banner: Ref<string> = ref("");

// If both params exist -> fetch restaurantDATA ---->
if (route.params.restID && route.params.tableID) {
  (async () => {
    const result = await orderAPIService.getRestaurantData(String(route.params.restID), String(route.params.tableID))
    console.log("result:", result)
    if (result !== null) {
      dishes.value = result.dishes;
      restaurantName.value = result.name;
      banner.value = result.banner.url
    }
    loading.value = false;
  }
  )()
}

async function sendOrder() {
  // const res = await orderAPIService.newOrder(toRaw(orderStore.currentOrder) as any, orderStore.currentTotal, route.params.restID, route.params.tableID)
  //handle response

  router.push(route.path+'/order');

  //orderStore.emptyOrder();
}
</script>

<template>
  <div class="bg-gray-200 overflow-y-scroll h-full rounded-lg">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div :style="{backgroundImage: `url(${banner})`}" class= "w-full h-40 rounded-r-lg" style="background-size: cover; background-position: center;">
    
  </div>
  <div  v-if="dishes.length">
    <div class="py-2 bg-gray-200">
      <div class="flex justify-center bg-gray-200">
        <h1 class="space-y-4 py-5 sm:py-6 text-xl">Menu - {{ restaurantName }}</h1>
      </div>
      <div >
        <h2></h2>
        <div v-for="dish in dishes" :key="dish.title" class=" flex bg-gray-200 px-4 p-0">
          <DishCardMobile :dish="dish" />
        </div>
      </div>
      <div v-if="(orderStore.currentOrder)" class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-4 justify-center">
        <button v-if="(orderStore.currentOrder)" class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded" @click="sendOrder">ORDER for EUR {{orderStore.currentTotal}}</button>
      </div>
        <!-- <ul class="flex flex-col items-center p-4">
          <div v-for="dish in orderStore.currentOrder">
            <li>{{ dish.name }}, {{ dish.amount }} u's</li>
          </div>
        </ul> -->
        <div class="flex items-center">TOTAL: {{ orderStore.currentTotal }}</div>
      </div>
  </div>
</div>

</template>
