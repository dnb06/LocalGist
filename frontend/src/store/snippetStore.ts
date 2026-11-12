import { defineStore } from 'pinia';
import Fuse from 'fuse.js';

const API_URL = 'http://localhost:3001/api/snippets';

export const useSnippetStore = defineStore('snippetStore', {
  state: () => ({
    snippets: [] as any[],
    loading: false,
    error: null as string | null,
    searchQuery: '', // <-- Nuevo estado
  }),
  getters: {
    // <-- Nuevo filtro Fuzzy
    filteredSnippets(state) {
      if (!state.searchQuery.trim()) {
        return state.snippets;
      }
      const fuse = new Fuse(state.snippets, {
        keys: ['title', 'tags', 'code', 'language'],
        threshold: 0.3, // Permite ligeros errores tipográficos
      });
      return fuse.search(state.searchQuery).map(result => result.item);
    }
  },
  actions: {
    async fetchSnippets() {
      this.loading = true;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.snippets = await response.json();
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error fetching snippets:', error);
      } finally {
        this.loading = false;
      }
    },

    async addSnippet(snippet: any) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snippet),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newSnippet = await response.json();
        this.snippets.unshift(newSnippet);
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error adding snippet:', error);
      }
    },

    async updateSnippet(id: number, updatedSnippet: any) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSnippet),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const index = this.snippets.findIndex((s: any) => s.id === id);
        if (index !== -1) {
          this.snippets[index] = data;
        }
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error updating snippet:', error);
      }
    },

    async deleteSnippet(id: number) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.snippets = this.snippets.filter((snippet: any) => snippet.id !== id);
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error deleting snippet:', error);
      }
    },
  },
});