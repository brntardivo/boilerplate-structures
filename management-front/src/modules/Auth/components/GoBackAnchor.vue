<template>
  <div class="go-back-anchor group">
    <RouterLink
      :to="{ name }"
      class="text-sm h-10 w-10 flex flex-row items-center justify-center bg-slate-700 rounded-xl">
      <ChevronLeftIcon aria-hidden="true" class="h-4 text-slate-200" />
    </RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GoBackAnchor',
};
</script>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
interface IProps {
  name?: string;
}

const props = defineProps<IProps>();

const name = computed(() => props.name ?? 'AuthSignIn');
</script>
