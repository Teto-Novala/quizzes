<template>
  <main class="p-8">
    <h1 class="font-secondary font-semibold text-center text-2xl mb-4">
      Edit Soal
    </h1>
    <!-- mobile start -->
    <section
      class="md:hidden flex flex-col gap-y-3 h-screen text-white font-primary"
    >
      <RouterLink
        :to="`/tutor/editsoal/model/${1}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 1</RouterLink
      >
      <RouterLink
        :to="`/tutor/editsoal/model/${2}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 2</RouterLink
      >
      <RouterLink
        :to="`/tutor/editsoal/model/${3}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 3</RouterLink
      >
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section class="hidden md:flex gap-x-4 justify-center text-white">
      <RouterLink
        :to="`/tutor/editsoal/model/${1}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 1</RouterLink
      >
      <RouterLink
        :to="`/tutor/editsoal/model/${2}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 2</RouterLink
      >
      <RouterLink
        :to="`/tutor/editsoal/model/${3}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 3</RouterLink
      >
    </section>
    <!-- tablet end -->
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
