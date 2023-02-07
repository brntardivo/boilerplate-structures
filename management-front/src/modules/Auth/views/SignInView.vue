<template>
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
          <a href="#" class="font-medium text-cyan-600 hover:text-cyan-500">sign up here</a>
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <FormSchema :template="template">
          <template #action="{ callback }">
            <button
              type="button"
              @click="
                {
                  submit(callback);
                }
              "
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                  aria-hidden="true" />
              </span>
              Sign in
            </button>
          </template>
        </FormSchema>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSchema, { ICallback, IFormSchemaItem } from '@components/forms/FormSchema.vue';
import { CodeBracketIcon, LockClosedIcon } from '@heroicons/vue/24/outline';

const template: IFormSchemaItem[] = [
  {
    model: 'email',
    label: 'Email',
    type: 'email',
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
  },
];

const submit = (callback: ICallback) => {
  const form = callback();

  console.log(form);
};
</script>
