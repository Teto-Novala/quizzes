<template>
  <main class="p-8">
    <!-- mobile start -->
    <section
      class="md:hidden flex flex-col gap-y-3 h-screen text-white font-primary"
    >
      <RouterLink
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 1</RouterLink
      >
      <RouterLink
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 2</RouterLink
      >
      <RouterLink
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 3</RouterLink
      >
    </section>
    <!-- mobile end -->
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
