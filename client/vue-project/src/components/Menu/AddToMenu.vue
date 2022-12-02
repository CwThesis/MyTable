<script setup lang="ts">
import { ref } from "vue";
import  dishAPIService  from "../../services/dishAPI"
import { Auth } from 'aws-amplify';


const dishTitle = ref("");
const dishDescription = ref("");
const dishPrice = ref(0);
const dishCurrency = ref("");
const dishCategory = ref("");
let dishImgUrl = ref("");
let userId: string = "";

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
  console.log(userId);
});

function openUploadModal () {
  window.cloudinary.openUploadWidget(
        { cloud_name: 'dvyn9lzkf',
          upload_preset: 'acgvtxok'
        },
        (error: Error, result: any) => {
          if (!error && result && result.event === "success") {
            console.log('Done uploading..: ', result.info);
            dishImgUrl = result.info.url;
          }
        }).open();
}

async function addDish(event: Event) {
  const formInput = {
    title: dishTitle.value,
    description: dishDescription.value,
    price: dishPrice.value,
    currency: dishCurrency.value,
    category: dishCategory.value,
    imgUrl: dishImgUrl,
  };
  const res = await dishAPIService.newDish(formInput, userId);
  console.log(res);
}
</script>

<template>
  <h1 class="space-y-4 py-5 sm:py-6 text-l">Add a Dish</h1>
  <form @submit.prevent="addDish" method="POST">

    <div class="overflow-hidden shadow sm:rounded-md mb-5">
      <div class="bg-white px-4 py-5 sm:p-6 b">
        <div class="grid grid-cols-3 gap-4 mb-5">

            

          <div class="col-span-2 col-start-1">
            <label for="dish-title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="dish-title" id="dish-title" v-model="dishTitle" autocomplete="dish-title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required />
          </div>

          <!-- START DISH IMAGE UPLOAD -->
          <div class="col-span-1 row-span-2 col-start-3"> 
            <div class="mt-1 flex justify-center rounded-full border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <img :src="dishImgUrl" class="h-20 rounded-full">
            </div>
            <div class="flex flex-column text-sm text-gray-600">
                <div class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
              <button type="button" @click="openUploadModal">Upload image</button>
                </div>
              </div>
            </div>
            <!-- END DISH IMAGE UPLOAD -->

          <div class="col-span-2 col-start-1">
            <label for="dish-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea type="text" v-model="dishDescription" name="dish-description" id="dish-description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>

          


          <div class="col-span-1 col-start-1">
    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span class="text-gray-500 sm:text-sm">$</span>
      </div>
      <input type="text" name="dish-price" id="dish-price" v-model="dishPrice" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label for="currency" class="sr-only">Currency</label>
        <select id="currency" name="currency" v-model="dishCurrency" class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option>USD</option>
          <option>CAD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  </div>


<!-- 
          <div class="col-span-1 col-start-1">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="dish-price" id="dish-price" v-model="dishPrice"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>

          <div class="col-span-1 col-start-2">
            <select id="currency" name="currency" v-model="dishCurrency"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option>EUR</option>
              <option>USD</option>
              <option>GBP</option>
            </select>
          </div> -->

          <div class="col-span-1 col-start-2">
            <label for="dish-description" class="block text-sm font-medium text-gray-700">Category</label>
            <select v-model="dishCategory" for="dish-category"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option>Mains</option>
              <option>Starters</option>
              <option>Soups</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
          </div>
        </div>


        <div class="col-span-1 col-start-4 bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add
          </button>

        </div>
      </div>
    </div>
  </form>

</template>

<!-- 
 -->