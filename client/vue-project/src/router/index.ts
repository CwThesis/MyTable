import { createRouter, createWebHistory } from "vue-router";
import {Auth} from 'aws-amplify';
import  AWSAuthenticator from '../components/Auth/AWSAuthenticator.vue';
//import Login from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      meta: {requiresAtuh: false},
      component: AWSAuthenticator,
    },
    {
      path: "/",
      meta: { requiresAuth: true },
      component: () => import("../views/OnboardingForm.vue"),
    },
    {
      path: "/dashboard",
      meta: { requiresAuth: true },
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard/overview",
      meta: { requiresAuth: true },
      component: () => import("../components/Overview/OverviewView.vue"),
    },
    {
      path: "/dashboard/tickets",
      meta: { requiresAuth: true },
      component: () => import("../components/Tickets/TicketsView.vue"),
    },
    {
      path: "/dashboard/tables",
      meta: { requiresAuth: true },
      component: () => import("../components/Tables/TablesView.vue"),
    },
    {
      path: "/dashboard/menu",
      meta: { requiresAuth: true },
      component: () => import("../components/Menu/MenuView.vue"),
    },
    {
      path: "/dashboard/profile",
      meta: { requiresAuth: true },
      component: () => import("../components/Profile/ProfileView.vue"),
    },
    {
      path: "/onboarding",
      meta: { requiresAuth: true },
      component: () => import("../views/OnboardingForm.vue"),
    },
    {
      path: "/customer/:restID/:tableID",
      name: "mobile",
      meta: { requiresAuth: false },
      component: () => import("../views/MobileView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let res = undefined;
    try {
      res = await Auth.currentAuthenticatedUser();
    }
    catch (e) {
      console.log(e);
    }
    console.log("TO: ",to.path)
    if (!res && to.path !== "/login") {
      next('/login');
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
