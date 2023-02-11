<template>
  <div class="relative min-h-full bg-zinc-100">
    <div class="w-full h-72 bg-gradient-to-r from-cyan-800 to-cyan-500">
      <nav class="mx-8 border-b-cyan-600 border-b-[.5px]">
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-between w-full h-16">
            <div class="flex-shrink-0 mr-8">
              <CodeBracketIcon class="mx-auto h-12 w-auto text-cyan-100" />
            </div>
            <div class="flex w-full items-center space-x-2">
              <a
                href="#"
                class="py-2 px-4 font-medium text-white text-sm transition-all delay-100 bg-gray-900/40 rounded-md"
                >Home</a
              >
              <a
                href="#"
                class="py-2 px-4 font-medium text-cyan-100 text-sm hover:text-white transition-all delay-100"
                >Users</a
              >
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
        <h1 class="font-medium text-[2rem] text-white">Home</h1>
      </div>
    </div>
    <main class="mx-8 -mt-28">
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
import { CodeBracketIcon, BellIcon } from '@heroicons/vue/24/outline';
import BaseDropdownButton, { IDropdownList } from '@components/buttons/BaseDropdownButton.vue';
import { useAuthStore } from '@stores/auth';
import { useRouter } from 'vue-router';
import Toast from '@utils/toast';

const toast = new Toast({
  position: 'top-center',
  timer: 6000,
});
const store = useAuthStore();
const router = useRouter();

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
</script>
<style lang="postcss" scoped></style>
