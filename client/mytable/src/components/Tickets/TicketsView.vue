<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import TicketsGrid from "./TicketsGrid.vue";


</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center">
        <TicketsGrid></TicketsGrid>
      </main>
    </div>
  </div>
</template>
