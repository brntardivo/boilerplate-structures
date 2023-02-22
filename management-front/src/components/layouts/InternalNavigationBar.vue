<template>
  <div class="w-full">
    <nav class="px-8 bg-gradient-to-r from-gray-600 to-gray-800 mb-8">
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-between w-full h-16">
          <div class="flex-shrink-0 mr-8">
            <CodeBracketIcon class="mx-auto h-12 w-auto text-gray-100" />
          </div>
          <div class="w-full items-center space-x-2 hidden md:flex">
            <template v-if="navItems.length">
              <div v-for="(navItem, navIndex) in navItems" :key="navIndex">
                <RouterLink
                  :to="{ name: navItem.route }"
                  class="py-2 px-4 font-medium text-sm transition-all delay-100 rounded-md hover:text-white"
                  :class="{
                    'text-white bg-gray-900/60': navItem.active,
                    'text-gray-100': !navItem.active,
                  }"
                  >{{ navItem.label }}</RouterLink
                >
              </div>
            </template>
          </div>
          <div class="hidden md:flex items-center">
            <a href="#" class="decoration-inherit mr-4">
              <BellIcon class="h-6 w-6 text-gray-100 hover:text-white transition-all delay-100" />
            </a>
            <BaseDropdownButton type="list" :list="userDropdownMenu">
              <template #element>
                <div
                  class="w-9 h-9 relative rounded-full border-[.5px] border-gray-100 bg-gray-600 hover:border-white transition-all delay-100 shadow-sm">
                  <div
                    class="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-400 border-[1px] border-gray-200 shadow"></div>
                </div>
              </template>
            </BaseDropdownButton>
          </div>
          <div class="flex md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-gray-900/60 p-2 text-white hover:bg-gray-900/40 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all delay-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="menuOpened = !menuOpened">
              <span class="sr-only">Open main menu</span>
              <Transition name="fast-fade" mode="out-in">
                <component
                  :is="menuOpened ? XMarkIcon : Bars3Icon"
                  :key="menuOpened"
                  class="text-white w-5 h-5" />
              </Transition>
            </button>
          </div>
        </div>
      </div>
      <div
        class="md:hidden overflow-hidden transition-all delay-100"
        :class="{
          'h-auto': menuOpened,
          'h-0': !menuOpened,
        }"
        id="mobile-menu">
        <div class="border-t-[.5px] border-gray-500/60 py-4">
          <div class="space-y-1 p-2 rounded-lg">
            <template v-if="navItems.length">
              <div class="flex" v-for="(navItem, navIndex) in navItems" :key="navIndex">
                <RouterLink
                  :to="{ name: navItem.route }"
                  class="w-full py-2 px-4 mb-1 font-medium text-base transition-all delay-100 rounded-md hover:text-white"
                  :class="{
                    'text-white bg-gray-900/60': navItem.active,
                    'text-gray-100': !navItem.active,
                  }"
                  >{{ navItem.label }}</RouterLink
                >
              </div>
            </template>
            <div class="border-t-[.5px] border-gray-500/60">
              <div class="flex flex-row items-center my-4 px-4 py-2 bg-gray-900/60 rounded-lg">
                <div class="flex-grow">
                  <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-3">
                      <div
                        class="w-9 h-9 relative rounded-full border-[.5px] border-gray-100 bg-gray-600 hover:border-white transition-all delay-100 shadow-sm">
                        <div
                          class="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-400 border-[1px] border-gray-200 shadow"></div>
                      </div>
                    </div>
                    <div class="flex-grow">
                      <h4 class="text-white font-medium">{{ userName }}</h4>
                      <p class="text-white text-sm font-light">{{ userEmail }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex-shrink">
                  <a href="#" class="decoration-inherit flex items-center rounded-lg">
                    <BellIcon
                      class="h-6 w-6 text-gray-100 hover:text-white transition-all delay-100" />
                  </a>
                </div>
              </div>
              <template v-if="userDropdownMenu.length">
                <div
                  class="flex"
                  v-for="(userDropdownItem, userDropdownIndex) in userDropdownMenu"
                  :key="userDropdownIndex">
                  <template v-if="userDropdownItem.type == 'click'">
                    <a
                      href="#"
                      @click="userDropdownItem.click"
                      class="w-full py-2 px-4 mb-1 font-medium text-base transition-all delay-100 text-gray-100 hover:text-white"
                      >{{ userDropdownItem.label }}</a
                    >
                  </template>
                  <template v-else-if="userDropdownItem.type == 'router-link'">
                    <RouterLink
                      :to="{ name: userDropdownItem.route }"
                      class="w-full py-2 px-4 mb-1 font-medium text-base transition-all rounded-md delay-100 hover:text-white"
                      :class="{
                        'text-white bg-gray-900/40 ': userDropdownItem.active,
                        'text-gray-100': !userDropdownItem.active,
                      }"
                      >{{ userDropdownItem.label }}</RouterLink
                    >
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InternalNavigationBar',
};
</script>

<script setup lang="ts">
import { CodeBracketIcon, BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import BaseDropdownButton, { IDropdownList } from '@components/buttons/BaseDropdownButton.vue';
import { useAuthStore } from '@stores/auth';
import { RouteRecordName, useRouter, useRoute } from 'vue-router';
import { routes } from '@src/router';
import Toast from '@utils/toast';
import { computed, ref } from 'vue';

interface INavItem {
  label: string;
  active: boolean;
  route: RouteRecordName;
}

const store = useAuthStore();
const router = useRouter();
const routeData = useRoute();
const currentTitle = computed(() => routeData.meta.title);
const menuOpened = ref(false);

const userName = store.getUserState.name;
const userEmail = store.getUserState.email;

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
              route: children.name,
            });
          }
        }
      }
    }
  }

  return parsedRoutes;
});
</script>
