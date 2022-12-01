<script setup lang="ts">
import { ref, computed } from "vue";
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";
import AddToMenu from "./AddToMenu.vue";

function addDish(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.title);
}

const category = ref<string>("");

const categories: string[] = ["mains", "starters"];

const searchCategory = computed(() => {
  let filter = new RegExp(category as unknown as string);
  return categories.filter((item) => item.match(filter));
});

const dishes = [
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
    status: true,
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: "9€",
    category: "starters",
    status: true,
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
    status: true,
  },
];
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
              <DishCard :dish="dish"></DishCard>
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
