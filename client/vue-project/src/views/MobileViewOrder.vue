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
const orders: Ref<any[]> = ref([]);
const waiter: Ref<string> = ref("");
const restName: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const menuName: Ref<string> = ref("");
const banner: Ref<string> = ref("");

// If both params exist -> fetch ticketDATA ---->
if (route.params.restID && route.params.tableID) {
  (async () => {
    const result = await orderAPIService.getTicket(String(route.params.restID), String(route.params.tableID))
    console.log("result:", result);
    if (result) {
      orders.value=[0];
      if (result.ticket.length> 0)  orders.value=result.ticket[0].orders;
      waiter.value = result.waiter;
      restName.value = result.restName;
    }
    console.log('dsada', toRaw(orders.value))
    loading.value = false;
  }
  )()
}

async function sendOrder() {
  const res = await orderAPIService.newOrder(toRaw(orderStore.currentOrder) as any, orderStore.currentTotal, route.params.restID, route.params.tableID)
  //handle response
  orderStore.emptyOrder();
  router.push(route.path+'/served');

}

function backToMenu() {
  router.push("/customer/"+route.params.restID+'/'+route.params.tableID);
}

async function seeTicket() {
  router.push(route.path+'/served');
}
</script>

<template>
  <div class="bg-gray-200 overflow-y-scroll h-full rounded-lg">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div class="flex flex-col h-full content-center self-center " v-if="(orderStore.currentOrder.length>0)">
      <div class="flex flex-col h-full py-2 bg-gray-200 items-center">
        
        <div class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-2 justify-center ">
          <button v-if="(orderStore.currentOrder)"
            class=" bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded"
            @click="sendOrder">CONFIRM YOUR ORDER</button>
        </div>



        <div class="flex h-screen w-80 flex-col items-center">
          <div class="flex flex-col h-full px-8 bg-white rounded-md">
            
            <h1 class="space-y-4 py-5 sm:py-6 text-xl content-center">{{ restName }} - Your Order</h1>

            <div class="mt-10">
              Your Order:
              <ul class="flex items-center">
                <div v-for="dish in orderStore.currentOrder">
                  <li>{{ dish.name }}, {{ dish.amount }} u's</li>
                </div>
              </ul>
              <div class="flex items-center">new order total: {{ orderStore.currentTotal }}</div>
            </div>
            </div>
            <div class="flex mb-20 w-full bg-transparent h-20 flex p-2 justify-center ">
              <button class="bg-violet-700 m-1 hover:bg-violet-500 text-white font-semibold w-full rounded" @click="backToMenu">Back
                to Menu</button>
              <button class="bg-violet-700 m-1 hover:bg-violet-500 text-white font-semibold w-full rounded" @click="seeTicket">See
                your ticket</button>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.arrow-up {
  width: 0; 
  height: 0; 
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
} 

.arrow-down {
  width: 0; 
  height: 0; 
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  
  border-top: 8px solid white;
}
</style>
