<script setup lang="ts">
import TopNavbar from "../components/TopNavbar.vue";
import SideNavbar from "../components/SideNavbar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center"></main>
    </div>
  </div>
</template>
