<template>
  <main class="p-8">
    <h1 class="font-secondary font-semibold text-xl text-center mb-4">
      Soal {{ route.params.nosoal }}
    </h1>
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
          ></textarea>
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan A</p>
          <input
            v-model="soal.pilihanA"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan B</p>
          <input
            v-model="soal.pilihanB"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan C</p>
          <input
            v-model="soal.pilihanC"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <p>Pilihan D</p>
          <input
            v-model="soal.pilihanD"
            class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
            type="text"
          />
        </div>
        <div>
          <p>Jawaban</p>
          <select
            v-model="soal.jawaban"
            class="outline-none border border-slate-300 px-3 py-2 rounded-lg w-full"
            name="model"
            id="model"
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
          >Edit</Button
        >
      </form>
    </section>
    <section v-else>
      <p class="text-center font-primary text-xl">Soal Tidak ditemukan</p>
    </section>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const store = useUserStore();

const soal = ref({});

const rules = computed(() => {
  return {
    model: {
      required: helpers.withMessage("Model tidak boleh kosong", required),
    },
    subject: {
      required: helpers.withMessage(
        "Mata Pelajaran tidak boleh kosong",
        required
      ),
    },
    soal: {
      required: helpers.withMessage("Soal tidak boleh kosong", required),
    },
    pilihanA: {
      required: helpers.withMessage("Pilihan A tidak boleh kosong", required),
    },
    pilihanB: {
      required: helpers.withMessage("Pilihan B tidak boleh kosong", required),
    },
    pilihanC: {
      required: helpers.withMessage("Pilihan C tidak boleh kosong", required),
    },
    pilihanD: {
      required: helpers.withMessage("Pilihan D tidak boleh kosong", required),
    },
    jawaban: {
      required: helpers.withMessage("Jawaban tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, soal);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log(soal);
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
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
    console.log(error);

    toast.error("Terjadi Kesalahan", {
      onClose: () => {
        router.push("/tutor/editsoal");
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
  }

  fetchSoal();
});
</script>
