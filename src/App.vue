<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="route">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.route {
  height: calc(100vh - 3.5rem);
  @apply overflow-auto mt-14 pt-4 pb-8;
}
</style>
