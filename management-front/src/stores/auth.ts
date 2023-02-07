import { defineStore } from 'pinia';

export interface IRememberState {
  enabled: boolean;
  email: string;
  password: string;
}

export interface IAuthState {
  remember: IRememberState;
}

const storageKey = {
  remember: 'AUTH_REMEMBER',
};

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => {
    let remember = {
      enabled: false,
      email: '',
      password: '',
    };

    const rememberStorage = localStorage.getItem(storageKey.remember);

    if (rememberStorage) {
      remember = JSON.parse(rememberStorage);
    }
    return {
      remember,
    };
  },
  getters: {
    getRememberState: (state: IAuthState) => {
      return state.remember;
    },
  },
  actions: {
    updateRememberState(payload: IRememberState) {
      this.remember = { ...payload };

      if (!payload.enabled) {
        localStorage.removeItem(storageKey.remember);
      } else {
        localStorage.setItem(storageKey.remember, JSON.stringify(this.remember));
      }
    },
  },
});
