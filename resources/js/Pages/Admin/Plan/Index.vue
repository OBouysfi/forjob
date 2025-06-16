<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Subscriptions')" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div v-if="plans.length != 0" class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div class="card" v-for="plan in plans" :key="plan.id">
          <div class="flex flex-col justify-between h-full card-body">
            <div>
              <div class="text-center">
                <h5>{{ plan.title }}</h5>
                <h4>{{ plan.price_format }}</h4>
                {{ plan.days == 30 ? trans('Per month') : trans('Per year') }}

                <p class="text-muted">{{ trans('Active Users') }} ({{ plan.activeuser_count }})</p>
              </div>
              <hr class="mt-3 opacity-60" />

              <div class="mt-3 text-left" v-for="(planData, key) in plan.data" :key="planData.key">
                <i
                  v-if="planData.toString == 'true' || planData == 'false'"
                  :class="
                    planData == true
                      ? 'far fa-check-circle text-green-600'
                      : 'fas fa-times-circle text-red-600'
                  "
                ></i>

                <i class="text-green-600 far fa-check-circle" v-else></i>
                {{ key.replace(/_/g, ' ') }}
                {{
                  planData == '-1'
                    ? '(Unlimited)'
                    : planData == 'true' || planData == 'false'
                    ? ''
                    : `(${planData})`
                }}
              </div>
            </div>

            <div class="mt-4">
              <hr class="opacity-60" />

              <div class="flex justify-center gap-2 mt-4">
                <Link :href="route('admin.plan.edit', plan.id)" class="px-5 btn btn-primary"
                  ><i class="fa fa-edit" aria-hidden="true"></i> Edit
                </Link>

                <button
                  @click="
                    plan.activeuser_count == 0 ? deleteRow('/admin/plan/' + plan.id) : toastError()
                  "
                  class="px-5 text-left btn btn-sm btn-danger delete-confirm"
                  data-icon="fa fa-plus-circle"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                  {{ trans('Delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert v-else type="info" :text="trans('Opps you have not created any plan....')" />
    </div>
  </main>

  <div id="addNewPlanDrawer" class="drawer drawer-right">
    <form method="POST" @submit.prevent="storePlan">
      <div class="drawer-header">
        <h5>{{ trans('Add New Plan') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="pt-0 drawer-body">
        <div class="mb-2">
          <label class="">{{ trans('Plan Name') }}</label>
          <div class="">
            <input type="text" name="title" required="" class="input" v-model="form.title" />
          </div>
        </div>
        <div class="mb-2">
          <label class="">{{ trans('Select Duration') }}</label>
          <div class="">
            <select class="select" name="days" v-model="form.days">
              <option value="30">{{ trans('Monthly') }}</option>
              <option value="365">{{ trans('yearly') }}</option>
            </select>
          </div>
        </div>
        <div class="mb-2">
          <label class="">{{ trans('Price') }}</label>
          <div class="">
            <input
              type="number"
              name="price"
              v-model="form.price"
              step="any"
              required=""
              class="input"
            />
          </div>
        </div>

        <div class="mb-2">
          <label class="">{{ trans('Job Limit') }}</label>
          <div class="">
            <input type="number" v-model="form.plan_data['job_limit']" required class="input" />
          </div>
        </div>
        <div class="mb-2">
          <label class="">{{ trans('Featured Jobs Limit') }}</label>
          <div class="">
            <input type="number" v-model="form.plan_data['featured_jobs']" required class="input" />
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
            <input type="number" v-model="form.plan_data['ai_credits']" required class="input" />
          </div>
        </div>

        <div class="mb-2">
          <label for="toggle-featured" class="toggle toggle-sm">
            <input
              v-model="form.is_featured"
              class="sr-only toggle-input peer"
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
              class="sr-only toggle-input peer"
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
              class="sr-only toggle-input peer"
              id="toggle-is_trial"
              type="checkbox"
            />
            <div class="toggle-body"></div>
            <span class="label label-md">{{ trans('Accept Trial?') }}</span>
          </label>
        </div>
        <div class="mt-2 mb-2 from-group trial-days" v-if="form.is_trial">
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
              class="sr-only toggle-input peer"
              id="toggle-status"
              type="checkbox"
            />
            <div class="toggle-body"></div>
            <span class="label label-md">{{ trans('Activate This Plan?') }}</span>
          </label>
        </div>
      </div>

      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans("Close") }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary w-full"
            :processing="form.processing"
            :btn-text="trans('Save Plan')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import Alert from '@/Components/Admin/Alert.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import { onMounted } from 'vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import drawer from '@/Plugins/Admin/drawer'

import sharedComposable from '@/Composables/sharedComposable'

defineOptions({ layout: AdminLayout })
onMounted(() => {
  drawer.init()
})

const props = defineProps(['segments', 'buttons', 'plans'])
const { deleteRow } = sharedComposable()
const form = useForm({
  title: null,
  days: 30,
  price: null,
  plan_data: {
    job_limit: 0,
    featured_jobs: 0,
    live_job_for_days: 0,
    ai_credits: 0
  },
  is_featured: false,
  is_recommended: false,
  is_trial: false,
  status: true,
  trial_days: 0
})
function toastError() {
  notify.danger('You cant delete this plan because someone already using this plan')
}
const storePlan = () => {
  form.post('/admin/plan', {
    onSuccess: () => {
      form.reset()
      notify.success('Plan has been added successfully')
      drawer.of('#addNewPlanDrawer').hide()
    }
  })
}
</script>
