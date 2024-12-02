<template>
  <main class="p-6 font-primary">
    <!-- mobile start -->
    <section class="md:hidden flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <Button
          class="w-10 disabled:opacity-30"
          @click="prevHandler"
          :disabled="showSoalIndex === 0"
          ><img
            src="/src/assets/images/components/previous.svg"
            alt="prev"
            class="w-full"
        /></Button>
        <p>00:00</p>
        <Button
          @click="nextHandler"
          :disabled="showSoalIndex === soalStore.data.length - 1"
          class="w-10 disabled:opacity-30"
          s
          ><img
            class="w-full"
            src="/src/assets/images/components/next-black.svg"
            alt="skip"
        /></Button>
      </div>
      <div class="flex flex-col gap-y-4">
        <div class="bg-primary w-full rounded-lg py-5 text-center">
          <p>{{ soalStore.data[showSoalIndex].soal }}</p>
        </div>
        <div class="flex flex-col gap-y-2">
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            A. {{ soalStore.data[showSoalIndex].pilihanA }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            B. {{ soalStore.data[showSoalIndex].pilihanB }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            C. {{ soalStore.data[showSoalIndex].pilihanC }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            D. {{ soalStore.data[showSoalIndex].pilihanD }}
          </button>
        </div>
      </div>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section class="hidden md:flex flex-col gap-y-6 xl:w-2/3 xl:mx-auto">
      <div class="flex justify-between items-center">
        <Button
          class="w-12 disabled:opacity-30"
          @click="prevHandler"
          :disabled="showSoalIndex === 0"
          ><img
            src="/src/assets/images/components/previous.svg"
            alt="prev"
            class="w-full"
        /></Button>
        <p class="text-xl">00:00</p>
        <Button
          class="w-12 disabled:opacity-30"
          @click="nextHandler"
          :disabled="showSoalIndex === soalStore.data.length - 1"
          ><img
            class="w-full"
            src="/src/assets/images/components/next-black.svg"
            alt="skip"
        /></Button>
      </div>
      <div class="flex flex-col gap-y-4">
        <div class="bg-primary w-full rounded-lg py-5 text-center">
          <p>{{ soalStore.data[showSoalIndex].soal }}</p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            A. {{ soalStore.data[showSoalIndex].pilihanA }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            B. {{ soalStore.data[showSoalIndex].pilihanB }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            C. {{ soalStore.data[showSoalIndex].pilihanC }}
          </button>
          <button
            class="bg-primary border border-primary box-border px-3 py-2 rounded-lg transition-all text-white hover:bg-white hover:text-primary"
          >
            D. {{ soalStore.data[showSoalIndex].pilihanD }}
          </button>
        </div>
        <div
          v-if="showSoalIndex === soalStore.data.length - 1"
          class="mt-10 w-full flex justify-end"
        >
          <button
            class="px-3 py-2 border border-primary rounded-lg text-primary transition-all hover:bg-primary hover:text-white md:w-1/3"
          >
            Selesai
          </button>
        </div>
      </div>
    </section>
    <!-- tablet end -->
    <div
      v-if="showSoalIndex === soalStore.data.length - 1"
      class="mt-10 w-full flex justify-end xl:hidden"
    >
      <button
        class="px-3 py-2 border border-primary rounded-lg text-primary transition-all hover:bg-primary hover:text-white md:w-1/3"
      >
        Selesai
      </button>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useSoalStore } from "@/stores/soal";
import { useUserStore } from "@/stores/user";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();
const soalStore = useSoalStore();

const showSoalIndex = ref(0);

const prevHandler = () => {
  if (showSoalIndex.value === 0) {
    return;
  }
  showSoalIndex.value--;
};

const nextHandler = () => {
  if (showSoalIndex.value === soalStore.data.length - 1) {
    return;
  }
  showSoalIndex.value++;
};

onBeforeMount(() => {
  if (!Object.keys(store.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});
</script>
