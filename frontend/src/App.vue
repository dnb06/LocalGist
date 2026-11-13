<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-emerald-400">LocalGist</h1>
        <p class="text-gray-400 text-sm mt-1">Terminal Snippet & Command Manager</p>
      </header>

      <HomeView />
    </div>
  </div>
</template>