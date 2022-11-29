<script setup lang="ts">
import GridComp from "./GridComp.vue";
import { ref } from "vue";

const searchQuery = ref("");
const gridColumns = ["Number", "PIN", "status", "actions"];
const gridData = [
  {
    Number: 1,
    PIN: 0,
    status: "READY",
    actions: { delete: true, edit: true },
  },
  {
    Number: 2,
    PIN: 3724,
    status: "ACTIVE",
    actions: { delete: true, edit: true },
  },
  {
    Number: 3,
    PIN: 8952,
    status: "PAYING",
    actions: { delete: true, edit: true },
  },
  {
    Number: 4,
    PIN: 9844,
    status: "FREE",
    actions: { delete: true, edit: true },
  },
];
</script>

<template>
  <h4>Menu</h4>
  <form class="flex items-center justify-center" id="search">
    Search :<input name="query" v-model="searchQuery" />
  </form>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <GridComp :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
    </GridComp>
  </div>
</template>
