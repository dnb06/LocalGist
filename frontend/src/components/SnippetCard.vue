<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSnippetStore } from '../store/snippetStore';

const props = defineProps({
  snippet: {
    type: Object,
    required: true
  },
  isFocused: {
    type: Boolean,
    default: false
  }
});

const store = useSnippetStore();
const copied = ref(false);
const cardRef = ref<HTMLElement | null>(null);

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

watch(() => props.isFocused, (focused) => {
  if (focused && cardRef.value) {
    cardRef.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

const handleEdit = () => {
  store.setEditingSnippet(props.snippet);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.snippet.title}"?`)) {
    store.deleteSnippet(props.snippet.id);
  }
};

const filterByTag = (tag: string) => {
  store.setTagFilter(tag.trim());
};

defineExpose({ copyCode });
</script>

<template>
  <div 
    ref="cardRef"
    class="bg-gray-800 border rounded-xl overflow-hidden shadow-lg transition-all duration-150"
    :class="isFocused ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-gray-800/90' : 'border-gray-700'"
  >
    <div class="px-5 py-4 border-b border-gray-700 flex justify-between items-start">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-gray-100">{{ snippet.title }}</h3>
          <span v-if="isFocused" class="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            Enter to copy
          </span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2 items-center">
          <span class="px-2.5 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-400 border border-blue-800">
            {{ snippet.language }}
          </span>
          
          <template v-if="snippet.tags">
            <button 
              v-for="tag in snippet.tags.split(',')" 
              :key="tag"
              @click.stop="filterByTag(tag)"
              class="px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300 hover:bg-emerald-800 hover:text-emerald-200 transition-colors border border-gray-600"
            >
              {{ tag.trim() }}
            </button>
          </template>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click.stop="copyCode" 
          class="text-xs px-3 py-1.5 rounded-md font-medium transition-colors border"
          :class="copied ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>

        <button 
          @click.stop="handleEdit" 
          class="text-xs px-3 py-1.5 rounded-md font-medium transition-colors border bg-yellow-950/40 text-yellow-400 border-yellow-900 hover:bg-yellow-900/50"
        >
          Edit
        </button>
        
        <button 
          @click.stop="handleDelete" 
          class="text-xs px-3 py-1.5 rounded-md font-medium transition-colors border bg-red-950/40 text-red-400 border-red-900 hover:bg-red-900/50"
        >
          Delete
        </button>
      </div>
    </div>
    
    <div class="p-5 bg-gray-900/50 overflow-x-auto">
      <pre><code class="text-sm font-mono text-gray-300">{{ snippet.code }}</code></pre>
    </div>
  </div>
</template>