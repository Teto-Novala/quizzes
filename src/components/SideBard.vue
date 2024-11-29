<template>
  <!-- tablet start -->
  <aside
    class="bg-primary font-secondary h-auto flex flex-col gap-y-3 text-xl xl:text-lg py-4 w-1/4"
  >
    <div>
      <div
        @click="soalHandler"
        class="flex items-center justify-between transition-all hover:bg-white w-full p-2"
      >
        <p>Soal</p>
        <img
          :src="`/src/assets/images/components/${isSoal ? 'down' : 'up'}.svg`"
          alt="up"
          class="w-3"
        />
      </div>
      <div
        class="flex flex-col"
        v-if="isSoal"
      >
        <p
          @click="buatSoalHandler"
          :class="[
            'p-3 transition-all hover:bg-white w-full',
            `${route.path === '/tutor/buatsoal' ? 'bg-white' : ''}`,
          ]"
        >
          Buat Soal
        </p>
        <p
          @click="editSoalHandler"
          :class="[
            'p-3 transition-all hover:bg-white w-full',
            `${route.path === '/tutor/editsoal' ? 'bg-white' : ''}`,
          ]"
        >
          Edit Soal
        </p>
        <p
          @click="hapusSoalHandler"
          :class="[
            'p-3 transition-all hover:bg-white w-full',
            `${route.path === '/tutor/hapussoal' ? 'bg-white' : ''}`,
          ]"
        >
          Hapus Soal
        </p>
      </div>
    </div>
    <div>
      <div
        @click="pengaturanHandler"
        class="flex items-center justify-between transition-all hover:bg-white w-full p-2"
      >
        <p>Pengaturan</p>
        <img
          :src="`/src/assets/images/components/${
            isPengaturan ? 'down' : 'up'
          }.svg`"
          alt="up"
          class="w-3"
        />
      </div>
      <div v-if="isPengaturan">
        <p
          @click="profilHandler"
          :class="[
            'p-3 transition-all hover:bg-white w-full',
            `${route.path === '/tutor/profil' ? 'bg-white' : ''}`,
          ]"
        >
          Profil
        </p>
        <p
          @click="logoutHandler"
          :class="['p-3 transition-all hover:bg-white w-full']"
        >
          Logout
        </p>
      </div>
    </div>
  </aside>
  <!-- tablet end -->
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const isPengaturan = ref(false);
const isSoal = ref(false);

const pengaturanHandler = () => {
  isPengaturan.value = !isPengaturan.value;
};

const soalHandler = () => {
  isSoal.value = !isSoal.value;
};

const profilHandler = () => {
  router.push("/tutor/profil");
};

const buatSoalHandler = () => {
  router.push("/tutor/buatsoal");
};
const editSoalHandler = () => {
  router.push("/tutor/editsoal");
};
const hapusSoalHandler = () => {
  router.push("/tutor/hapussoal");
};

const logoutHandler = () => {
  store.reset();
  router.push("/login");
};
</script>
