<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import moment from 'moment'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import sharedComposable from '@/Composables/sharedComposable'
defineOptions({ layout: AdminLayout })
const props = defineProps(['order', 'invoice_data', 'segments', 'buttons', 'meta'])
const { formatCurrency } = sharedComposable()
const form = useForm({
  status: props.order.status,
  assign_order: 'no'
})

const updateOrder = (actionUrl) => {
  form.put(actionUrl, {
    onSuccess: () => {
      notify.success('Order status updated')
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Invoice details" :segments="segments" :buttons="buttons" />

    <!-- Invoice Details Starts -->
    <div class="card">
      <div class="space-y-6 card-body">
        <!-- Invoice Header Starts -->
        <div class="flex flex-col justify-between p-1 space-y-4 md:flex-row">
          <div class="flex items-center justify-center md:justify-start">
            <!-- Logo Starts -->
            <div class="flex items-center w-full h-16 gap-4 pr-4">
              <img
                v-lazy="$page.props.primaryData.deep_logo"
                alt="logo"
                class="block h-[45px] dark:hidden"
              />
              <img
                v-lazy="$page.props.primaryData.logo"
                alt="logo"
                class="hidden h-[45px] dark:block"
              />
            </div>
            <!-- Logo Ends -->
          </div>
          <div class="flex flex-col items-start justify-center md:items-end">
            <h4>Invoice #{{ order.invoice_no }}</h4>
            <p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans('Order Date') }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{ moment(order.created_at).format('DD-MM-YYYY') }}
              </span>
            </p>

            <p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans('Expire Date') }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{ moment(order.will_expire).format('DD-MM-YYYY') }}
              </span>
            </p>

            <p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans('Status') }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{
                  order.status == 2 ? 'pending' : order.status == 1 ? 'approved' : 'declined'
                }}</span
              >
            </p>
          </div>
        </div>
        <!-- Invoice Header Ends -->

        <!-- Invoice Info Starts -->
        <div class="flex flex-col justify-between p-1 space-y-6 md:flex-row md:space-y-0">
          <div
            class="flex flex-col items-start justify-center w-full md:mb-0 md:w-2/3 md:justify-center"
          >
            <p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p>
            <h6 class="my-1">{{ invoice_data.company_name }}</h6>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.address }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.city }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.post_code }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.country }}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center w-full md:w-1/3 md:items-end">
            <p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p>
            <h6 class="my-1">{{ order.user.name }}</h6>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.address }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.email }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.phone }}
            </p>
          </div>
        </div>
        <!-- Invoice Info Ends -->

        <!-- Product Table Starts -->
        <div class="w-full p-1 overflow-auto">
          <div class="min-w-[38rem]">
            <div
              class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"
            >
              <table class="table table-striped table-hover table-md">
                <tbody>
                  <tr>
                    <td>{{ trans('Subscription Plan Name') }}</td>
                    <td>
                      <p class="text-end">{{ trans('Amount') }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ order.plan.title }}</td>
                    <td>
                      <p class="text-end">{{ formatCurrency(order.amount) }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-stretch justify-between mt-4">
              <div class="w-2/5">
                <p class="py-0 my-2 text-sm font-semibold">
                  {{ trans('Payment Method') }}:
                  <span class="font-normal"> {{ order.gateway.name }}</span>
                </p>
                <p class="py-0 my-2 text-sm font-semibold">
                  {{ trans('Payment Id') }}:
                  <span class="font-normal">{{ order.payment_id }}</span>
                </p>
                <div class="">
                  <template v-if="meta != null">
                    <div class="font-semibold">{{ trans('Payment Info:') }}</div>
                    <br />
                    <p class="section-lead">{{ meta.comment }}</p>
                    <p class="section-lead">
                      <a target="_blank" :href="meta.screenshot">{{ trans('Attachment') }}</a>
                    </p>
                  </template>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400 dark:text-slate-300">
                    {{ trans('Subtotal') }}:
                  </p>

                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount) }}
                  </p>
                </div>
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400 dark:text-slate-300">
                    {{ trans('Tax') }}:
                  </p>

                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.tax || 0) }}
                  </p>
                </div>

                <hr class="mt-5 mb-1 border-slate-200 dark:border-slate-600" />
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400">{{ trans('Total') }}:</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount + order.tax || 0) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product Table Ends -->

        <p class="py-2 text-sm text-center">{{ trans('Thanks for your Business') }}</p>
      </div>
    </div>
    <!-- Invoice Details Ends -->

    <div class="mt-4 card">
      <form @submit.prevent="updateOrder('/admin/order/' + order.id)">
        <div class="flex space-x-2 card-body">
          <div class="col-span-3 mb-2">
            <label class="float-left">{{ trans('Order Status') }}</label>
            <select class="select" name="status" v-model="form.status">
              <option value="1">{{ trans('Approved') }}</option>
              <option value="2">{{ trans('Pending') }}</option>
              <option value="0">{{ trans('Rejected') }}</option>
            </select>
          </div>
          <div class="col-span-3 mb-2">
            <label class="float-left">{{ trans('Assign This Plan?') }}</label>
            <select class="select" name="assign_order" v-model="form.assign_order">
              <option value="yes">{{ trans('Yes') }}</option>
              <option value="no">{{ trans('No') }}</option>
            </select>
          </div>
          <div class="col-auto mb-2">
            <br />
            <button type="submit" class="btn btn-primary" :disabled="form.processing">
              {{ trans('Update') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
