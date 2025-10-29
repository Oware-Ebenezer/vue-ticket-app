<template>
  <AuthLayout title="Create an Account">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <input
        type="text"
        name="name"
        placeholder="Mr. John Smith"
        v-model="form.name"
        class="w-full border border-gray-300 rounded-lg p-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      />

      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        v-model="form.email"
        class="w-full border border-gray-300 rounded-lg p-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      />

      <input
        type="password"
        name="password"
        placeholder="*************"
        v-model="form.password"
        class="w-full border border-gray-300 rounded-lg p-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white rounded-lg p-3 text-base font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>

    <p class="text-center text-sm mt-4 text-gray-700">
      Already have an account?
      <RouterLink
        to="/auth/login"
        class="text-blue-600 font-medium hover:underline transition-colors duration-150"
      >
        Login
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "@/main";
import { getUsers, saveUsers, setSession } from "@/utils/authUtils";
import AuthLayout from "./AuthLayout.vue";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

function handleSubmit() {
  const { name, email, password } = form;
  if (!name || !email || !password) {
    toast.error("All fields are required!");
    return;
  }

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    toast.error("User with this email already exists!");
    router.push("/auth/login");
    return;
  }

  const newUser = { name, email, password };
  saveUsers(newUser);
  setSession(newUser);
  toast.success("Signup successful!");
  router.push("/dashboard");
}
</script>

<style scoped>
/* All styles migrated to Tailwind */
</style>
