<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Ref } from 'vue'
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";
import DishCardSlim from "./DishCardSlim.vue";
import AddToMenu from "./AddToMenu.vue";
import AddMenuHeader from "./AddMenuHeader.vue";
import  dishAPIService  from "../../services/dishAPI"
import { Auth } from 'aws-amplify';
import menuAPIService from "../../services/menuAPI"

let userId = "";
let dishes: Ref<any> = ref([]);
let lists = ["Active Menu", "All Dishes"]
let currentList = ref(lists[0]);
let banner = ref(); // some initial value needed here!
const searchQuery = ref("");

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  (async () => {
    console.log("User id", userId);
    const res = await dishAPIService.getAllDishes(userId);
    if (currentList.value === "Active Menu"){
      dishes.value = res.body.filter((dish: { menu: boolean; }) => dish.menu === true)
    } else {
      dishes.value = res.body;
    }
    const res2 = await menuAPIService.getBanner(userId);
    banner.value = res2.body;
    console.log("Banner", banner.value);

  })()
});

const searchedDishes = computed(()=> {
  return dishes.value.filter((dish: { title: string; })=> {
    return (
      dish.title
      .toLowerCase()
      .indexOf(searchQuery.value.toLowerCase()) != -1
    )
  })
})

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

            <!-- BANNER -->
            <div v-if="banner.url" class="relative">
              <img :src="banner?.url" class="rounded-md object-cover "/>
              <h1 class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">{{banner?.title}}</h1>
            </div>
            
            <div v-else class="relative w-full bg-gradient-to-b from-violet-600">
              <img :src="banner?.url" class="rounded-md object-cover "/>
              <h1 class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">Our Menu</h1>
            </div>
            <!-- BANNER ends -->
            

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
           
            <div
              v-for="dish in searchedDishes"
              :key="dish.title"
              class="bg-gray-50 px-4 py-3"
            >
              <DishCard :dish="dish" :userId="userId"></DishCard>
            </div>
          </div>
          <div id="dishes" class="w-1/2 p-7 gap-6">

            
            <!-- SEARCH BAR -->
            <div id="top-container" class="flex flex-row gap-5 items-center mt-2 mb-2 py-2 px-2 justify-between">
              <h1 class="font-josefin font">ALL DISHES</h1>
              <form id="search" class="w-1/2">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="pr-1 text-gray-700" /> <input class="shadow appearance-none border rounded-full w-5/6" name="query" v-model="searchQuery" />
              </form>
              <AddToMenu />
            </div>

            
            <div
              v-for="dish in searchedDishes"
              :key="dish.title"
              class="bg-gray-50 px-4 py-2"
            >
              <DishCardSlim :dish="dish" :userId="userId"></DishCardSlim>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
