<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/Admin.vue'
import Pagination from '@/Components/Admin/Pagination.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import OverviewGrid from '@/Components/Admin/OverviewGrid.vue'
import trans from '@/Composables/transComposable'
import { modal } from '@/Composables/modalComposable'
import { ref } from 'vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
defineOptions({ layout: AdminLayout })
import sharedComposable from '@/Composables/sharedComposable'
const { getQueryParams } = sharedComposable()

const request = getQueryParams()

const props = defineProps([
  'requests',
  'all',
  'approved',
  'pending',
  'rejected',
  'reSubmitted',
  'segments',
  'buttons',
  'request'
])

const orderOverviews = [
  {
    value: props.all,
    title: trans('All'),
    iconClass: 'bx bx-bar-chart'
  },
  {
    value: props.pending,
    title: trans('Pending'),
    iconClass: 'bx bx-badge'
  },
  {
    value: props.approved,
    title: trans('Approved'),
    iconClass: 'bx bx-check-circle'
  },
  {
    value: props.rejected,
    title: trans('Rejected'),
    iconClass: 'bx bx-x-circle'
  },
  {
    value: props.reSubmitted,
    title: trans('re-submitted'),
    iconClass: 'bx bx-redo'
  }
]

const filterForm = useForm({
  keyword: request.keyword ?? ''
})

const filterFormSubmit = () => {
  filterForm.get(window.location.href)
}

const ids = ref([])
const selectedAction = ref('')

const submit = () => {
  if (selectedAction.value == 'delete') {
    modal.init(route('admin.kyc-requests.destroy.mass'), {
      method: 'post',
      data: ids,
      options: {
        confirm_text: 'Are you sure want to do this action ?',
        message: '',
        accept_btn_text: 'Yes, Confirm',
        reject_btn_text: 'No, Cancel',
        success_message: 'Requests has been deleted successfully'
      }
    })
  }
}

const selectAll = (e) => {
  let isAllSelected = ids.value.length == props.requests.data.length

  if (isAllSelected) {
    if (!e) {
      ids.value = []
    }
  } else {
    if (e) {
      ids.value = props.requests.data.map((item) => item.id)
    }
  }
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('KYC Requests')" :segments="segments" :buttons="buttons" />

    <div class="space-y-4">
      <OverviewGrid
        :items="orderOverviews"
        class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      />

      <div class="card">
        <div class="card-header">
          <form @submit.prevent="filterFormSubmit">
            <div class="flex justify-between">
              <h4>{{ trans('KYC Requests') }}</h4>
              <div class="input-group w-72">
                <input
                  type="text"
                  v-model="filterForm.keyword"
                  class="input"
                  :placeholder="trans('Search by invoice or user')"
                />
                <button type="submit" class="btn btn-primary btn-icon">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="card-body">
          <div v-if="requests.data">
            <div class="input-group w-72">
              <select :disabled="!ids.length" class="select" v-model="selectedAction">
                <option value="">{{ trans('Action') }}</option>
                <option value="delete">{{ trans('Delete') }}</option>
              </select>
              <button
                @click="submit"
                :disabled="!ids.length || selectedAction == ''"
                class="btn btn-outline-secondary"
              >
                {{ trans('Go') }}
              </button>
            </div>

            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <thead>
                  <tr>
                    <th class="pt-2 text-center">
                      <input
                        type="checkbox"
                        class="checkbox"
                        @input="selectAll($event.target.checked)"
                      />
                    </th>
                    <th>{{ trans('Request ID') }}</th>
                    <th>{{ trans('Method') }}</th>
                    <th>{{ trans('Company') }}</th>
                    <th>{{ trans('Status') }}</th>
                    <th>{{ trans('Documents') }}</th>
                    <th>{{ trans('Created At') }}</th>
                    <th>
                      <p class="text-end">{{ trans('Action') }}</p>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="requests.total">
                  <tr v-for="item in requests.data" :key="item">
                    <td class="text-center">
                      <input
                        type="checkbox"
                        v-model="ids"
                        :id="`request-${item.id}`"
                        class="checkbox"
                        :value="item.id"
                      />
                    </td>
                    <td>#{{ item.id }}</td>
                    <td>{{ item.method?.title }}</td>
                    <td>
                      <Link :href="route('admin.companies.show', item.user)">{{
                        item.user?.name
                      }}</Link>
                    </td>
                    <td>
                      <span v-if="item.status == 0" class="badge badge-warning">{{
                        trans('Pending')
                      }}</span>
                      <span v-else-if="item.status == 1" class="badge badge-primary">{{
                        trans('Approved')
                      }}</span>
                      <span v-else-if="item.status == 2" class="badge badge-danger">{{
                        trans('Rejected')
                      }}</span>
                      <span v-else-if="item.status == 3" class="badge badge-dark">{{
                        trans('Re-Submitted')
                      }}</span>
                    </td>
                    <td>{{ item.data.length }}</td>
                    <td>{{ item.created_at_date }}</td>
                    <td>
                      <div class="flex justify-end gap-2">
                        <Link
                          class="btn btn-primary"
                          :href="route('admin.kyc-requests.show', item.id)"
                        >
                          <i class="fas fa-eye"></i>
                          {{ trans('View') }}
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <NoDataFound v-else :for-table="true" />
              </table>

              <Pagination v-if="requests.data.length != 0" />
            </div>
          </div>
          <p v-else class="text-center font-bold">
            {{ trans('No requests available yet') }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
