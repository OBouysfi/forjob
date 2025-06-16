<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import { router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout })
const props = defineProps(['buttons', 'segments', 'company', 'plans'])

const form = ref({
  ...props.company,
  _method: 'put'
})

const submit = () => {
  router.post(route('admin.companies.update', props.company.id), form.value, {
    onSuccess: () => notify.success('Information has been updated successfully')
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Edit company" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="grid grid-cols-12">
        <div class="col-span-5">
          <strong>{{ trans('Edit company') }}</strong>
          <p>
            {{ trans('Edit your company details and necessary information from here') }}
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
                  <label class="label mb-2">{{ trans('Will Expire') }}</label>

                  <input v-model="form.will_expire" type="date" name="will_expire" class="input" />
                </div>
                <div class="mb-2">
                  <label class="label mb-2">{{ trans('Subscription Plan') }}</label>
                  <select v-model="form.plan_id" class="select" name="status">
                    <option value="null">
                      {{ trans('Without subscription plan') }}
                    </option>
                    <option :value="plan.id" v-for="plan in plans" :key="plan.id">
                      {{ plan.title }}
                    </option>
                  </select>
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
                  <label for="toggle-kyc-verified-status" class="toggle toggle-sm">
                    <input
                      v-model="form.kyc_verified"
                      class="toggle-input peer sr-only"
                      id="toggle-kyc-verified-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('KYC Verified?') }}</span>
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
