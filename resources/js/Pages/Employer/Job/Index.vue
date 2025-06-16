<script setup>
import EmployerLayout from '@/Layouts/Employer.vue'
import Paginate from '@/Components/WebPaginate.vue'
import sharedComposable from '@/Composables/sharedComposable'
import { router, Head } from '@inertiajs/vue3'
import moment from 'moment'
import { ref } from 'vue'
import NiceSelect from '@/Components/NiceSelect.vue'
defineOptions({ layout: EmployerLayout })

const sorts = [
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
]
const props = defineProps(['jobs', 'request'])
const { pickBy, copyToClipboard, deleteRow } = sharedComposable()
const filterForm = ref({
  order: props.request?.order ?? '',
  status: props.request?.status ?? ''
})
const filter = () => {
  router.get(route('employer.jobs.index'), pickBy(filterForm.value), {
    preserveState: true
  })
}
const setOrder = (val) => {
  filterForm.value.order = val
  filter()
}
const origin = window.location.origin + '/jobs/'
</script>

<template>
  <Head title="My Jobs" />

  <div class="d-sm-flex align-items-center justify-content-between lg-mb-30 mb-40">
    <h2 class="main-title m0">{{ trans('My Jobs') }}</h2>
    <div class="d-flex xs-mt-30 ms-auto">
      <div class="nav nav-tabs tab-filter-btn me-4">
        <button
          @click="setOrder('')"
          :class="{ active: filterForm.order === '' }"
          class="nav-link"
          type="button"
        >
          {{ trans('All') }}
        </button>
        <button
          @click="setOrder('desc')"
          class="nav-link"
          :class="{ active: filterForm.order === 'desc' }"
          type="button"
        >
          {{ trans('New') }}
        </button>
        <button
          @click="setOrder('asc')"
          class="nav-link"
          :class="{ active: filterForm.order === 'asc' }"
          type="button"
        >
          {{ trans('Old') }}
        </button>
      </div>
      <div class="short-filter d-flex align-items-center ms-auto">
        <div class="text-dark fw-500 me-2">{{ trans('Sort by') }}:</div>
        <NiceSelect
          v-model="filterForm.status"
          :options="sorts"
          value-by="value"
          label="label"
          placeholder="Default"
          @change="filter"
        />
      </div>
    </div>
  </div>

  <div class="card-box border-20 bg-white">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="a1" role="tabpanel">
        <div v-if="jobs.total" class="table-responsive">
          <table class="job-alert-table table">
            <thead>
              <tr>
                <th scope="col">{{ trans('Title') }}</th>
                <th scope="col">{{ trans('Job Created') }}</th>
                <th scope="col">{{ trans('Applicants') }}</th>
                <th scope="col">{{ trans('Views') }}</th>
                <th scope="col">{{ trans('Status') }}</th>
                <th scope="col">{{ trans('Action') }}</th>
              </tr>
            </thead>
            <tbody class="border-0">
              <tr
                :class="{
                  active: job.status == 1,
                  expired: job.status == 0,
                  pending: job.status == 2
                }"
                v-for="job in jobs.data"
                :key="job.id"
              >
                <td>
                  <a target="_blank" :href="route('jobs.show', job.slug)" class="job-name fw-500">
                    {{ job.title }}
                  </a>
                  <div class="info1">
                    {{ job.type.replace('_', ' ') }} .
                    {{ job.country?.[0]?.name }}
                  </div>
                </td>
                <td>{{ moment(job.created_at).format('D-MMM-Y') }}</td>
                <td>{{ job.applied_applicants_count }} {{ trans('Applications') }}</td>
                <td>{{ job.total_visits }} {{ trans('Views') }}</td>
                <td>
                  <div class="job-status">
                    {{
                      job.status == 0
                        ? trans('Inactive')
                        : job.status == 1
                        ? trans('Active')
                        : trans('Pending')
                    }}
                  </div>
                </td>
                <td>
                  <div class="action-dots float-end">
                    <button
                      class="action-btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li v-if="job.status == 1">
                        <Link class="dropdown-item" :href="route('employer.jobs.show', job.slug)">
                          <img
                            src="/assets/dashboard/images/icon/icon_18.svg"
                            alt=""
                            class="lazy-img"
                          />
                          {{ trans('Applicants') }}</Link
                        >
                      </li>
                      <li v-if="job.status == 1">
                        <a
                          class="dropdown-item"
                          target="_blank"
                          :href="route('jobs.show', job.slug)"
                        >
                          <img
                            src="/assets/dashboard/images/icon/icon_17.svg"
                            alt="img"
                            class="lazy-img"
                          />
                          {{ trans('Visit') }}</a
                        >
                      </li>
                      <li v-if="job.status == 1">
                        <button
                          @click="copyToClipboard(origin + job.slug)"
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#shareJob"
                        >
                          <img
                            src="/assets/dashboard/images/icon/icon_19.svg"
                            alt="img"
                            class="lazy-img"
                          />
                          {{ trans('Copy Link') }}
                        </button>
                      </li>
                      <li>
                        <Link class="dropdown-item" :href="route('employer.jobs.edit', job.slug)">
                          <img
                            src="/assets/dashboard/images/icon/icon_20.svg"
                            alt="img"
                            class="lazy-img"
                          />
                          {{ trans('Edit') }}
                        </Link>
                      </li>
                      <li>
                        <button
                          class="dropdown-item"
                          @click="deleteRow(route('employer.jobs.destroy', job.id))"
                        >
                          <img
                            src="/assets/dashboard/images/icon/icon_21.svg"
                            alt="img"
                            class="lazy-img"
                          />
                          {{ trans('Delete') }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- /.table job-alert-table -->
        </div>
        <div class="text-center" v-else>{{ trans('No record found') }}</div>
      </div>
    </div>
  </div>
  <!-- /.card-box -->

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="jobs.links" />
  </div>
</template>
