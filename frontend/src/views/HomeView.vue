<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useSnippetStore } from '../store/snippetStore';
import SearchBar from '../components/SearchBar.vue';
import SnippetForm from '../components/SnippetForm.vue';
import SnippetCard from '../components/SnippetCard.vue';

const store = useSnippetStore();
const cardRefs = ref<any[]>([]);

const handleKeyDown = (e: KeyboardEvent) => {
  const searchInput = document.getElementById('global-search-input') as HTMLInputElement | null;
  const activeEl = document.activeElement as HTMLElement | null;

  // 1. Ctrl+K o Cmd+K -> Enfocar barra de búsqueda
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput?.focus();
    searchInput?.select();
    return;
  }

  // 2. Escape -> Quitar foco de la barra de búsqueda
  if (e.key === 'Escape') {
    if (activeEl === searchInput) {
      searchInput?.blur();
    }
    return;
  }

  // Ignorar flechas y Enter si se está escribiendo en el formulario izquierdo
  const isFormInput =
    activeEl &&
    (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT') &&
    activeEl !== searchInput;
  if (isFormInput) return;

  // 3. Flechas Arriba / Abajo -> Mover selección entre tarjetas
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    store.setSelectedIndex(store.selectedIndex + 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    store.setSelectedIndex(store.selectedIndex - 1);
  } else if (e.key === 'Enter') {
    // 4. Enter -> Copiar código de la tarjeta seleccionada
    if (store.filteredSnippets.length > 0 && activeEl?.tagName !== 'BUTTON') {
      e.preventDefault();
      const selectedCard = cardRefs.value[store.selectedIndex];
      if (selectedCard && selectedCard.copyCode) {
        selectedCard.copyCode();
      } else {
        const targetSnippet = store.filteredSnippets[store.selectedIndex];
        if (targetSnippet) navigator.clipboard.writeText(targetSnippet.code);
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  store.fetchSnippets();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="md:col-span-1">
      <SnippetForm />
    </div>

    <div class="md:col-span-2">
      <SearchBar />

      <div 
        v-if="store.activeTagFilter" 
        class="mb-4 flex items-center justify-between bg-emerald-950/30 border border-emerald-800 p-3 rounded-lg text-sm text-emerald-300"
      >
        <span>Filtering by tag: <strong>{{ store.activeTagFilter }}</strong></span>
        <button @click="store.setTagFilter(null)" class="text-xs underline hover:text-white">
          Clear filter
        </button>
      </div>

      <div v-if="store.error" class="mb-4 p-4 bg-red-950/40 border border-red-800 rounded-lg text-red-400 text-sm">
        Error: {{ store.error }}
      </div>

      <div v-if="store.loading" class="text-center py-10 text-gray-400">
        Loading snippets...
      </div>

      <div 
        v-else-if="store.filteredSnippets.length === 0" 
        class="text-center py-10 text-gray-500 bg-gray-800/30 rounded-xl border border-gray-800"
      >
        No snippets found.
      </div>

      <div v-else class="space-y-4">
        <SnippetCard 
          v-for="(snippet, index) in store.filteredSnippets" 
          :key="snippet.id" 
          :ref="(el) => { if (el) cardRefs[index] = el }"
          :snippet="snippet" 
          :is-focused="index === store.selectedIndex"
          @click="store.setSelectedIndex(index)"
        />
      </div>
    </div>
  </div>
</template>