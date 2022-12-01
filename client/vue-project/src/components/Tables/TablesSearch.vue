<script setup lang="ts">
import TableGrid from "./TableGrid.vue";
import { ref } from "vue";
import tableAPIService from '../..//services/tableAPI';
import { Auth } from 'aws-amplify';

const searchQuery = ref("");
const userData: any = ref(null)
const fetchData = ref<any[]>([]);
const gridData = ref<any[]>([]);



Auth.currentAuthenticatedUser().then((u)=>{
  const email = u.attributes.email;
  const username = u.username;
  const user = {email, username}
  userData.value = user;
  (async ()=>{
    const result = await tableAPIService.getAllTables(username)
    fetchData.value = result;
    console.log("result:" , fetchData)
    gridData.value = fetchData.value.map((el)=>{
    return {
    table: el.name,
    pincode: el.pincode,
    actions: 'test',
    QR: el.qr,
  }
});
  } 
  )()
})

const gridColumns = ["table", "pincode", "actions", "QR"];

</script>

<template>
  <h4>Menu</h4>
  <form class="flex items-center justify-center" id="search">
    Search: <input class="shadow appearance-none border rounded" name="query" v-model="searchQuery" />
  </form>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
  <div v-if="gridData.length">
    <TableGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery"/>
  </div>
  <div v-else>
    Loading :)
  </div>
  </div>
</template>
