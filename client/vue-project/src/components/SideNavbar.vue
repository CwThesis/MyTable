<script setup lang="ts"></script>
<template>
  <div class="w-60 bg-gray-50 border-r border-gray-200 px-4">
    <RouterLink to="/dashboard/overview">
      <div class="py-2 px-2">
        <a href="/"><h1 class="font-josefin font-semibold text-2xl text-violet-700 p-4">my table<font-awesome-icon icon="fa-solid fa-qrcode" pull="left" class="pr-1"/></h1></a>
      </div>
    </RouterLink>
    <div class="py-4 px-6">
      <RouterLink to="/dashboard/overview">
        <div class="mb-7 flex items-center">
          <a href="#" class="py-2 px-4 text-sm text-gray-700 font-semibold p-1 flex-row gap-1">
            
            <p>Overview <font-awesome-icon icon="fa-solid fa-house" pull="left" class="pr-1" /></p>
            
          </a>
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/tickets">
        <div class="mb-7 flex items-center">
          <a href="#" class="py-2 px-4 text-sm text-gray-700 font-semibold p-1 flex-row gap-1">
            
            <p>Tickets <font-awesome-icon icon="fa-solid fa-receipt" pull="left" class="pr-1"/></p>
            
          </a>
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/tables">
        <div class="mb-7 flex items-center">
          <a href="#" class="py-2 px-4 text-sm text-gray-700 font-semibold p-1 flex-row gap-1">
            
            <p>Tables <font-awesome-icon icon="fa-solid fa-receipt" pull="left" class="pr-1"/></p>
            
          </a>
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/menu">
        <div class="mb-7 flex items-center">
          <a href="#" class="py-2 px-4 text-sm text-gray-700 font-semibold p-1 flex-row gap-1">
            
            <p>Menu <font-awesome-icon icon="fa-solid fa-utensils" pull="left" class="pr-1" /></p>
            
          </a>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
