import { createRouter, createWebHistory } from "vue-router";
//import Login from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard/overview",
      name: "overview",
      component: () => import("../components/Overview/OverviewView.vue"),
    },
    {
      path: "/dashboard/tickets",
      name: "tickets",
      component: () => import("../components/Tickets/TicketsView.vue"),
    },
    {
      path: "/dashboard/tables",
      name: "tables",
      component: () => import("../components/Tables/TablesView.vue"),
    },
    {
      path: "/dashboard/menu",
      name: "menu",
      component: () => import("../components/Menu/MenuView.vue"),
    },
    {
      path: "/dashboard/profile",
      name: "profile",
      component: () => import("../components/Profile/ProfileView.vue"),
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: () => import("../views/OnboardingForm.vue"),
    },
  ],
});

export default router;
