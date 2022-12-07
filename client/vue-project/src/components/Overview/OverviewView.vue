<script setup lang="ts">
import SideNavbar from "../SideNavbar.vue";
import TopNavbar from "../TopNavbar.vue";
import { ref, toRaw } from "vue";
import { Auth } from 'aws-amplify';
import restaurantAPIService from '../../services/restaurantAPI';
import staffAPIService from '../../services/staffAPI';
import { useRouter } from "vue-router";
import LoadingSpinner from "../LoadingSpinner.vue";
import type { Ref } from "vue";
import type { Banner } from "../../types"
import Toast from "../Toasts/Toast.vue";

const showToast = ref(false);
const toastTitle = ref("");
const toastType = ref("success");
const isLoading = ref(true);
let restName = ref("");
const bankName = ref("");
const IBAN = ref("");
let street = ref("");
let city = ref("");
let zip = ref("");
let country = ref("");
const staff = ref<Object[]>([]);
const userData: any = ref(null);
const router = useRouter();
const editMode = ref(false);
const editRestInfo = ref(false);
const newStaffMember = ref("");
const staffMemberToEdit = ref("");
const stripeId = ref("");
let staffMembers: Ref<Object[]> = ref([]);
let banner: Ref<Banner> = ref({ url: "http://res.cloudinary.com/dvyn9lzkf/image/upload/v1669984775/vfk6kogi0wbbbeu5eroc.jpg", title: "Your Menu" });

const connectedToStripe = ref(false);

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
      staffMembers.value = staff.value;
      if (restaurant[0].banner) {
        banner.value.url = restaurant[0].banner.url;
        banner.value.title = restaurant[0].banner.title;
      }
      if (restaurant[0].stripeId) stripeId.value = restaurant[0].stripeId;
    } else {
      router.push('/onboarding')
    }
  })()
})

