<template>
  <div class="relative w-full">
    <MagnifyingGlassIcon class="w-4 z-20 text-white absolute top-1/2 -translate-y-1/2 left-3" />
    <input
      type="search"
      class="block w-full bg-slate-700 text-slate-100 rounded-xl py-3 border-slate-900 focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-10 z-10"
      :placeholder="props.placeholder"
      v-model.trim="search" />
    <BaseDropdownButton type="list" class="z-20 absolute top-1/2 -translate-y-1/2 right-3">
      <template #element>
        <AdjustmentsVerticalIcon class="w-4 text-white" />
      </template>
    </BaseDropdownButton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseSearchInput',
};
</script>

<script setup lang="ts">
import { MagnifyingGlassIcon, AdjustmentsVerticalIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import BaseDropdownButton from '../buttons/BaseDropdownButton.vue';
interface IProps {
  label?: string;
  placeholder?: string;
  modelValue: string;
}

interface IEmits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const search = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
