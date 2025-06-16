<script setup>
import { useForm } from '@inertiajs/vue3'
import InputFieldError from '@/Components/InputFieldError.vue'
import trans from '@/Composables/transComposable'
import DefaultLayout from '@/Layouts/Default.vue'
import { onMounted } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import FlashErrors from '@/Components/FlashErrors.vue'

defineOptions({ layout: DefaultLayout })
const props = defineProps(['seo', 'googleClient', 'facebookClient'])

const form = useForm({
  email: '',
  password: '',
  remember: 0
})

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password')
  })
}

onMounted(() => {
  $('.passVicon').on('click', function () {
    $('.passVicon').toggleClass('eye-slash')
    var input = $('.pass_log_id')
    if (input.attr('type') === 'password') {
      input.attr('type', 'text')
    } else {
      input.attr('type', 'password')
    }
  })
})
</script>

<template>
  <Seo />
  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>
  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container">
      <div class="user-data-form">
        <div class="text-center">
          <h2>{{ trans('Hi, Welcome Back!') }}</h2>
          <p>
            {{ trans("Still don't have an account?") }}
            <Link href="/register">{{ trans('Sign up') }}</Link>
          </p>
        </div>

        <div class="m-auto form-wrapper">
          <form @submit.prevent="submit">
            <div class="mb-2">
              <div class="mb-3 input-group-meta position-relative">
                <label>{{ trans('Email') }} *</label>
                <input
                  v-model="form.email"
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
            <div class="my-4">
              <div class="agreement-checkbox d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" name="remember" id="remember" />
                  <label for="remember">{{ trans('Keep me logged in') }}</label>
                </div>
                <Link :href="route('password.request')">{{ trans('Forget Password?') }}</Link>
              </div>
              <!-- /.agreement-checkbox -->
            </div>
            <div class="mb-2">
              <SpinnerBtn
                classes="btn-eleven fw-500 d-flex align-items-center justify-content-center"
                :processing="form.processing"
                btn-text="Login"
              />
            </div>
            <div class="row">
              <div class="col-sm-6">
                <a
                  v-if="googleClient"
                  href="/auth/google"
                  class="mt-10 social-use-btn d-flex align-items-center justify-content-center tran3s w-100"
                >
                  <img v-lazy="'/assets/images/icon/google.png'" alt="image" />
                  <span class="ps-2">{{ trans('Signup with Google') }}</span>
                </a>
              </div>
              <div class="col-sm-6">
                <a
                  href="/auth/facebook"
                  v-if="facebookClient"
                  class="mt-10 social-use-btn d-flex align-items-center justify-content-center tran3s w-100"
                >
                  <img v-lazy="'/assets/images/icon/facebook.png'" alt="image" />
                  <span class="ps-2">{{ trans('Signup with Facebook') }}</span>
                </a>
              </div>
            </div>
          </form>
        </div>
        <!-- /.form-wrapper -->
        <p class="mt-10 text-center">
          {{ trans("Don't have an account?") }}
          <Link :href="route('register')" class="fw-500">{{ trans('Sign Up') }}</Link>
        </p>
      </div>
      <!-- /.user-data-form -->
    </div>
  </section>
</template>
