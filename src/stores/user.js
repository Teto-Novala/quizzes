import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user-store", () => {
  const data = ref(useLocalStorage("user", {}));

  const reset = () => {
    data.value = {};
    window.localStorage.removeItem("user");
  };

  return { data, reset };
});
