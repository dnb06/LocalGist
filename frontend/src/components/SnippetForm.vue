<script setup lang="ts">
import { ref } from 'vue';
import { useSnippetStore } from '../store/snippetStore';

const store = useSnippetStore();
const title = ref('');
const language = ref('bash');
const tags = ref('');
const code = ref('');

const handleSubmit = () => {
  if (!title.value || !code.value) return;
  store.addSnippet({
    title: title.value,
    language: language.value,
    tags: tags.value,
    code: code.value
  });
  title.value = '';
  tags.value = '';
  code.value = '';
};
</script>

<template>
  <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
    <h2 class="text-xl font-bold text-gray-100 mb-4">New Snippet</h2>
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
      <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md">
        Save Snippet
      </button>
    </form>
  </div>
</template>