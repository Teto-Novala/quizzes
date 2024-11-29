<template>
  <main class="px-8 py-8">
    <h1 class="font-secondary font-semibold text-xl text-center">Hapus Akun</h1>
    <!-- mobile start -->
    <section class="md:hidden mt-5">
      <form @submit.prevent="submitHandler">
        <Input
          type="email"
          label="Email"
          v-model:model="formData.email"
        />
        <Input
          type="password"
          label="Password"
          v-model:model="formData.password"
        />
        <Button class="w-full mt-4">Hapus</Button>
      </form>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section class="hidden md:block xl:hidden mt-5">
      <form @submit.prevent="submitHandler">
        <Input
          type="email"
          label="Email"
          v-model:model="formData.email"
        />
        <Input
          type="password"
          label="Password"
          v-model:model="formData.password"
        />
        <Button class="w-full mt-4">Hapus</Button>
      </form>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section class="hidden xl:block mt-5">
      <form @submit.prevent="submitHandler">
        <Input
          type="email"
          label="Email"
          v-model:model="formData.email"
        />
        <Input
          type="password"
          label="Password"
          v-model:model="formData.password"
        />
        <Button class="w-full mt-4">Hapus</Button>
      </form>
    </section>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = useUserStore();

const formData = reactive({
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

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/auth/delete",
        {
          data: {
            email: formData.email,
            password: formData.password,
          },
        }
      );
      await store.reset;
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

onMounted(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login");
    router.push("/login");
  }
});
</script>
