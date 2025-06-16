<script setup>
import EmployerLayout from '@/Layouts/Employer.vue'
import Paginate from '@/Components/WebPaginate.vue'
import sharedComposable from '@/Composables/sharedComposable'
import { router, Head } from '@inertiajs/vue3'
import moment from 'moment'
import { ref, computed } from 'vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import notify from '@/Plugins/Admin/notify'
defineOptions({ layout: EmployerLayout })

const sorts = [
  {
    label: 'Complete',
    value: 'complete'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
]
const props = defineProps(['creditLogs', 'credit_fee', 'gateways'])
const { pickBy, formatCurrency, authUser } = sharedComposable()
const filterForm = ref({
  order: '',
  status: ''
})
const activeGateway = ref(props.gateways[0]?.id || 0)
const credits = ref(null)
const conversionRate = ref(props.credit_fee)
const convertedAmount = computed(() => {
  return credits.value / conversionRate.value
})
const isProcessing = ref(false)
const filter = () => {
  router.get(route('employer.credits.index'), pickBy(filterForm.value), {
    preserveState: true
  })
}
const setOrder = (val) => {
  filterForm.value.order = val
  filter()
}
const manualPayment = ref({
  image: null,
  comment: ''
})
const findGateway = computed(() => {
  return props.gateways.find((gateway) => gateway.id === activeGateway.value)
})
const submit = (gateway_id) => {
  if (findGateway.value.min_amount > convertedAmount.value) {
    notify.danger(
      'The minimum transaction amount is ' + formatCurrency(findGateway.value.min_amount)
    )
    return
  }
  if (findGateway.value.max_amount != -1) {
    if (findGateway.value.max_amount < convertedAmount.value) {
      notify.danger(
        'The maximum transaction amount is ' + formatCurrency(findGateway.value.max_amount)
      )
      return
    }
  }
  isProcessing.value = true
  router.post(
    route('credit.pay'),
    {
      gateway_id: gateway_id,
      total: convertedAmount.value,
      credits: credits.value,
      manualPayment: findGateway.value.is_auto == 0 ? manualPayment.value : null
    },
    {
      onFinish: () => {
        credits.value = 0
        isProcessing.value = false
      }
    }
  )
}
</script>

<template>
  <Head title="Credit Logs" />

  <div class="d-sm-flex align-items-center justify-content-between lg-mb-30 mb-40">
    <h2 class="main-title m0">{{ trans('Credit Logs') }}</h2>
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
        <div v-if="creditLogs.total" class="table-responsive">
          <table class="job-alert-table table">
            <thead>
              <tr>
                <th scope="col">{{ trans('Transaction No') }}</th>
                <th scope="col">{{ trans('Credits') }}</th>
                <th scope="col">{{ trans('Price') }}</th>
                <th scope="col">{{ trans('Status') }}</th>
                <th scope="col">{{ trans('Gateway') }}</th>
                <th scope="col">{{ trans('Date') }}</th>
              </tr>
            </thead>
            <tbody class="border-0">
              <tr
                :class="{
                  active: creditLog.status == 1,
                  pending: creditLog.status != 1
                }"
                v-for="creditLog in creditLogs.data"
                :key="creditLog.id"
              >
                <td>
                  {{ creditLog.invoice_no }}
                </td>
                <td>
                  {{ creditLog.credits }}
                </td>
                <td>
                  {{ formatCurrency(creditLog.price) }}
                </td>
                <td>
                  <div class="job-status">
                    {{ creditLog.status == 1 ? trans('Complete') : trans('Pending') }}
                  </div>
                </td>
                <td>
                  {{ creditLog.gateway.name }}
                </td>
                <td>
                  <p class="text-end">{{ moment(creditLog.updated_at).format('DD MMM Y') }}</p>
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
    <Paginate :links="creditLogs.links" />
  </div>
  <!-- creditModal Modal -->
  <div
    class="modal fade"
    id="creditModal"
    tabindex="-1"
    aria-labelledby="creditModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content p-4">
        <div class="p-2">
          <p class="fs-5 text-center" id="creditModalLabel">{{ trans('Buy Credits') }}</p>
        </div>
        <div class="modal-body px-5">
          <p class="text-center">
            {{ conversionRate }} {{ trans('Credits') }} =
            {{ formatCurrency(1) }}
          </p>

          <input
            class="w-100 rounded border p-3"
            step="5"
            type="number"
            v-model.number="credits"
            placeholder="Enter Credit amount"
          />
          <p class="fw-bold mt-2 text-left">
            {{ trans('Total:') }} {{ formatCurrency(convertedAmount || 0) }}
          </p>
          <div class="row gateways my-4 px-3">
            <template v-for="gateway in gateways" :key="gateway.id">
              <button
                class="col-sm-2 position-relative rounded"
                @click="activeGateway = gateway.id"
                :class="{ border: activeGateway == gateway.id }"
              >
                <div v-show="activeGateway == gateway.id">
                  <i
                    class="fas fa-check rounded-circle position-absolute start-100 translate-middle bg-success top-0 p-1 text-white"
                  ></i>
                </div>

                <img :src="gateway.logo" class="rounded p-1" />
              </button>
            </template>
          </div>
          <template v-for="gateway in gateways" :key="gateway.id">
            <div
              v-show="activeGateway === gateway.id"
              class="col-sm-12 gateway-form"
              :id="'gateway-form' + gateway.id"
            >
              <form
                method="post"
                @submit.prevent="submit(gateway.id)"
                enctype="multipart/form-data"
              >
                <div class="table-responsive">
                  <table class="table-borderless text-fs-sm table">
                    <template v-if="gateway.charge != 0">
                      <tr class="border">
                        <td class="border p-2">
                          {{ trans('Gateway Charge: ') }}
                        </td>
                        <td class="text-center">
                          {{ formatCurrency(gateway.charge) }}
                        </td>
                      </tr>
                    </template>
                  </table>

                  <template v-if="gateway.comment != null">
                    <table class="table-borderless mt-2 table">
                      <tr>
                        <td class="fw-500 text-fs-sm">
                          {{ trans('Payment Instruction: ') }}
                        </td>
                      </tr>

                      <tr>
                        <td class="text-fs-sm">
                          {{ gateway.comment }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-if="gateway.phone_required == 1">
                    <div class="form-group mt-2">
                      <label class="fw-500 text-fs-sm my-2">{{ trans('Your phone number') }}</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Your phone number"
                        class="form-control"
                        required
                        :value="authUser.phone"
                      />
                    </div>
                  </template>
                  <template v-if="gateway.is_auto == 0">
                    <div class="form-group mt-1">
                      <label class="fw-500 text-fs-sm my-2">{{
                        trans('Submit your payment proof')
                      }}</label>
                      <input
                        @input="
                          (e) => {
                            manualPayment.image = e.target.files[0]
                          }
                        "
                        type="file"
                        name="image"
                        class="form-control"
                        required
                        accept="image/*"
                      />
                    </div>
                    <div class="form-group">
                      <label class="fw-500 text-fs-sm my-2">{{ trans('Comment') }}</label>
                      <textarea
                        v-model="manualPayment.comment"
                        class="form-control"
                        required
                        name="comment"
                        placeholder="comment"
                        maxlength="500"
                      ></textarea>
                    </div>
                  </template>
                </div>
                <button :disabled="isProcessing" type="submit" class="btn-one w-100 mt-4">
                  {{ trans('Pay Now') }}
                </button>
              </form>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
