<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Custom Page" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="pageStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Title') }}</th>
              <th>{{ trans('Url') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th>
                <p class="text-end">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages.data" :key="page.id">
              <td class="text-left">
                {{ textExcerpt(page.title, 50) }}
              </td>
              <td class="text-left">
                <a :href="page.posturl" target="_blank">{{ textExcerpt(page.posturl, 100) }}</a>
              </td>

              <td class="text-left">
                <span class="badge" :class="page.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ page.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ page.created_at_diff }}
              </td>

              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.page.edit', page.id)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          as="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.page.destroy', page.id))"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans('Remove') }}></i
                          >
                          <span>{{ trans('Delete') }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card py-4">
          <Paginate :links="pages.links" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import sharedComposable from '@/Composables/sharedComposable'
import Paginate from '@/Components/Paginate.vue'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import trans from '@/Composables/transComposable'

defineOptions({ layout: AdminLayout })
const { textExcerpt, deleteRow } = sharedComposable()
const props = defineProps([
  'pages',
  'totalActivePosts',
  'totalInActivePosts',
  'totalPosts',
  'buttons',
  'segments'
])
const pageStats = [
  {
    value: props.totalPosts,
    title: trans('Total Page'),
    iconClass: 'bx bx-bar-chart'
  },
  {
    value: props.totalActivePosts,
    title: trans('Active Page'),
    iconClass: 'bx bx-check-circle'
  },
  {
    value: props.totalInActivePosts,
    title: trans('Inactive Page'),
    iconClass: 'bx bx-x-circle'
  }
]
</script>
