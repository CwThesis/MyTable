<script setup lang="ts">
import TableGrid from "./TableGrid.vue";
import { ref } from "vue";

const searchQuery = ref("");
const gridColumns = ["name", "PIN", "status", "actions", "url"];
const gridData = [
  {
    name: 1,
    PIN: 0,
    status: "READY",
    actions: { delete: true, edit: true },
    url: "http://google.com",
  },
  {
    name: 2,
    PIN: 3724,
    status: "ACTIVE",
    actions: { delete: true, edit: true },
    url: "http://localhost:5173/customer/48374857376",
  },
  {
    name: 3,
    PIN: 8952,
    status: "PAYING",
    actions: { delete: true, edit: true },
    url: "http://localhost:5173/customer/48374857446",
  },
  {
    name: 4,
    PIN: 9844,
    status: "FREE",
    actions: { delete: true, edit: true },
    url: "http://localhost:5173/customer/48374857890",
  },
];
</script>

<template>
  <h4>Menu</h4>
  <form class="flex items-center justify-center" id="search">
    Search: <input class="shadow appearance-none border rounded" name="query" v-model="searchQuery" />
  </form>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <TableGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
    </TableGrid>
  </div>
</template>
