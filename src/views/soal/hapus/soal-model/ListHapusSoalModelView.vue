<template>
  <main class="p-8 md:h-screen">
    <Button
      @click="backHandler"
      class="mb-4"
      >⬅</Button
    >
    <h1 class="text-center font-secondary font-semibold mb-4 text-xl">
      Model {{ route.params.no }}
    </h1>
    <!-- mobile start -->
    <section class="font-primary">
      <div
        v-if="listSoal.length !== 0"
        class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 text-white"
      >
        <RouterLink
          v-for="(item, index) in listSoal"
          :to="`/tutor/hapussoal/model/${route.params.no}/soal/${index + 1}/${
            item.id
          }`"
          :key="index"
          class="bg-primary text-center p-5 rounded-lg border border-primary box-border transition-all hover:bg-white hover:text-black"
          >Soal {{ index + 1 }}</RouterLink
        >
      </div>
      <div v-else>
        <p class="font-primary text-center">Soal tidak ada</p>
      </div>
    </section>
    <!-- mobile end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const toast = useToast();

const listSoal = ref([]);

const fetchSoal = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/soal/get",
      {
        author: store.data.user.id,
        model: route.params.no,
      },
      {
        headers: {
          Authorization: `Bearer ${store.data.token}`,
        },
      }
    );

    listSoal.value = response.data;
  } catch (error) {
    toast.error("Terjadi Kesalahan", {
      onClose: () => {
        router.push("/tutor/hapussoal");
      },
    });
  }
};

onMounted(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
    return;
  } else {
    fetchSoal();
  }
});

const backHandler = () => {
  router.back();
};
</script>
