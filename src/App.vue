<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="route">
    <RouterView />
  </div>
</template>

<style scoped>
.route {
  @apply w-screen;
  padding-top: 4rem;
}
</style>
