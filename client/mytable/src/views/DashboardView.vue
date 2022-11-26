<script setup lang="ts">
import TopNavbar from "../components/TopNavbar.vue";
import SideNavbar from "../components/SideNavbar.vue";
import OnboardingForm from "../components/OnboardingForm.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <SideNavbar />

    <div class="flex-1">
      <TopNavbar />
      <main class="flex-1 justify-center">
        <OnboardingForm />
      </main>
    </div>
  </div>
</template>
