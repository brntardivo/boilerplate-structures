<template>
  <div class="flex flex-row items-center relative w-full">
    <MagnifyingGlassIcon class="w-5 -mr-7 z-20 mt-1" />
    <input
      type="search"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm pl-9 z-10"
      :placeholder="props.placeholder"
      v-model.trim="search" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseSearchInput',
  components: { MagnifyingGlassIcon },
};
</script>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
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
