<template>
  <!-- mobile start -->
  <nav
    class="flex md:hidden justify-between items-center w-full px-8 font-primary"
  >
    <img
      src="/src/assets/images/components/logo.svg"
      alt="log"
      class="w-1/2 object-cover object-center"
    />
    <div
      @click="hamburgerHandler"
      v-if="Object.keys(store.user).length"
      class="w-fit flex flex-col justify-center items-center gap-y-1"
    >
      <span class="w-6 block h-[.2rem] bg-black"></span>
      <span class="w-6 block h-[.2rem] bg-black"></span>
      <span class="w-6 block h-[.2rem] bg-black"></span>
    </div>
    <Button
      v-else
      @click="loginHandler"
      >Login</Button
    >
  </nav>
  <div
    v-if="isActiveToggle"
    class="bg-primary w-full flex flex-col gap-y-4 py-4 items-center text-xl mt-5 text-center"
  >
    <div
      v-if="store.user.role === 'tutor'"
      class="w-full"
    >
      <div
        @click="soalHandler"
        class="flex-1 flex items-center justify-center gap-x-4 hover:underline w-full"
      >
        <p>Soal</p>
        <img
          class="w-5"
          :src="`/src/assets/images/components/${
            isActiveSoal ? 'down' : 'up'
          }.svg`"
          alt="logo"
        />
      </div>
      <div
        v-if="isActiveSoal"
        class="flex flex-col w-full mt-4"
      >
        <RouterLink class="w-full hover:bg-white transition-all p-4"
          >Buat Soal</RouterLink
        >
        <RouterLink class="w-full hover:bg-white transition-all p-4"
          >Edit Soal</RouterLink
        >
        <RouterLink class="w-full hover:bg-white transition-all p-4"
          >Hapus Soal</RouterLink
        >
      </div>
    </div>
    <RouterLink
      v-if="store.user.role === 'tutor'"
      class="flex-1 hover:underline w-full"
      >Nilai Siswa</RouterLink
    >
    <RouterLink
      v-else
      class="flex-1 hover:underline w-full"
      >Histori</RouterLink
    >
    <RouterLink class="flex-1 hover:underline w-full">Pengaturan</RouterLink>
  </div>
  <!-- mobile end -->

  <!-- tablet start -->
  <nav
    class="hidden md:flex xl:hidden justify-between px-8 items-center font-primary w-full border-b border-slate-300 py-5"
  >
    <img
      src="/src/assets/images/components/logo.svg"
      alt="logo"
      class="w-1/3 object-cover object-center"
    />
    <img
      src="/src/assets/images/components/profil.svg"
      alt="profil"
      class="cursor-pointer"
      v-if="Object.keys(store.user).length"
      @click="profilHandler"
    />
    <Button v-else>Login</Button>
  </nav>
  <!-- tablet end -->
  <!-- desktop start -->
  <nav
    class="hidden xl:flex justify-between px-8 items-center font-primary w-full border-b border-slate-300 py-5"
  >
    <img
      src="/src/assets/images/components/logo.svg"
      alt="logo"
      class="w-1/6 object-cover object-center"
    />
    <img
      src="/src/assets/images/components/profil.svg"
      alt="profil"
      class="w-6 cursor-pointer"
      v-if="Object.keys(store.user).length"
      @click="profilHandler"
    />
    <Button v-else>Login</Button>
  </nav>
  <!-- desktop end -->
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import Button from "./Button.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const store = useUserStore();
const router = useRouter();

const isActiveSoal = ref(false);
const isActiveToggle = ref(false);

const hamburgerHandler = () => {
  isActiveToggle.value = !isActiveToggle.value;
};

const soalHandler = () => {
  isActiveSoal.value = !isActiveSoal.value;
};

const profilHandler = () => {
  router.push("/profil");
};

const loginHandler = () => {
  router.push("/login");
};
</script>
