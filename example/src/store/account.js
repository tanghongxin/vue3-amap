import { defineStore } from 'pinia';
import { useLocalStorage } from '@/utils/storage';

export default defineStore('account', {
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
