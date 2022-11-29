<script setup lang="ts">
import { ref, reactive, computed } from "vue";

function addDish(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.title);
}

const category = ref<string>("");

const categories: string[] = reactive(["mains", "starters"]);

const searchCategory = computed((category) => {
  let filter = new RegExp(category as unknown as string, "i");
  return categories.filter((item) => item.match(filter));
});
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
                <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
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
</template>
