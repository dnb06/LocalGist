<script setup lang="ts">
import { useSnippetStore } from '../store/snippetStore';
const store = useSnippetStore();
</script>

<template>
  <div class="mb-6">
    <input 
      v-model="store.searchQuery" 
      type="text" 
      placeholder="Search by title, tag, language, or command..." 
      class="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-3 placeholder-gray-500 transition-colors"
    />
  </div>
</template>