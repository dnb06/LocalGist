<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  snippet: {
    type: Object,
    required: true
  }
});

const copied = ref(false);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.snippet.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy!', err);
  }
};
</script>

<template>
  <div class="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
    <!-- Cabecera de la tarjeta -->
    <div class="px-5 py-4 border-b border-gray-700 flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-gray-100">{{ snippet.title }}</h3>
        <div class="flex gap-2 mt-2">
          <span class="px-2.5 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-400 border border-blue-800">
            {{ snippet.language }}
          </span>
          <span v-if="snippet.tags" class="px-2.5 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
            {{ snippet.tags }}
          </span>
        </div>
      </div>
      
      <!-- Botón de copiar -->
      <button 
        @click="copyCode" 
        class="text-xs px-3 py-1.5 rounded-md font-medium transition-colors border"
        :class="copied ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'"
      >
        {{ copied ? '¡Copiado!' : 'Copiar' }}
      </button>
    </div>
    
    <!-- Bloque de código -->
    <div class="p-5 bg-gray-900/50 overflow-x-auto">
      <pre><code class="text-sm font-mono text-gray-300">{{ snippet.code }}</code></pre>
    </div>
  </div>
</template>