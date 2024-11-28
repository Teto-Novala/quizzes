<template>
  <main class="px-8">
    <!-- mobile start -->
    <section class="md:hidden flex flex-col items-center gap-y-5">
      <img
        src="/src/assets/images/components/logo.svg"
        alt="logo"
        class="w-full h-32"
      />
      <div class="font-secondary flex flex-col items-center gap-y-2">
        <h1 class="text-2xl">Selamat Datang</h1>
        <h2 class="text-lg">Silahkan Register</h2>
      </div>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-5"
      >
        <div>
          <Input
            type="text"
            label="Username"
            v-model:model="formData.username"
          />
          <Input
            type="email"
            label="Alamat Email"
            v-model:model="formData.email"
          />
          <Input
            type="password"
            label="Password"
            v-model:model="formData.password"
          />
          <Input
            type="password"
            label="Konfirmasi Password"
            v-model:model="formData.confirmedPassword"
          />
        </div>
        <div class="w-full flex justify-between items-center gap-x-5">
          <Button
            class="flex-1"
            type="submit"
            >Register</Button
          >
        </div>
      </form>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section class="hidden md:flex xl:hidden flex-col items-center gap-y-8">
      <img
        src="/src/assets/images/components/logo.svg"
        alt="logo"
        class="w-full h-32"
      />
      <div class="font-secondary flex flex-col items-center gap-y-4">
        <h1 class="text-4xl">Selamat Datang</h1>
        <h2 class="text-2xl">Silahkan Register</h2>
      </div>
      <form
        @submit.prevent="submitHandler"
        class="w-2/3 flex flex-col gap-y-5"
      >
        <div>
          <Input
            type="text"
            label="Username"
            v-model:model="formData.username"
          />
          <Input
            type="email"
            label="Alamat Email"
            v-model:model="formData.email"
          />
          <Input
            type="password"
            label="Password"
            v-model:model="formData.password"
          />
          <Input
            type="password"
            label="Konfirmasi Password"
            v-model:model="formData.confirmedPassword"
          />
        </div>
        <div class="w-full flex justify-between items-center gap-x-5">
          <Button
            class="flex-1"
            type="submit"
            >Register</Button
          >
        </div>
      </form>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section
      class="hidden xl:flex h-screen gap-x-32 items-center justify-center"
    >
      <div class="flex-1 flex flex-col justify-between gap-y-3">
        <img
          src="/src/assets/images/components/logo.svg"
          alt="logo"
          class="w-full h-32"
        />
        <div class="font-secondary flex flex-col items-center gap-y-4">
          <h1 class="text-2xl">Selamat Datang</h1>
          <h2 class="text-xl">Silahkan Register</h2>
        </div>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-5"
        >
          <div>
            <Input
              type="text"
              label="Username"
              v-model:model="formData.username"
            />
            <Input
              type="email"
              label="Alamat Email"
              v-model:model="formData.email"
            />
            <Input
              type="password"
              label="Password"
              v-model:model="formData.password"
            />
            <Input
              type="password"
              label="Konfirmasi Password"
              v-model:model="formData.confirmedPassword"
            />
          </div>
          <div class="w-full flex justify-between items-center gap-x-5">
            <Button
              class="flex-1"
              type="submit"
              >Register</Button
            >
          </div>
        </form>
      </div>
      <img
        src="/src/assets/images/components/logo-topi.svg"
        alt="topi"
        class="flex-1"
      />
    </section>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const formData = reactive({
  username: "",
  email: "",
  password: "",
  confirmedPassword: "",
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username harus di isi", required),
      minLength: helpers.withMessage("Minimal 5 karakter", minLength(5)),
    },
    email: {
      required: helpers.withMessage("Email harus di isi", required),
      email: helpers.withMessage("Bukan format email", email),
    },
    password: {
      required: helpers.withMessage("Password harus di isi", required),
    },
    confirmedPassword: {
      required: helpers.withMessage(
        "Konfirmasi Password harus di isi",
        required
      ),
      sameAs: helpers.withMessage(
        "Password tidak sama",
        sameAs(formData.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      toast.success("Berhasil membuat akun", {
        onClose: () => router.push("/login"),
      });
    } catch (error) {
      toast.error("Something bad happend");
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
