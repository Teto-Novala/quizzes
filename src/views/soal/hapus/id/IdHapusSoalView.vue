<template>
  <main class="p-8 md:h-screen xl:h-auto">
    <section v-if="Object.keys(soal).length">
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-4 w-full font-primary"
      >
        <div class="flex flex-col gap-y-2">
          <p>Model</p>
          <select
            class="outline-none w-full border border-slate-300 px-3 py-2 rounded-lg"
            name="model"
            id="model"
            v-model="soal.model"
            disabled
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Mata Pelajaran</p>
          <input
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
            v-model="soal.subject"
            disabled
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Soal</p>
          <textarea
            v-model="soal.soal"
            class="outline-none w-full border border-slate-300 rounded-lg px-3 py-2"
            name="soal"
            id="soal"
            cols="100"
            disabled
          ></textarea>
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan A</p>
          <input
            v-model="soal.pilihanA"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
            disabled
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan B</p>
          <input
            v-model="soal.pilihanB"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
            disabled
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan C</p>
          <input
            v-model="soal.pilihanC"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
            disabled
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan D</p>
          <input
            v-model="soal.pilihanD"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
            disabled
          />
        </div>
        <div>
          <p>Jawaban</p>
          <select
            v-model="soal.jawaban"
            class="outline-none border border-slate-300 px-3 py-2 rounded-lg w-full"
            name="model"
            id="model"
            disabled
          >
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>
        <Button
          type="submit"
          class="w-full"
          >Hapus</Button
        >
      </form>
    </section>
    <section v-else>
      <p class="text-center font-primary text-xl">Soal Tidak ditemukan</p>
    </section>
    <div
      v-if="isActive"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center px-8"
    >
      <div
        class="w-full md:w-1/2 mx-auto bg-white p-3 rounded-lg flex flex-col gap-y-3 xl:gap-y-5"
      >
        <p class="font-primary">Apakah anda yakin ingin menghapus soal?</p>
        <div class="flex justify-between items-center gap-x-5">
          <Button
            @click="tidakHandler"
            class="flex-1"
            >Tidak</Button
          >
          <Button
            @click="yakinHandler"
            class="flex-1"
            >Yakin</Button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

const soal = ref({});
const isActive = ref(false);

const tidakHandler = () => {
  isActive.value = false;
};

const yakinHandler = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/soal/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${store.data.token}`,
        },
      }
    );
    toast.success(response.data.message, {
      onClose: () => {
        isActive.value = false;
        router.push("/tutor/hapussoal");
      },
    });
  } catch (error) {
    toast.error("Terjadi Kesalahan", {
      onClose: () => {
        isActive.value = false;
      },
    });
  }
};

const submitHandler = () => {
  isActive.value = true;
};

const fetchSoal = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${store.data.token}`,
        },
      }
    );

    soal.value = response.data;
  } catch (error) {
    console.error(error);

    toast.error("Terjadi Kesalahan", {
      onClose: () => {
        router.push("/tutor/hapussoal");
      },
    });
  }
};

onMounted(async () => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
    return;
  } else {
    await fetchSoal();
  }
});
</script>
