<script setup lang="ts">
import type { Dish, DishIdWithAmount } from "../types";
import { computed } from "vue";
import DishCardMobile from "../components/Mobile/DishCardMobile.vue";
import type { Ref } from 'vue';
import { ref, toRaw, watch } from "vue";
import { useOrderStore } from "../stores/order.store";


const orderStore = useOrderStore();
// fetching dishes ---->
const dishes: Dish[] = [
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: 21,
    currency: "€",
    category: "mains",
    id: "132412dasd23"
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: 9,
    currency: "€",
    category: "starters",
    id: "132882dasd55"
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Brownie",
    description: "Chocolate and raspberries with nuts",
    price: 9,
    currency: "€",
    category: "desserts",
    id: "132409lksd26"
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: 21,
    currency: "€",
    category: "mains",
    id: "13241fjasd99"
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Milkshake",
    description: "Fresco y platano",
    price: 4,
    currency: "€",
    category: "drinks",
    id: "33412dasd564s"
  },
];


const sortByCategory = computed(() => {
  const menu = {
    starters: [] as Dish[],
    mains: [] as Dish[],
    desserts: [] as Dish[],
    drinks: [] as Dish[],
  };
  dishes.forEach((dish) => menu[dish.category].push(dish));

  return menu;
});

</script>

<template>
  <div class="py-2">
    <div class="bg-gray-300">
      <h1 class="space-y-4 py-5 sm:py-6 text-xl">Menu</h1>
    </div>
    <div>
      <h2>Starters</h2>
      <div
        v-for="dish in sortByCategory.starters"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish"></DishCardMobile>
      </div>
    </div>

    <div>
      <h2>Mains</h2>
      <div
        v-for="dish in sortByCategory.mains"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish"></DishCardMobile>
      </div>
    </div>

    <div>
      <h2>Desserts</h2>
      <div
        v-for="dish in sortByCategory.desserts"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish"></DishCardMobile>
      </div>
    </div>
    <div>
      <h2>Drinks</h2>
      <div
        v-for="dish in sortByCategory.drinks"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish"></DishCardMobile>
      </div>
    </div>

    <div v-if="(orderStore.currentOrder)" class="flex bg-gray-300 z-40 fixed bottom-0 w-full h-20 bg-amber-200 flex justify-center">
      <button >ORDER</button>
      <div v-for="dish in orderStore.currentOrder">
        <div>{{dish.id}}, {{dish.amount}} - </div>
      </div>
      <div>TOTAL: {{orderStore.currentTotal}}</div>
    </div>

  </div>
</template>
