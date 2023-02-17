<template>
  <div class="w-full h-96 bg-gradient-to-b from-cyan-700 to-zinc-100">
    <nav class="mx-8 border-b-cyan-500 border-b-[.5px]">
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-between w-full h-16">
          <div class="flex-shrink-0 mr-8">
            <CodeBracketIcon class="mx-auto h-12 w-auto text-cyan-100" />
          </div>
          <div class="flex w-full items-center space-x-2">
            <template v-if="navItems.length">
              <div v-for="(navItem, navIndex) in navItems" :key="navIndex">
                <RouterLink
                  :to="{ name: navItem.routeName }"
                  class="py-2 px-4 font-medium text-sm transition-all delay-100"
                  :class="{
                    'text-white bg-gray-900/40 rounded-md': navItem.active,
                    'text-cyan-100': !navItem.active,
                  }"
                  >{{ navItem.label }}</RouterLink
                >
              </div>
            </template>
          </div>
          <div class="flex items-center">
            <a href="#" class="decoration-inherit mr-4">
              <BellIcon class="h-6 w-6 text-cyan-100 hover:text-white transition-all delay-100" />
            </a>
            <BaseDropdownButton type="list" :list="userDropdownMenu">
              <template #element>
                <div
                  class="w-9 h-9 relative rounded-full border-[.5px] border-cyan-100 bg-cyan-600 hover:border-white transition-all delay-100 shadow-sm">
                  <div
                    class="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-400 border-[1px] border-cyan-200 shadow"></div>
                </div>
              </template>
            </BaseDropdownButton>
          </div>
        </div>
      </div>
    </nav>
    <div class="mx-8 pt-10">
      <template v-if="currentTitle">
        <Transition name="fade" mode="out-in">
          <h1 class="font-medium text-[2rem] text-white" :key="currentTitle">
            {{ currentTitle }}
          </h1>
        </Transition>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InternalNavigationBar',
};
</script>

<script setup lang="ts">
import { CodeBracketIcon, BellIcon } from '@heroicons/vue/24/outline';
import BaseDropdownButton, { IDropdownList } from '@components/buttons/BaseDropdownButton.vue';
import { useAuthStore } from '@stores/auth';
import { RouteRecordName, useRouter, useRoute } from 'vue-router';
import { routes } from '@src/router';
import Toast from '@utils/toast';
import { computed } from 'vue';

interface INavItem {
  label: string;
  active: boolean;
  routeName: RouteRecordName;
}

const store = useAuthStore();
const router = useRouter();
const routeData = useRoute();
const currentTitle = computed(() => routeData.meta.title);

const toast = new Toast({
  position: 'top-center',
  timer: 6000,
});

const Logout = () => {
  store.updateJWTState('');
  store.updateUserState({ id: '', name: '', email: '' });

  toast.fire({
    title: 'Done!',
    text: 'Successfully logged out.',
    icon: 'success',
  });

  router.push({ name: 'AuthSignIn' });
};

const userDropdownMenu: IDropdownList[] = [
  {
    type: 'click',
    label: 'Sign out',
    click: Logout,
  },
];

const navItems = computed(() => {
  const currentRoute = routeData.name;
  const parsedRoutes: INavItem[] = [];

  if (routes.length > 0) {
    for (const route of routes) {
      if (!route.name && route.children) {
        for (const children of route.children) {
          if (children.name && children.meta?.showOnNavbar) {
            parsedRoutes.push({
              label: children.meta?.navbarLabel || String(children.name),
              active: currentRoute == children.name,
              routeName: children.name,
            });
          }
        }
      }
    }
  }

  return parsedRoutes;
});
</script>
