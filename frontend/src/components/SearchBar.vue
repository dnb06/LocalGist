<script setup lang="ts">
import { useSnippetStore } from '../store/snippetStore';
const store = useSnippetStore();

const onInput = () => {
  store.selectedIndex = 0;
};
</script>

<template>
  <div class="mb-6 relative">
    <input 
      id="global-search-input"
      v-model="store.searchQuery" 
      @input="onInput"
      type="text" 
      placeholder="Search by title, tag, language, or command..." 
      class="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none block p-3 pr-24 placeholder-gray-500 transition-all"
    />
    <kbd class="absolute right-3 top-2.5 px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-900 border border-gray-700 rounded pointer-events-none">
      Ctrl + K
    </kbd>
  </div>
</template>