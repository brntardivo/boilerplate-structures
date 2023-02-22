<template>
  <div class="go-back-anchor">
    <router-link
      :to="{ name }"
      class="absolute top-0 left-0 text-sm h-16 w-20 flex flex-row items-center justify-center">
      <chevron-left-icon aria-hidden="true" class="h-4" />
      <span class="font-medium">Back</span>
    </router-link>
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
