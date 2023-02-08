<template>
  <div class="password-recovery-view">
    <content-container>
      <go-back-anchor />
      <header-container
        title="Password recovery"
        subtitle="Enter your email below to start the password recovery process" />

      <div class="mt-8 space-y-6">
        <base-form :template="template">
          <template #action="{ callback }">
            <base-button @click="submit(callback)" :loading="loading">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <paper-airplane-icon
                  class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                  aria-hidden="true" />
              </span>
              Send email
            </base-button>
          </template>
        </base-form>
      </div>
    </content-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RecoveryPasswordView',
};
</script>

<script setup lang="ts">
import BaseForm, { IBaseFormItem, ICallback } from '@components/forms/BaseForm.vue';
import BaseButton from '@components/buttons/BaseButton.vue';
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import GoBackAnchor from '../components/GoBackAnchor.vue';
import { ref } from 'vue';
import { AuthService } from '@services/AuthService';
import ContentContainer from '../components/ContentContainer.vue';
import HeaderContainer from '../components/HeaderContainer.vue';

const authService = new AuthService();
const loading = ref(false);
const template: IBaseFormItem[] = [
  {
    model: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'john@mail.com',
    validate: {
      required: true,
      email: true,
    },
  },
];

const submit = async (callback: ICallback) => {
  const form = callback();

  if (form) {
    loading.value = true;

    await authService
      .startRecoveryPasswordProcess({ email: String(form.email) })
      .then((data) => {
        //
      })
      .catch((err) => {
        //
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>
