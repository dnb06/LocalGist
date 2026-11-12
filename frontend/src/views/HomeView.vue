<script setup lang="ts">
import { onMounted } from 'vue';
import { useSnippetStore } from '../store/snippetStore';
import SnippetForm from '../components/SnippetForm.vue';
import SnippetCard from '../components/SnippetCard.vue';
import SearchBar from '../components/SearchBar.vue'; // <-- 1. Importar

const store = useSnippetStore();

onMounted(() => {
  store.fetchSnippets();
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-10">
        <h1 class="text-4xl font-bold text-emerald-400 tracking-tight">LocalGist</h1>
        <p class="text-gray-400 mt-2">Terminal Snippet & Command Manager</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <SnippetForm />
        </div>

        <div class="lg:col-span-2">
          <SearchBar /> <!-- <-- 2. Renderizar buscador -->
          <!-- Aviso de filtro activo -->
        <div v-if="store.activeTagFilter" class="mb-4 flex items-center justify-between bg-emerald-950/30 border border-emerald-800 p-3 rounded-lg text-sm text-emerald-300">
          <span>Filtering by tag: <strong>{{ store.activeTagFilter }}</strong></span>
          <button @click="store.setTagFilter(null)" class="text-xs underline hover:text-white">Clear filter</button>
        </div>
          <div v-if="store.loading" class="text-gray-400 animate-pulse">Loading commands...</div>
          <div v-else-if="store.error" class="text-red-400 bg-red-900/20 p-4 rounded-lg">Error: {{ store.error }}</div>
          <div v-else class="space-y-6">
            
            <!-- 3. Cambiar 'snippets' por 'filteredSnippets' -->
            <SnippetCard 
              v-for="snippet in store.filteredSnippets" 
              :key="snippet.id" 
              :snippet="snippet" 
            />
            
            <div v-if="store.filteredSnippets.length === 0" class="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl text-gray-500">
              No se encontraron comandos.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>