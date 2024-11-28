<template>
  <main class="px-8 py-8">
    <h1 class="text-center mb-6 font-secondary font-semibold text-xl">
      Edit Profil
    </h1>
    <!-- mobile start -->
    <div class="md:hidden">
      <form
        @submit.prevent=""
        class="w-full flex flex-col gap-y-3"
      >
        <Input
          label="Username"
          type="text"
          v-model:model="formData.username"
        />
        <Input
          label="Email"
          type="email"
          v-model:model="formData.email"
        />
        <Button
          class="w-full"
          type="submit"
          >Selesai</Button
        >
      </form>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <div class="hidden xl:hidden md:flex flex-col">
      <form
        @submit.prevent=""
        class="w-full flex flex-col gap-y-3"
      >
        <Input
          label="Username"
          type="text"
          v-model:model="formData.username"
        />
        <Input
          label="Email"
          type="email"
          v-model:model="formData.email"
        />
        <Button
          class="w-full"
          type="submit"
          >Selesai</Button
        >
      </form>
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex flex-col gap-y-4">
      <form
        @submit.prevent=""
        class="w-full flex flex-col gap-y-3"
      >
        <Input
          label="Username"
          type="text"
          v-model:model="formData.username"
        />
        <Input
          label="Email"
          type="email"
          v-model:model="formData.email"
        />
        <Button
          class="w-full"
          type="submit"
          >Selesai</Button
        >
      </form>
    </div>
    <!-- desktop end -->
    <div
      v-if="isActive"
      @click="popUpHandler"
      class="bg-black/50 h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center p-5"
    >
      <form
        @submit="passwordHandler"
        class="w-full bg-white p-5 flex flex-col gap-y-3"
      >
        <Input
          label="Konfirmasi Password"
          type="Password"
        />
        <Button type="submit">Konfirmasi</Button>
      </form>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();

const isActive = ref(false);

const formData = reactive({
  username: store.data.user.username,
  email: store.data.user.email,
});

const passwordHandler = () => {};
const popUpHandler = () => {
  isActive.value = true;
};

onBeforeMount(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum Login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});
</script>
