<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import InputFieldError from '@/Components/InputFieldError.vue'
import EmployerLayout from '@/Layouts/Employer.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: EmployerLayout })

const props = defineProps(['user'])

const form = useForm({
  name: props.user.name,
  phone: props.user.phone,
  email: props.user.email,
  current_password: ''
})

const submit = () => {
  form.put(route('employer.account-settings.update'), {
    onSuccess: () => {
      notify.success('Account settings has been updated successfully')
      form.reset('current_password')
    }
  })
}
</script>

<template>
  <Head :title="trans('Account Settings')" />

  <h2 class="main-title">{{ trans('Account Settings') }}</h2>

  <div class="bg-white card-box border-20">
    <h4 class="dash-title-three">{{ trans('Edit & Update') }}</h4>
    <form @submit.prevent="submit" method="post">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans('Full Name') }}</label>
            <input type="text" v-model="form.name" placeholder="John" />
            <InputFieldError :message="form.errors.name" />
          </div>
        </div>
        <div class="col-lg-12" v-if="!user.provider_id">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans('Email') }}</label>
            <input type="email" v-model="form.email" placeholder="zubayerhasan@gmal.com" />
            <InputFieldError :message="form.errors.email" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-lg-12">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans('Phone Number') }}</label>
            <input type="tel" v-model="form.phone" placeholder="+810 989 989 989" />
            <InputFieldError :message="form.errors.phone" />
          </div>
        </div>
        <div class="col-lg-12" v-if="!user.provider_id">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans('Current Password') }}</label>
            <input type="password" v-model="form.current_password" />

            <InputFieldError :message="form.errors.current_password" />

              <p class="m0">
                {{ trans('Want to change the password?') }}
                <Link :href="route('employer.change-password')" class="fw-500">
                  {{ trans('Click here') }}</Link
                >
              </p>
          </div>
        </div>
      </div>

      <div class="gap-4 button-group d-inline-flex align-items-center mt-30">
        <SpinnerBtn :processing="form.processing" :btn-text="trans('Save Changes')" />
        <Link :href="route('employer.dashboard')" class="dash-cancel-btn tran3s ms-2">
          {{ trans('Cancel') }}
        </Link>
      </div>
    </form>
  </div>
</template>
