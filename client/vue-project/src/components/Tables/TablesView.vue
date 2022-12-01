<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import TablesGrid from "./TablesSearch.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center"><TablesGrid></TablesGrid></main>
    </div>
  </div>
</template>
