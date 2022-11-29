<script setup lang="ts">
import { ref } from "vue";

const dishTitle = ref("");
const dishDescription = ref("");
const dishPrice = ref(0);
const dishCurrency = ref("");
const dishCategory = ref("");
const dishImgUrl = ref("");

function addDish(event: Event) {
  //const target = event.target as HTMLInputElement;
  const formInput = {
    title: dishTitle.value,
    description: dishDescription.value,
    price: dishPrice.value,
    currency: dishCurrency.value,
    category: dishCategory.value,
    imgUrl: dishImgUrl.value,
  };
  console.log(formInput);
}
</script>

<template>
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
              v-model="dishTitle"
              autocomplete="dish-title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div class="col-span-2 col-start-1">
            <label
              for="dish-description"
              class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              type="text"
              v-model="dishDescription"
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
              name="dish-price"
              id="dish-price"
              v-model="dishPrice"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div class="col-span-1 col-start-2">
            <select
              id="currency"
              name="currency"
              v-model="dishCurrency"
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
            <select
              v-model="dishCategory"
              for="dish-category"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option>Mains</option>
              <option>Starters</option>
              <option>Soups</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
          </div>
        </div>

        <!-- <form>
          <label>
            <input type="file" @change="browseFile" />
          </label>
          <button
            @click="upload"
            class="rounded-md border border-transparent bg-indigo-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div> -->

        <div class="col-span-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
