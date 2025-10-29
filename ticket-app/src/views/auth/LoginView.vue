<template>
  <AuthLayout title="Login to Your Account">
    <form class="flex flex-col gap-4" @submit="handleSubmit">
      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        v-model="form.email"
        class="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />

      <input
        type="password"
        name="password"
        placeholder="*************"
        v-model="form.password"
        class="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />

      <button
        type="submit"
        class="w-full bg-green-600 text-white rounded-lg p-3 font-medium hover:bg-green-700 transition-colors duration-200 cursor-pointer"
      >
        Login
      </button>
    </form>

    <p class="text-center text-sm mt-4">
      Don't have an account?
      <router-link
        to="/auth/signup"
        class="text-blue-600 font-medium hover:underline transition duration-150"
      >
        Sign Up
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from '@/main';
import { getUsers, setSession } from '../../utils/authUtils';
import AuthLayout from './AuthLayout.vue';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = form.value;

  if (!email || !password) {
    toast.error('Please fill all the fields');
    return;
  }

  const users = getUsers();
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    toast.error('Invalid credentials');
    return;
  }

  setSession(foundUser);
  toast.success(`Login successful, Welcome back ${foundUser.name}`);
  router.push('/dashboard');
};
</script>

<style scoped>
/* All styles replaced by Tailwind */
</style>
