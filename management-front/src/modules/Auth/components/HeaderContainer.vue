<template>
  <div class="header-container">
    <code-bracket-icon class="mx-auto h-12 w-auto" />
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      {{ props.title }}
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600 px-6">
      <template v-if="props.subtitle">
        {{ props.subtitle }}
      </template>
      <template v-else>
        <slot name="subtitle" />
      </template>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderContainer',
};
</script>

<script setup lang="ts">
import { CodeBracketIcon } from '@heroicons/vue/24/outline';
interface IProps {
  title: string;
  subtitle?: string;
}

const props = defineProps<IProps>();
</script>
