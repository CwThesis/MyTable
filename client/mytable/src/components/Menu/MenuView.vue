<script setup lang="ts">
import { ref, computed } from "vue";
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import DishCard from "./DishCard.vue";

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
  },
  {
    img: "https://www.laylita.com/recetas/wp-content/uploads/2021/02/Receta-de-la-arepa-reina-pepiada.jpg",
    title: "Arepa",
    description: "Arepa with cheese, ham and egg",
    price: "9€",
    category: "starters",
  },
  {
    img: "https://images.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-t.jpg",
    title: "Paella",
    description:
      "Typical spanish paella, contains rice, chicken, seafood and vegetables",
    price: "21€",
    category: "mains",
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
              <div>
                <label class="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span
                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Toggle me</span
                  >
                </label>
                <DishCard :dish="dish"></DishCard>
              </div>
            </div>
          </div>
          <div id="dishes" class="w-1/2 p-7 gap-1">
            <h1 class="space-y-4 py-5 sm:py-6 text-l">Add to Menu</h1>
            <form action="#" @submit.prevent="addDish" method="POST">
              <div class="overflow-hidden shadow sm:rounded-md">
                <div class="bg-white px-4 py-5 sm:p-6 b">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="col-span-2 col-start-1">
                      <label
                        for="dish-title"
                        class="block text-sm font-medium text-gray-700"
                        >Title</label
                      >
                      <input
                        type="text"
                        name="dish-title"
                        id="dish-title"
                        autocomplete="dish-title"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-1 col-start-3 row-span-3">
                      <label class="block text-sm font-medium text-gray-700"
                        >Cover photo</label
                      >
                      <div
                        class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                      >
                        <div class="space-y-1 text-center">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-span-2 col-start-1">
                      <label
                        for="dish-description"
                        class="block text-sm font-medium text-gray-700"
                        >Description</label
                      >
                      <textarea
                        type="text"
                        name="dish-description"
                        id="dish-description"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-1 col-start-1">
                      <label
                        for="dish-description"
                        class="block text-sm font-medium text-gray-700"
                        >Price</label
                      >
                      <input
                        type="text"
                        name="dish-description"
                        id="dish-description"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-1 col-start-2">
                      <select
                        id="currency"
                        name="currency"
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>EUR</option>
                        <option>USD</option>
                        <option>GBP</option>
                      </select>
                    </div>

                    <div class="col-span-1 col-start-1">
                      <label
                        for="dish-description"
                        class="block text-sm font-medium text-gray-700"
                        >Category</label
                      >
                      <input
                        v-model="category"
                        type="text"
                        name="category"
                        id="category"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div class="flex col-span-1 col-start-2 py-1 px-1">
                      <div class="flex flex-row flex-wrap">
                        <p
                          v-for="item in searchCategory"
                          :key="item"
                          class="mt-2 text-sm text-gray-500 list-none bg-gray-200 rounded-md m-1 py-2 px-2"
                        >
                          {{ item }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            <!--  <div v-for="dish in dishes" :key="dish.title">
              <DishCard :dish="dish"></DishCard>
            </div> -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
