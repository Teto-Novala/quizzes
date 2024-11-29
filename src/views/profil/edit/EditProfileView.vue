<template>
  <main class="px-8 py-8">
    <h1 class="text-center mb-6 font-secondary font-semibold text-xl">
      Edit Profil
    </h1>
    <!-- mobile start -->
    <div class="md:hidden">
      <form
        @submit.prevent="submitHandler"
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
        @submit.prevent="submitHandler"
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
        @submit.prevent="submitHandler"
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
      class="bg-black/50 h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center p-5"
    >
      <div
        @click="popUpHandler"
        class="text-white absolute top-7 bg-primary px-3 py-2 rounded-xl transition-all hover:text-black"
      >
        Kembali
      </div>
      <form
        @submit.prevent="passwordHandler"
        class="w-full bg-white p-5 flex flex-col gap-y-3"
      >
        <Input
          label="Konfirmasi Password"
          type="Password"
          v-model:model="formData.password"
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
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();

const isActive = ref(false);

const formData = reactive({
  username: store.data.user.username,
  email: store.data.user.email,
  password: "",
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username tidak boleh kosong", required),
    },
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
  };
});

const rulesPw = computed(() => {
  return {
    password: {
      required: helpers.withMessage("Password tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);
const vPw$ = useVuelidate(rulesPw, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    isActive.value = true;
  } else {
    toast.error(v$.value.$errors[0].$message);
    if (v$.value.$errors[0].$message.includes("Username")) {
      formData.username = store.data.user.username;
    }
    if (v$.value.$errors[0].$message.includes("Email")) {
      formData.email = store.data.user.email;
    }
    if (v$.value.$errors[0].$message.includes("email")) {
      formData.email = store.data.user.email;
    }
  }
};

const passwordHandler = async () => {
  const result = await vPw$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/konfirmasi",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.message) {
        try {
          const response2 = await axios.put(
            "http://localhost:5000/api/auth/update",
            {
              id: store.data.user.id,
              email: formData.email,
              username: formData.username,
            }
          );
          toast.success(response2.data.message);
          store.data.user = response2.data.user;
          isActive.value = false;
          window.location.reload();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    console.log(formData.password);

    toast.error(vPw$.value.$errors[0].$message);
  }
};
const popUpHandler = () => {
  isActive.value = false;
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
