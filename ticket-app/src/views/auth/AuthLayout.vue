<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center bg-gray-200 p-4"
  >
    <div
      class="w-full max-w-md bg-white rounded-2xl p-8 shadow-md border border-gray-300 hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <h2
        class="text-2xl font-bold text-gray-800 text-center mb-6"
      >
        {{ title }}
      </h2>
      <slot></slot>
    </div>

    <footer
      class="mt-10 text-center text-gray-500 text-sm"
    >
      &copy; {{ new Date().getFullYear() }} OKICKET. All rights reserved.
    </footer>
  </section>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* No custom CSS — Tailwind handles all styling */
</style>
