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
const heading: Ref<string> = ref("");

// If both params exist -> fetch restaurantDATA ---->
if (route.params.restID && route.params.tableID) {
  (async () => {
    const result = await orderAPIService.getRestaurantData(String(route.params.restID), String(route.params.tableID))
    console.log("result:", result)
    if (result !== null) {
      dishes.value = result.dishes;
      restaurantName.value = result.name;
      banner.value = result.banner.url;
      heading.value = result.banner.title;
    }
    loading.value = false;
  }
  )()
}

async function seeTicket() {
  router.push(route.path+'/served');
}

async function sendOrder() {
  // const res = await orderAPIService.newOrder(toRaw(orderStore.currentOrder) as any, orderStore.currentTotal, route.params.restID, route.params.tableID)
  //handle response

  router.push(route.path+'/order');

  //orderStore.emptyOrder();
}
</script>

<template>
  <div class="bg-white overflow-y-scroll h-full rounded-lg">
    
    <div v-if="loading">
      <LoadingSpinner class="flex items-center justify-center h-screen"/>
      
      <!-- mytable logo animated ? 
      <font-awesome-icon icon="fa-solid fa-qr-code fa-lg" class="text-gray-400 pr-2"/>  -->
    
    </div>

    <div v-else>
    <div id="body" class="p-2">
      <div class="flex flex-col justify-center rounded-lg m-1">

        <div v-if="banner" class="relative">
              <img :src="banner" class="rounded-md object-cover"/>
              <!-- <h1 class="absolute top-2 left-2/4 text-white font-josefin">{{ restaurantName }}</h1> -->
              <h1 class="absolute text-6xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">{{heading}}</h1>
            </div>
        <h1 class="space-y-4 py-5 sm:py-6 text-lg font-light font-josefin text-center">MENU {{restaurantName}}</h1>
      </div>
      <div >
        
        <div v-for="dish in dishes" :key="dish.title" class=" flex bg-white p-0">
          <DishCardMobile :dish="dish" />
        </div>

        <div class="w-full bg-white h-20 border-t-2">
        </div>

        
    
      </div>
    
       
      </div>

      <Transition>
  <div v-if="(orderStore.currentOrder)" class="z-10 flex fixed bottom-0 w-full bg-transparent h-20 p-2 justify-center items-center">
    <button v-if="(orderStore.currentOrder)" class="bg-violet-700 text-white font-semibold w-5/6 h-5/6 rounded-lg flex flex-row items-center justify-center"
     @click="sendOrder"> <p class="font-normal text-lg"> ORDER for {{ orderStore.currentTotal }} EUR</p></button>
  </div>

  

</Transition>

<div
              class="flex flex-col fixed h-20 top-0 bg-transparent pt-2 hover:font-bold text-violet-700  font-semibold w-full items-center justify-between rounded pl-4"> <button
                class="bg-violet-700 m-4 hover:bg-violet-500 text-white font-semibold self-end w-1/5 rounded p-2 mr-5" @click="seeTicket">
                <font-awesome-icon icon="fa-solid fa-receipt" pull="left" class="pt-1 pl-4" /> Bill </button>
            
            </div>





</div>
</div>


</template>

<style>
.v-enter-active,
.v-leave-active {
transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
opacity: 0;
}
</style>

