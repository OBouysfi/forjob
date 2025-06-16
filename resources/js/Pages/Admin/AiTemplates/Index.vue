<script setup>
import moment from 'moment'
import trans from '@/Composables/transComposable'
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import sharedComposable from '@/Composables/sharedComposable'
import OverviewGrid from '@/Components/Admin/OverviewGrid.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
import Paginate from '@/Components/Paginate.vue'

const { deleteRow } = sharedComposable()
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'templates',
  'totalTemplates',
  'activeTemplates',
  'inActiveTemplates',
  'buttons',
  'segments'
])

const stats = [
  {
    value: props.totalTemplates,
    title: trans('Total Templates'),
    iconClass: 'bx bx-bar-chart'
  },
  {
    value: props.activeTemplates,
    title: trans('Active Templates'),
    iconClass: 'bx bx-check-circle'
  },
  {
    value: props.inActiveTemplates,
    title: trans('Inactive Templates'),
    iconClass: 'bx bx-x-circle'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="AI Templates" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <OverviewGrid :items="stats" grid="3" />

      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Image') }}</th>
                    <th>{{ trans('Name') }}</th>
                    <th>{{ trans('Description') }}</th>
                    <th>{{ trans('Created At') }}</th>
                    <th>{{ trans('Status') }}</th>
                    <th>
                      <p class="text-end">{{ trans('Action') }}</p>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="templates.total">
                  <tr v-for="template in templates.data" :key="template.id">
                    <td class="text-left">
                      <img :src="template.icon" class="avatar rounded-square w-70-per" />
                    </td>
                    <td class="text-left">
                      {{ template.title }}
                    </td>

                    <td class="text-left">
                      {{ template.description }}
                    </td>
                    <td>
                      {{ moment(template.created_at).format('D-MMM-Y') }}
                    </td>
                    <td class="text-left">
                      <span
                        class="badge"
                        :class="template.status == 'active' ? 'badge-success' : 'badge-danger'"
                      >
                        {{ template.status == 'active' ? trans('Active') : trans('Draft') }}
                      </span>
                    </td>

                    <td>
                      <div class="dropdown" data-placement="bottom-start">
                        <div class="dropdown-toggle">
                          <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                        </div>
                        <div class="dropdown-content w-40">
                          <ul class="dropdown-list">
                            <li class="dropdown-list-item">
                              <Link
                                :href="route('admin.ai-templates.edit', template)"
                                class="dropdown-link"
                              >
                                <i class="h-5 text-slate-400" data-feather="edit"></i>
                                <span>{{ trans('Edit') }}</span>
                              </Link>
                            </li>
                            <li class="dropdown-list-item">
                              <button
                                @click="deleteRow(route('admin.ai-templates.destroy', template))"
                                class="dropdown-link"
                              >
                                <i class="h-5 text-slate-400" data-feather="trash"></i>
                                <span>{{ trans('Delete') }}</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <NoDataFound v-else :for-table="true" />
              </table>
            </div>
            <!-- pagination -->
            <Paginate :links="templates.links" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
