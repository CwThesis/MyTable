<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";

const dishes = [
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: "9€",
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
  },
];
</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />
    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center">
        MENU
        <div class="flex flex-row">
          <div id="dishes" class="w-1/2 p-7">
            <div v-for="dish in dishes">
              <DishCard :dish="dish"></DishCard>
            </div>
          </div>
          <div id="menu" class="w-1/2 p-7">test</div>
        </div>
      </main>
    </div>
  </div>
</template>
