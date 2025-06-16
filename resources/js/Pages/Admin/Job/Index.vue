<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Job Categories" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="jobStats" grid="4" />
      <div class="flex items-center justify-end gap-x-2">
        <div class="dropdown" data-placement="bottom-end">
          <div class="dropdown-toggle">
            <button
              type="button"
              class="font-medium bg-white shadow-sm btn dark:bg-slate-800"
            >
              <i class="w-4" data-feather="filter"></i>
              <span>{{ trans("Filter") }}</span>
              <i class="w-4" data-feather="chevron-down"></i>
            </button>
          </div>

          <div class="dropdown-content w-72 !overflow-visible">
            <form @submit.prevent="filterData.get('/admin/job')">
              <ul class="p-4 space-y-4 dropdown-list">
                <li class="dropdown-list-item">
                  <h2 class="my-1 text-sm font-medium">
                    {{ trans("Search") }}
                  </h2>
                  <div class="mb-2">
                    <select
                      v-if="filterData.type && filterData.type === 'status'"
                      class="select"
                      name="type"
                      v-model="filterData.search"
                    >
                      <option value="1">{{ trans("Active") }}</option>
                      <option value="2">{{ trans("Pending") }}</option>
                      <option value="0">{{ trans("Inactive") }}</option>
                    </select>
                    <input
                      v-else
                      type="text"
                      name="search"
                      v-model="filterData.search"
                      class="input"
                      placeholder="Search......"
                    />
                  </div>
                </li>
                <li class="dropdown-list-item">
                  <div class="mb-2">
                    <select
                      class="select"
                      name="type"
                      @change="filterData.search = ''"
                      v-model="filterData.type"
                    >
                      <option value="email">
                        {{ trans("Company Email") }}
                      </option>
                      <option value="name">{{ trans("Company Name") }}</option>
                      <option value="title">
                        {{ trans("Title") }}
                      </option>
                      <option value="status">
                        {{ trans("Status") }}
                      </option>
                      <option value="service">
                        {{ trans("Service") }}
                      </option>
                      <option value="category">
                        {{ trans("Category") }}
                      </option>
                    </select>
                  </div>
                </li>

                <li class="dropdown-list-item">
                  <button type="submit" class="w-full btn btn-primary">
                    {{ trans("Filter") }}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans("Name") }}</th>

              <th class="">{{ trans("Company Name") }}</th>
              <th class="">{{ trans("Service") }}</th>
              <th class="">{{ trans("Category") }}</th>
              <th class="">{{ trans("Created Date") }}</th>
              <th class="">{{ trans("Status") }}</th>
              <th>
                <div class="text-right">
                  {{ trans("Action") }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody v-if="jobs.total > 0">
            <tr v-for="job in jobs.data" :key="job.id">
              <td class="text-left">
                {{ job.title }}
              </td>

              <td class="text-left">
                <img
                  class="inline w-10 mr-2 rounded-full"
                  :src="
                    job.user.avatar == null
                      ? `https://ui-avatars.com/api/?name=${job.user.name}`
                      : `${job.user.avatar}`
                  "
                  alt="avatar"
                />
                <Link :href="route('admin.companies.show', job.user)">{{
                  job.user.name
                }}</Link>
              </td>
              <td class="text-left">
                {{ job.service.title }}
              </td>
              <td class="text-left">
                {{ job.categories[0]?.title }}
              </td>
              <td>
                {{ moment(job.created_at).format("D-MMM-Y") }}
              </td>
              <td class="text-left">
                <span
                  class="badge"
                  :class="
                    job.status == 1
                      ? 'badge-success'
                      : job.status == 2
                      ? 'badge-warning'
                      : 'badge-danger'
                  "
                >
                  {{
                    job.status == 1
                      ? trans("Active")
                      : job.status == 2
                      ? trans("Pending")
                      : trans("Inactive")
                  }}
                </span>
              </td>
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-end">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="w-40 dropdown-content">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <button @click="openEditJobDrawer(job)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans("Edit") }}</span>
                          </button>
                        </li>
                        <li class="dropdown-list-item">
                          <Link
                            :href="route('admin.job.show', job.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="eye"></i>
                            <span>{{ trans("View") }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            as="button"
                            class="dropdown-link"
                            @click="deleteRow(route('admin.job.destroy', job.id))"
                          >
                            <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                            <span>{{ trans("Delete") }}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
    </div>
  </main>
  <Paginate :links="jobs.links" />
  <div id="editJobDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateJob()">
      <div class="drawer-header">
        <h5>{{ trans("Edit Job") }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label class="mb-2 label">{{ trans("Job Live Days") }}</label>
          <input
            v-model="editForm.live_expire_at"
            type="date"
            name="live_expire_at"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label class="mb-2 label">{{ trans("Featured Expire Date") }}</label>
          <input
            v-model="editForm.featured_expire_at"
            type="date"
            name="featured_expire_at"
            class="input"
          />
        </div>

        <div class="mb-2">
          <label class="mb-2 label">{{ trans("Status") }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="1">{{ trans("Active") }}</option>
            <option value="2">{{ trans("Pending") }}</option>
            <option value="0">{{ trans("Deactive") }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans("Close") }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="isProcessing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import { useForm, router } from "@inertiajs/vue3";
import Paginate from "@/Components/Paginate.vue";
import moment from "moment";
import { ref } from "vue";
import trans from '@/Composables/transComposable';
import sharedComposable from "@/Composables/sharedComposable";
import Overview from "@/Components/Admin/OverviewGrid.vue";
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import drawer from "@/Plugins/Admin/drawer";
import { onMounted, computed } from "vue";
import notify from "@/Plugins/Admin/notify";
import NoDataFound from "@/Components/Admin/NoDataFound.vue";

defineOptions({ layout: AdminLayout });
const { deleteRow } = sharedComposable();

onMounted(() => {
  drawer.init();
});

const props = defineProps([
  "jobs",
  "totalJobs",
  "activeJobs",
  "pendingJobs",
  "inActiveJobs",
  "languages",
  "buttons",
  "segments",
  "allServices",
  "request",
  "type",
]);
const jobStats = computed(() => {
  return [
    {
      value: props.totalJobs,
      title: trans("Total Jobs"),
     iconClass: "bx bx-badge-check",
    },
    {
      value: props.pendingJobs,
      title: trans("Pending Jobs"),
     iconClass: "bx bx-badge",
    },
    {
      value: props.activeJobs,
      title: trans("Active Jobs"),
     iconClass: "bx bx-check",
    },
    {
      value: props.inActiveJobs,
      title: trans("Inactive Jobs"),
     iconClass: "bx bx-x-circle",
    },
  ];
});
const filterData = useForm({
  search: props.request.search,
  type: props.type,
});
const editForm = ref({});
const isProcessing = ref(false);

const openEditJobDrawer = (job) => {
  editForm.value = { ...job };
  drawer.of("#editJobDrawer").show();
};

const updateJob = () => {
  isProcessing.value = true;
  router.patch(route("admin.job.update", editForm.value.id), editForm.value, {
    onSuccess: () => {
      editForm.value = {};
      notify.success(trans("Job has been updated successfully"));
      drawer.of("#editJobDrawer").hide();
      isProcessing.value = false;
    },
  });
};
</script>
