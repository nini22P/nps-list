<script setup lang='ts'>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <h1>NPS List</h1>
    <nav>
      <RouterLink to="/">浏览</RouterLink>
      <RouterLink to="/settings">设置</RouterLink>
    </nav>
    <a href="https://github.com/nini22P/nps-list" target="_blank">GitHub</a>
  </header>
</template>

<style scoped>
header {
  @apply bg-cyan-800 h-14 shadow-md fixed w-full flex top-0 justify-between items-center px-4;
}

nav {
  @apply flex justify-center items-center flex-nowrap rounded-md bg-cyan-900 gap-0.5 p-0.5;
}

nav a {
  @apply px-6 py-2 bg-cyan-800 text-slate-300;
}

nav :hover {
  @apply bg-cyan-700 text-slate-100;
}

nav :first-child {
  @apply rounded-l-md;
}

nav :last-child {
  @apply rounded-r-md;
}

nav .active {
  @apply bg-cyan-700 text-white shadow;
}
</style>