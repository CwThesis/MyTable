import { createApp } from "vue";
import { createPinia } from "pinia";
import { Amplify } from "aws-amplify";
import awsmobile from "./services/AWS";

Amplify.configure(awsmobile);

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
