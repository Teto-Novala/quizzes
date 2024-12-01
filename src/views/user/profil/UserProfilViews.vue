<template>
  <main class="p-8">
    <h1 class="font-secondary text-center mb-4 text-2xl font-semibold">
      Profil
    </h1>
    <section class="font-primary flex flex-col gap-y-3 xl:w-1/3 xl:mx-auto">
      <div class="flex flex-col gap-y-2">
        <p class="text-lg">Username</p>
        <p class="border border-slate-500 px-3 py-2 rounded-md">
          {{ store.data.user.username }}
        </p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-lg">Email</p>
        <p class="border border-slate-500 px-3 py-2 rounded-md">
          {{ store.data.user.email }}
        </p>
      </div>
      <Button @click="edithandler">Edit Profil</Button>
      <Button @click="confirmHapusHandler">Hapus</Button>
      <Button @click="logOutHandler">Logout</Button>
    </section>
    <div
      v-if="isHapus"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 px-8 flex items-center font-primary"
    >
      <div
        class="p-5 bg-white w-full flex flex-col gap-y-3 xl:w-1/3 xl:mx-auto"
      >
        <div class="flex flex-col gap-y-1">
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <input
            id="email"
            type="email"
            class="outline-none px-3 py-2 border border-slate-500 rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-y-1">
          <label
            for="pw"
            class="text-lg"
            >Password</label
          >
          <input
            id="password"
            type="password"
            class="outline-none px-3 py-2 border border-slate-500 rounded-lg"
          />
        </div>
        <div class="flex gap-x-2 items-center w-full">
          <Button
            @click="kembaliHandler"
            class="flex-1"
            >Kembali</Button
          >
          <Button
            @click="hapusHandler"
            class="flex-1"
            >Hapus</Button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

const isHapus = ref(false);

const edithandler = () => {};

const confirmHapusHandler = () => {
  isHapus.value = true;
};

const kembaliHandler = () => {
  isHapus.value = false;
};

const hapusHandler = async () => {};

const logOutHandler = () => {
  store.reset();
  router.push("/");
};
</script>
