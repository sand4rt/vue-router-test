<script lang="ts" setup>
const authenticated = localStorage.getItem('authenticated') === 'true'
</script>
<template>admin page <span v-if="authenticated">Admin username</span></template>