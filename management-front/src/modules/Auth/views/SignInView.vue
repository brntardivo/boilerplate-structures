<template>
  <div class="sign-in-view">
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md px-4 py-5 sm:px-6 sm:rounded-lg bg-white overflow-hidden">
        <div>
          <CodeBracketIcon class="mx-auto h-12 w-auto" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            {{ ' ' }}
            <router-link
              :to="{ name: 'AuthSignUp' }"
              class="font-medium text-cyan-600 hover:text-cyan-500"
              >sign up here</router-link
            >
          </p>
        </div>

        <div class="mt-8 space-y-6">
          <BaseForm :template="template">
            <template #forgot-password>
              <div class="text-sm text-end">
                <router-link
                  :to="{ name: 'AuthForgotPassword' }"
                  class="font-medium text-cyan-600 hover:text-cyan-500">
                  Forgot your password?
                </router-link>
              </div>
            </template>
            <template #action="{ callback }">
              <BaseButton @click="submit(callback)" :loading="loading">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                    aria-hidden="true" />
                </span>
                Sign In
              </BaseButton>
            </template>
          </BaseForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@stores/auth';
import BaseForm, { ICallback, IBaseFormItem } from '@components/forms/BaseForm.vue';
import { CodeBracketIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@components/buttons/BaseButton.vue';
import { AuthService } from '@services/AuthService';

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

    await authService
      .fetchSignIn({ email: String(email), password: String(password) })
      .then((data) => {
        console.log(data);
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
