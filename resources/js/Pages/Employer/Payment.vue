<script setup>
import { router, Head } from '@inertiajs/vue3'
import { ref } from 'vue'

import BlankLayout from '@/Layouts/Blank.vue'
import sharedComposable from '@/Composables/sharedComposable'
defineOptions({ layout: BlankLayout })
const { formatCurrency } = sharedComposable()
const props = defineProps([
  'plan',
  'gateways',
  'tax',
  'total',
  'invoice_data',
  'error',
  'minMax',
  'user',
  'logo',
  'minMaxMessage'
])
const activeGateway = ref(props.gateways[0]?.id || 0)

const manualPayment = ref({
  image: null,
  comment: ''
})
const isProcessing = ref(false)
const submit = (gateway_id) => {
  isProcessing.value = true
  const findGateway = props.gateways.find((gateway) => gateway.id === gateway_id)
  router.post(
    route('employer.membership.subscribe'),
    {
      gateway_id: gateway_id,
      plan_id: props.plan.id,
      manualPayment: findGateway.is_auto == 0 ? manualPayment.value : null
    },
    {
      onFinish: () => {
        isProcessing.value = false
      }
    }
  )
}
const setActiveGateway = (id) => {
  activeGateway.value = id
}
</script>

<template>
  <Head :title="trans('Payment')" />
  <div class="payment-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-lg-6">
          <div class="rounded-lg bg-white p-5 shadow-lg">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <img src="/assets/dashboard/images/logo_01.png" alt="" />
              <span class="unpaid text-danger h3 fw-bold">
                {{ trans('Unpaid') }}
              </span>
            </div>

            <template v-if="error">
              <div class="col-sm-12 my-4">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <span class="alert-icon"><i class="fas fa-sad-tear"></i></span>
                  <strong>{{ trans('!Opps ') }}</strong>
                  {{
                    trans('Transaction failed if you make payment successfully please contact us.')
                  }}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </template>

            <template v-if="minMax">
              <div class="col-sm-12 my-4">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <span class="alert-icon"><i class="fas fa-sad-tear"></i></span>
                  <strong>{{ trans('!Opps ') }}</strong>
                  {{ minMaxMessage }}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </template>

            <div class="row gateways my-2">
              <template v-for="gateway in gateways" :key="gateway.id">
                <button
                  class="col-sm-3 position-relative"
                  @click="setActiveGateway(gateway.id)"
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

            <div class="clear"></div>
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
                      <tr class="border">
                        <td class="border p-2">
                          {{ trans('Method Name: ') }}
                        </td>
                        <td class="text-center">
                          {{ gateway.name }}
                        </td>
                      </tr>
                      <template v-if="gateway.currency != null">
                        <tr class="border">
                          <td class="border p-2">
                            {{ trans('Gateway Currency: ') }}
                          </td>
                          <td class="text-center">
                            {{ gateway.currency }}
                          </td>
                        </tr>
                      </template>
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
                      <tr class="border">
                        <td class="border p-2">
                          {{ trans('Payable Amount: ') }}
                        </td>
                        <td class="text-center">
                          {{ formatCurrency(total * gateway.multiply + gateway.charge) }}
                        </td>
                      </tr>
                    </table>

                    <template v-if="gateway.comment != null">
                      <table class="table-borderless mt-2 table">
                        <tr>
                          <td class="fw-600 text-fs-sm">
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
                        <label class="fw-600 text-fs-sm my-2">{{
                          trans('Your phone number')
                        }}</label>
                        <input
                          type="number"
                          name="phone"
                          placeholder="Your phone number"
                          class="form-control"
                          required
                          :value="user.phone"
                        />
                      </div>
                    </template>
                    <template v-if="gateway.is_auto == 0">
                      <div class="form-group mt-2">
                        <label class="fw-600 text-fs-sm my-2">{{
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
                        <label class="fw-600 text-fs-sm my-2">{{ trans('Comment') }}</label>
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
                  <button
                    :disabled="isProcessing"
                    type="submit"
                    class="btn-one w-100 d-flex align-items-center justify-content-center mb-1 mt-1 py-2"
                  >
                    <img
                      v-show="isProcessing"
                      src="/assets/images/ajax_loading_white.svg"
                      class="spinner_btn_img"
                    />
                    <span>{{ trans('Pay Now') }}</span>
                  </button>
                </form>
              </div>
            </template>

            <br />
            <div class="col-sm-12">
              <table class="table" cellspacing="8">
                <tr>
                  <td class="col-6 rounded border">
                    <div class="text-fs-sm">
                      <strong>{{ trans('Invoiced To') }}</strong
                      ><br />
                      {{ user.name }}<br />
                      {{ user.address }}
                    </div>
                  </td>
                  <td class="col-6 rounded border">
                    <div class="text-fs-sm">
                      <strong>{{ trans('Pay To') }}</strong
                      ><br />
                      {{ invoice_data.company_name }} <br />
                      {{ invoice_data.address }}, {{ invoice_data.city }} <br />
                      {{ invoice_data.post_code }},
                      {{ invoice_data.country }}
                    </div>
                  </td>
                </tr>
              </table>

              <table class="table-borderless text-fs-sm mt-2 table">
                <tr class="title text-center">
                  <td class="col-9 fw-500 border p-2">
                    {{ trans('Description') }}
                  </td>
                  <td class="col-3 fw-500 border p-2">{{ trans('Amount') }}</td>
                </tr>

                <tr>
                  <td class="border p-2">{{ plan.title }}</td>
                  <td class="border p-2 text-center">
                    {{ plan.price_format }}
                  </td>
                </tr>

                <tr class="title">
                  <td class="border p-2">{{ trans('Sub Total') }}:</td>
                  <td class="border p-2 text-center">
                    {{ plan.price_format }}
                  </td>
                </tr>

                <tr class="title">
                  <td class="border p-2">{{ trans('Tax') }}:</td>
                  <td class="border p-2 text-center">
                    {{ formatCurrency(tax) }}
                  </td>
                </tr>

                <tr class="title">
                  <td class="border p-2">{{ trans('Total') }} :</td>
                  <td class="border p-2 text-center">
                    {{ formatCurrency(total) }}
                  </td>
                </tr>
              </table>

              <div class="text-center">
                <Link
                  href="/employer/memberships"
                  class="btn btn-outline-danger rounded-pill w-100 mb-2 mt-2 py-2"
                >
                  {{ trans('Cancel Payment') }}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
