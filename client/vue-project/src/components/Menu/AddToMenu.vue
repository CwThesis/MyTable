<script setup lang="ts">
import { ref, toRaw } from "vue";
import dishAPIService from "../../services/dishAPI";
import { Auth } from 'aws-amplify';
import AddDishModal from "../AddDishModal.vue";
import { useMenuStore } from "../../stores/menu.store";
import Toast from "../Toasts/Toast.vue";
import type {Dish} from "../../types";

const store = useMenuStore();
const showToast = ref(false);
const toastTitle = ref("");
const toastType = ref("success");
const dishTitle = ref("");
const dishDescription = ref("");
const dishPrice = ref(0);
const dishCurrency = ref("");
const dishCategory = ref("");
let dishImgUrl = ref("");
let userId: string = "";
const showModal = ref(false);

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
});

function openUploadModal() {
  window.cloudinary.openUploadWidget(
    {
      cloud_name: 'dvyn9lzkf',
      upload_preset: 'acgvtxok'
    },
    (error: Error, result: any) => {
      if (!error && result && result.event === "success") {
        dishImgUrl.value = result.info.url;
      } else if(error){
        console.log("error:", error)
      }
    }).open();
}

async function addDish(event: Event) {
  const formInput: Dish= {
    title: dishTitle.value,
    description: dishDescription.value,
    price: dishPrice.value,
    currency: dishCurrency.value,
    category: (dishCategory.value === "mains" || dishCategory.value === "starters" || dishCategory.value === "soups" || dishCategory.value === "desserts" || dishCategory.value === "drinks") ? dishCategory.value : 'mains',
    imgUrl: dishImgUrl.value,
    id: "",
    menu: false,
  };

  const res = await dishAPIService.newDish(formInput as Dish, userId);
  if (res && res.success) {
    showModal.value = false;
    store.currentNewDish = res.body;
    store.addToDishes(store.currentNewDish);
    toastTitle.value = "Added a new dish successfully!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  };
}
</script>

<template>
  <div v-if="showToast">
    <Toast :title="toastTitle" :type="toastType" />
  </div>
  <button type="submit" id="show-modal" @click="showModal = true"
    class="inline-flex justify-center rounded-full border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
    Add
  </button>
  <Teleport to="body">
    <AddDishModal :show="showModal" @submit="addDish" @close="showModal = false">
      <template #header>
        <p>Add a dish</p>
      </template>
      <template #body>
        <form @submit.prevent="addDish" method="POST">
          <div class="grid grid-cols-3 gap-4 mb-5">
            <!-- START DISH IMAGE UPLOAD -->
            <div class="col-span-1 row-span-2 col-start-1">
              <div class="mt-1 flex justify-center rounded border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <img :src="dishImgUrl" class="h-20 rounded">
              </div>
              <div class="flex flex-column text-sm text-gray-600">
                <div
                  class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <button type="button" @click="openUploadModal"> <font-awesome-icon
                      icon="fa-solid fa-cloud-arrow-up" /> Upload image</button>
                </div>
              </div>
            </div>
            <!-- END DISH IMAGE UPLOAD -->
            <div class="col-span-2 col-start-2">
              <input type="text" name="dish-title" id="dish-title" v-model="dishTitle" autocomplete="dish-title"
                placeholder="Title" class="mt-1 shadow appearance-none border rounded-lg w-full" required />
            </div>
            <div class="col-span-2 col-start-2">
              <textarea type="text" v-model="dishDescription" name="dish-description" id="dish-description"
                placeholder="Description" class="shadow appearance-none border rounded-lg w-full" />
            </div>
            <div class="col-span-1 col-start-2">
              <div class="relative mt-1 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">€</span>
                </div>
                <input type="number" min="1" name="dish-price" id="dish-price" v-model="dishPrice"
                  class="shadow appearance-none border rounded-lg w-full" placeholder="1" />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label for="currency" class="sr-only">Currency</label>
                  <select id="currency" name="currency" placeholder="EUR" v-model="dishCurrency"
                    class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-span-1 col-start-3">
              <select v-model="dishCategory" for="dish-category" placeholder="Category"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option>Mains</option>
                <option>Starters</option>
                <option>Soups</option>
                <option>Desserts</option>
                <option>Drinks</option>
              </select>
            </div>
          </div>
        </form>
      </template>
    </AddDishModal>
  </Teleport>
</template>

