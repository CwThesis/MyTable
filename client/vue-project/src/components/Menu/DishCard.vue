<script setup lang="ts">
import { ref } from "vue";
import menuAPIService from "../../services/menuAPI"
import dishAPIService from "../../services/dishAPI";
import { useMenuStore } from "../../stores/menu.store"

const store = useMenuStore();

const props = defineProps({
  dish: Object,
  userId: String,
});

let dishStatus = ref(props.dish?.menu);

async function toggleBtn() {
  const res = await menuAPIService.toggleDish(props.dish?.id, props.userId);
  const dishes = await dishAPIService.getAllDishes(props.userId as string)
  store.dishes = dishes.body;
}

</script>

<template>
  <div>
    <li
      class="relative mb-3 flex flex-row justify-start items-center bg-white shadow rounded-lg cursor-move border border-white">

      <div class="rounded-full p-2">
        <img class="rounded-md object-cover h-40 w-40" :src="props.dish?.imgUrl" :alt="props.dish?.title" />
      </div>

      <div class="p-4 flex flex-col items-start justify-start ml-2 gap-2">
        <p class="text-gray-700 text-xl font-josepin font-semibold tracking-wide">
          {{ props.dish?.title }}
        </p>
        <div class="flex items-center ">
          <p class="text-gray-700 font-sans tracking-wide">
            {{ props.dish?.description }}
          </p>
        </div>
        <div class="flex">
          <p class="text-gray-700 font-sans font-semibold tracking-wide">
            {{ props.dish?.price }} {{ props.dish?.currency }}
          </p>
        </div>
        <label :for=props.dish?.id class="inline-flex absolute items-center cursor-pointer bottom-2 right-2">
          <input type="checkbox" v-model="dishStatus" :id=props.dish?.id class="sr-only peer" @change="toggleBtn" />

          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600">
          </div>
          <!-- <span
        class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{dishStatus}}</span> -->
        </label>
      </div>
    </li>
  </div>
</template>
