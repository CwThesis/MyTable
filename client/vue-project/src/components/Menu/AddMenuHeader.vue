<script setup lang="ts">
import { ref } from "vue";
import  menuAPIService  from "../../services/menuAPI"
import { Auth } from 'aws-amplify';

let menuImgUrl = "";
let menuHeader = ref("")
let userId: string = "";

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userId = user.username;
});

function openUploadModal () {
  window.cloudinary.openUploadWidget(
        { cloud_name: 'dvyn9lzkf',
          upload_preset: 'acgvtxok'
        },
        (error: Error, result: any) => {
          if (!error && result && result.event === "success") {
            console.log('Done uploading..: ', result.info);
            menuImgUrl = result.info.url;
          }
        }).open();
}

async function addMenuBanner(event: Event) {
  const formInput = {
    url: menuImgUrl,
    title: menuHeader.value,
  };
  console.log(formInput);
  const res = await menuAPIService.addBanner(formInput, userId);
  console.log(res);
}
</script>

<template>
  <!-- <h1 class="space-y-4 py-5 sm:py-6 text-l">Custom Menu Header</h1> -->
  <form @submit.prevent="addMenuBanner" method="POST">

    <div class="overflow-hidden shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6 b">
        <div class="grid grid-cols-3 gap-4">

          <!-- START DISH IMAGE UPLOAD -->
            <div class=" col-span-2 col-start-1 mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div class="flex flex-column text-sm text-gray-600">
                  <div class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                <button type="button" @click="openUploadModal">Upload menu header</button>
                  </div>
                </div>

                <div class="relative">
                  <img :src="menuImgUrl" class="h-40 rounded">
                  <h1 class="absolute text-2xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{menuHeader}}</h1>
                </div>

                <div class="col-span-2 col-start-1">
            <label for="dish-title" class="block text-sm font-medium text-gray-700">Header</label>
            <input type="text" name="menu-header" id="menu-header" v-model="menuHeader" autocomplete="menu-header"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required />
          </div>
        </div>
              </div>
              <!-- END DISH IMAGE UPLOAD -->
              
          
        <div class="col-span-1 col-start-4 bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add
          </button>

        </div>
      </div>
    </div>
  </form>

</template>