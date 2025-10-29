<template>
  <form
    class="bg-white border border-gray-300 rounded-2xl p-5 text-gray-900 shadow-sm transition-all duration-300 hover:shadow-lg"
    @submit.prevent="handleSubmit"
  >
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Title -->
      <section>
        <label class="block text-sm font-medium text-gray-600">Title</label>
        <input
          v-model="title"
          placeholder="Short descriptive title"
          aria-label="ticket title"
          class="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        />
        <p v-if="errors.title" class="text-red-400 text-xs mt-1">
          {{ errors.title }}
        </p>
      </section>

      <!-- Status -->
      <section>
        <label class="block text-sm font-medium text-gray-600">Status</label>
        <select
          v-model="status"
          aria-label="ticket status"
          class="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        >
          <option v-for="stat in STATUS_OPTIONS" :key="stat" :value="stat">
            {{ stat.replace('_', ' ') }}
          </option>
        </select>
        <p v-if="errors.status" class="text-red-400 text-xs mt-1">
          {{ errors.status }}
        </p>
      </section>

      <!-- Description -->
      <section class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-600">
          Description (optional)
        </label>
        <textarea
          v-model="description"
          placeholder="More details (optional)"
          aria-label="ticket description"
          class="mt-1 w-full border border-gray-400 rounded-lg p-2 min-h-[90px] focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        ></textarea>
        <p v-if="errors.description" class="text-red-400 text-xs mt-1">
          {{ errors.description }}
        </p>
      </section>

      <!-- Buttons -->
      <section class="flex items-center gap-3 mt-4">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
        >
          Save
        </button>
        <button
          v-if="onCancel"
          type="button"
          @click="onCancel"
          class="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
        >
          Cancel
        </button>
      </section>
    </section>

    <!-- Back Button -->
    <button
      type="button"
      class="flex items-center justify-center gap-2 mt-4 px-4 py-2 text-white rounded-lg bg-indigo-600 cursor-pointer transition-colors duration-300 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
      :disabled="loading"
      @click="handleBackToDashboard"
    >
      <template v-if="loading">
        <svg
          class="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span>Returning...</span>
      </template>
      <template v-else>← Back to Dashboard</template>
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { STATUS_OPTIONS, validateTicketPayload } from "../utils/validators";
import toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  onSubmit: { type: Function, required: true },
  onCancel: { type: Function },
});

const title = ref(props.initial.title ?? "");
const status = ref(props.initial.status ?? "open");
const description = ref(props.initial.desc ?? "");
const priority = ref(props.initial.priority ?? "normal");
const errors = ref({});
const loading = ref(false);
const router = useRouter();

function runValidate() {
  const errs = validateTicketPayload({
    title: title.value,
    status: status.value,
    description: description.value,
  });
  errors.value = errs;
  return errs;
}

watch([title, status, description], runValidate);

function handleSubmit() {
  const errs = runValidate();
  if (Object.keys(errs).length) return;

  props.onSubmit({
    title: title.value.trim(),
    status: status.value,
    description: description.value.trim(),
    priority: priority.value,
  });
}

function handleBackToDashboard() {
  loading.value = true;
  toast.success("Returning to Dashboard...");
  setTimeout(() => {
    router.push("/dashboard");
  }, 1000);
}
</script>
