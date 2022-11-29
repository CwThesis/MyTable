<script setup lang="ts"></script>

<template>
  <form class="mt-2">
    <label class="block text-sm font-medium text-gray-700">Menu template</label>
    <div
      class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
    >
      <div class="flex flex-column text-sm text-gray-600">
        <label
          for="banner-upload"
          class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>Upload image</span>
          <input
            id="banner-upload"
            name="banner-upload"
            type="file"
            class="sr-only"
          />
        </label>
        <input
          type="text"
          placeholder="Heading title"
        />
      </div>
    </div>
  </form>
</template>
