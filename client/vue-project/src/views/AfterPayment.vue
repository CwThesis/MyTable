<script setup lang="ts">
import type { Dish, DishIdWithAmount } from "../types";
import DishCardMobile from "../components/Mobile/DishCardMobile.vue";
import type { Ref } from 'vue';
import { ref, toRaw, watch } from "vue";
import { useOrderStore } from "../stores/order.store";
import orderAPIService from "../services/orderAPI";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { ConsoleLogger } from "@aws-amplify/core";


const orderStore = useOrderStore();
const route = useRoute();
const router = useRouter();
const orders: Ref<any[]> = ref([]);
const line_items: Ref<any[]> = ref([]);
const waiter: Ref<string> = ref("");
const restName: Ref<string> = ref("");
const account: Ref<any[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const menuName: Ref<string> = ref("");
const banner: Ref<string> = ref("");
const showTicket: Ref<boolean> = ref(false);

// If both params exist -> fetch ticketDATA ---->
if (route.params.restID && route.params.tableID) {
  (async () => {
    const result = await orderAPIService.getTicket(String(route.params.restID), String(route.params.tableID))
    console.log("result:", result);
    if (result) {
      orders.value = [0];
      if (result.ticket.length > 0) orders.value = result.ticket[0].orders;
      waiter.value = result.waiter;
      restName.value = result.restName;
    }
    loading.value = false;
    orderStore.emptyOrder();
  }
  )()
}

function backToMenu() {
  orderStore.emptyOrder();
  router.push("/customer/" + route.params.restID + '/' + route.params.tableID);
}
async function seeTicket() {
  account.value = await orderAPIService.getAccount(String(route.params.restID), String(route.params.tableID));
  account.value = JSON.parse(account.value.body);
  console.log(account.value)
}
</script>

<template>
  <div class="overflow-y-scroll h-full flex flex-col align-center">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
            
    <div v-if="(orders[0] === 0)" class="h-full m-2 flex flex-col  items-center justify-center">
      <div class="flex flex-col items-center justify-center bg-gray-100 gap-3 p-3 rounded-lg">
      
      <font-awesome-icon v-if="!showTicket" icon="fa-solid fa-circle-check fa-9x" class="animate-bounce text-violet-700" />
      <h1 v-if="!showTicket" class="font-regular text-lg">
      Your payment was successful.
      </h1>
      <p v-if="!showTicket" class="text-base font-light text-center">Thank you for dinning with us. We hope you enjoy your meal and wish you a good day.</p>
      
      <div v-if="(account.orders != 0)" class="flex flex-col content-center self-center py-10 ">
          

          <div  v-if="showTicket" class=" TICKET flex w-80 mt-4 flex-col items-center">
            <div class="flex w-full flex-row overflow-hidden content-center">
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
              <div class="arrow-up"></div>
            </div>
            <div class="flex px-8 justify-center bg-white content-center">
              <h1 class="space-y-4 py-5 sm:py-6 text-xl content-center">Ticket – {{ restName }}</h1>
            </div>
            <ul class="flex flex-col w-full items-center p-4 bg-white content-center text-black">
              <div v-for="order in account.orders">
                <div v-for="curr in order.CO">
                  <li>{{ curr.name }} , {{ curr.amount }} </li>
                </div>
    
                {{ order.CT }} EUR
              </div>
            </ul>
            <div class="flex flex-row w-full overflow-hidden content-center">
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
              <div class="arrow-down"></div>
            </div>
          </div>
        
    
    </div>

      </div>

      



      <div class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-2 justify-center ">
        <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded p-1 m-1"
          @click="backToMenu">Back to Menu</button>
        <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded p-1 m-1" @click="showTicket = !showTicket">See
          your ticket</button>
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
