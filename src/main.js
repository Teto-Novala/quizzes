import "./assets/main.css";
import "@fontsource/roboto";
import "@fontsource/poppins";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import { POSITION } from "vue-toastification";

const app = createApp(App);

app.use(Toast, {
  timeout: 1500,
  position: POSITION.TOP_RIGHT,
});

app.use(createPinia());
app.use(router);

app.mount("#app");
