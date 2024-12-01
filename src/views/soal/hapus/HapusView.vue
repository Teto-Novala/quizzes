<template>
  <main class="p-8 h-screen">
    <h1 class="font-secondary font-semibold text-xl text-center mb-4">
      Hapus Soal
    </h1>
    <!-- mobile start -->
    <section
      class="md:hidden flex flex-col gap-y-3 h-screen text-white font-primary"
    >
      <RouterLink
        :to="`/tutor/hapussoal/model/${1}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 1</RouterLink
      >
      <RouterLink
        :to="`/tutor/hapussoal/model/${2}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 2</RouterLink
      >
      <RouterLink
        :to="`/tutor/hapussoal/model/${3}`"
        class="bg-primary text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 3</RouterLink
      >
    </section>
    <!-- mobile end -->
    <!-- tablet & desktop start -->
    <section class="hidden md:flex gap-x-4 justify-center text-white">
      <RouterLink
        :to="`/tutor/hapussoal/model/${1}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 1</RouterLink
      >
      <RouterLink
        :to="`/tutor/hapussoal/model/${2}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 2</RouterLink
      >
      <RouterLink
        :to="`/tutor/hapussoal/model/${3}`"
        class="bg-primary flex-1 text-center p-8 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
        >Model 3</RouterLink
      >
    </section>
    <!-- tablet & desktop end -->
  </main>
</template>

<script setup></script>
