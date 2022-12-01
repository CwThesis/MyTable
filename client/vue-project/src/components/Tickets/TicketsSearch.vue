<script setup lang="ts">
import TicketsGrid from "./TicketsGrid.vue";

const gridColumns = ["ID", "Time", "Waiter", "Total", "Left to pay"];
const gridData = [
  {
    ID: 85585,
    Time: "12:00",
    Waiter: "John",
    Total: 100.33,
    "Left to pay": 50.12,
  },
  {
    ID: 38688,
    Time: "13:09",
    Waiter: "MarkK",
    Total: 288.0,
    "Left to pay": 120.21,
  },
  {
    ID: 32434,
    Time: "13:21",
    Waiter: "Xavi",
    Total: 35.33,
    "Left to pay": 35.33,
  },
  {
    ID: 68686,
    Time: "12:55",
    Waiter: "Manolo",
    Total: 82.21,
    "Left to pay": 44.11,
  },
];
</script>

<template>
  <h4>Tickets</h4>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <TicketsGrid :data="gridData" :columns="gridColumns"> </TicketsGrid>
  </div>
</template>
