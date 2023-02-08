<template>
  <div class="sign-in-view">
    <content-container>
      <header-container title="Sign in to your account">
        <template #subtitle>
          Or
          {{ ' ' }}
          <router-link
            :to="{ name: 'AuthSignUp' }"
            class="font-medium text-cyan-600 hover:text-cyan-500"
            >sign up here</router-link
          >
        </template>
      </header-container>
      <div class="mt-8 space-y-6">
        <base-form :template="template">
          <template #forgot-password>
            <div class="text-sm text-end">
              <router-link
                :to="{ name: 'AuthPasswordRecovery' }"
                class="font-medium text-cyan-600 hover:text-cyan-500">
                Forgot your password?
              </router-link>
            </div>
          </template>
          <template #action="{ callback }">
            <base-button @click="submit(callback)" :loading="loading">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <lock-closed-icon
                  class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                  aria-hidden="true" />
              </span>
              Sign In
            </base-button>
          </template>
        </base-form>
      </div>
    </content-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@stores/auth';
import BaseForm, { ICallback, IBaseFormItem } from '@components/forms/BaseForm.vue';
import { LockClosedIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@components/buttons/BaseButton.vue';
import { AuthService } from '@services/AuthService';
import { useRouter } from 'vue-router';
import ContentContainer from '../components/ContentContainer.vue';
import HeaderContainer from '../components/HeaderContainer.vue';

const router = useRouter();
const authService = new AuthService();
const store = useAuthStore();
const remember = store.getRememberState;
const loading = ref(false);

let rememberEmail = '';
let rememberPassword = '';

if (remember.enabled) {
  rememberEmail = remember.email;
  rememberPassword = remember.password;
}

const template: IBaseFormItem[] = [
  {
    model: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'john@mail.com',
    value: rememberEmail,
    validate: {
      required: true,
      requiredIndicator: false,
      email: true,
    },
  },
  {
    model: 'password',
    label: 'Password',
    type: 'password',
    value: rememberPassword,
    validate: {
      required: true,
      requiredIndicator: false,
      minLength: 6,
    },
  },
  {
    model: 'remember',
    label: 'Remember me',
    type: 'checkbox',
    value: remember.enabled,
    colClass: 'col-span-6',
  },
  {
    model: 'forgot-password',
    type: 'slot',
    colClass: 'col-span-6',
  },
];

const submit = async (callback: ICallback) => {
  const form = callback();

  if (form) {
    loading.value = true;
    const { email, password } = form;

    await authService
      .signIn({ email: String(email), password: String(password) })
      .then((data) => {
        let rememberObject = {
          enabled: false,
          email: '',
          password: '',
        };

        if (form.remember) {
          rememberObject = {
            enabled: true,
            email: String(email),
            password: String(password),
          };
        }

        store.updateRememberState(rememberObject);
        store.updateJWTState(data.token);
        store.updateUserState(data.user);

        router.push({ name: 'Home' });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>
