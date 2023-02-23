<template>
  <div class="">
    <div class="flex flex-col md:flex-row justify-between mb-8">
      <div class="flex-shrink">
        <BaseButton :to="{ name: 'Home' }" class="mr-4" color="green" :icon="true">
          <PlusIcon class="w-5 text-slate-100" />
        </BaseButton>
      </div>
      <div class="w-full md:w-1/2 flex flex-row items-center">
        <BaseSearchInput placeholder="Search" v-model="search" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <template v-if="admins.length > 0">
        <template v-if="filteredAdmins.length > 0">
          <div
            v-for="(admin, adminIndex) in filteredAdmins"
            :key="adminIndex"
            class="bg-slate-700 shadow rounded-md w-full h-48">
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
};
</script>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { IAdmin } from '@interfaces/IAdmin';
import BaseSearchInput from '@components/forms/BaseSearchInput.vue';
import { AdminService } from '@services/AdminService';
import BaseButton from '@components/buttons/BaseButton.vue';

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
