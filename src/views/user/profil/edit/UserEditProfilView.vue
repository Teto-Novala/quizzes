<template>
  <main class="p-8">
    <Button
      @click="backHandler"
      class="mb-4"
      >⬅</Button
    >
    <h1 class="text-2xl font-secondary font-semibold text-center mb-4">
      Edit Profil
    </h1>
    <form
      @submit.prevent="submitHandler"
      class="font-primary flex flex-col gap-y-5 xl:w-1/3 xl:mx-auto"
    >
      <div class="flex flex-col gap-y-2">
        <label
          class="text-lg"
          for="username"
          >Username</label
        >
        <input
          type="text"
          id="username"
          class="outline-none border border-slate-500 px-3 py-2 rounded-lg"
          v-model="editData.username"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label
          class="text-lg"
          for="email"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="outline-none border border-slate-500 px-3 py-2 rounded-lg"
          v-model="editData.email"
        />
      </div>
      <Button type="submit">Edit</Button>
    </form>
    <div
      v-if="isKonfirmasi"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 font-primary flex items-center px-8"
    >
      <div
        class="bg-white w-full p-5 flex flex-col gap-y-4 xl:w-1/3 xl:mx-auto"
      >
        <h1 class="font-semibold text-xl text-center">Konfirmasi Akun</h1>
        <div class="flex flex-col gap-y-2">
          <label
            class="text-lg"
            for="email"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="outline-none border border-slate-500 px-3 py-2 rounded-lg"
            v-model="konfirmasiData.email"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label
            class="text-lg"
            for="pw"
            >Password</label
          >
          <input
            type="password"
            id="pw"
            class="outline-none border border-slate-500 px-3 py-2 rounded-lg"
            v-model="konfirmasiData.password"
          />
        </div>
        <div class="flex items-center gap-x-3">
          <Button
            @click="batalHandler"
            class="flex-1"
            >Batal</Button
          >
          <Button
            @click="konfirmasiHandler"
            class="flex-1"
            >Konfirmasi</Button
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
import { email, helpers, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const isKonfirmasi = ref(false);

const editData = reactive({
  username: store.data.user.username,
  email: store.data.user.email,
});

const konfirmasiData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username tidak boleh kosong", required),
      minLength: helpers.withMessage(
        "Username minimal 5 karakter",
        minLength(5)
      ),
    },
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
  };
});

const rulesKonfirmasi = computed(() => {
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

const v$ = useVuelidate(rules, editData);
const v$2 = useVuelidate(rulesKonfirmasi, konfirmasiData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    isKonfirmasi.value = true;
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const konfirmasiHandler = async () => {
  const result = await v$2.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/konfirmasi",
        {
          email: konfirmasiData.email,
          password: konfirmasiData.password,
        }
      );
      if (response.data.message) {
        try {
          const response2 = await axios.put(
            "http://localhost:5000/api/auth/update",
            {
              id: store.data.user.id,
              email: editData.email,
              username: editData.username,
            }
          );
          toast.success(response2.data.message, {
            onClose: () => {
              window.location.reload();
            },
          });
          store.data.user = response2.data.user;
          isKonfirmasi.value = false;
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$2.value.$errors[0].$message);
  }
};

const batalHandler = () => {
  konfirmasiData.email = "";
  konfirmasiData.password = "";
  isKonfirmasi.value = false;
};

const backHandler = () => {
  router.push("/profil");
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
