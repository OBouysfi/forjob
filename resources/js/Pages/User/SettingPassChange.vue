<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'

defineOptions({ layout: UserLayout })

const form = useForm({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const submit = () => {
  form.put(route('user.update-password'), {
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

      <div class="button-group d-inline-flex align-items-center">
        <button type="submit" class="dash-btn-two tran3s rounded-3">
          {{ trans('Save Changes') }}
        </button>
      </div>
    </form>
  </div>
</template>
