<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from 'vue'
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";
import AddToMenu from "./AddToMenu.vue";
import  dishAPIService  from "../../services/dishAPI"
import { Auth } from 'aws-amplify';

let userId = "";
let dishes: Ref<any> = ref([]);

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  (async () => {
    console.log(userId);
    const res = await dishAPIService.getAllDishes(userId);
    dishes.value = res.body;
    console.log(dishes.value)
  })()
});


</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center">
        <div class="flex flex-row">
          <div id="menu" class="w-1/2 p-7">
            <h1 class="space-y-4 py-5 sm:py-6 text-xl">Active Menu</h1>
            <div
              v-for="dish in dishes"
              :key="dish.title"
              class="bg-gray-50 px-4 py-3"
            >
              <DishCard :dish="dish" :userId="userId"></DishCard>
            </div>
          </div>
          <div id="dishes" class="w-1/2 p-7 gap-1">
            <AddToMenu />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
