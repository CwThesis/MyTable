<script setup lang="ts">
import { RouterView } from "vue-router";
import { Authenticator } from '@aws-amplify/ui-vue';
import "@aws-amplify/ui-vue/styles.css";
import "./style.css";
</script>

<template>
  <div class="wrapper">
    <Authenticator>
      <router-view/>
    </Authenticator>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
