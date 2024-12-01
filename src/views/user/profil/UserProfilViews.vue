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
            v-model="deleteForm.email"
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
            v-model="deleteForm.password"
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
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const isHapus = ref(false);

const deleteForm = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
    password: {
      required: helpers.withMessage("Password tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, deleteForm);

const edithandler = () => {};

const confirmHapusHandler = () => {
  isHapus.value = true;
};

const kembaliHandler = () => {
  deleteForm.email = "";
  deleteForm.password = "";
  isHapus.value = false;
};

const hapusHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/auth/delete",
        {
          data: {
            email: deleteForm.email,
            password: deleteForm.password,
          },
        }
      );
      await store.reset();
      toast.success(response.data.message, {
        onClose: () => {
          router.push("/login");
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const logOutHandler = () => {
  store.reset();
  router.push("/");
};

onMounted(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});
</script>
