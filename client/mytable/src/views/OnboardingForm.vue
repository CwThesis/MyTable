<script setup lang="ts">
import TopNavbarVue from "@/components/TopNavbar.vue";
import { ref } from "vue";

const staff = ref<string[]>([]);

function addWaiter(event: Event) {
  const target = event.target as HTMLInputElement;
  staff.value.push(target.value);
  target.value = "";
}

function submitForm() {
  console.log("Form submitted!");
}
</script>

<template>
  <TopNavbarVue></TopNavbarVue>
  <div class="container mx-auto content-center max-w-5xl">
    <div class="shadow sm:overflow-hidden sm:rounded-md mb-4 mt-4">
      <div class="space-y-4 bg-gray-100 px-4 py-5 sm:p-6">
        <h1 class="text-2xl">Welcome to my table!</h1>
        <h3 class="text-sm font-medium text-gray-700">
          You're almost ready to start.
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          We'll need some more information to complete your onboarding.
        </p>
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-6 md:gap-6">
        <div class="mt-5 md:col-span-6 md:col-start-1 md:mt-0">
          <form action="#" @submit.prevent="submitForm" method="POST">
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="bg-white px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="email-address"
                      class="block text-sm font-medium text-gray-700"
                      >Restaurant Name</label
                    >
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700"
                      >Bank Name</label
                    >
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium text-gray-700"
                      >IBAN</label
                    >
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6">
                    <label
                      for="street-address"
                      class="block text-sm font-medium text-gray-700"
                      >Street address</label
                    >
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autocomplete="street-address"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                      >City</label
                    >
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="postal-code"
                      class="block text-sm font-medium text-gray-700"
                      >ZIP / Postal code</label
                    >
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autocomplete="postal-code"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                      >Country</label
                    >
                    <select
                      id="country"
                      name="country"
                      autocomplete="country-name"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div class="hidden sm:block col-span-6" aria-hidden="true">
                    <div class="py-5">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                      >How many tables do you have?</label
                    >
                    <select
                      id="table-number"
                      name="table-number"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option v-for="num in 20" :key="num">{{ num }}</option>
                    </select>
                    <p class="mt-2 text-sm text-gray-500">
                      We'll preconfigure your QR codes.
                    </p>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="waiter-name"
                      class="block text-sm font-medium text-gray-700"
                      >Your staff</label
                    >
                    <input
                      @keyup.enter="addWaiter"
                      type="text"
                      name="waiter-name"
                      id="waiter-name"
                      autocomplete="waiter-name"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p class="mt-2 text-sm text-gray-500">
                      Add your waiters' names here. You will be able to edit
                      this later.
                    </p>
                    <div class="flex flex-row flex-wrap">
                      <li
                        class="mt-2 text-sm text-gray-500 list-none bg-gray-100 rounded-md m-1 py-1 px-1"
                        v-for="item in staff"
                        :key="item"
                      >
                        {{ item }}
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
