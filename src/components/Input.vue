<template>
  <div
    :class="[
      'p-3 font-secondary',
      `${
        isFocused
          ? 'border-l-8 border-t  border-b border-r border-t-slate-400 border-b-slate-400 border-r-slate-400 border-primary'
          : 'border border-slate-400'
      }`,
    ]"
  >
    <p class="text-slate-500">{{ label }}</p>
    <input
      :type="type"
      class="outline-none border-b border-slate-50 text-primary w-full"
      @focus="isFocused = true"
      @blur="isFocused = false"
      ref="inputRef"
      v-model="model"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const model = defineModel("model");

const isFocused = ref(false);
const inputRef = ref(null);

defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "Label",
  },
});
</script>
