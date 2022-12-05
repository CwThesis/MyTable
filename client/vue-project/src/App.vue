<script setup lang="ts">
import { RouterView } from "vue-router";
import "@aws-amplify/ui-vue/styles.css";
import "./style.css";
import { Authenticator } from "@aws-amplify/ui-vue";

</script>

<template>
  <div class="wrapper">
    <RouterView/>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
