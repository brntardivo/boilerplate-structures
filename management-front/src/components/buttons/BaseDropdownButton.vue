<template>
  <div>
    <div class="relative" aria-expanded="true" aria-haspopup="true" ref="dropdownContainer">
      <div class="relative cursor-pointer" @click="toggle">
        <slot name="element" />
      </div>
      <transition name="fast-fade">
        <div
          v-if="open"
          class="absolute right-7 top-7 z-10 mt-2 w-56 origin-bottom-right none rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabindex="-1">
          <div class="py-1" role="none">
            <template v-if="props.type == 'list'">
              <template v-if="props.list && props.list.length > 0">
                <div v-for="(listItem, listIndex) in props.list" :key="listIndex">
                  <template v-if="listItem.type == 'router-link'">
                    <router-link
                      :to="{ name: listItem.route }"
                      class="text-slate-900 block px-4 py-2 text-sm"
                      :class="{
                        'bg-slate-200 text-slate-900': listItem.active,
                        'text-slate-700': listItem.disabled,
                      }"
                      role="menuitem"
                      tabindex="-1"
                      :id="`menu-item-${listIndex}`">
                      {{ listItem.label }}</router-link
                    >
                  </template>
                  <template v-else-if="listItem.type == 'click'">
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      :id="`menu-item-${listIndex}`"
                      @click="listItem.click">
                      {{ listItem.label }}
                    </a>
                  </template>
                </div>
              </template>
            </template>
            <template v-else-if="props.type == 'slot'">
              <slot name="dropdown" />
            </template>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseDropdownButton',
};
</script>

<script setup lang="ts">
export interface IDropdownList {
  type: string;
  click?: () => void;
  label: string;
  route?: string;
  active?: boolean;
  disabled?: boolean;
}
import { ref, onBeforeUnmount, onMounted } from 'vue';

interface IProps {
  type: string;
  list?: Array<IDropdownList>;
}

const props = defineProps<IProps>();
const dropdownContainer = ref();
const open = ref(false);

const toggle = () => (open.value = !open.value);

const listener = (event: MouseEvent) => {
  if (
    event.target !== dropdownContainer.value &&
    event.composedPath().includes(dropdownContainer.value)
  ) {
    return;
  }

  if (open.value) {
    open.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', listener);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', listener);
});
</script>
