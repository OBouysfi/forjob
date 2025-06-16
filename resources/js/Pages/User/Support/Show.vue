<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import notify from '@/Plugins/Admin/notify'
defineOptions({ layout: UserLayout })

const props = defineProps(['support'])

const form = useForm({
  message: ''
})

const submit = () => {
  form.patch(route('user.support.update', props.support.id), {
    onSuccess: () => {
      form.reset()
      notify.success('Submitted Successfully')
    }
  })
}
</script>

<template>
  <Head :title="trans('Messages')" />
  <h2 class="main-title m0 pb-40">{{ trans('Subject') }} : {{ support.subject }}</h2>
  <div class="row justify-content-center message-wrapper">
    <div class="col-lg-8 rounded bg-white p-4">
      <div class="open-email-container">
        <!-- /.email-header -->
        <div class="max-h-22-r pt-5">
          <template v-for="reply in support.conversations" :key="reply.id">
            <div class="email-body divider">
              <div class="ps-xxl-5 pe-xxl-5 d-flex align-items-center pe-4 ps-4">
                <img
                  v-if="reply.is_admin == 1"
                  width="20"
                  height="20"
                  src="/assets/dashboard/images/icon/icon_41.svg"
                  alt="avatar"
                />
                <p
                  class="w-100 mt-3 pe-2 ps-2"
                  :class="reply.is_admin == 0 ? 'text-success text-end' : 'text-start'"
                >
                  {{ reply.comment }}
                </p>
                <img
                  v-if="reply.is_admin == 0"
                  width="20"
                  height="20"
                  src="/assets/dashboard/images/icon/icon_2.svg"
                  alt="avatar"
                />
              </div>
            </div>
          </template>
        </div>

        <!-- /.email-body -->

        <div class="email-footer">
          <div class="ps-xxl-5 pe-xxl-5 pe-4 ps-4">
            <div v-if="support.status !== 1">{{ trans("You can't not send reply") }}</div>
            <div v-else class="compose-new-email-container">
              <div class="compose-body">
                <textarea v-model="form.message" placeholder="Write message..."> </textarea>
                <InputFieldError :message="form.errors.message" />
              </div>

              <div class="compose-email-footer d-flex justify-content-between position-relative">
                <div class="d-flex align-items-center">
                  <button type="button" @click="form.message = ''" class="delete-mail me-3">
                    <img src="/assets/dashboard/images/icon/icon_35.svg" alt="" class="lazy-img" />
                  </button>
                  <button @click.prevent="submit" class="reply-btn tran3s">
                    {{ trans('Reply') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
