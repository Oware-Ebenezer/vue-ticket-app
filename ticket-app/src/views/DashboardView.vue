<template>
  <main class="max-w-[1440px] mx-auto px-4 py-8">
    <section class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Okicket Dashboard</h1>
        <p class="text-sm text-slate-400">
          Welcome back,
          <span class="font-medium text-slate-700">
            {{ session?.name || session?.email }}
          </span>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/tickets"
          class="px-3 py-2 border border-gray-300 rounded text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition"
        >
          Manage Tickets
        </router-link>
        <LogoutButton />
      </div>
    </section>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <div
        class="bg-[#0b1220cc] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
      >
        <h4 class="text-sm text-slate-400">Total Tickets</h4>
        <p class="text-2xl font-semibold mt-2">{{ stats.total }}</p>
      </div>

      <div
        class="bg-[#0b1220cc] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
      >
        <h4 class="text-sm text-slate-400">Open</h4>
        <p class="text-2xl font-semibold mt-2">{{ stats.open }}</p>
      </div>

      <div
        class="bg-[#0b1220cc] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
      >
        <h4 class="text-sm text-slate-400">In Progress</h4>
        <p class="text-2xl font-semibold mt-2">{{ stats.in_progress }}</p>
      </div>

      <div
        class="bg-[#0b1220cc] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
      >
        <h4 class="text-sm text-slate-400">Closed</h4>
        <p class="text-2xl font-semibold mt-2">{{ stats.closed }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSession } from "../utils/authUtils";
import { ticketsServices } from "../services/ticketServices";
import { toast } from "@/main";
import LogoutButton from "../components/LogoutButton.vue";

const stats = ref({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0,
});

const session = getSession();

onMounted(() => {
  try {
    const all = ticketsServices.list();
    const total = all.length;
    const open = all.filter((t) => t.status === "open").length;
    const in_progress = all.filter((t) => t.status === "in_progress").length;
    const closed = all.filter((t) => t.status === "closed").length;
    stats.value = { total, open, in_progress, closed };
  } catch {
    toast.error("Failed to load tickets. Please retry.");
  }
});
</script>

<style scoped>
/* All vanilla CSS replaced with Tailwind classes */
</style>
