<template>
  <nav class="bg-white shadow-md sticky top-0 z-50 w-full">
    <header class="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-[1.6rem] font-bold text-emerald-700 tracking-[0.5px]">
        OKICKET
      </h1>

    
      <section class="hidden md:flex items-center gap-6 cursor-pointer">
        <RouterLink
          to="/auth/login"
          class="text-gray-800 no-underline font-medium transition-colors duration-300 hover:text-emerald-700"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/auth/signup"
          class="text-gray-800 no-underline font-semibold transition-colors duration-300 hover:text-emerald-700"
        >
          Get Started
        </RouterLink>
      </section>

   
      <button
        class="block md:hidden bg-transparent border-none text-2xl cursor-pointer text-gray-700 transition-colors duration-300 hover:text-emerald-700"
        @click="isOpen = !isOpen"
      >
        <span v-if="!isOpen">&#9776;</span> 
      </button>
    </header>


    <section
      v-if="isOpen"
      class="bg-white border-t border-gray-200 shadow-sm flex flex-col items-center py-4 gap-3 md:hidden"
    >
      <RouterLink
        to="/auth/login"
        class="text-gray-800 no-underline text-base transition-colors duration-300 hover:text-emerald-700"
        @click="isOpen = false"
      >
        Login
      </RouterLink>

      <RouterLink
        to="/auth/signup"
        class="text-gray-800 no-underline text-base font-semibold transition-colors duration-300 hover:text-emerald-700"
        @click="isOpen = false"
      >
        Get Started
      </RouterLink>
    </section>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>
