<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment :title="trans('Admin Roles')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Name') }}</th>
              <th>{{ trans('Permissions') }}</th>
              <th>
                <div class="text-right">
                  {{ trans('Action') }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="roles.length">
            <tr v-for="role in roles" :key="role.id">
              <td>
                {{ role.name }}
              </td>
              <td>
                <span
                  class="badge badge-primary mb-2 mr-1"
                  v-for="perm in role.permissions"
                  :key="perm.name"
                >
                  {{ perm.name }}
                </span>
              </td>
              <td>
                <div class="hover">
                  <button
                    @click="deleteRow(route('admin.role.destroy', role.id))"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="h-3 text-white" data-feather="trash-2"></i>
                  </button>
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

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import sharedComposable from '@/Composables/sharedComposable'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'

const props = defineProps(['segments', 'buttons', 'roles'])

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()
</script>
