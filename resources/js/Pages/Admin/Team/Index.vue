<template>
  <main class="flex-grow p-4 sm:p-6">
    <HeaderSegment title="Pages" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <OverviewGrid :items="teamStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans("Name") }}</th>
              <th>{{ trans("Position") }}</th>

              <th class="text-right">{{ trans("Status") }}</th>
              <th class="flex justify-end">{{ trans("Action") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts.data" :key="post.id">
              <td class="flex items-center gap-2">
                <img :src="post.preview.value" class="mr-3 avatar rounded-square" />
                {{ textExcerpt(post.title, 50) }}
              </td>
              <td class="text-left">
                {{ textExcerpt(post.slug, 50) }}
              </td>

              <td class="text-right">
                <span
                  class="badge"
                  :class="post.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ post.status == 1 ? trans("Active") : trans("Draft") }}
                </span>
              </td>

              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="w-40 dropdown-content">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.team.edit', post.id)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans("Edit") }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          type="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.team.destroy', post.id))"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans("Remove") }}></i
                          >
                          <span>{{ trans("Delete") }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Alert
          v-if="posts.data.length == 0"
          type="info"
          :text="trans('Opps you have not created any plan....')"
        />
      </div>

      <Pagination v-if="posts.data.length != 0" :pages="{ ...posts, data: null }" />
    </div>
  </main>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import sharedComposable from "@/Composables/sharedComposable";
import OverviewGrid from "@/Components/Admin/OverviewGrid.vue";
import Alert from "@/Components/Admin/Alert.vue";
import Pagination from "@/Components/Admin/Pagination.vue";
import trans from '@/Composables/transComposable';
import { Link } from "@inertiajs/vue3";

defineOptions({ layout: AdminLayout });
const { textExcerpt, deleteRow } = sharedComposable();

const props = defineProps([
  "posts",
  "buttons",
  "segments",
  "totalMembers",
  "totalActiveMembers",
  "totalInActiveMembers",
]);

const teamStats = [
  { value: props.totalMembers, title: trans("Total Members"),
   iconClass: "bx bx-user-pin"
   },
  {
    value: props.totalActiveMembers,
    title: trans("Active Members"),
    iconClass: "bx bx-check-circle"
  },
  {
    value: props.totalInActiveMembers,
    title: trans("Expired Members"),
    iconClass: "bx bx-x-circle"
  },
];
</script>
