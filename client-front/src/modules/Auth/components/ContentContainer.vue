<template>
  <div class="content-container">
    <div class="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div
        class="w-full max-w-md px-4 py-5 sm:px-6 sm:rounded-lg bg-white overflow-hidden relative shadow-sm">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ContentContainer',
};
</script>
