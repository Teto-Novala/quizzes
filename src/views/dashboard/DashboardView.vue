<template>
  <main class="px-8">
    <div class="flex items-center justify-center h-screen">
      <h1 class="font-secondary text-slate-500 text-2xl">
        Selamat datang {{ store.data.user.username }}
      </h1>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const store = useUserStore();
</script>
