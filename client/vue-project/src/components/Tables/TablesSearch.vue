<script setup lang="ts">
import TableGrid from "./TableGrid.vue";
import { ref } from "vue";
import tableAPIService from '../..//services/tableAPI';
import { Auth } from 'aws-amplify';
import ModalView from '../ModalView.vue';

const searchQuery = ref("");
const userData: any = ref(null)
const fetchData = ref<any[]>([]);
const gridData = ref<any[]>([]);
const showModal = ref(false)
const newTableName = ref("");

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
    actions: el.id,
    QR: el.qr,
  }
});
  } 
  )()
})
const gridColumns = ["table", "pincode", "actions", "QR"];

async function handleTableCreation() {
  const res = await tableAPIService.newTable(newTableName.value, userData.value.username);
  if (res && res.success) {
    showModal.value = false;
    window.location.reload();
  } else alert('Could not create table');
}

</script>

<template>
  <form class="flex items-center justify-center" id="search">
    Search: <input class="shadow appearance-none border rounded" name="query" v-model="searchQuery" />
  </form>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="show-modal" @click="showModal = true">New Table</button>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >

<Teleport to="body">
  <!-- use the modal component, pass in the prop -->
  <ModalView :show="showModal" @submit="handleTableCreation" @close="showModal = false">
    <template #header>
      <p>Insert the new table name:</p>
    </template>
    <template #body>
      <input v-model="newTableName" type="text" placeholder="Table Name" required/>
    </template>
  </ModalView>
</Teleport>
  <div v-if="gridData.length">
    <TableGrid :userData="userData" :data="gridData" :columns="gridColumns" :filter-key="searchQuery"/>
  </div>
  <div v-else>
    Loading :)
  </div>
  </div>
</template>
