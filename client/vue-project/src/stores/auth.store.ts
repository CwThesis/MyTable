import { ref } from "vue";
import { defineStore } from "pinia";
import type { AWSUser } from "../types";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const dataFromStorage = localStorage.getItem("user");
  const loggedUser = ref<AWSUser | null>(
    dataFromStorage ? JSON.parse(dataFromStorage) : null
  );

  function setLoggedUser(user: AWSUser) {
    if (loggedUser.value !== null) {
      loggedUser.value.username = user.username;
      loggedUser.value.userSub = user.userSub;
    } else {
      loggedUser.value = user;
    }
    localStorage.setItem("user", JSON.stringify(loggedUser.value));
    console.log("setloggedUserAFTER:", loggedUser.value);
    return loggedUser.value;
  }

  function logUserOut() {
    loggedUser.value === null;
    localStorage.removeItem("user");
    const router = useRouter();
    router.push("/login");
    return 1;
  }

  return { loggedUser, setLoggedUser, logUserOut };
});
