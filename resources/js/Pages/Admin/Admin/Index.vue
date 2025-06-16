<script setup>
import NoDataFound from "@/Components/Admin/NoDataFound.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import { Head, Link } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import sharedComposable from "@/Composables/sharedComposable";
const props = defineProps(["segments", "buttons", "users"]);
import AdminLayout from "@/Layouts/Admin.vue";
defineOptions({ layout: AdminLayout });
const { deleteRow } = sharedComposable();
</script>

<template>
  <main class="container p-4 sm:p-6">
    <Head title="Sub Admins" />
    <HeaderSegment :title="trans('Sub Admins')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans("Name") }}</th>
              <th>{{ trans("Email") }}</th>
              <th>{{ trans("Status") }}</th>
              <th>{{ trans("Role") }}</th>
              <th>
                <div class="text-right">
                  {{ trans("Action") }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="users.length">
            <tr v-for="row in users" :key="row.id">
              <td>
                {{ row.name }}
              </td>
              <td>
                {{ row.email }}
              </td>
              <td>
                <span
                  :class="row.status == 1 ? 'badge badge-success' : 'badge badge-danger'"
                >
                  {{ row.status == 1 ? trans("Active") : trans("Deactive") }}
                </span>
              </td>
              <td>
                <span class="badge badge-primary" v-for="r in row.roles">{{
                  r.name
                }}</span>
              </td>

              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="w-40 dropdown-content">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link
                            :href="route('admin.admin.edit', row.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans("Edit") }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            class="dropdown-link"
                            @click="deleteRow(route('admin.admin.destroy', row.id))"
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
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else :for-table="true" />
        </table>
      </div>
    </div>
  </main>
</template>
