<template>
  <div class="relative min-h-full bg-zinc-100">
    <InternalNavigationBar />
    <main class="mx-8 -mt-56">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
<script lang="ts">
export default {
  name: 'InternalLayout',
};
</script>

<script setup lang="ts">
import InternalNavigationBar from './InternalNavigationBar.vue';
</script>
<style lang="postcss" scoped></style>
