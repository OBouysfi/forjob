<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import EmployerLayout from '@/Layouts/Employer.vue'
import notify from '@/Plugins/Admin/notify'
import { Head, useForm } from '@inertiajs/vue3'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: EmployerLayout })

const form = useForm({
  subject: '',
  message: ''
})

const submit = () => {
  form.post(route('employer.support.store'), {
    onSuccess: () => {
      notify.success('Updated Successfully')
    }
  })
}
</script>

<template>
  <Head :title="trans('Create Ticket')" />

  <h2 class="main-title">{{ trans('Create Ticket') }}</h2>

  <form @submit.prevent="submit">
    <div class="card-box border-20 bg-white">
      <div class="dash-input-wrapper mb-30">
        <label for="">{{ trans('Subject') }}*</label>
        <input type="text" placeholder="Subject" v-model="form.subject" />
        <InputFieldError :message="form.errors.subject" />
      </div>

      <div class="dash-input-wrapper">
        <label for="">{{ trans('Message') }}*</label>
        <textarea
          required
          v-model="form.message"
          class="size-lg"
          placeholder="Write message...."
        ></textarea>
        <InputFieldError :message="form.errors.message" />
      </div>
    </div>
    <div class="button-group d-inline-flex align-items-center mt-30">
      <SpinnerBtn :processing="form.processing" btn-text="Submit" />
    </div>
  </form>
</template>
