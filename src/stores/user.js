import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const data = ref(useLocalStorage("user", {}));

  const $reset = computed(() => {
    data.value = {};
  });

  return { data, $reset };
});
