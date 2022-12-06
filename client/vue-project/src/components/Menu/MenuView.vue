<script setup lang="ts">
import { ref, watch, computed, toRaw } from "vue";
import type { Ref } from 'vue'
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";
import DishCardSlim from "./DishCardSlim.vue";
import AddToMenu from "./AddToMenu.vue";
import type {Banner, Dish} from "../../types"
//import AddMenuHeader from "./AddMenuHeader.vue";
import  dishAPIService  from "../../services/dishAPI"
import { Auth } from 'aws-amplify';
import menuAPIService from "../../services/menuAPI"
import { useMenuStore } from "../../stores/menu.store"

const store = useMenuStore();
let userId = "";
const editMode = ref(false);
const activeMenu: Ref<Dish[]> = ref([]);
//let dishes: Ref<any> = ref([]);
//let newDish = ref({});
//let lists = ["Active Menu", "All Dishes"]
//let currentList = ref(lists[0]);
let banner: Ref<Banner> = ref({url: "http://res.cloudinary.com/dvyn9lzkf/image/upload/v1669984775/vfk6kogi0wbbbeu5eroc.jpg", title:"Title"}); // some initial value needed here! (placeholder before it is loaded)
const searchQuery = ref("");


Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  (async () => {
    const res = await dishAPIService.getAllDishes(userId);
    store.dishes = res.body;
    const dishesArray = toRaw(store.dishes)
    activeMenu.value = dishesArray.filter((dish: { menu: boolean; }) => dish.menu === true)
   
    const res2 = await menuAPIService.getBanner(userId);
    banner.value = res2.body;
    console.log(banner.value)
  })()
});



const searchedDishes = computed(()=> {
  const dishesArray = toRaw(store.dishes)
  console.log("Dishes list from searchedDishes:", dishesArray)
  return dishesArray.filter((dish: { title: string; })=> {
    return (
      dish.title
      .toLowerCase()
      .indexOf(searchQuery.value.toLowerCase()) != -1
    )
  })
})

const allDishes = computed({
  get: () => {
    return toRaw(store.dishes).filter((dish) => {
      return (
        dish.title
        .toLowerCase()
        .indexOf(searchQuery.value.toLowerCase()) != -1
      )
    }
)},
  set: (newValue) => {
    newValue = toRaw(store.dishes)
    store.addToDishes(toRaw(store.currentNewDish));
    console.log("set computed:", newValue)
    return newValue.filter((dish)=>{
      return (
        dish.title
        .toLowerCase()
        .indexOf(searchQuery.value.toLowerCase()) != -1
      )
    })
  }
})


// watch for changes in dishes and updates active menu
watch(()=> store.dishes, () => {
    console.log("hello");
    const dishesArray = toRaw(store.dishes)
    activeMenu.value = dishesArray.filter((dish: { menu: boolean; }) => dish.menu === true)
  })

  async function handleEditBanner (banner: Banner, newValue: string) {
    banner = toRaw(banner);
    banner.title = newValue;
    //banner.url = bannerNewUrl;
    const res = await menuAPIService.updateBanner(banner, userId)
    if (res && res.success) {
    console.log("banner was edited");
  }
  }

  
</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex flex-1 justify-center w-full xl:w-11/12">
        
          <div id="menu" class="w-1/2 p-7 flex justify-center">
            <div id="active-menu" class="max-w-xl">

            <div id="top-container" class="flex flex-row gap-5 items-center mt-2 mb-2 py-2 px-2 justify-start">
              <h1 class="font-josefin">ACTIVE MENU</h1>
            </div>

            <div class="overflow-y-scroll rounded-xl bg-gray-50 h-[80vh] max-w-screen-sm">

            <!-- BANNER -->
            <div v-if="banner.url" class="relative px-4 py-3">
              <img :src="banner?.url" class="rounded-md object-cover"/>
              <h1 :contenteditable="editMode" @blur="((e) => handleEditBanner(banner, e.target.innerText))" class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">{{banner?.title}}</h1>
              <button class="absolute text-gray-600 top-4 right-6 bg-white px-3 py-2 rounded-full " @click="(editMode = !editMode)"> 
                <font-awesome-icon icon="fa-solid fa-pen fa-lg" /></button>
            </div>
            
            <div v-else class="relative w-full bg-gradient-to-b from-violet-600">
              <img :src="banner?.url" class="rounded-md object-cover "/>
              <h1 class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">Our Menu</h1>
            </div>
            <!-- BANNER ends -->
            

            <!-- RADIO BUTTON for ACTIVE MENU and ALL DISHES -->
           <!--  <template v-for="list in lists">
              <input type="radio"
                :id="list"
                :value="list"
                 name="list"
                v-model="currentList">
             <label :for="list">{{ list }}</label>
              </template> -->
            <!-- RADIO ENDS HERE -->
           
            <div
              v-for="dish in activeMenu"
              :key="dish.title"
              class="px-4 py-3"
            >
              <DishCard :dish="dish" :userId="userId"></DishCard>
            </div>
          </div>
        </div>
        </div>


          <div id="dishes" class="w-1/2 p-7 gap-6">
            <!-- SEARCH BAR -->
            <div id="top-container" class="flex flex-row gap-2 items-center mt-2 mb-2 py-2 px-2 justify-between">
              <h1 class="font-josefin">ALL DISHES</h1>
              <form id="search" class="w-1/2">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="pr-1 text-gray-700" /> 
                <input class="shadow appearance-none border rounded-full w-5/6" name="query" v-model="searchQuery" />
              </form>
              <AddToMenu />
            </div>

            <div class="overflow-y-scroll h-[80vh] rounded-xl bg-gray-50">
            <div
              v-for="dish in store.dishes"
              :key="dish.title"
              class="px-4 pt-2"
            >
              <DishCardSlim :dish="dish" :userId="userId"></DishCardSlim>
            </div>
            </div>
            
          </div>
      
      </main>
    </div>
  </div>
</template>
