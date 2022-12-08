<script setup lang="ts">
import { useRouter } from "vue-router";
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
  <div class="authenticator flex flex-col">
    <div class="p-14">
        <a href="/"><h1 class="font-josefin font-semibold text-7xl text-violet-700 ">mytable<font-awesome-icon icon="fa-solid fa-qrcode" pull="left" class="pr-1"/></h1></a>
      </div>
<Authenticator/>
  </div>
</template>

<style>
.authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.amplify-button[data-variation='primary'] {
  background: linear-gradient(
    to right,
    #6b46c1,
    #6b46c1dd);
}
.amplify-tabs-item{
  color: #6b46c1;
  border-color: #6b46c1;
}
.amplify-tabs-item[data-state='active']{
  color: #6b46c1;
  border-color: #6b46c1;
}
.amplify-button--link{
  color: #6b46c1;
}

:root, [data-amplify-theme] {
  --amplify-components-authenticator-router-border-style: none;
  }
</style>
