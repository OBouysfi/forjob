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
  'companies',
  'total_companies',
  'active_companies',
  'inactive_companies',
  'verified_companies'
])

const companyStats = [
  { value: props.total_companies, title: trans('Total Companies'), iconClass: 'bx bx-list-ul' },
  { value: props.active_companies, title: trans('Active Companies'), iconClass: 'bx bx-check-shield' },
  { value: props.inactive_companies, title: trans('Inactive Companies'), iconClass: 'bx bx-x-circle' },
  {
    value: props.verified_companies,
    title: trans('Verified Companies'),
    iconClass: 'bx bx-check-shield'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Companies')" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <Overview :items="companyStats" class="lg:grid-cols-3" />
      <Filter :request="request" :buttons="buttons" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Company') }}</th>
              <th>{{ trans('Plan') }}</th>
              <th>{{ trans('Email Verification') }}</th>
              <th>{{ trans('ID Verification') }}</th>
              <th>{{ trans('Is Star?') }}</th>
              <th>{{ trans('Status') }}</th>
              <th class="text-left">{{ trans('Created At') }}</th>
              <th>
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody class="list" v-if="companies.total != 0">
            <tr v-for="company in companies.data" :key="company.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar avatar-circle">
                    <img :src="company.avatar == null
                      ? `https://ui-avatars.com/api/?name=${company.name}`
                      : `${company.avatar}`
                      " alt=" avatar-img" class="h-full w-full rounded-full" />
                  </div>
                  <div>
                    <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
                      <Link :href="route('admin.companies.show', company)" class="text-dark">
                      {{ company.name }}
                      </Link>
                    </h6>
                    <p class="truncate text-xs text-slate-500 dark:text-slate-400">
                      {{ company.email }}
                    </p>
                  </div>
                </div>
              </td>

              <td>
                {{ company.plan?.title ?? 'NA' }} <br />
                {{ company.will_expire ?? '' }}
              </td>
              <td>
                <span v-if="company.email_verified_at" class="badge badge-primary">{{
                  trans('Verified')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Not Verified') }}</span>
              </td>
              <td>
                <span v-if="company.kyc_verified_at" class="badge badge-primary">{{
                  trans('Verified')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Not Verified') }}</span>
              </td>
              <td>
                <span v-if="company.is_star" class="badge badge-primary">{{
                  trans('Starred')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Not Starred') }}</span>
              </td>

              <td>
                <span :class="company.status == 1 ? 'badge badge-success' : 'badge badge-danger'">
                  {{ company.status == 1 ? 'Active' : 'Suspended' }}
                </span>
              </td>

              <td class="text-center">
                {{ company.created_at_date }}
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
                          <Link :href="route('admin.companies.show', company)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="external-link"></i>
                          <span>{{ trans('View') }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <a target="_blank" :href="route('companies.show', company.username)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="external-link"></i>
                            <span>{{ trans('View Profile') }}</span>
                          </a>
                        </li>

                        <li class="dropdown-list-item">
                          <Link :href="route('admin.companies.edit', company)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                          </Link>
                        </li>
                        <li class="dropdown-list-item">
                          <button @click="deleteRow(route('admin.companies.destroy', company))" class="dropdown-link">
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
        <Paginate :links="companies.links" />
      </div>
    </div>
  </main>
</template>
