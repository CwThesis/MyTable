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
import MobileModal from './MobileModal.vue';

const initSplit = {
  equal: true,
  set: true,
  item: true,
}

const orderStore = useOrderStore();
const showModal = ref(false);
const modeSplit = ref(initSplit)
const splitEqual = ref(false);
const splitNum = ref(1);
const splitSet = ref(0);
const itemSet = ref(0);
const splitItems = ref(false);
const splitType = ref();
const route = useRoute();
const router = useRouter();
const orders: Ref<any[]> = ref([]);
const line_items: Ref<any[]> = ref([]);
const waiter: Ref<string> = ref("");
const restName: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const menuName: Ref<string> = ref("");
const banner: Ref<string> = ref("");
const orderTotal = ref(0)

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
      orderTotal.value = orders.value.flatMap(obj => obj.CT).reduce((a, b) => a + b);
    }
    loading.value = false;

  }
  )()
}

async function payFullOrder() {
  const pay = toRaw(orders.value)
  const res = await orderAPIService.payTicket(pay as any[], route.params.restID as string, route.params.tableI as string);
  console.log('URL', res);
  window.location.assign(res.body);
  //handle response
  //orderStore.emptyOrder();
}

async function payEqualSplit() {
  const pay = toRaw(orders.value)
  splitEqual.value = true;
  splitItems.value = false;
  console.log("split form input", splitNum.value);
  const res = await orderAPIService.paySplitEqual(pay, splitNum.value, route.params.restID as string, route.params.tableID as string);
  console.log('return--->', JSON.stringify(res));
  window.location.assign(res.body);
  //handle response
  //orderStore.emptyOrder();
}

async function paySetAmount() {
  splitEqual.value = true;
  splitItems.value = false;
  const res = await orderAPIService.paySetAmount(splitSet.value, route.params.restID as string, route.params.tableID as string);
  console.log('return--->', JSON.stringify(res));
  window.location.assign(res.body);
  //handle response
  //orderStore.emptyOrder();
}

async function payByItems() {
  splitEqual.value = true;
  splitItems.value = false;
  const res = await orderAPIService.payTicket([], route.params.restID as string, route.params.tableID as string);
  console.log('return--->', JSON.stringify(res));
  window.location.assign(res.body);
  //handle response
  //orderStore.emptyOrder();
}

async function paySplitOrder() {
  showModal.value = true;
}

function backToMenu() {
  router.push("/customer/" + route.params.restID + '/' + route.params.tableID);
}
</script>

<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <MobileModal :show="showModal" @submit="splitType" @close="showModal = false">
      <template #header>
        <p>Choose how you want to split your bill:</p>
      </template>
      <template #body>

        <div class="flex flex-col">

          <!-- SPLIT EQUALLY -->
          <div
            class="BUTTONS flex flex-row inline-flex justify-center rounded-xl border border-violet-700 bg-transparent py-1 px-1 text-sm font-medium text-violet-700 shadow-sm">
            <div class="object-fill flex">


              <button
                class="p-2 text-black font-semibold rounded-l-lg focus:bg-violet-700 focus:text-white focus:outline-none"
                @click="(() => {
                  modeSplit.item = false;
                  modeSplit.set = false;
                  splitType = payEqualSplit;
                  return splitType;
                
                })">Split Equally</button>

            </div>
            <div class="flex">
              <!-- SET AMOUNT -->
              <button class="p-2 text-black font-semibold focus:bg-violet-700 focus:text-white focus:outline-none"
                @click="(() => {
                  modeSplit.equal = false;
                  modeSplit.set = false;
                  return splitType = paySetAmount;
                })">Set Exact Amount</button>


            </div>
            <div class="flex">

              <!-- SELECT ITEMS -->
              <button
                class="p-2 text-black font-semibold rounded-r-lg focus:bg-violet-700 focus:text-white focus:outline-none"
                @click="(() => splitType = payByItems)">Split by Item</button>
            </div>
          </div>
          <div style="height: 15vh">



            <div>
              <p class="font-semibold mt-2" v-if="(splitType == payEqualSplit)">
                Total bill: € {{ orderTotal }}
              </p>
              <div class="flex flex-row justify-start items-center">
                <p class="w-20" v-if="(splitType == payEqualSplit)">
                  Split by:
                </p>
                <input min=1 class="mt-1 shadow appearance-none border py-1 rounded-lg w-40" style="text-align: center"
                  v-if="(splitType == payEqualSplit)" v-model="splitNum" type="number" placeholder="0-9" required />
              </div>

              <p class="font-semibold text-lg pt-2" v-if="(splitType == payEqualSplit)">
                You will be paying: € {{ (orderTotal / splitNum) }}
              </p>

              <p class="font-semibold mt-2" v-if="(splitType == paySetAmount)">
                Total bill: € {{ orderTotal }}
              </p>
              <div class="flex flex-row justify-start items-center gap-4" v-if="(splitType == paySetAmount)">
                Amount:
                <input class="mt-1 shadow appearance-none border py-1 rounded-lg w-40" style="text-align: center"
                  v-if="(splitType == paySetAmount)" v-model="splitSet" type="number" placeholder="100" required />

              </div>
            </div>

          </div>
        </div>
      </template>
    </MobileModal>
  </Teleport>
  <div class="bg-white overflow-y-scroll h-full rounded-lg">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-if="!loading" class="flex flex-col content-center self-center py-10 ">
      <div class="flex flex-col py-2 bg-white items-center">
        <div class="flex z-40 fixed bottom-0 w-full bg-transparent h-20 flex p-2 justify-center ">
          <button class="bg-violet-700 m-1 hover:bg-violet-500 text-white font-semibold w-full rounded"
            @click="payFullOrder">Pay full bill</button>
          <button class="bg-violet-700 m-1 hover:bg-violet-500 text-white font-semibold w-full rounded"
            @click="paySplitOrder">Split the bill</button>
        </div>
        <h1 class="space-y-4 py-10 sm:py-6 text-xl font-semibold">Your order is being served!</h1>
        <h1 class="space-y-4 py-5 text-l">{{ restName }}</h1>
        <div class="bg-gray-200 rounded-md p-4" style="height: 130vw;">

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
            <div class="flex px-8 w-full justify-center bg-white content-center">
              <h1 class="space-y-4 w-full py-5 sm:py-6 text-xl content-center">Ticket - {{ restName }}</h1>
            </div>
            <ul class="flex pl-6 flex-col w-full items-start p-3 bg-white content-center">
              <div class="w-full px-2" v-for="order in orders">
                <div class="w-full" v-for="curr in order.CO">
                  <li class="flex flex-row justify-between w-full">
                    <div>{{ curr.name }} </div>
                    <div>{{ curr.amount }}x € {{ curr.price }}</div>
                  </li>
                </div>
              </div>
              <div class="pt-4">
                <h1 class="flex w-full font-semibold pl-44">
                  Total : € {{ orderTotal }}
                </h1>
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

          <div class="fixed h-15 top-0 bg-white pt-6 hover:font-bold text-violet-700 font-semibold w-full rounded"
            @click="backToMenu"> {{ "<" }} Back to Menu</div>
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
