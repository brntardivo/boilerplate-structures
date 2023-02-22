<template>
  <div class="mt-14 flex flex-col items-center">
    <code-bracket-icon class="mx-auto h-12 w-auto text-cyan-600" />
    <h2 class="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
      {{ props.title }}
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600 max-w-xs">
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
