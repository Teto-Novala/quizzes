<template>
  <main class="px-8">
    <!-- mobile start -->
    <div class="md:hidden">
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class="w-full"
      />
      <div class="font-secondary flex flex-col w-full justify-between gap-y-5">
        <h1 class="font-bold text-3xl">
          Belajar Konsep Baru Di Setiap Pertanyaan
        </h1>
        <h2 class="text-slate-500 text-lg">
          Kami membantu mempersiapkan ujian
        </h2>
        <Button
          @click="mulaiHandler"
          class="w-full"
          >Mulai Tes</Button
        >
      </div>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <div class="hidden md:flex xl:hidden flex-col justify-center items-center">
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class=""
      />
      <div class="flex flex-col gap-y-6">
        <h1 class="font-bold text-3xl">
          Belajar Konsep Baru Di Setiap Pertanyaan
        </h1>
        <h2 class="text-slate-500 text-xl">
          Kami membantu mempersiapkan ujian
        </h2>
        <Button
          @click="mulaiHandler"
          class="w-full"
          >Mulai Tes</Button
        >
      </div>
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex items-center justify-center gap-x-20">
      <div class="flex flex-col gap-y-7">
        <div>
          <h1 class="font-bold text-3xl">Belajar</h1>
          <h1 class="font-bold text-3xl">Konsep Baru</h1>
          <h1 class="font-bold text-3xl">Di Setiap Pertanyaan</h1>
        </div>
        <h2 class="text-slate-500 text-xl">
          Kami membantu mempersiapkan ujian
        </h2>
        <Button @click="mulaiHandler">Mulai Tes</Button>
      </div>
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class=""
      />
    </div>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const mulaiHandler = () => {
  router.push("/ujian");
};
</script>
