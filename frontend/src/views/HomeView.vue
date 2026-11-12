<script setup lang="ts">
import { onMounted } from 'vue';
import { useSnippetStore } from '../store/snippetStore';
import SnippetForm from '../components/SnippetForm.vue';
import SnippetCard from '../components/SnippetCard.vue';

const snippetStore = useSnippetStore();

onMounted(() => {
  snippetStore.fetchSnippets();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
        <span class="text-blue-500">&lt;/&gt;</span> LocalGist
      </h1>
      <p class="text-gray-400 text-sm mt-1">Gestor personal de snippets y fragmentos de código.</p>
    </header>

    <SnippetForm />

    <section>
      <h2 class="text-xl font-bold text-gray-200 mb-4">Mis Snippets</h2>
      <div v-if="snippetStore.loading" class="text-gray-400 py-4">Cargando snippets...</div>
      <div v-else-if="snippetStore.error" class="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded mb-4">
        Error al conectar con backend: {{ snippetStore.error }}
      </div>
      <div v-else-if="snippetStore.snippets.length === 0" class="text-gray-500 py-8 text-center border border-dashed border-gray-700 rounded-lg">
        No hay snippets registrados. ¡Crea el primero arriba!
      </div>
      <div v-else class="space-y-4">
        <SnippetCard
          v-for="snippet in snippetStore.snippets"
          :key="snippet.id"
          :snippet="snippet"
        />
      </div>
    </section>
  </div>
</template>
