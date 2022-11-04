<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function onLoginClick() {
  localStorage.setItem('authenticated', 'true');
  router.push('/admin');
}
localStorage.getItem('authenticated')
</script>

<template>login page <button @click="onLoginClick">Login</button></template>
