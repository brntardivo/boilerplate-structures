<template>
  <div class="relative min-h-full bg-zinc-100">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ExternalLayout',
};
</script>
