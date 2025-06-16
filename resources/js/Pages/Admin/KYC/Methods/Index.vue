<script setup>
import Paginate from '@/Components/Paginate.vue'
import AdminLayout from '@/Layouts/Admin.vue'
import { useForm } from '@inertiajs/vue3'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import moment from 'moment'
import trans from '@/Composables/transComposable'
import OverviewGrid from '@/Components/Admin/OverviewGrid.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'kycMethods',
  'all',
  'active',
  'inactive',
  'segments',
  'buttons',
  'KYC_MUST_VERIFIED'
])

const overviewItems = [
  { value: props.all, title: trans('All'), iconClass: 'bx bx-bar-chart' },
  { value: props.active, title: trans('Active'), iconClass: 'bx bx-check-circle' },
  { value: props.inactive, title: trans('Inactive'), iconClass: 'bx bx-x-circle' }
]

const form = useForm({
  method: '',
  ids: []
})

const submit = () => {
  modal.init(route('admin.kyc-methods.mass-destroy'), {
    method: 'post',
    data: form.ids,
    options: {
      confirm_text: 'Are you sure want to do this action ?',
      message: '',
      accept_btn_text: 'Yes, Confirm',
      reject_btn_text: 'No, Cancel',
      success_message: 'Methods has been deleted successfully'
    }
  })
}

const selectAll = (e) => {
  let isAllSelected = form.ids.length == props.kycMethods.data.length

  if (isAllSelected) {
    if (!e) {
      form.ids = []
    }
  } else {
    if (e) {
      form.ids = props.kycMethods.data.map((item) => item.id)
    }
  }
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment :title="trans('KYC Methods')" :segments="segments" :buttons="buttons" />
    <div class="space-y-4">
      <OverviewGrid :items="overviewItems" grid="3" />

      <form @submit.prevent="submit">
        <div class="mb-3 w-72">
          <div class="input-group">
            <select class="select" v-model="form.method">
              <option value="">{{ trans('Select Action') }}</option>
              <option value="delete">{{ trans('Delete Permanently') }}</option>
            </select>
            <button class="btn btn-primary" type="submit" :disabled="!form.ids.length">
              {{ trans('Submit') }}
            </button>
          </div>
        </div>

        <div class="table-responsive whitespace-nowrap rounded-primary">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="checkbox"
                    @input="selectAll($event.target.checked)"
                  />
                </th>
                <th>{{ trans('Method') }}</th>
                <th>{{ trans('Total Used') }}</th>

                <th>{{ trans('Accept Attach.') }}</th>
                <th>{{ trans('Created At') }}</th>
                <th>{{ trans('Status') }}</th>
                <th>
                  <p class="text-end">{{ trans('Action') }}</p>
                </th>
              </tr>
            </thead>
            <tbody v-if="kycMethods.total">
              <tr v-for="item in kycMethods.data" :key="item.id">
                <td>
                  <input type="checkbox" v-model="form.ids" class="checkbox" :value="item.id" />
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <img :src="item.image" height="50" width="50" />
                    {{ item.title }}
                  </div>
                </td>
                <td>
                  {{ item.requests_count ?? 0 }}
                </td>

                <td>
                  <span v-if="item.image_accept" class="badge badge-success">
                    {{ trans('Yes') }}
                  </span>
                  <span v-else class="badge badge-danger">{{ trans('No') }} </span>
                </td>

                <td>{{ moment(item.created_at).format('DD MMM, YYYY') }}</td>

                <td>
                  <span v-if="item.status" class="badge badge-success">{{ trans('Active') }} </span>
                  <span v-else class="badge badge-danger">{{ trans('Inactive') }} </span>
                </td>

                <td>
                  <div class="flex justify-end">
                    <Link :href="route('admin.kyc-methods.edit', item)" class="btn btn-primary">
                      <i class="fa fa-edit"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
            <NoDataFound v-else :for-table="true" />
          </table>
          <!-- pagination -->
        </div>
        <Paginate :links="kycMethods.links" />
      </form>
    </div>
  </main>
</template>
