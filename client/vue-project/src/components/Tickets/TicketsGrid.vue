<script setup lang="ts">
import { ref, computed, toRaw } from "vue";
import EditWaiterModal from "../EditWaiterModal.vue";
import ticketAPIService from '../../services/ticketAPI';

const props = defineProps({
  data: Array,
  columns: Array,
  waiters: Array,
  userData: Object
});

const showModal = ref(false)
const selectedWaiter = ref("");
const selectedTable = ref("");
const sortKey = ref("");
const sortOrders = ref(
  props.columns!.reduce((o, key) => ((o[key] = 1), o), {})
);

const filteredData = computed(() => {
  let { data, filterKey } = props;
  if (filterKey) {
    filterKey = filterKey.toLowerCase();
    data = data?.filter((row: any) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(String(filterKey)) > -1;
      });
    });
  }

  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key];
    data = data?.slice().sort((a, b) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }
  return data;
});



function sortBy(key: any) {
  sortKey.value = key;
  sortOrders.value[key] *= -1;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function handleTicketEdit(table: any) {
  showModal.value = true
  selectedTable.value = table;
}

async function handleWaiterEdit(waiter: string) {
  const newWaiter = props.waiters.filter((el) => el.name === waiter)[0];
  const res = await ticketAPIService.updateWaiter(toRaw(newWaiter), props.userData.username, toRaw(selectedTable.value) );
  if (res && res.success) {
    showModal.value = false;
    selectedWaiter.value = "";
    selectedTable.value = "";
    //window.location.reload();
  }
  else {
    alert('Something went wrong')
  }
}

</script>

<template>
  <div>
    <h1 class="text-sm font-josefin font-medium text-gray-700 mb-6">OPEN TABLES</h1>

    <table v-if="filteredData?.length" class="sm:rounded-lg">
      <thead>
        <tr class="overflow-hidden bg-white shadow sm:rounded-lg">
          <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }" class="text-sm font-medium text-gray-500">
            {{ capitalize(key as any) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData">
          <td v-for="key in columns" class="border-y">
          <td v-if="key === 'orders'" class="p-2 divide-y divide-gray-200 rounded-md  h-4/5 overflow-y-scroll bg-white rounded-lg min-w-full">
            <div class="flex flex-col items-start py-3 pl-3 pr-4 text-sm" v-for="order in entry[key]">
              <div v-for="dish in order.CO">
                <div class="mt-1 text-sm text-gray-900 flex flex-row"><p class="pr-2">{{ dish.amount }}</p>{{ dish.name }}</div>
              </div>
            </div>

          </td>
       <!--  <td v-else-if="key === 'total'">
            <div v-for="order in entry[key]">
              <div>{{ order.CT }}</div>
            </div>
          </td> -->
        
          <td v-else-if="key === 'total'" >
            <div class="flex flex-row mt-1 text-sm text-gray-900">{{entry[key]}}<p class="pl-2">EUR</p></div>
            
            <!-- <div v-for="order in entry[key]" class="mt-1 text-sm text-gray-900 ">
              <div>{{ order }}</div>
            </div> -->
          </td>


          <td v-else-if="key === 'waiter'" class="mt-1 text-sm text-gray-900">
            <div>
              {{ entry[key] || "Assign" }}
              <button
                class="inline-flex justify-center rounded-full border border-violet-700 bg-transparent py-2 px-4 text-sm font-medium text-violet-700 shadow-sm hover:bg-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                @click="handleTicketEdit(entry['table'])">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </button>
            </div>
          </td>

          <td v-else-if="key === 'table'" class="mt-1 text-sm text-gray-900">
            {{ entry[key].name }}
          </td>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else> <font-awesome-icon icon="fa-solid fa-clock" pull="top" shake class="pr-4"/>No entries found</p>
  </div>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <EditWaiterModal :waiters="waiters" :show="showModal" @submit="handleWaiterEdit(selectedWaiter)"
      @close="showModal = false">
      <template #header>
        <p>Choose the waiter to be assigned to the table:</p>
      </template>
      <template #body>
        <select class="shadow" v-model="selectedWaiter">
          <option v-for="waiter in props.waiters" :key="waiter.name" :value="waiter.name">
            {{ waiter.name }}
          </option>
        </select>
      </template>
    </EditWaiterModal>
  </Teleport>
</template>

<style>
th {
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: rgb(59, 59, 59);
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
