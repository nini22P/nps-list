<script setup lang='ts'>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <h1>NPS List</h1>
    <nav>
      <RouterLink to="/">{{ $t('nav.browse') }}</RouterLink>
      <RouterLink to="/settings">{{ $t('nav.settings') }}</RouterLink>
    </nav>
    <a href="https://github.com/nini22P/nps-list" target="_blank">GitHub</a>
  </header>
</template>

<style scoped>
header {
  @apply bg-cyan-800 h-14 shadow-md fixed w-full flex top-0 justify-between items-center px-4;
}

nav {
  @apply flex justify-center items-center flex-nowrap rounded bg-cyan-900 gap-px p-[2px];
}

nav a {
  @apply px-4 py-1.5 bg-cyan-800 text-slate-300;
}

nav :hover {
  @apply text-slate-100;
}

nav :first-child {
  @apply rounded-l;
}

nav :last-child {
  @apply rounded-r;
}

nav .active {
  @apply bg-cyan-700 text-white shadow;
}
</style>