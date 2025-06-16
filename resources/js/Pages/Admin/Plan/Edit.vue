<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Edit Plan')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="w-100 flex">
        <div class="flex-1">
          <strong>{{ trans('Edit Plan') }}</strong>
          <p>{{ trans('Edit subscription plan for charging from the customer') }}</p>
        </div>
        <div class="flex-1">
          <form @submit.prevent="update()">
            <div class="card">
              <div class="card-body">
                <div class="my-2">
                  <label>{{ trans('Plan Name') }}</label>
                  <input type="text" name="title" required="" class="input" v-model="form.title" />
                </div>
                <div class="my-2">
                  <label>{{ trans('Select Duration') }}</label>
                  <select class="select" name="days" v-model="form.days">
                    <option value="30">{{ trans('Monthly') }}</option>
                    <option value="365">{{ trans('yearly') }}</option>
                  </select>
                </div>
                <div class="my-2">
                  <label>{{ trans('Price') }}</label>
                  <input
                    type="number"
                    name="price"
                    v-model="form.price"
                    step="any"
                    required=""
                    class="input"
                  />
                </div>

                <div class="mb-2">
                  <label class="">{{ trans('Job Limit') }}</label>
                  <div class="">
                    <input
                      type="number"
                      v-model="form.plan_data['job_limit']"
                      required
                      class="input"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="">{{ trans('Featured Jobs') }}</label>
                  <div class="">
                    <input
                      type="number"
                      v-model="form.plan_data['featured_jobs']"
                      required
                      class="input"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="">{{ trans('Live For (Days)') }}</label>
                  <div class="">
                    <input
                      type="number"
                      v-model="form.plan_data['live_job_for_days']"
                      required
                      class="input"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="">{{ trans('Ai Credits') }}</label>
                  <div class="">
                    <input
                      type="number"
                      v-model="form.plan_data['ai_credits']"
                      required
                      class="input"
                    />
                  </div>
                </div>

                <div class="mb-2">
                  <label for="toggle-featured" class="toggle toggle-sm">
                    <input
                      v-model="form.is_featured"
                      class="toggle-input peer sr-only"
                      id="toggle-featured"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Featured in home page?') }}</span>
                  </label>
                </div>
                <div class="mb-2">
                  <label for="toggle-is_recommended" class="toggle toggle-sm">
                    <input
                      v-model="form.is_recommended"
                      class="toggle-input peer sr-only"
                      id="toggle-is_recommended"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Is recommended?') }}</span>
                  </label>
                </div>

                <div class="mb-2">
                  <label for="toggle-is_trial" class="toggle toggle-sm">
                    <input
                      v-model="form.is_trial"
                      class="toggle-input peer sr-only"
                      id="toggle-is_trial"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Accept Trial?') }}</span>
                  </label>
                </div>
                <div class="from-group trial-days mb-2 mt-2" v-if="form.is_trial">
                  <label class="col-lg-12">{{ trans('Trial days') }}</label>
                  <div class="col-lg-12">
                    <input
                      type="number"
                      v-model="form.trial_days"
                      name="trial_days"
                      class="input"
                      required
                    />
                  </div>
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
                    <span class="label label-md">{{ trans('Activate This Plan?') }}</span>
                  </label>
                </div>

                <div class="mt-6">
                  <SpinnerBtn
                    classes="btn btn-primary"
                    :processing="form.processing"
                    btn-text="Update"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AdminLayout from '@/Layouts/Admin.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
export default {
  layout: AdminLayout
}
</script>

<script setup>
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { Head, router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'

const props = defineProps(['segments', 'buttons', 'plan'])

const form = useForm({
  title: props.plan.title,
  days: props.plan.days,
  price: props.plan.price,
  plan_data: props.plan.data,
  is_featured: props.plan.is_featured == 1 ? true : false,
  is_recommended: props.plan.is_recommended == 1 ? true : false,
  is_trial: props.plan.is_trial == 1 ? true : false,
  status: props.plan.status == 1 ? true : false,
  trial_days: props.plan.trial_days
})

function update() {
  form.put('/admin/plan/' + props.plan.id, {
    onSuccess: () => {
      notify.success('Plan has been updated successfully')
    }
  })
}
</script>