async function handleDeleteStaffMember(staffID: string) {
  const res = await staffAPIService.deleteStaff(staffID, userData.value.username);
  if (res && res.success) {
    staffMembers.value = staffMembers.value.filter((member) => member.id !== res.body.id)
    toastTitle.value = "Staff member deleted successfully!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
  else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
}

async function handleNewStaffMemberSubmit() {
  const res = await staffAPIService.newStaff(newStaffMember.value, userData.value.username);
  if (res && res.success) {
    staffMembers.value.push(res.body);
    toastTitle.value = "Staff member added successfully!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
  else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
}

async function handleEditStaff(staff: Object, newName: string) {
  staff = toRaw(staff);
  staff.name = newName
  const res = await staffAPIService.updateStaff(staff, userData.value.username, staff.id);
  if (res && res.success) {
    toastTitle.value = "Edit completed successfully!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
  else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
};

async function handleStripeRegistration(userID: string) {
  const res = await restaurantAPIService.registerStripe(userID);
  if (res && res.success) {
    toastTitle.value = "We are redirecting you to Stripe to complete the registration process";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
    window.location.assign(res.data.url);
  }
  else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
    console.log("error")
  }
}

async function handleEditRestaurantInfo(item: string, event: string) {
  const updatedInfo = {}
  updatedInfo[item] = event;
  const res = await restaurantAPIService.updateRestaurant(updatedInfo, userData.value.username);
  if (res && res.success) {
    if (item === "restName") restName.value = event;
    toastTitle.value = "Restaurant info updated!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  } else {
    toastTitle.value = "Oops, something went wrong :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  }
};

async function handleStripeRedirect() {
  const stripeUrl = await restaurantAPIService.stripeDashboard(userData.value.username);
  if(stripeUrl.success) {
    window.open(stripeUrl.url.url, '_blank');
  }
}

</script>

<template>
  <div v-if="showToast">
    <Toast :title="toastTitle" :type="toastType" />
  </div>
  <div v-else>
    <div class="flex min-h-screen">
      <SideNavbar />
      <div class="flex-1">
        <TopNavbar />
        <div v-if="isLoading" class="h-full"> 
          <LoadingSpinner />
        </div>
        <main v-else class="flex-1 flex justify-center">
          <div id="left" class="flex flex-col gap-3 w-1/3 mt-4 p-4">
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6 relative">
                <h3 class="restaurant-name font-semibold font-josefin text-xl leading-6 text-gray-900">{{ restName }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Basic information</p>
                <button @click="(editRestInfo = !editRestInfo)">
                  <font-awesome-icon icon="fa-solid fa-pen fa-lg"
                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-700" />
                </button>
              </div>
              <div class="border-t border-gray-200">
                <dl>
                  <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Business name</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" id="restName"
                      :contenteditable="editRestInfo"
                      @blur="((e) => handleEditRestaurantInfo(e.target.id, e.target.innerText))">{{ restName }}</dd>
                  </div>
                  <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Street address</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" id="street"
                      :contenteditable="editRestInfo"
                      @blur="((e) => handleEditRestaurantInfo(e.target.id, e.target.innerText))">{{ street }}</dd>
                  </div>
                  <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" id="city"
                      :contenteditable="editRestInfo"
                      @blur="((e) => handleEditRestaurantInfo(e.target.id, e.target.innerText))">{{ city }}</dd>
                  </div>
                  <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">ZIP code</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" id="zip"
                      :contenteditable="editRestInfo"
                      @blur="((e) => handleEditRestaurantInfo(e.target.id, e.target.innerText))">{{ zip }}</dd>
                  </div>
                  <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Country</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" id="country"
                      :contenteditable="editRestInfo"
                      @blur="((e) => handleEditRestaurantInfo(e.target.id, e.target.innerText))">{{ country }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
              <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
                <dt class="text-sm font-josefin font-medium text-gray-700 mb-5">
                  STRIPE DASHBOARD</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:col-start-2 sm:mt-0">
                  <ul role="list">
                    <div class="flex gap-4 flex-col" v-if="(stripeId.length === 0)">
                      {{ stripeId }}
                      <button
                        class="rounded-full border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                        @click="handleStripeRegistration(userData.username)">
                        Connect to Stripe</button>
                      <p class="mt-1 max-w-2xl text-sm text-gray-500 text-center">To receive payments configure your
                        STRIPE account.</p>
                    </div>
                    <div class="" v-else>
                      <p class="p-4 mt-1 max-w-2xl text-sm text-gray-500 text-center">Looks like you already have a Stripe
                        account connected. Click this button to access your Stripe Dashboard:</p>
                        <button class="rounded-full border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                        @click="handleStripeRedirect">Dashboard</button>
                    </div>
                  </ul>
                </dd>
              </div>
            </div>
          </div>
          <div id="right" class="flex mt-4 flex-col p-4 gap-3 xl:w-1/3 sm:min-w-min sm:w-1/2">
            <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:grid sm:grid-cols-3 md:gap-4 sm:px-6 h-2/4">
              <dt class="text-sm font-josefin font-medium text-gray-700">YOUR STAFF</dt>
              <div class="sm:col-span-2 sm:col-start-2 flex flex-row justify-between">
                <input v-model="newStaffMember"
                  class="border border-solid rounded-lg border-gray-200 flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                  type="text" placeholder="New staff member..." />
                <button @click="handleNewStaffMemberSubmit"
                  class="font-medium text-violet-600 hover:text-violet-500 sm:p-1">
                  Add
                </button>
              </div>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:col-start-2 sm:mt-0 ">
                <ul role="list"
                  class="p-2 divide-y divide-gray-200 rounded-md border border-gray-200 h-4/5 overflow-y-scroll">
                  <!-- here starts STAFF MEMBER  -->
                  <li v-for="item in staffMembers" :key="item"
                    class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div class="flex w-0 flex-1 items-center" :contenteditable="editMode"
                      @blur="((e) => handleEditStaff(item, e.target.innerText))">
                      <font-awesome-icon icon="fa-solid fa-user fa-lg" class="text-gray-400" />
                      <span class="ml-2 w-0 flex-1 truncate">{{ item.name || "No staff members yet." }}</span>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <button @click="handleDeleteStaffMember(item.id)" v-if="editMode">
                        <font-awesome-icon icon="fa-solid fa-xmark fa-lg" class="text-gray-400 pr-2" />
                      </button>
                      <button @click="(editMode = !editMode)">
                        <a href="#" class="font-medium text-violet-600 hover:text-violet-500">Edit</a></button>
                    </div>
                  </li>
                  <!-- here ends STAFF MEMBER  -->
                </ul>
              </dd>
            </div>
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
              <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
                <h1 class="text-sm font-josefin font-medium text-gray-700 mb-6">ACTIVE MENU</h1>
                <RouterLink id="menu-link" to="/dashboard/menu">
                  <div v-if="banner.url" class="relative">
                    <img :src="banner?.url" class="rounded-md object-cover" />
                    <h1
                      class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">
                      {{ banner?.title }}</h1>
                  </div>
                  <div v-else class="relative w-full bg-gradient-to-b from-violet-600">
                    <img :src="banner?.url" class="rounded-md object-cover " />
                    <h1
                      class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-josefin">
                      Your Menu</h1>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
</template>




