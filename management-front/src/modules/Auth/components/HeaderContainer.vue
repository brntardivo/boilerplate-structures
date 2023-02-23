<template>
  <div class="mt-14 flex flex-col items-center">
    <CodeBracketIcon class="mx-auto h-12 w-auto text-slate-100 mb-4" />
    <div class="flex flex-row justify-center items-center">
      <template v-if="props.back">
        <div class="mr-6">
          <GoBackAnchor />
        </div>
      </template>
      <div class="">
        <h2
          class="text-3xl font-bold tracking-tight text-slate-200"
          :class="{
            'text-center': !props.back,
          }">
          {{ props.title }}
        </h2>
        <p
          class="mt-2 text-sm text-slate-100 max-w-xs"
          :class="{
            'text-center': !props.back,
          }">
          <template v-if="props.subtitle">
            {{ props.subtitle }}
          </template>
          <template v-else>
            <slot name="subtitle" />
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderContainer',
};
</script>

<script setup lang="ts">
import { CodeBracketIcon } from '@heroicons/vue/24/outline';
import GoBackAnchor from '../components/GoBackAnchor.vue';
interface IProps {
  title: string;
  subtitle?: string;
  back?: boolean;
}

const props = defineProps<IProps>();
</script>
