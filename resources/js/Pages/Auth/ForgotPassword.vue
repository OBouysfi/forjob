<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import DefaultLayout from '@/Layouts/Default.vue'
defineOptions({ layout: DefaultLayout })

defineProps({
  status: {
    type: String
  }
})

const form = useForm({
  email: ''
})

const submit = () => {
  form.post(route('password.email'))
}
</script>

<template>
  <Head title="Forgot Password" />
  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>
  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container mt-40">
      <div class="user-data-form">
        <div class="form-wrapper m-auto">
          <div class="text-secondary small mb-4">
            {{
              trans(
                'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.'
              )
            }}
          </div>

          <div v-if="status" class="small text-success mb-4">
            {{ status }}
          </div>

          <form @submit.prevent="submit">
            <div class="input-group-meta mb-4">
              <label for="email">{{ trans('Email') }}</label>
              <input
                type="email"
                v-model="form.email"
                required
                autofocus
                autocomplete="email"
                :placeholder="trans('enter your email here')"
              />
              <InputFieldError :message="form.errors.email" />
            </div>

            <div class="mt-2" v-if="!status">
              <SpinnerBtn
                classes="btn-eleven fw-500 d-flex align-items-center justify-content-center"
                :processing="form.processing"
                btn-text="Email Password Reset Link"
              />
            </div>
          </form>

          <p class="mt-10 text-center">
            {{ trans('Have an account?') }}
            <Link :href="route('login')" class="fw-500">{{ trans('Sign In') }}</Link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
