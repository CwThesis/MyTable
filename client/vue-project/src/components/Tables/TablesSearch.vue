<script setup lang="ts">
import TableGrid from "./TableGrid.vue";
import { ref } from "vue";
import tableAPIService from '../..//services/tableAPI';
import { Auth } from 'aws-amplify';
import ModalView from '../ModalView.vue';
import Toast from "../Toasts/Toast.vue";
import LoadingSpinner from "../LoadingSpinner.vue";

const isLoading = ref(true);

const showToast = ref(false);
const toastTitle = ref("");
const toastType = ref("success");

const searchQuery = ref("");
const userData: any = ref(null)
const fetchData = ref<any[]>([]);
const gridData = ref<any[]>([]);
const showModal = ref(false)
const newTableName = ref("");

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userData.value = user;
  (async () => {
    const result = await tableAPIService.getAllTables(username)
    fetchData.value = result;
    gridData.value = fetchData.value.map((el) => {
      return {
        table: el.name,
        pincode: el.pincode,
        actions: el.id,
        QR: el.qr,
      }
    });
    isLoading.value = false;
  }
  )()
})
const gridColumns = ["table", "pincode", "actions", "QR"];

async function handleTableCreation() {
  const res = await tableAPIService.newTable(newTableName.value, userData.value.username);
  if (res && res.success) {
    showModal.value = false;
    if (res && res.success) {
      toastTitle.value = "New table created!";
      toastType.value = "success";
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
        window.location.reload();
      }, 2000);
    }
  } else {
    if (res && res.success) {
      toastTitle.value = "Oops, something went wrong :(";
      toastType.value = "danger";
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 1000);
    }
  }
}
</script>

<template>
    <div v-if="isLoading" class="h-full"> 
      <LoadingSpinner />
    </div>
  <div v-if="showToast">
    <Toast :title="toastTitle" :type="toastType" />
  </div>
  <div id="top-container" class="flex flex-row gap-5 items-center px-4 mt-10 justify-between px-4 sm:px-6 lg:px-8">
    <form id="search" class="w-2/3">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="pr-1 text-gray-700" /> <input
        class="shadow appearance-none border rounded-full" name="query" v-model="searchQuery" />
    </form>
    <button class="bg-violet-700 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-full" id="show-modal"
      @click="showModal = true">New Table</button>
  </div>
  <div id="table" class="p-10 mb-10 overflow-y-scroll" style="height:78vh">
    <Teleport to="body">
      <ModalView :show="showModal" @submit="handleTableCreation" @close="showModal = false">
        <template #header>
          <p>Insert the new table name:</p>
        </template>
        <template #body>
          <input v-model="newTableName" type="text" placeholder="Table Name" required />
        </template>
      </ModalView>
    </Teleport>
    <div id="TableGrid" v-if="gridData.length">
      <TableGrid :userData="userData" :data="gridData" :columns="gridColumns" :filter-key="searchQuery" />
    </div>
    <div v-else>
      <font-awesome-icon icon="fa-solid fa-spinner" spin-pulse />
    </div>
  </div>
</template>
