<script setup lang="ts">
import { computed, ref } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { useSnippetStore } from '../store/snippetStore';

const props = defineProps<{
  snippet: {
    id: number;
    title: string;
    code: string;
    language: string;
    tags: string;
    created_at?: string;
  };
}>();

const snippetStore = useSnippetStore();
const isEditing = ref(false);

const editTitle = ref(props.snippet.title);
const editLanguage = ref(props.snippet.language);
const editTags = ref(props.snippet.tags || '');
const editCode = ref(props.snippet.code);

const highlightedCode = computed(() => {
  const lang = props.snippet.language;
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(props.snippet.code, { language: lang }).value;
    } catch (e) {
      return hljs.highlightAuto(props.snippet.code).value;
    }
  }
  return hljs.highlightAuto(props.snippet.code).value;
});

const tagList = computed(() => {
  if (!props.snippet.tags) return [];
  return props.snippet.tags.split(',').map((t) => t.trim()).filter(Boolean);
});

const startEdit = () => {
  editTitle.value = props.snippet.title;
  editLanguage.value = props.snippet.language;
  editTags.value = props.snippet.tags || '';
  editCode.value = props.snippet.code;
  isEditing.value = true;
};

const saveEdit = async () => {
  await snippetStore.updateSnippet(props.snippet.id, {
    title: editTitle.value,
    language: editLanguage.value,
    tags: editTags.value,
    code: editCode.value,
  });
  isEditing.value = false;
};

const deleteSnippet = async () => {
  if (confirm('¿Seguro que deseas eliminar este snippet?')) {
    await snippetStore.deleteSnippet(props.snippet.id);
  }
};
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-5 mb-4 text-gray-100">
    <div v-if="!isEditing">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-lg font-bold text-gray-100">{{ snippet.title }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded font-mono uppercase">
              {{ snippet.language }}
            </span>
            <span v-for="tag in tagList" :key="tag" class="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">
              #{{ tag }}
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button @click="startEdit" class="text-gray-400 hover:text-blue-400 text-sm">Editar</button>
          <button @click="deleteSnippet" class="text-gray-400 hover:text-red-400 text-sm">Eliminar</button>
        </div>
      </div>

      <div class="bg-gray-900 rounded p-4 overflow-x-auto border border-gray-700/50">
        <pre><code class="hljs font-mono text-sm" v-html="highlightedCode"></code></pre>
      </div>
    </div>

    <!-- Mode Edit -->
    <div v-else class="space-y-3">
      <h3 class="text-md font-bold text-gray-200">Editar Snippet</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input v-model="editTitle" type="text" class="bg-gray-900 border border-gray-700 rounded p-2 text-gray-100" />
        <select v-model="editLanguage" class="bg-gray-900 border border-gray-700 rounded p-2 text-gray-100">
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
      <input v-model="editTags" type="text" placeholder="Tags..." class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100" />
      <textarea v-model="editCode" rows="4" class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 font-mono text-sm"></textarea>
      <div class="flex justify-end gap-2">
        <button @click="isEditing = false" class="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">Cancelar</button>
        <button @click="saveEdit" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white">Guardar</button>
      </div>
    </div>
  </div>
</template>
