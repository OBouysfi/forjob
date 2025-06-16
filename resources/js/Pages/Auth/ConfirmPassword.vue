<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: DefaultLayout })

const form = useForm({
  password: ''
})

const submit = () => {
  form.post(route('password.confirm'), {
    onFinish: () => form.reset()
  })
}
</script>

<template>
  <Head title="Confirm Password" />
  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>

  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container">
      <div class="user-data-form">
        <div class="text-center">
          <h2>{{ trans('Confirm Password') }}</h2>
          <p>
            {{
              trans(
                'This is a secure area of the application. Please confirm your password before continuing.'
              )
            }}
          </p>
        </div>
        <div class="form-wrapper m-auto">
          <form @submit.prevent="submit">
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
              <SpinnerBtn
                classes="btn-eleven fw-500 d-flex align-items-center justify-content-center"
                :processing="form.processing"
                btn-text="Confirm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
