<template>
  <div>
    <div class="flex justify-between mb-8">
      <div class="flex-shrink">
        <h1 class="font-bold text-[2rem]">Admins</h1>
      </div>
      <div class="w-1/3">
        <BaseSearchInput placeholder="Search" v-model="search" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <RouterLink
        :to="{}"
        class="flex flex-col items-center justify-center border-dashed border-[1px] border-gray-400 rounded-md bg-gray-200 hover:bg-gray-300 transition-all delay-75 h-48">
        <UserPlusIcon class="w-10 h-10 mb-3 text-gray-500" />
        <p class="mb-0 font-medium">Create a new admin</p>
      </RouterLink>
      <template v-if="admins.length > 0">
        <template v-if="filteredAdmins.length > 0">
          <div
            v-for="(admin, adminIndex) in filteredAdmins"
            :key="adminIndex"
            class="bg-white shadow rounded-md w-full h-48">
            <!--  -->
          </div>
        </template>
        <template v-else>
          <!--  -->
        </template>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AdminsView',
  components: { BaseSearchInput },
};
</script>

<script setup lang="ts">
import { UserPlusIcon } from '@heroicons/vue/24/outline';
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { IAdmin } from '@interfaces/IAdmin';
import BaseSearchInput from '@components/forms/BaseSearchInput.vue';
import { AdminService } from '@services/AdminService';

let admins = reactive<IAdmin[]>([]);
const search = ref('');
const filters = reactive({
  limit: 10,
  page: 1,
});
const loading = ref(false);
const adminService = new AdminService();

const fetchAdmins = async () => {
  loading.value = true;

  try {
    const res = await adminService.all(filters);

    if (res.admins.length > 0) {
      admins = res.admins;
    }
  } catch (e) {
    console.warn({ e });
  } finally {
    loading.value = false;
  }
};

const filteredAdmins = computed(() => {
  return admins.filter((admin) => {
    //
    return admin.name.includes(search.value);
  });
});

onBeforeMount(() => {
  fetchAdmins();
});
</script>
