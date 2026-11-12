<script setup lang="ts">
import { ref } from 'vue';
import { useSnippetStore } from '../store/snippetStore';

const snippetStore = useSnippetStore();

const title = ref('');
const language = ref('python');
const tags = ref('');
const code = ref('');

const handleSubmit = async () => {
  if (!title.value.trim() || !code.value.trim()) return;
  
  await snippetStore.addSnippet({
    title: title.value,
    language: language.value,
    tags: tags.value,
    code: code.value,
  });

  title.value = '';
  language.value = 'python';
  tags.value = '';
  code.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
    <h2 class="text-xl font-bold text-gray-100 mb-4">Nuevo Snippet</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Título</label>
        <input
          v-model="title"
          type="text"
          placeholder="Ej. Script de respaldo"
          required
          class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Lenguaje</label>
        <select
          v-model="language"
          class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 focus:outline-none focus:border-blue-500"
        >
          <option value="python">Python</option>
          <option value="bash">Bash</option>
          <option value="yaml">YAML</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
          <option value="json">JSON</option>
        </select>
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300 mb-1">Tags (separados por coma)</label>
      <input
        v-model="tags"
        type="text"
        placeholder="python, backup, script"
        class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 focus:outline-none focus:border-blue-500"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300 mb-1">Código</label>
      <textarea
        v-model="code"
        rows="5"
        placeholder="Escribe tu código aquí..."
        required
        class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 font-mono text-sm focus:outline-none focus:border-blue-500"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
    >
      Guardar Snippet
    </button>
  </form>
</template>
