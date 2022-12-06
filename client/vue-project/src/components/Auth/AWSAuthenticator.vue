<script setup lang="ts">
import { useRouter } from "vue-router";
import "@aws-amplify/ui-vue/styles.css";
import { Authenticator } from "@aws-amplify/ui-vue";
import { Hub } from 'aws-amplify';

const router = useRouter();

Hub.listen('auth', (data) => {
  const { payload } = data;
  if (payload.event === 'signIn') {
    router.push('/dashboard/tickets');
  }
  if (payload.event === 'signOut') {
    router.push('/login');
  }
  if (payload.event === 'signIn') {
    router.push('/onboarding');
  }
});
</script>

<template>
<Authenticator />
</template>
