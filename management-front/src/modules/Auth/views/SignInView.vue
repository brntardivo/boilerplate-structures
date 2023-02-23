<template>
  <div class="sign-in-view">
    <HeaderContainer title="Sign in to your account" />
    <ContentContainer>
      <div class="space-y-6">
        <BaseForm :template="template">
          <template #forgot-password>
            <div class="text-sm text-end">
              <RouterLink
                :to="{ name: 'AuthPasswordRecovery' }"
                class="font-medium text-slate-100 hover:text-slate-200">
                Forgot your password?
              </RouterLink>
            </div>
          </template>
          <template #action="{ callback }">
            <BaseButton @click="submit(callback)" :loading="loading">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-slate-100" aria-hidden="true" />
              </span>
              Sign In
            </BaseButton>
          </template>
        </BaseForm>
      </div>
    </ContentContainer>
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
import Toast from '@utils/toast';
import { AxiosError } from 'axios';

const router = useRouter();
const authService = new AuthService();
const store = useAuthStore();
const toast = new Toast({ position: 'top-center', timer: 6000 });
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
        toast.fire({
          title: 'Welcome!',
          text: 'Successfully logged in.',
          icon: 'success',
          timer: 4000,
        });

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
        let errMessage = 'There was some internal error, please contact support.';

        if (err instanceof AxiosError) {
          const { response } = err;

          if (response && response.status) {
            if (response.status == 401) {
              errMessage = `Incorrect email and/or password, if you don&lsquo;t remember your password, you can recover it.`;
            }
          }
        }

        toast.fire({
          title: 'We have a problem :/',
          text: errMessage,
          icon: 'error',
        });
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>
