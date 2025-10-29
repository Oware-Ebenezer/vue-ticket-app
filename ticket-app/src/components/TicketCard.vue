<template>
  <article
    class="bg-white border border-gray-300 rounded-2xl p-5 text-gray-900 shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
  >
    <section>
      <h3 class="text-lg font-semibold text-gray-700">
        {{ ticket.title }}
      </h3>
      <p class="text-sm text-slate-400 mt-2">
        {{ ticket.description }}
      </p>
    </section>

    <section class="mt-4 flex items-center justify-between">
      <span
        class="px-3 py-1 rounded-full text-xs capitalize"
        :class="statusClass(ticket.status)"
      >
        {{ ticket.status.replace('_', ' ') }}
      </span>

      <section class="flex gap-2">
        <button
          @click="$emit('edit', ticket)"
          aria-label="Edit Ticket"
          class="text-sm px-2 py-1 border border-gray-300 rounded-md bg-transparent cursor-pointer transition-colors duration-200 hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          @click="confirmDelete"
          aria-label="Delete Ticket"
          class="text-sm px-2 py-1 border border-gray-300 rounded-md bg-transparent cursor-pointer transition-colors duration-200 hover:bg-gray-100"
        >
          Delete
        </button>
      </section>
    </section>
  </article>
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function statusClass(status) {
  if (status === "open") return "bg-green-100 text-green-500";
  if (status === "in_progress") return "bg-amber-100 text-amber-500";
  return "bg-gray-100 text-gray-400";
}

function confirmDelete() {
  if (confirm("Are you sure you want to delete this ticket?")) {
    emit("delete", props.ticket.id);
  }
}
</script>
