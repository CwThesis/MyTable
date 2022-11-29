<script setup lang="ts">
import { RouterView } from "vue-router";
import { Authenticator } from '@aws-amplify/ui-vue';
import "@aws-amplify/ui-vue/styles.css";
import "./style.css";
</script>

<template>
  <div class="wrapper">
    <Authenticator>
      <!-- <template v-slot="{ user, signOut }"> -->
        <!-- <h1>Hello {{ user.username }}!</h1> -->
        <!-- <button @click="signOut">Sign Out</button> -->
        <RouterView />
      <!-- </template> -->
    </Authenticator>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
