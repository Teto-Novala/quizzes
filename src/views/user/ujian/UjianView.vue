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
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const mtkHandler = () => {};
const indoHandler = () => {};
const inggrisHandler = () => {};

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
