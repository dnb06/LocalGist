<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSnippetStore } from '../store/snippetStore';

const store = useSnippetStore();

const title = ref('');
const language = ref('bash');
const tags = ref('');
const code = ref('');

// Sincronizar formulario cuando se selecciona un snippet para editar
watch(() => store.editingSnippet, (newVal) => {
  if (newVal) {
    title.value = newVal.title;
    language.value = newVal.language;
    tags.value = newVal.tags || '';
    code.value = newVal.code;
  } else {
    resetForm();
  }
});

const resetForm = () => {
  title.value = '';
  language.value = 'bash';
  tags.value = '';
  code.value = '';
};

const handleSubmit = () => {
  if (!title.value || !code.value) return;

  if (store.editingSnippet) {
    store.updateSnippet(store.editingSnippet.id, {
      title: title.value,
      language: language.value,
      tags: tags.value,
      code: code.value,
    });
  } else {
    store.addSnippet({
      title: title.value,
      language: language.value,
      tags: tags.value,
      code: code.value,
    });
  }
  resetForm();
};
</script>

<template>
  <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-100">
        {{ store.editingSnippet ? 'Edit Snippet' : 'New Snippet' }}
      </h2>
      <button 
        v-if="store.editingSnippet" 
        @click="store.cancelEdit()" 
        class="text-xs text-gray-400 hover:text-gray-200 underline"
      >
        Cancel
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Title</label>
        <input v-model="title" type="text" placeholder="e.g. System update script" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:ring-emerald-500 focus:border-emerald-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Language</label>
        <select v-model="language" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:ring-emerald-500 focus:border-emerald-500">
          <option value="bash">bash</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="docker">Docker</option>
          <option value="tex">LaTeX</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Tags (comma separated)</label>
        <input v-model="tags" type="text" placeholder="arch, pacman, update" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Code</label>
        <textarea v-model="code" rows="4" placeholder="Write your command here..." class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 font-mono text-sm focus:ring-emerald-500 focus:border-emerald-500" required></textarea>
      </div>
      
      <div class="flex gap-2">
        <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md">
          {{ store.editingSnippet ? 'Update Snippet' : 'Save Snippet' }}
        </button>
      </div>
    </form>
  </div>
</template>