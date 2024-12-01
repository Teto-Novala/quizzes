<template>
  <main
    v-if="Object.keys(store.data).length"
    class="px-8 py-8"
  >
    <h1 class="text-center text-3xl font-secondary xl:hidden">Profil</h1>
    <!-- mobile start -->
    <div class="md:hidden flex flex-col gap-y-5 font-primary">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl">Username</p>
        <p class="text-lg border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.username }}
        </p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-xl">Email</p>
        <p class="text-lg border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.email }}
        </p>
      </div>
      <Button @click="editHandler">Edit</Button>
      <Button @click="hapusHandler">Hapus Akun</Button>
      <Button @click="logOutHandler">Log Out</Button>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <div class="hidden md:flex xl:hidden flex-col gap-y-5">
      <div class="flex flex-col gap-y-2">
        <p class="text-2xl">Username</p>
        <p class="text-xl border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.username }}
        </p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-2xl">Email</p>
        <p class="text-xl border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.email }}
        </p>
      </div>
      <Button @click="editHandler">Edit</Button>
      <Button @click="hapusHandler">Hapus Akun</Button>
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex h-screen flex-col gap-y-5">
      <div class="flex flex-col gap-y-2">
        <p class="text-2xl">Username</p>
        <p class="text-xl border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.username }}
        </p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-2xl">Email</p>
        <p class="text-xl border border-primary px-3 py-2 rounded-lg">
          {{ store.data.user.email }}
        </p>
      </div>
      <Button @click="editHandler">Edit</Button>
      <Button @click="hapusHandler">Hapus Akun</Button>
    </div>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();

const logOutHandler = async () => {
  store.reset();
  router.push("/login");
};

const editHandler = () => {
  router.push("/tutor/profil/edit");
};

const hapusHandler = () => {
  router.push("/tutor/profil/hapus");
};

onBeforeMount(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda Belum Login", {
      onClose: () => router.push("/login"),
    });
  }
});
</script>
