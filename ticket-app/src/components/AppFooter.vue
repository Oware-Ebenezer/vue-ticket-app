<template>
  <footer class="bg-emerald-950 py-6 mt-auto">
    <article class="max-w-[1440px] mx-auto text-center text-gray-200 text-sm">
      &copy; {{ currentYear }} OKICKET. All rights reserved.
    </article>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
