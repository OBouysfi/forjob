<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import trans from '@/Composables/transComposable'
import { modal } from '@/Composables/modalComposable'
import moment from 'moment'

defineOptions({ layout: AdminLayout })
defineProps(['kycRequest', 'segments', 'buttons'])

const submitForm = (route, request, status) => {
  let data = {
    request: request,
    status: status
  }

  modal.init(route, {
    method: 'post',
    data,
    options: {
      confirm_text: 'Are you sure want to do this action ?',
      message: '',
      accept_btn_text: 'Yes, Confirm',
      reject_btn_text: 'No, Cancel'
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('KYC Requests details')" :segments="segments" :buttons="buttons" />

    <div class="space-y-4">
      <div class="grid grid-cols-3 gap-3">
        <div class="col-span-1 rounded bg-white p-5 shadow dark:bg-dark-800">
          <table class="table shadow-none">
            <tr>
              <td colspan="3">
                <img :src="kycRequest.user?.avatar" alt="" class="card-img" />
              </td>
            </tr>
            <tr>
              <th>{{ trans('Name') }}</th>
              <td>:</td>
              <td>
                {{ kycRequest.user?.name }}
              </td>
            </tr>
            <tr>
              <th>{{ trans('Email') }}</th>
              <td>:</td>
              <td>{{ kycRequest.user?.email }}</td>
            </tr>
            <tr>
              <th>{{ trans('Phone') }}</th>
              <td>:</td>
              <td>{{ kycRequest.user?.phone ?? '-' }}</td>
            </tr>
          </table>
        </div>
        <div class="col-span-2 rounded bg-white p-5 shadow dark:bg-dark-800">
          <table class="table-borderless table shadow-none">
            <tbody>
              <tr>
                <th>{{ trans('KYC Verified At') }}</th>
                <td>
                  <div v-if="kycRequest.user?.kyc_verified_at">
                    {{ moment(kycRequest.user?.kyc_verified_at).format('DD MMM, Y') }}
                  </div>
                  <div v-else>
                    <div class="badge badge-danger">
                      {{ trans('Not yet verified!') }}
                    </div>
                    <br />
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ trans('Current Status') }}</th>
                <td>
                  <span v-if="kycRequest.status == 0" class="badge badge-warning">
                    {{ trans('Pending') }}</span
                  >
                  <span v-else-if="kycRequest.status == 1" class="badge badge-primary">
                    {{ trans('Approved') }}</span
                  >
                  <span v-else-if="kycRequest.status == 2" class="badge badge-danger">
                    {{ trans('Rejected') }}</span
                  >
                  <span v-else-if="kycRequest.status == 3" class="badge badge-dark">
                    {{ trans('Re-Submitted') }}</span
                  >
                </td>
              </tr>
              <tr>
                <th>{{ trans('Submitted At') }}</th>
                <td>{{ kycRequest.created_at_date }}</td>
              </tr>

              <tr v-if="kycRequest.status == 2">
                <th>{{ trans('Rejected At') }}</th>
                <td>{{ kycRequest.rejected_at }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h6 class="card-header">{{ trans('Submissions') }}</h6>
        <table class="mt-3 table shadow-none">
          <tbody>
            <tr v-for="item in kycRequest.data" :key="item">
              <th>{{ item.label }}</th>
              <td>
                <a
                  target="_blank"
                  class="btn btn-success"
                  :href="item.value"
                  v-if="item.type == 'file'"
                  >{{ trans('View') }}</a
                >
                <p v-else>{{ item.value }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card p-5">
        <div class="mt-5 flex justify-center gap-3">
          <button
            v-if="kycRequest.status !== 1"
            class="btn btn-primary"
            @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'approve')"
          >
            <i class="fas fa-check-circle"></i>
            {{ trans('Approve documents') }}
          </button>

          <button
            class="btn btn-secondary"
            @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'approve_all')"
          >
            <i class="fas fa-check-circle"></i>
            {{ trans('Approve with profile') }}
          </button>

          <button
            class="btn btn-danger"
            @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'reject')"
          >
            <i class="fas fa-times-circle"></i>
            {{ trans('Reject') }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
