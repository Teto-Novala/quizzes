<template>
  <main class="px-8">
    <!-- mobile start -->
    <section class="flex flex-col items-center gap-y-5">
      <img
        src="/src/assets/images/components/logo.svg"
        alt="logo"
        class="w-full h-32"
      />
      <div class="font-secondary flex flex-col items-center gap-y-2">
        <h1 class="text-2xl">Selamat Datang</h1>
        <h2 class="text-lg">Silahkan Login/Register ke akun anda</h2>
      </div>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-5"
      >
        <div>
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
        </div>
        <div class="w-full flex items-center gap-x-5">
          <Button type="submit">Login</Button>
          <Button>Register</Button>
        </div>
      </form>
    </section>
    <!-- mobile end -->
  </main>
</template>

<script setup>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { RouterLink } from "vue-router";
import { reactive } from "vue";

const formData = reactive({
  email: "",
  password: "",
});

const submitHandler = async () => {
  console.log(formData);
};
</script>
