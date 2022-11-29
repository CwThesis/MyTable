<script setup lang="ts"></script>
<template>
  <div class="w-64 bg-gray-50 border-r border-gray-200">
    <RouterLink to="/dashboard/overview">
      <div class="py-4 px-6">
        <a href="/"><h1>my table</h1></a>
      </div>
    </RouterLink>
    <div class="py-4 px-6">
      <RouterLink to="/dashboard/overview">
        <div class="mb-10">
          <a href="#" class="py-2 px-4 text-sm text-gray-700">Overview</a>
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/tickets">
        <div class="mb-10">
          <a href="#" class="py-2 px-4 text-sm text-gray-700">Tickets</a>
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/tables">
        <div class="mb-10">
          <a href="#" class="flex items-center py-2 px-4 text-sm text-gray-700"
            >Tables</a
          >
        </div>
      </RouterLink>
      <RouterLink to="/dashboard/menu">
        <div class="mb-10">
          <a href="#" class="py-2 px-4 text-sm text-gray-700">Menu</a>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
