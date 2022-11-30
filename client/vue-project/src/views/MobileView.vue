<script setup lang="ts">
import type { Dish, DishIdWithAmount } from "../types";
import { computed } from "vue";
import DishCardMobile from "../components/Mobile/DishCardMobile.vue";
import type { Ref } from 'vue';
import { ref, toRaw } from "vue";


let order: Ref<DishIdWithAmount[]> = ref([]);

// fetching dishes ---->
const dishes: Dish[] = [
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
    id: 1
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: "9€",
    category: "starters",
    id: 2
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Brownie",
    description: "Chocolate and raspberries with nuts",
    price: "9€",
    category: "desserts",
    id: 3
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
    id: 4
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Milkshake",
    description: "Fresco y platano",
    price: "4€",
    category: "drinks",
    id: 5
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

function addToOrder (dish: Dish) {
   if (order.value.find(element => element.id === dish.id)) {
   const object = order.value.find(element => element.id === dish.id)
    if(object)object.amount++
    } else {
    const dishIdWithAmount = {
      id: dish.id,
      amount: 1
    }
    order.value.push(dishIdWithAmount);
    }
    const newOrder = toRaw(order.value);
    console.log(newOrder);
  }

function removeFromOrder (dish: Dish) {
   const object = order.value.find(element => element.id === dish.id)
      if(object){object.amount--
        const newOrder = toRaw(order.value);
        console.log(newOrder);
        if(object.amount === 0){
          console.log("I should hide MINUS button")
          console.log("I should delete object")
        }
      }
}


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
        <DishCardMobile :dish="dish" @addToOrder="addToOrder" @removeFromOrder="removeFromOrder"></DishCardMobile>
      </div>
    </div>

    <div>
      <h2>Mains</h2>
      <div
        v-for="dish in sortByCategory.mains"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish" @add-to-order="addToOrder" @removeFromOrder="removeFromOrder"></DishCardMobile>
      </div>
    </div>

    <div>
      <h2>Desserts</h2>
      <div
        v-for="dish in sortByCategory.desserts"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish" @addToOrder="addToOrder" @removeFromOrder="removeFromOrder"></DishCardMobile>
      </div>
    </div>
    <div>
      <h2>Drinks</h2>
      <div
        v-for="dish in sortByCategory.drinks"
        :key="dish.title"
        class="bg-gray-50 px-4 py-3"
      >
        <DishCardMobile :dish="dish" @addToOrder="addToOrder" @removeFromOrder="removeFromOrder"></DishCardMobile>
      </div>
    </div>

    <div v-if="order" class="bg-gray-300">
      <button>ORDER</button>
    </div>

  </div>
</template>
