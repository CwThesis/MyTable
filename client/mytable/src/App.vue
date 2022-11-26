<script setup lang="ts">
import { RouterView } from "vue-router";
import "../src/style.css";
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
}
</style>
