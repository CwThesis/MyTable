<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, toRaw } from "vue";
import  dishAPIService  from "../../services/dishAPI"
import  menuAPIService  from "../../services/menuAPI"
import ModalDeleteDish from "../ModalDeleteDish.vue";
import ModalEditDish from "../ModalEditDish.vue";
import { useMenuStore } from "../../stores/menu.store"
import type { Dish } from "../../types";
import type {Ref} from "vue";

const store = useMenuStore();

const props = defineProps({
  dish: Object,
  userId: String,
});

let updatedDishUrl  = ref(props.dish?.imgUrl);
const dishTitle = ref(props.dish?.dishTitle);
const dishDescription = ref(props.dish?.dishDescription);
const dishPrice = ref(props.dish?.dishPrice);
const dishCurrency = ref(props.dish?.dishCurrency);
const dishCategory = ref(props.dish?.dishCategory);
let dishImgUrl = ref(props.dish?.imgUrl);
const dishId = ref(props.dish?.id);

const showModal = ref(false)
const showModalDelete = ref(false)
const dishToDeleteId = ref("");
let dishToEdit: Ref<Dish | null> = ref(null);
let dishStatus = ref(props.dish?.menu);

async function toggleBtn() {
 const res = await menuAPIService.toggleDish(props.dish?.id, props.userId as string);
 const dishes = await dishAPIService.getAllDishes(props.userId as string)
 store.dishes = dishes.body;
 console.log(dishes.body)
}
function openUploadModal () {
  window.cloudinary.openUploadWidget(
        { cloud_name: 'dvyn9lzkf',
          upload_preset: 'acgvtxok'
        },
        (error: Error, result: any) => {
          if (!error && result && result.event === "success") {
            console.log('Done uploading..: ', result.info);
            updatedDishUrl.value = result.info.url;
            console.log(updatedDishUrl.value)
          }
        }).open();
}

function dishToDelete (id: string) {
  console.log("from handle delete", id)
  showModalDelete.value = true;
  dishToDeleteId.value = id;
  console.log(dishToDeleteId.value);
}

function handleDishToEdit (dish: Dish) {
  showModal.value = true;
  dishToEdit.value = dish;
}

async function deleteOneDish() {
  console.log(dishToDeleteId)
  const res = await dishAPIService.deleteDish(dishToDeleteId.value, props.userId as string);
  if (res && res.success) {
    showModal.value = false;
    console.log(res.body);
    store.deleteFromDishes(dishToDeleteId.value)
    console.log(store.dishes)
  } else alert('Could not delete a dish');
}

async function editOneDish (event: Event) {

  console.log(dishToEdit.value);

  let newTitle = document.getElementById('dish-title') as HTMLInputElement | null
  let newDescription = document.getElementById('dish-description') as HTMLInputElement | null
  let newPrice = document.getElementById('dish-price') as HTMLInputElement | null
  let newCurrency = document.getElementById('currency') as HTMLInputElement | null
  let newCategory = document.getElementById('category') as HTMLInputElement | null
  
  const updatedDish = {
    title: newTitle?.value,
    description: newDescription?.value,
    price: newPrice?.value,
    currency: newCurrency?.value,
    category: newCategory?.value,
    id: dishToEdit.value?.id,
    imgUrl: updatedDishUrl.value,
    menu: dishToEdit.value?.menu,
  }
  console.log("Am I updated?", updatedDish)
  const res = await dishAPIService.updateDish(updatedDish, props.userId as string);
  if (res && res.success) {
    showModal.value = false;
    console.log(res.body);
    store.updateDish(updatedDish);
    dishToEdit.value = null;
  } else alert('Could not update a dish');
}

</script>

<template>
 <div>
  <li
    class="relative mb-3 flex flex-row justify-start items-center bg-white shadow rounded-lg cursor-move border border-white"
  >

  <div class="rounded-full p-2">
      <img
        class="rounded-md object-cover h-20 w-20"
        :src="props.dish?.imgUrl"
        :alt="props.dish?.title"
      />
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
        {{ props.dish?.price }} {{props.dish?.currency}}
      </p>
    </div>
    <button @click="dishToDelete(props.dish?.id)" class="inline-flex absolute items-center cursor-pointer top-2 right-2 text-gray-300 hover:text-gray-700">
      <font-awesome-icon icon="fa-solid fa-trash fa-lg" />
    </button>
    <button @click="handleDishToEdit(props.dish)" class="inline-flex absolute items-center cursor-pointer top-10 right-2 text-gray-300 hover:text-gray-700">
      <font-awesome-icon icon="fa-solid fa-pen fa-lg" />
    </button>

    <label :for="`dishcard-${props.dish?.id}`"
      class="inline-flex absolute items-center cursor-pointer bottom-2 right-2"
    >
      <input type="checkbox" v-model="dishStatus" :id="`dishcard-${props.dish?.id}`" class="sr-only peer" @change="toggleBtn" />
      
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"
      ></div>
      <!-- <span
        class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{dishStatus}}</span> -->
    </label>

    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
      <ModalDeleteDish :show="showModalDelete" @submit="deleteOneDish" @close="showModalDelete = false">
        <template #header>
          <p>Are you sure you want to delete the dish?</p>
        </template>
      </ModalDeleteDish>
    </Teleport>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalEditDish :show="showModal" @submit="editOneDish" @close="showModal = false">
      <template #header>
        <p>Edit a dish</p>
      </template>

      <template #body>

    <div class="grid grid-cols-3 gap-4 mb-5">

    <!-- START DISH IMAGE UPLOAD -->
    <div class="col-span-1 row-span-2 col-start-1"> 
    <div class="mt-1 flex justify-center rounded border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
      <img :src="updatedDishUrl.value" class="h-20 rounded">

    </div>
    <div class="flex flex-column text-sm text-gray-600">
        <div class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
      <button type="button" @click="openUploadModal"> <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" /> Change image</button>
        </div>
      </div>
    </div>
    <!-- END DISH IMAGE UPLOAD -->

    <div class="col-span-2 col-start-2">
      <input type="text" name="dish-title" id="dish-title" :value="dishToEdit?.title" autocomplete="dish-title" placeholder="Title"
      class="mt-1 shadow appearance-none border rounded-lg w-full"
      required >
    </div>
   <!--  v-model="dishDescription" -->
    <div class="col-span-2 col-start-2">
    <textarea type="text" :value="dishToEdit?.description" name="dish-description" id="dish-description" placeholder="Description"
      class="shadow appearance-none border rounded-lg w-full"></textarea>
    </div>

    <div class="col-span-1 col-start-2">
    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span class="text-gray-500 sm:text-sm">€</span>
      </div>
      <input type="text" name="dish-price" id="dish-price" :value="dishToEdit?.price" class="shadow appearance-none border rounded-lg w-full" placeholder="0.00" />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label for="currency" class="sr-only">Currency</label>
        <select id="currency" name="currency" placeholder="EUR" class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option selected="selected">{{dishToEdit?.currency}}</option>
          <option>USD</option>
          <option>CAD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
    </div>

    <div class="col-span-1 col-start-3">
    <select :value="dishToEdit?.category" id="category"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
      <option selected="selected">{{dishToEdit?.category}}</option>
      <option>Mains</option>
      <option>Starters</option>
      <option>Soups</option>
      <option>Desserts</option>
      <option>Drinks</option>
    </select>
    </div>
  </div>

  </template>

    </ModalEditDish>
  </Teleport>


  </div>
  </li>
</div>
</template>



  