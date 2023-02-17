<template>
  <div class="base-button">
    <button
      type="button"
      class="group relative flex min-h-[38px] w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-cyan-800 to-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      :class="{
        'opacity-50': disabled || loading,
      }"
      :disabled="disabled || loading">
      <template v-if="loading">
        <BaseSpinner :size="14" color="#fff" />
      </template>
      <template v-else>
        <slot />
      </template>
    </button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseButton',
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import BaseSpinner from '@components/elements/BaseSpinner.vue';
interface IProps {
  disabled?: boolean;
  loading?: boolean;
}
const props = defineProps<IProps>();

const loading = computed(() => props.loading);
const disabled = computed(() => props.disabled);
</script>
