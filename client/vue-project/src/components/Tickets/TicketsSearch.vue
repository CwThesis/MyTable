<script setup lang="ts">
import TicketsGrid from "./TicketsGrid.vue";
import { ref } from "vue";
import ticketAPIService from '../..//services/ticketAPI';
import { Auth } from 'aws-amplify';
import LoadingSpinner from "../LoadingSpinner.vue";

//const searchQuery = ref("");
const userData: any = ref(null)
const fetchData = ref<any[]>([]);
const gridData = ref<any[]>([]);
const gridColumns = ["table", "orders", "total", "waiter"];
const waiters = ref<string[]>([]);
let isLoading = ref(true);

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userData.value = user;
  (async () => {
    const result = await ticketAPIService.getAllTickets(username)
    isLoading.value = false
    fetchData.value = result;
    console.log(result);
    gridData.value = fetchData.value.map((el) => {
      if(el.ticket.length) {
        function orderTotal (ticket: any){
        let orderTotal = 0
        for (let i = 0; i < ticket.orders.length; i++) {
          orderTotal += ticket.orders[i].CT
        }
        console.log(orderTotal)
        return orderTotal
      }
  
      return {
        table: {name: el.tableName, id: el.tableId},
        orders: el.ticket[0].orders,
        //total: el.ticket[0].orders,
        waiter: el.waiter,
        total: orderTotal(el.ticket[0]),
        /* totalPayed: el.ticket[0].payments[0].CT,
        leftToPay: (ticketAPIService.orderTotal(el.ticket[0])) - (el.ticket[0].payments[0].CT) */
      }
    }
  }); 
    gridData.value = gridData.value.filter((el) => el !== undefined)
    const result2 = await ticketAPIService.getAllWaiters(userData.value.username);
    waiters.value = result2;
  }
  )()
})
</script>

<template>
  <div id="tickets-search-container" class="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="isLoading">
    <LoadingSpinner />
    </div>
    <div v-else>
    <div id="TicketsGrid" v-if="gridData.length" class="p-10 mb-10 overflow-y-scroll" style="height:78vh">
    <TicketsGrid :userData="userData" :waiters="waiters" :data="gridData" :columns="gridColumns"/>
  </div>
 </div>
</div>
</template>
