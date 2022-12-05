<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import { ref, toRaw } from "vue";
import { Auth } from 'aws-amplify';
import restaurantAPIService from '../../services/restaurantAPI';
import staffAPIService from '../../services/staffAPI';
import { useRouter } from "vue-router";
import LoadingSpinner from "../LoadingSpinner.vue";

const isLoading = ref(true);
const restName = ref("");
const bankName = ref("");
const IBAN = ref("");
const street = ref("");
const city = ref("");
const zip = ref("");
const country = ref("");
const staff = ref<Object[]>([]);
const userData: any = ref(null);
const router = useRouter();
const editMode = ref(false);
const newStaffMember = ref("");
const staffMemberToEdit = ref("");

Auth.currentAuthenticatedUser().then((u) => {
  const email = u.attributes.email;
  const username = u.username;
  const user = { email, username }
  userData.value = user;
  (async () => {
    const restaurant = await restaurantAPIService.getRestaurant(user.username);
    isLoading.value = false;
    if (restaurant.length > 0) {
      restName.value = restaurant[0].restName;
      bankName.value = restaurant[0].bankName;
      IBAN.value = restaurant[0].IBAN;
      street.value = restaurant[0].street;
      city.value = restaurant[0].city;
      zip.value = restaurant[0].zip;
      country.value = restaurant[0].country;
      staff.value = restaurant[0].staff;
    } else {
      router.push('/onboarding')
    }
  })()
})

async function handleDeleteStaffMember(staffID: string) {
  const res = await staffAPIService.deleteStaff(staffID, userData.value.username);
  if (res && res.success) {
    console.log("staff member deleted");
    window.location.reload();
  }
}

async function handleNewStaffMemberSubmit() {
  const res = await staffAPIService.newStaff(newStaffMember.value, userData.value.username);
  console.log(res)
  if (res && res.success) {
    console.log("staff member added");
    window.location.reload();
  }
}
async function handleEditStaff(staff: Object, newName: string) {
  staff = toRaw(staff);
  staff.name = newName
  const res = await staffAPIService.updateStaff(staff, userData.value.username, staff.id);
  if (res && res.success) {
    console.log("staff member edited");
  }
};

async function handleStripeRegistration(userID: string) {
  const res = await restaurantAPIService.registerStripe(userID);
  if(res && res.success) {
    window.location.assign(res.data.url);
  }
  else {
    console.log("error")
  }
  console.log("res", res)
  //

}

</script>

<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="flex min-h-screen">
      <SideNavbar />
      <div class="flex-1">
        <TopNavbar />
        <main class="flex-1 justify-center">

          <div>
            <div class="container mx-auto content-center max-w-5xl">

              <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-6 md:gap-6">
                  <div class="mt-5 md:col-span-6 md:col-start-1 md:mt-0">
                    <form action="#" @submit.prevent="submitForm" method="POST">
                      <div class="overflow-hidden shadow sm:rounded-md">
                        <div class="bg-white px-4 py-5 sm:p-6">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                              <label for="email-address" class="block text-sm font-medium text-gray-700">Restaurant
                                Name</label>
                              <div type="text" name="restaurant-name" id="restaurant-name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ restName }}</div>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="first-name" class="block text-sm font-medium text-gray-700">Bank Name</label>
                              <div type="text" required name="bank-name" id="bank-name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ bankName }}
                              </div>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="last-name" class="block text-sm font-medium text-gray-700">IBAN</label>
                              <div type="text" required name="IBAN" id="IBAN" autocomplete="IBAN"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ IBAN }}
                              </div>
                            </div>

                            <div class="col-span-6">
                              <label for="street-address" class="block text-sm font-medium text-gray-700">Street
                                address</label>
                              <div type="text" required name="street-address" id="street-address"
                                autocomplete="street-address"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ street }}
                              </div>
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                              <div type="text" required name="city" id="city" autocomplete="address-level2"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ city }}
                              </div>
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal
                                code</label>
                              <div type="text" required name="postal-code" id="postal-code" autocomplete="postal-code"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                {{ zip }}
                              </div>
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                              <div>{{ country }}</div>
                            </div>

                            <div class="hidden sm:block col-span-6" aria-hidden="true">
                              <div class="py-5">
                                <div class="border-t border-gray-200">
                                </div>
                              </div>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="waiter-name" class="block text-sm font-medium text-gray-700">Your
                                staff</label>
                              <button @click="(editMode = !editMode)"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">Edit</button>
                              <div class="flex flex-wrap">
                                <ul
                                  class="flex flex-col w-60 mt-2 text-sm text-gray-500 list-none bg-gray-100 rounded-md m-1 py-1 px-1">
                                  <li v-for="item in staff" :key="item" class="flex items-center">
                                    <div :contenteditable="editMode"
                                      @blur="((e) => handleEditStaff(item, e.target.innerText))" class="self-start">{{
                                          item.name || "Name is empty"
                                      }}</div>
                                    <div>
                                      <button @click="handleDeleteStaffMember(item.id)" v-if="editMode"
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">D</button>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div v-if="editMode">
                                <input v-model="newStaffMember" class="shadow" type="text"
                                  placeholder="Add new staff member" />
                                <button @click="handleNewStaffMemberSubmit"
                                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">Submit</button>
                              </div>
                            </div>

                            <div>
                              <button
                                class="rounded-full border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                                v-if="true" @click="handleStripeRegistration(userData.username)">Connect to
                                Stripe</button>
                            </div>
                          </div>
                        </div>

                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>







