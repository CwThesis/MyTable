<script setup lang="ts">
import TicketsGrid from "./TicketsGrid.vue";
import { ref } from "vue";
import ticketAPIService from '../..//services/ticketAPI';
import { Auth } from 'aws-amplify';


//const searchQuery = ref("");
const userData: any = ref(null)
const fetchData = ref<any[]>([]);
const gridData = ref<any[]>([]);
const gridColumns = ["table", "orders", "total", "waiter"];


Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userData.value = user;
  (async () => {
    const result = await ticketAPIService.getAllTickets(username)
    fetchData.value = result;
    console.log("result:", fetchData.value)
    gridData.value = fetchData.value.map((el) => {
      if(el.ticket.length) {
      return {
        //add waiter later
        table: el.tableName,
        orders: el.ticket[0].orders,
        total: el.ticket[0].orders,
        waiter: el.waiter
      }
    }
    }); gridData.value = gridData.value.filter((el) => el !== undefined)
    console.log(gridData.value)
  }
  )()
})
</script>

<template>
  
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <TicketsGrid :data="gridData" :columns="gridColumns"> </TicketsGrid>
  </div>
</template>
