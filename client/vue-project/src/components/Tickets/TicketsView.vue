<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import TicketsSearch from "./TicketsSearch.vue";


</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex h-full flex-col items-center">
        <div class="min-w-750 w-max">
        <TicketsSearch />
        </div>
      </main>
    </div>
  </div>
</template>
