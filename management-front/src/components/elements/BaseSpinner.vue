<template>
  <div class="base-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseSpinner',
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
interface IProps {
  size: number;
  color: string;
}

const props = defineProps<IProps>();

const parsedProps = computed(() => {
  let size = props.size;
  if (!size) {
    size = 64;
  }

  return {
    containerSize: `${size + 5}px`,
    internalSize: `${size}px`,
    elementSize: `${size / 8}px`,
    color: props.color ?? '#fff',
  };
});
</script>
<style>
.base-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: v-bind('parsedProps.containerSize');
  height: v-bind('parsedProps.containerSize');
}
.base-spinner div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: v-bind('parsedProps.internalSize');
  height: v-bind('parsedProps.internalSize');
  margin: v-bind('parsedProps.elementSize');
  border: v-bind('parsedProps.elementSize') solid v-bind('parsedProps.color');
  border-radius: 50%;
  animation: base-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: v-bind('parsedProps.color') transparent transparent transparent;
}
.base-spinner div:nth-child(1) {
  animation-delay: -0.45s;
}
.base-spinner div:nth-child(2) {
  animation-delay: -0.3s;
}
.base-spinner div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes base-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
