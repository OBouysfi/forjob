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
    label: 'Open',
    value: 'open'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Close',
    value: 'close'
  }
]
defineProps(['supports'])
const { pickBy } = sharedComposable()
const filterForm = ref({
  order: '',
  status: ''
})
const filter = () => {
  router.get(route('employer.support.index'), pickBy(filterForm.value), {
    preserveState: true
  })
}
const setOrder = (val) => {
  filterForm.value.order = val
  filter()
}
</script>

<template>
  <Head title="Supports" />

  <div class="d-sm-flex align-items-center justify-content-between lg-mb-30 mb-40">
    <h2 class="main-title m0">{{ trans('Supports') }}</h2>
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
        <div v-if="supports.total" class="table-responsive">
          <table class="job-alert-table table">
            <thead>
              <tr>
                <th>{{ trans('Subject') }}</th>
                <th>{{ trans('Total Replies') }}</th>
                <th>{{ trans('Status') }}</th>
                <th>
                  {{ trans('Created At') }}
                </th>
                <th>{{ trans('Ticket') }}</th>
              </tr>
            </thead>
            <tbody class="border-0">
              <tr
                v-for="support in supports.data"
                :key="support.id"
                :class="{
                  active: support.status == 1,
                  expired: support.status == 0,
                  pending: support.status == 2
                }"
              >
                <td>
                  <Link :href="route('employer.support.show', support.id)">
                    {{ support.subject }}
                  </Link>
                </td>
                <td class="text-center">
                  {{ support.conversations_count }}
                </td>
                <td>
                  <div class="job-status">
                    {{
                      support.status == 2
                        ? trans('Pending')
                        : support.status == 1
                        ? trans('Active')
                        : trans('Closed')
                    }}
                  </div>
                </td>
                <td>
                  {{ moment(support.created_at).format('D MMM y') }}
                </td>
                <td class="text-end">
                  <Link
                    :href="route('employer.support.show', support.id)"
                    class="save-btn rounded-circle tran3s fw-normal text-center"
                    ><i class="bi bi-eye"></i>
                  </Link>
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
    <Paginate :links="supports.links" />
  </div>
</template>
