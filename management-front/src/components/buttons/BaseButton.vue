<template>
  <div class="base-button group">
    <template v-if="props.icon">
      <component
        :is="props.to ? 'RouterLink' : 'button'"
        type="button"
        class="relative rounded-full w-10 h-10 flex items-center justify-center group-hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all delay-75"
        :class="{
          'opacity-50': disabled || loading,
          [color]: true,
        }"
        :disabled="disabled || loading"
        :to="props.to ?? {}">
        <template v-if="loading">
          <BaseSpinner :size="14" color="#fff" />
        </template>
        <template v-else>
          <slot />
        </template>
      </component>
    </template>
    <template v-else>
      <component
        :is="props.to ? 'RouterLink' : 'button'"
        type="button"
        class="relative flex items-center min-h-[44px] w-full justify-center rounded-xl group-hover:opacity-70 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all delay-75"
        :class="{
          'opacity-50': disabled || loading,
          [color]: true,
        }"
        :disabled="disabled || loading"
        :to="props.to">
        <template v-if="loading">
          <BaseSpinner :size="14" color="#fff" />
        </template>
        <template v-else>
          <slot />
        </template>
      </component>
    </template>
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
  icon?: boolean;
  to?: {
    name: string;
  };
  color?: string;
}
const props = defineProps<IProps>();

const loading = computed(() => props.loading);
const disabled = computed(() => props.disabled);
const color = computed(() => {
  switch (props.color) {
    case 'green':
      return 'bg-gradient-to-r from-green-600 to-green-500';
    case 'none':
      return 'bg-transparent';
    default:
      return 'bg-gradient-to-r from-slate-500 to-slate-400';
  }
});
</script>
