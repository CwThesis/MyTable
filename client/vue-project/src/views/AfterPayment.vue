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
  showTicket.value = true;
  console.log(showTicket.value);
  account.value = await orderAPIService.getAccount(String(route.params.restID), String(route.params.tableID));
  account.value = JSON.parse(account.value.body);
  console.log(account.value)
}
</script>

<template>
  <div class="bg-gray-200 overflow-y-scroll h-full rounded-lg">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    {{ (orders[0] = 0) }}
    <div v-if="(orders[0] != 0)" class="flex flex-col content-center self-center py-10 ">
      <div class="flex flex-col py-2 bg-gray-200 items-center">
        <div class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-2 justify-center ">
          <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded"
            @click="payOrder">PAY</button>
        </div>
        <h1 class="space-y-4 py-5 sm:py-6 text-xl">Your order is being served!</h1>
        <h1 class="space-y-4 py-5 text-l">{{ restName }}</h1>
        <div class="bg-gray-100 rounded-md p-4" style="height: 130vw;">

          <div class=" TICKET flex w-80 mt-4 flex-col items-center">
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
              <h1 class="space-y-4 py-5 sm:py-6 text-xl content-center">Ticket - {{ restName }}</h1>
            </div>
            <ul class="flex flex-col w-full items-center p-4 bg-white content-center">
              <div v-for="order in orders">
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
    </div>
    <div v-if="(orders[0] === 0)">
      A successful payment has been processed. Thank you for dining with us. We hope you enjoyed your meal and have a
      great day!


      <div v-if="(account.orders != 0)" class="flex flex-col content-center self-center py-10 ">
        <div class="flex flex-col py-2 bg-gray-200 items-center">
          <div class="bg-gray-100 rounded-md p-4" style="height: 130vw;">

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
                <h1 class="space-y-4 py-5 sm:py-6 text-xl content-center">Ticket - {{ restName }}</h1>
              </div>
              <ul class="flex flex-col w-full items-center p-4 bg-white content-center">
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
      </div>



      <div class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-2 justify-center ">
        <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded"
          @click="backToMenu">Back to Menu</button>
        <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold w-full rounded" @click="seeTicket">See
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
