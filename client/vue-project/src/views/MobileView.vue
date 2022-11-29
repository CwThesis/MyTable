<script setup lang="ts">
import type { Dish } from "../types";
import { computed } from "vue";
import DishCard from "../components/Menu/DishCard.vue";

const dishes: Dish[] = [
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: "9€",
    category: "starters",
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Brownie",
    description: "Chocolate and raspberries with nuts",
    price: "9€",
    category: "desserts",
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Milkshake",
    description: "Fresco y platano",
    price: "4€",
    category: "drinks",
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
        <DishCard :dish="dish"></DishCard>
      </div>
    </div>

    <div>
      <h2>Mains</h2>
      <div
        v-for="dish in sortByCategory.mains"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCard :dish="dish"></DishCard>
      </div>
    </div>

    <div>
      <h2>Desserts</h2>
      <div
        v-for="dish in sortByCategory.desserts"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCard :dish="dish"></DishCard>
      </div>
    </div>
    <div>
      <h2>Drinks</h2>
      <div
        v-for="dish in sortByCategory.drinks"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCard :dish="dish"></DishCard>
      </div>
    </div>
  </div>
</template>
