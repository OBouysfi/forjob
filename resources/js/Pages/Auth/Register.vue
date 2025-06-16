<script setup>
import { useForm } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import InputFieldError from '@/Components/InputFieldError.vue'
import { onMounted } from 'vue'
import DefaultLayout from '@/Layouts/Default.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineProps(['seo', 'googleClient', 'facebookClient'])

defineOptions({ layout: DefaultLayout })
const form = useForm({
  plan_id: null,
  role: 'user',
  name: '',
  email: '',
  password: '',
  terms: false
})

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('id')) {
    form.plan_id = searchParams.get('id')
    form.role = 'employer'
  }

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
const setRole = (role) => {
  form.role = role
}

const submit = () => {
  form.post(route('register'), {
    onFinish: () => form.reset('password')
  })
}
</script>

<template>
  <Seo :metaData="seo" />
  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>

  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container">
      <div class="user-data-form">
        <div class="text-center">
          <h2>{{ trans('Create Account') }}</h2>
        </div>
        <div class="m-auto form-wrapper">
          <ul v-if="!form.plan_id" class="border-0 nav nav-tabs w-100 mt-30" role="tablist">
            <li class="nav-item">
              <button
                @click="setRole('user')"
                :class="{ active: form.role == 'user' }"
                class="nav-link"
              >
                {{ trans('Candidates') }}
              </button>
            </li>
            <li class="nav-item">
              <button
                @click="setRole('employer')"
                :class="{ active: form.role == 'employer' }"
                class="nav-link"
              >
                {{ trans('Employer') }}
              </button>
            </li>
          </ul>
          <div class="mt-40 tab-content">
            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-12">
                  <div class="input-group-meta position-relative mb-25">
                    <label>{{ trans('Full Name') }} *</label>
                    <input v-model="form.name" type="text" placeholder="Enter full name" />
                    <InputFieldError :message="form.errors.name" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group-meta position-relative mb-25">
                    <label> {{ trans('Email') }} *</label>
                    <input v-model="form.email" type="email" placeholder="Enter email address" />
                    <InputFieldError :message="form.errors.email" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-20 input-group-meta position-relative">
                    <label> {{ trans('Password') }} *</label>
                    <input
                      v-model="form.password"
                      type="password"
                      placeholder="Enter 8-16 digit password"
                      class="pass_log_id"
                    />
                    <span class="placeholder_icon">
                      <span class="passVicon">
                        <img src="/assets/images/icon/icon_60.svg" alt="icon" />
                      </span>
                    </span>
                    <InputFieldError :message="form.errors.password" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="agreement-checkbox d-flex justify-content-between align-items-center">
                    <div>
                      <input v-model="form.terms" type="checkbox" id="remember" />
                      <label for="remember">
                        {{ trans('By hitting the "Register" button, you agree to the') }}
                        <Link href="/page/terms-and-conditions">{{
                          trans('Terms conditions')
                        }}</Link>
                        &amp;
                        <Link href="/page/privacy-policy">{{ trans('Privacy policy') }}</Link>
                      </label>
                    </div>
                  </div>
                  <InputFieldError :message="form.errors.terms" />
                  <!-- /.agreement-checkbox -->
                </div>
                <div class="mt-3 col-12">
                  <SpinnerBtn
                    classes="btn-eleven fw-500 d-flex align-items-center justify-content-center"
                    :processing="form.processing"
                    btn-text="Register"
                  />
                </div>
              </div>
            </form>
          </div>

          <div class="mb-10 d-flex align-items-center mt-30">
            <div class="line"></div>
            <span class="pe-3 ps-3">{{ trans('OR') }}</span>
            <div class="line"></div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <a
                v-if="googleClient"
                :href="`/auth/google?r=${form.role}`"
                class="mt-10 social-use-btn d-flex align-items-center justify-content-center tran3s w-100"
              >
                <img v-lazy="'/assets/images/icon/google.png'" alt="icon" />
                <span class="ps-2">{{ trans('Signup with Google') }}</span>
              </a>
            </div>
            <div class="col-sm-6">
              <a
                :href="`/auth/facebook?r=${form.role}`"
                v-if="facebookClient"
                class="mt-10 social-use-btn d-flex align-items-center justify-content-center tran3s w-100"
              >
                <img v-lazy="'/assets/images/icon/facebook.png'" alt="icon" />
                <span class="ps-2">{{ trans('Signup with Facebook') }}</span>
              </a>
            </div>
          </div>

          <p class="mt-10 text-center">
            {{ trans('have an account?') }}
            <Link :href="route('login')" class="fw-500">{{ trans('Sign In') }}</Link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
