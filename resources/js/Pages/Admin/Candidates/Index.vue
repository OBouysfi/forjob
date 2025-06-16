<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import Paginate from '@/Components/Paginate.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import trans from '@/Composables/transComposable'
import Filter from '@/Components/Admin/Filter.vue'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import sharedComposable from '@/Composables/sharedComposable'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
const { deleteRow } = sharedComposable()

defineOptions({ layout: AdminLayout })

const props = defineProps([
  'segments',
  'buttons',
  'request',
  'candidates',
  'total_candidates',
  'active_candidates',
  'inactive_candidates',
  'verified_candidates'
])

const candidateStats = [
  { value: props.total_candidates, title: trans('Total Candidates'), iconClass: 'bx bx-list-ul' },
  { value: props.active_candidates, title: trans('Active Candidates'), iconClass: 'bx bx-check-shield' },
  { value: props.inactive_candidates, title: trans('Inactive Candidates'), iconClass: 'bx bx-x-circle' },
  {
    value: props.verified_candidates,
    title: trans('Verified Candidates'),
    iconClass: 'bx bx-check-shield'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Candidates')" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <Overview :items="candidateStats" class="lg:grid-cols-3" />
      <Filter :request="request" :segments="segments" :buttons="buttons" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Candidate') }}</th>
              <th>{{ trans('Service') }}</th>
              <th>{{ trans('Is Starred') }}</th>
              <th>{{ trans('Status') }}</th>
              <th class="text-left">{{ trans('Created At') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody class="list" v-if="candidates.total != 0">
            <tr v-for="candidate in candidates.data" :key="candidate.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar avatar-circle">
                    <img class="avatar-img" v-lazy="candidate?.avatar == null
                        ? `https://ui-avatars.com/api/?name=${candidate.name}`
                        : `${candidate?.avatar}`
                      " />
                  </div>
                  <div>
                    <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
                      <Link :href="route('admin.candidates.show', candidate)" class="text-dark">
                      {{ candidate.name }}
                      </Link>
                    </h6>
                    <p class="truncate text-xs text-slate-500 dark:text-slate-400">
                      {{ candidate.email }}
                    </p>
                  </div>
                </div>
              </td>

              <td>{{ candidate.service?.title }}</td>

              <td>
                <span v-if="candidate.is_star" class="badge badge-primary">{{
                  trans('Starred')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Not Starred') }}</span>
              </td>

              <td>
                <span :class="candidate.status == 1 ? 'badge badge-success' : 'badge badge-danger'">
                  {{ candidate.status == 1 ? 'Active' : 'Suspended' }}
                </span>
              </td>

              <td class="text-center">
                {{ candidate.created_at_date }}
              </td>
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="dropdown-content w-40">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link :href="route('admin.candidates.show', candidate.id)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="external-link"></i>
                          <span>{{ trans('View') }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <a target="_blank" :href="route('candidates.show', candidate.username)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="external-link"></i>
                            <span>{{ trans('View Profile') }}</span>
                          </a>
                        </li>

                        <li class="dropdown-list-item">
                          <Link :href="route('admin.candidates.edit', candidate)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button @click="deleteRow(route('admin.candidates.destroy', candidate))" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="trash"></i>
                            {{ trans('Delete') }}
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
        <Paginate :links="candidates.links" />
      </div>
    </div>
  </main>
</template>
