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
      v-if="Object.keys(store.data).length"
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
      v-if="store.data.user.role === 'tutor'"
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
        <button
          @click="buatHandler"
          class="w-full hover:bg-white transition-all p-4"
        >
          Buat Soal
        </button>
        <button
          @click="editHandler"
          class="w-full hover:bg-white transition-all p-4"
        >
          Edit Soal
        </button>
        <button
          @click="hapusHandler"
          class="w-full hover:bg-white transition-all p-4"
        >
          Hapus Soal
        </button>
      </div>
    </div>
    <button
      v-if="store.data.user.role === 'user'"
      @click="homeHandler"
      class="flex-1 hover:underline w-full"
    >
      Home
    </button>
    <button
      v-if="store.data.user.role === 'user'"
      @click="ujianHandler"
      class="flex-1 hover:underline w-full"
    >
      Ujian
    </button>
    <RouterLink
      v-if="store.data.user.role === 'tutor'"
      class="flex-1 hover:underline w-full"
      >Nilai Siswa</RouterLink
    >
    <RouterLink
      v-else
      class="flex-1 hover:underline w-full"
      >Histori</RouterLink
    >
    <button
      @click="routeHandler"
      class="flex-1 hover:underline w-full"
    >
      Profil
    </button>
    <button
      @click="logOutHandler"
      class="flex-1 hover:underline w-full"
    >
      Log out
    </button>
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
    <div
      v-if="Object.keys(store.data).length && store.data.user.role === 'user'"
      class="flex items-center gap-x-3"
    >
      <RouterLink
        class="transition-all hover:underline"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="transition-all hover:underline"
        to="/ujian"
        >Ujian</RouterLink
      >
      <RouterLink
        class="transition-all hover:underline"
        to="/ujian"
        >Histori</RouterLink
      >
    </div>
    <img
      src="/src/assets/images/components/profil.svg"
      alt="profil"
      class="cursor-pointer"
      v-if="Object.keys(store.data).length"
      @click="profilHandler"
    />
    <Button
      @click="loginHandler"
      v-else
      >Login</Button
    >
  </nav>
  <!-- tablet end -->
  <!-- desktop start -->
  <nav
    class="hidden xl:flex justify-between px-8 items-center font-primary w-full border-b border-slate-300 py-5"
  >
    <img
      src="/src/assets/images/components/logo.svg"
      alt="logo"
      class="w-[10rem] object-cover object-center"
    />
    <div
      v-if="store.data.user.role === 'user'"
      class="flex justify-center items-center gap-x-6"
    >
      <RouterLink
        class="transition-all hover:underline"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="transition-all hover:underline"
        to="/ujian"
        >Ujian</RouterLink
      >
      <RouterLink
        class="transition-all hover:underline"
        to="/ujian"
        >Histori</RouterLink
      >
    </div>
    <img
      src="/src/assets/images/components/profil.svg"
      alt="profil"
      class="w-6 cursor-pointer"
      v-if="Object.keys(store.data).length"
      @click="profilHandler"
    />
    <Button
      @click="loginHandler"
      v-else
      >Login</Button
    >
  </nav>
  <!-- desktop end -->
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import Button from "./Button.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useSoalStore } from "@/stores/soal";

const store = useUserStore();
const router = useRouter();
const toast = useToast();
const soalStore = useSoalStore();

const isActiveSoal = ref(false);
const isActiveToggle = ref(false);

const hamburgerHandler = () => {
  isActiveToggle.value = !isActiveToggle.value;
};

const soalHandler = () => {
  isActiveSoal.value = !isActiveSoal.value;
};

const profilHandler = () => {
  if (store.data.user.role === "tutor") {
    router.push("/tutor/profil");
    return;
  }

  router.push("/profil");
};

const routeHandler = () => {
  if (store.data.user.role === "tutor") {
    isActiveToggle.value = false;
    router.push("/tutor/profil");
  } else {
    isActiveToggle.value = false;
    router.push("/profil");
  }
};

const loginHandler = () => {
  router.push("/login");
};

const buatHandler = () => {
  isActiveToggle.value = false;
  router.push("/tutor/buatsoal");
};
const editHandler = () => {
  isActiveToggle.value = false;
  router.push("/tutor/editsoal");
};
const hapusHandler = () => {
  isActiveToggle.value = false;
  router.push("/tutor/hapussoal");
};

const logOutHandler = () => {
  store.reset();
  soalStore.reset();
  router.push("/login");
};

const homeHandler = () => {
  isActiveToggle.value = false;
  router.push("/");
};

const ujianHandler = () => {
  isActiveToggle.value = false;
  router.push("/ujian");
};

onBeforeMount(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda Belum Login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});
</script>
