<template>
  <main class="p-8">Soal</main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const listSoal = ref([]);

const fetchSoal = async () => {
  try {
    let param = "";
    if (route.params.pelajaran === "Matematika") {
      param = route.params.pelajaran;
    }
    if (route.params.pelajaran === "BahasaInggris") {
      param = "Bahasa Inggris";
    }
    if (route.params.pelajaran === "BahasaIndonesia") {
      param = "Bahasa Indonesia";
    }
    const response = await axios.post("http://localhost:5000/api/soal/random", {
      subject: param,
    });
    console.log(response.data);
    listSoal.value = response.data;
  } catch (error) {
    console.error(error);

    // toast.error(error.response.message);
  }
};

onBeforeMount(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
  fetchSoal();
});
</script>
