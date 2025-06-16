<script setup>
import { computed } from 'vue'
import { Head, useForm } from '@inertiajs/vue3'

import DefaultLayout from '@/Layouts/Default.vue'
import Loading from '@/Components/Loading.vue'
defineOptions({ layout: DefaultLayout })

const props = defineProps({
  status: {
    type: String
  }
})

const form = useForm({})

const submit = () => {
  form.post(route('verification.send'))
}
const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>

<template>
  <Head title="Email Verification" />

  <div
    class="position-relative p-70px"
    :class="{ 'inner-banner-one': ($page.props.theme ?? 'Two') == 'One' }"
  ></div>

  <section class="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
    <div class="container">
      <div class="user-data-form">
        <div class="text-center">
          <h2>{{ trans('Email verification') }}</h2>
          <p>
            {{
              trans(
                `Thanks for signing up! Before getting started, could you verify your email address by clicking
                on the link we just emailed to you? If you didn't receive the email, we will gladly send you
                another.`
              )
            }}
          </p>
        </div>
        <div class="text-success mb-4 text-center" v-if="verificationLinkSent">
          {{
            trans(`A new verification link has been sent to the email address you provided during
                registration.`)
          }}
        </div>
        <div class="form-wrapper m-auto">
          <form @submit.prevent="submit" v-if="!verificationLinkSent">
            <div class="mb-2">
              <button
                type="submit"
                class="btn-eleven fw-500 tran3s d-flex justify-content-center align-items-center"
              >
                <Loading v-if="form.processing" />
                <span v-if="!form.processing">{{ trans('Resend Verification Email') }}</span>
              </button>
            </div>
          </form>
          <div class="d-flex justify-content-center mt-4">
            <Link class="fw-500 text-danger" :href="route('logout')" method="post" as="button">
              {{ trans('Logout') }}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
