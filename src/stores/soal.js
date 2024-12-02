import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSoalStore = defineStore("soal-store", () => {
  const data = ref(useLocalStorage("soal", []));

  const reset = () => {
    data.value = {};
  };

  return { data, reset };
});
