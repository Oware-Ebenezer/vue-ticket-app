<template>
  <main class="max-w-screen-2xl mx-auto px-4 py-8 text-black">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Ticket Management</h2>
    </div>

    <!-- Form Section -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold mb-2">
        {{ editing ? "Edit Ticket" : "Create Ticket" }}
      </h3>
      <TicketForm
        :initial="editing || {}"
        @submit="handleSubmit"
        @cancel="() => (editing = null)"
      />
    </section>

    <!-- List Section -->
    <section>
      <h3 class="text-lg font-semibold mb-4">All Tickets</h3>

      <!-- Empty State -->
      <div
        v-if="tickets.length === 0"
        class="bg-[rgba(11,18,32,0.8)] border border-white/10 rounded-2xl p-5 text-white text-center shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
      >
        No tickets yet. Create one above
      </div>

      <!-- Ticket Grid -->
      <div
        v-else
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
      >
        <TicketCard
          v-for="t in tickets"
          :key="t.id"
          :ticket="t"
          @edit="() => (editing = t)"
          @delete="handleDelete"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ticketsServices } from "../services/ticketServices";
import { toast } from "vue3-toastify";
import TicketForm from "../components/TicketForm.vue";
import TicketCard from "../components/TicketCard.vue";

const tickets = ref([]);
const editing = ref(null);

onMounted(() => {
  try {
    tickets.value = ticketsServices.list();
  } catch {
    toast.error("Failed to load tickets. Please retry.");
  }
});

const handleCreate = (payload) => {
  try {
    const created = ticketsServices.create(payload);
    tickets.value = [created, ...tickets.value];
    toast.success("Ticket created successfully");
  } catch (err) {
    if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
    else toast.error(err.message || "Failed to create ticket");
  }
};

const handleUpdate = (id, patch) => {
  try {
    const updated = ticketsServices.update(id, patch);
    tickets.value = tickets.value.map((x) =>
      x.id === updated.id ? updated : x
    );
    editing.value = null;
    toast.success("Ticket updated");
  } catch (err) {
    if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
    else toast.error(err.message || "Failed to update ticket");
  }
};

const handleDelete = (id) => {
  try {
    ticketsServices.remove(id);
    tickets.value = tickets.value.filter((x) => x.id !== id);
    toast.success("Ticket deleted");
  } catch (err) {
    toast.error(err.message || "Failed to delete ticket");
  }
};

const handleSubmit = (payload) => {
  if (editing.value) handleUpdate(editing.value.id, payload);
  else handleCreate(payload);
};
</script>
