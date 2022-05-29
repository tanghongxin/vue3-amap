import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useStore = defineStore('account', {
  state: () => ({
    username: useLocalStorage('username', ''),
  }),
  getters: {
    hasLoggedIn: (state) => !!state.username,
  },
  actions: {
    async login({ username }) {
      this.username = username;
    },
    async logout() {
      this.username = '';
    },
  },
});
