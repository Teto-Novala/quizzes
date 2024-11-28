<template>
  <Navbar />
  <div class="hidden md:flex">
    <SideBard class="w-[25%]" />
    <RouterView class="w-[75%]" />
  </div>
  <RouterView class="md:hidden" />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./Navbar.vue";
import SideBard from "./SideBard.vue";
</script>
