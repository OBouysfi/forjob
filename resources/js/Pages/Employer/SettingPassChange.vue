<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'

import EmployerLayout from '@/Layouts/Employer.vue'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import trans from '@/Composables/transComposable'
defineOptions({ layout: EmployerLayout })

const form = useForm({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const submit = () => {
  form.put(route('employer.update-password'), {
    onSuccess: () => {
      notify.success(trans('password has been updated successfully'))
      form.reset()
    }
  })
}
</script>

<template>
  <Head :title="trans('Change Password')" />

  <h2 class="main-title">{{ trans('Change Password') }}</h2>

  <div class="card-box border-20 bg-white">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-12">
          <div class="dash-input-wrapper mb-20">
            <label for=""> {{ trans('Old Password') }} *</label>
            <input type="password" v-model="form.current_password" />
            <InputFieldError :message="form.errors.current_password" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-12">
          <div class="dash-input-wrapper mb-20">
            <label for=""> {{ trans('New Password') }} *</label>
            <input type="password" v-model="form.new_password" />
            <InputFieldError :message="form.errors.new_password" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-12">
          <div class="dash-input-wrapper mb-20">
            <label for="">{{ trans('Confirm Password') }} *</label>
            <input type="password" v-model="form.new_password_confirmation" />
            <InputFieldError :message="form.errors.new_password_confirmation" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <SpinnerBtn :processing="form.processing" :btn-text="trans('Change Password')" />
        <Link :href="route('employer.dashboard')" class="dash-cancel-btn tran3s ms-2">
          {{ trans('Cancel') }}
        </Link>
      </div>
    </form>
  </div>
</template>
