<template>
  <main class="px-8 py-8">
    <h1 class="font-secondary font-semibold text-xl text-center">Buat Soal</h1>
    <!-- mobile start -->
    <form
      @submit.prevent="submitHandler"
      class="font-primary mt-3 flex flex-col gap-y-4"
    >
      <div class="flex flex-col gap-y-2">
        <p>Model</p>
        <select
          class="outline-none border border-slate-300 px-3 py-2 rounded-lg"
          name="model"
          id="model"
          v-model="formData.model"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <p>Mata Pelajaran</p>
        <input
          class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
          type="text"
          v-model="formData.subject"
          disabled
        />
      </div>
      <div>
        <p>Soal</p>
        <textarea
          v-model="formData.soal"
          class="outline-none w-full border border-slate-300 rounded-lg px-3 py-2"
          name="soal"
          id="soal"
          cols="100"
        ></textarea>
      </div>
      <div>
        <p>Pilihan A</p>
        <input
          v-model="formData.pilihanA"
          class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
          type="text"
        />
      </div>
      <div>
        <p>Pilihan B</p>
        <input
          v-model="formData.pilihanB"
          class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
          type="text"
        />
      </div>
      <div>
        <p>Pilihan C</p>
        <input
          v-model="formData.pilihanC"
          class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
          type="text"
        />
      </div>
      <div>
        <p>Pilihan D</p>
        <input
          v-model="formData.pilihanD"
          class="w-full px-3 py-2 outline-none border border-slate-300 rounded-lg"
          type="text"
        />
      </div>
      <div>
        <p>Jawaban</p>
        <select
          v-model="formData.jawaban"
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
      <Button>Simpan</Button>
    </form>
    <!-- mobile end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const router = useRouter();

const formData = reactive({
  model: "",
  subject: store.data.user.subject,
  soal: "",
  pilihanA: "",
  pilihanB: "",
  pilihanC: "",
  pilihanD: "",
  jawaban: "",
});

const rules = computed(() => {
  return {
    model: {
      required: helpers.withMessage("Model harus di isi", required),
    },
    soal: {
      required: helpers.withMessage("Soal harus di isi", required),
    },
    pilihanA: {
      required: helpers.withMessage("Pilihan A harus di isi", required),
    },
    pilihanB: {
      required: helpers.withMessage("Pilihan B harus di isi", required),
    },
    pilihanC: {
      required: helpers.withMessage("Pilihan C harus di isi", required),
    },
    pilihanD: {
      required: helpers.withMessage("Pilihan D harus di isi", required),
    },
    jawaban: {
      required: helpers.withMessage("Jawaban harus di isi", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/soal",
        formData,
        { headers: { Authorization: `Bearer ${store.data.token}` } }
      );
      toast.success(response.data.message, {
        onClose: () => {
          formData.jawaban = "";
          formData.model = "";
          formData.pilihanA = "";
          formData.pilihanB = "";
          formData.pilihanC = "";
          formData.pilihanD = "";
          formData.soal = "";
        },
      });
    } catch (error) {
      console.error(error);
      if (error.response.data.message === "Unauthorized") {
        toast.error(error.response.data.message, {
          onClose: () => {
            store.reset();
            router.push("/login");
          },
        });
        return;
      }
      toast.error(error.response.data.message[0]);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
