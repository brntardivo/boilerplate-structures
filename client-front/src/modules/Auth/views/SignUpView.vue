<template>
  <div class="sign-up-view">
    <header-container
      title="Sign up here !"
      subtitle="Fill in the fields below to make the initial registration on the platform" />
    <content-container>
      <go-back-anchor />

      <div class="mt-10 space-y-6">
        <base-form :template="template">
          <template #action="{ callback }">
            <base-button @click="submit(callback)" :loading="loading">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <user-plus-icon
                  class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                  aria-hidden="true" />
              </span>
              Sign up
            </base-button>
          </template>
        </base-form>
      </div>
    </content-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignUpView',
  components: { UserPlusIcon },
};
</script>

<script setup lang="ts">
import GoBackAnchor from '../components/GoBackAnchor.vue';
import ContentContainer from '../components/ContentContainer.vue';
import HeaderContainer from '../components/HeaderContainer.vue';
import BaseForm, { IBaseFormItem, ICallback } from '@components/forms/BaseForm.vue';
import BaseButton from '@components/buttons/BaseButton.vue';
import { ref } from 'vue';
import { UserPlusIcon } from '@heroicons/vue/24/outline';
import { AuthService } from '@services/AuthService';
import Toast from '@utils/toast';
import { useRouter } from 'vue-router';

const toast = new Toast({ position: 'top-center', timer: 6000 });
const authService = new AuthService();
const router = useRouter();
const loading = ref(false);

const template: IBaseFormItem[] = [
  {
    model: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'john@mail.com',
    validate: {
      required: true,
      email: true,
    },
  },
  {
    model: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'John Doe',
    validate: {
      required: true,
    },
  },
  {
    model: 'password',
    type: 'password',
    label: 'Password',
    validate: {
      required: true,
      minLength: 6,
    },
  },
  {
    model: 'confirmation',
    type: 'password',
    label: 'Confirm password',
    validate: {
      required: true,
      sameAs: 'password',
      sameAsMessage: 'You need to put exactly the same password',
    },
  },
];

const submit = async (callback: ICallback) => {
  const form = callback();

  if (form) {
    loading.value = true;

    const { email, name, password, confirmation } = form;

    await authService
      .signUp({
        email: String(email),
        name: String(name),
        password: String(password),
        passwordConfirmation: String(confirmation),
      })
      .then((data) => {
        toast.fire({
          title: 'Successfully saved!',
          text: 'You will shortly receive an email containing an account activation link, check your email box.',
          icon: 'success',
        });

        router.push({ name: 'AuthSignIn' });
      })
      .catch((err) => {
        toast.fire({
          title: 'We have a problem :/',
          text: 'There was some internal error, please try again or contact support.',
          icon: 'error',
        });
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>
