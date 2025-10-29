<template>
  <button
    @click="handleLogout"
    class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors duration-300 hover:bg-red-600"
  >
    Logout
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { clearSession } from '../utils/authUtils';
import { toast } from '@/main';

const router = useRouter();

const handleLogout = () => {
  clearSession();
  toast.success('You have logged out successfully');
  router.push('/');
};
</script>
