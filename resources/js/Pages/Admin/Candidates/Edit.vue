<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import { router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import { reactive } from 'vue'

defineOptions({ layout: AdminLayout })
const props = defineProps(['buttons', 'segments', 'candidate'])

const form = reactive({
  ...props.candidate,
  _method: 'put'
})

const submit = () => {
  router.post(route('admin.candidates.update', props.candidate), form, {
    onSuccess: () => notify.success('Information has been updated successfully')
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Edit candidate" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="grid grid-cols-12">
        <div class="col-span-5">
          <strong>{{ trans('Edit candidate') }}</strong>
          <p>
            {{ trans('Edit your candidate details and necessary information from here') }}
          </p>
        </div>
        <div class="col-span-7">
          <div class="card">
            <form @submit.prevent="submit">
              <div class="card-body">
                <div class="mb-2">
                  <label>{{ trans('Name') }}</label>
                  <input type="text" v-model="form.name" required class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Profile Picture') }}</label>
                  <input
                    @input="(e) => (form.avatar = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    class="input"
                  />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Email') }}</label>
                  <input type="email" v-model="form.email" required class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Phone') }}</label>
                  <input type="text" v-model="form.phone" class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Address') }}</label>
                  <input type="text" v-model="form.address" class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Password') }}</label>
                  <input type="password" v-model="form.password" class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Confirm Password') }}</label>
                  <input type="password" v-model="form.password_confirmation" class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Credits') }}</label>
                  <input type="number" v-model="form.credits" min="0" class="input" />
                </div>
                <div class="mb-2">
                  <label for="toggle-status" class="toggle toggle-sm">
                    <input
                      v-model="form.status"
                      class="toggle-input peer sr-only"
                      id="toggle-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Is Active?') }}</span>
                  </label>
                </div>

                <div class="mb-2">
                  <label for="toggle-email-verified-status" class="toggle toggle-sm">
                    <input
                      v-model="form.email_verified"
                      class="toggle-input peer sr-only"
                      id="toggle-email-verified-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Email Verified?') }}</span>
                  </label>
                </div>

                <div class="mb-2">
                  <label for="toggle-starred-status" class="toggle toggle-sm">
                    <input
                      v-model="form.is_star"
                      class="toggle-input peer sr-only"
                      id="toggle-starred-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Make Star?') }}</span>
                  </label>
                </div>

                <div class="mt-2">
                  <SpinnerBtn
                    type="submit"
                    classes="btn btn-primary"
                    :btn-text="trans('Save Changes')"
                    :processing="form.processing"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
