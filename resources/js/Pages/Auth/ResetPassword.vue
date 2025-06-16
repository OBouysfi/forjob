<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: DefaultLayout })

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: ''
})

const submit = () => {
  form.post(route('password.store'), {
    onFinish: () => form.reset('password', 'password_confirmation')
  })
}
</script>

<template>
  <Head title="Reset Password" />

  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>

  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container">
      <div class="user-data-form">
        <div class="text-center">
          <h2>{{ trans('Reset Password') }}</h2>
        </div>
        <div class="form-wrapper m-auto">
          <form @submit.prevent="submit">
            <div class="mb-2">
              <div class="input-group-meta position-relative mb-3">
                <label>{{ trans('Email') }} *</label>
                <input
                  v-model="form.email"
                  required
                  autofocus
                  type="email"
                  :placeholder="trans('Enter email address')"
                />
                <InputFieldError :message="form.errors.email" />
              </div>
            </div>
            <div class="mb-2">
              <div class="input-group-meta position-relative">
                <label>{{ trans('Password') }} *</label>
                <input
                  type="password"
                  v-model="form.password"
                  required
                  autocomplete="new-password"
                  :placeholder="trans('Enter Password')"
                  class="pass_log_id"
                />
                <span class="placeholder_icon">
                  <span class="passVicon">
                    <img src="/assets/images/icon/icon_60.svg" alt="icon" />
                  </span>
                </span>
              </div>
              <InputFieldError :message="form.errors.password" />
            </div>
            <div class="mb-2">
              <div class="input-group-meta position-relative">
                <label>{{ trans('Confirm Password') }} *</label>
                <input
                  type="password"
                  v-model="form.password_confirmation"
                  required
                  autocomplete="new-password"
                  :placeholder="trans('Confirm Password')"
                  class="pass_log_id"
                />
                <span class="placeholder_icon">
                  <span class="passVicon">
                    <img src="/assets/images/icon/icon_60.svg" alt="icon" />
                  </span>
                </span>
              </div>
              <InputFieldError :message="form.errors.password_confirmation" />
            </div>

            <div class="mb-2">
              <SpinnerBtn
                classes="btn-eleven fw-500 d-flex align-items-center justify-content-center"
                :processing="form.processing"
                btn-text="Reset Password"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
