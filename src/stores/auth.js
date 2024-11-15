import { defineStore } from 'pinia';

// Auth store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    SET_USER_DATA(user) {
      this.user = user;
    },
  },

  persist: {
    storage: localStorage,
  },
});
