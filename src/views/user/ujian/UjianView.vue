<template>
  <main class="p-8 font-primary">
    <h1 class="font-secondary text-center mb-4 text-xl font-semibold">
      Pilih Pelajaran
    </h1>
    <section
      class="flex flex-col gap-y-4 xl:flex-row xl:justify-center xl:items-center xl:gap-y-0 xl:gap-x-5"
    >
      <Button
        @click="mtkHandler"
        class="py-9 xl:flex-1"
        >Matematika</Button
      >
      <Button
        @click="inggrisHandler"
        class="py-9 xl:flex-1"
        >B. Inggris</Button
      >
      <Button
        @click="indoHandler"
        class="py-9 xl:flex-1"
        >B. Indonesia</Button
      >
    </section>
    <div
      v-if="isActive"
      class="fixed top-0 bottom-0 right-0 left-0 bg-black/50 px-8 flex items-center"
    >
      <div
        class="bg-white font-primary w-full p-5 flex flex-col gap-y-4 xl:w-1/3 xl:mx-auto"
      >
        <p class="text-lg text-center">{{ pelajaran }}</p>
        <p>Jumlah Soal : {{ soalStore.data.length }}</p>
        <p>Waktu : 60 detik</p>
        <div class="flex items-center gap-x-3">
          <Button
            @click="kembaliHandler"
            class="flex-1"
            >Kembali</Button
          >
          <Button
            @click="mulaiHandler"
            class="flex-1"
            >Mulai</Button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useSoalStore } from "@/stores/soal";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const soalStore = useSoalStore();
const store = useUserStore();
const router = useRouter();
const toast = useToast();

const isActive = ref(false);
const pelajaran = ref("");

const mtkHandler = async () => {
  await fetchSoal("Matematika");
  pelajaran.value = "Matematika";
  isActive.value = true;
};
const indoHandler = async () => {
  await fetchSoal("Bahasa Indonesia");
  pelajaran.value = "Bahasa Indonesia";
  isActive.value = true;
};
const inggrisHandler = async () => {
  await fetchSoal("Bahasa Inggris");
  pelajaran.value = "Bahasa Inggris";
  isActive.value = true;
};

const kembaliHandler = () => {
  isActive.value = false;
  pelajaran.value = "";
};

const mulaiHandler = async () => {
  if (pelajaran.value === "Matematika") {
    router.push("/ujian/Matematika");
  }

  if (pelajaran.value === "Bahasa Indonesia") {
    router.push("/ujian/BahasaIndonesia");
  }

  if (pelajaran.value === "Bahasa Inggris") {
    router.push("/ujian/BahasaInggris");
  }
};

const fetchSoal = async (param) => {
  try {
    const response = await axios.post("http://localhost:5000/api/soal/random", {
      subject: param,
    });
    soalStore.data = response.data;
  } catch (error) {
    toast.error(error.response.message);
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
});
</script>
