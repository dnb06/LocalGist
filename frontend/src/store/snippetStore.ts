import { defineStore } from 'pinia';
import Fuse from 'fuse.js';

const API_URL = 'http://localhost:3001/api/snippets';

export const useSnippetStore = defineStore('snippetStore', {
  state: () => ({
    snippets: [] as any[],
    loading: false,
    error: null as string | null,
    searchQuery: '',
    activeTagFilter: null as string | null,
    editingSnippet: null as any | null,
    selectedIndex: 0,
  }),
  getters: {
    filteredSnippets(state) {
      let result = state.snippets;

      if (state.activeTagFilter) {
        result = result.filter(s => 
          s.tags && s.tags.toLowerCase().includes(state.activeTagFilter!.toLowerCase())
        );
      }

      if (!state.searchQuery.trim()) {
        return result;
      }
      const fuse = new Fuse(result, {
        keys: ['title', 'tags', 'code', 'language'],
        threshold: 0.3,
      });
      return fuse.search(state.searchQuery).map(res => res.item);
    }
  },
  actions: {
    async fetchSnippets() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch snippets');
        this.snippets = await response.json();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addSnippet(snippet: { title: string; language: string; tags: string; code: string }) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snippet),
        });
        if (!response.ok) throw new Error('Failed to create snippet');
        const newSnippet = await response.json();
        this.snippets.unshift(newSnippet);
        this.selectedIndex = 0;
      } catch (err: any) {
        this.error = err.message;
      }
    },
    async updateSnippet(id: number, snippet: { title: string; language: string; tags: string; code: string }) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snippet),
        });
        if (!response.ok) throw new Error('Failed to update snippet');
        const updated = await response.json();
        const index = this.snippets.findIndex(s => s.id === id);
        if (index !== -1) {
          this.snippets[index] = updated;
        }
        this.editingSnippet = null;
      } catch (err: any) {
        this.error = err.message;
      }
    },
    async deleteSnippet(id: number) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete snippet');
        this.snippets = this.snippets.filter(s => s.id !== id);
        if (this.editingSnippet?.id === id) {
          this.cancelEdit();
        }
        this.setSelectedIndex(this.selectedIndex);
      } catch (err: any) {
        this.error = err.message;
      }
    },
    setEditingSnippet(snippet: any) {
      this.editingSnippet = snippet;
    },
    cancelEdit() {
      this.editingSnippet = null;
    },
    setTagFilter(tag: string | null) {
      this.activeTagFilter = this.activeTagFilter === tag ? null : tag;
      this.selectedIndex = 0;
    },
    setSelectedIndex(index: number) {
      const total = this.filteredSnippets.length;
      if (total === 0) {
        this.selectedIndex = 0;
        return;
      }
      if (index < 0) this.selectedIndex = 0;
      else if (index >= total) this.selectedIndex = total - 1;
      else this.selectedIndex = index;
    },
    resetSelectedIndex() {
      this.selectedIndex = 0;
    }
  }
});