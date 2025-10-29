<template>
  <main class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <section class="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-white overflow-hidden">
      
      <div class="absolute w-40 h-40 rounded-full opacity-20 bg-amber-700 top-10 right-20"></div>
      <div class="absolute w-40 h-40 rounded-full opacity-20 bg-blue-700 top-52 left-52"></div>

 
      <div class="relative z-10 max-w-screen-xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-black">OKICKET</h1>
        <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
          Simplify Your <span class="text-amber-700">Ticket Management</span>
        </h2>

        <p class="text-gray-800 mt-4 mb-3 max-w-2xl mx-auto">
          Manage, track, and resolve tickets differently with a sleek and secure web app.
        </p>

        <section class="mb-20 flex justify-center gap-4">
          <a
            href="/auth/signup"
            class="px-6 py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition"
          >
            Get Started
          </a>
          <a
            href="/auth/login"
            class="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition"
          >
            Login
          </a>
        </section>
      </div>

      <img :src="heroWave" alt="Wavy background" class="absolute bottom-0 left-0 w-full" />
    </section>

    <!-- Features Section -->
    <section
      class="max-w-screen-xl mx-auto py-16 px-6 grid gap-4 md:grid-cols-3"
    >
      <section
        v-for="(item, index) in weOffer"
        :key="index"
        class="bg-white shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transition"
      >
        <h3 class="text-xl font-semibold text-amber-500 mb-2">
          {{ item.title }}
        </h3>
        <p class="text-gray-600">
          {{ item.description }}
        </p>
      </section>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import Footer from "../components/AppFooter.vue";
import Navbar from "../components/Nav-bar.vue";
import heroWave from "/wave.svg";

const weOffer = [
  {
    title: "Create Tickets",
    description: "Easily create and submit tickets for any issues or requests.",
  },
  {
    title: "Track Progress",
    description: "Monitor open, in-progress, and resolved tickets in real-time.",
  },
  {
    title: "Stay notified",
    description: "Receive updates on ticket status changes.",
  },
];
</script>
