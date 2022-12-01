<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from 'vue'
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";
import AddToMenu from "./AddToMenu.vue";
import  dishAPIService  from "../../services/dishAPI"
import { Auth } from 'aws-amplify';

let userId = "";
let dishes: Ref<any> = ref([]);
let lists = ["Active Menu", "All Dishes"]
let currentList = ref(lists[0]);

  /* Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  }); */

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  (async () => {
    console.log(userId);
    const res = await dishAPIService.getAllDishes(userId);
    if (currentList.value === "Active Menu"){
      dishes.value = res.body.filter((dish: { menu: boolean; }) => dish.menu === true)
    } else {
      dishes.value = res.body;
    }
  })()
});

watch(currentList, async () => {
    const res = await dishAPIService.getAllDishes(userId);
    if (currentList.value === "Active Menu"){
      dishes.value = res.body.filter((dish: { menu: boolean; }) => dish.menu === true)
    } else {
      dishes.value = res.body;
    }
  })


</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center">
        <div class="flex flex-row">
          <div id="menu" class="w-1/2 p-7">
            
            <!-- RADIO BUTTON for ACTIVE MENU and ALL DISHES -->
            <template v-for="list in lists">
              <input type="radio"
                :id="list"
                :value="list"
                 name="list"
                v-model="currentList">
             <label :for="list">{{ list }}</label>
              </template>
            <!-- RADIO ENDS HERE -->
            
            <!-- <h1 class="space-y-4 py-5 sm:py-6 text-xl">Active Menu</h1> -->
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
