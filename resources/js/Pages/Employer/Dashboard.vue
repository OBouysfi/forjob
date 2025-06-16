<script setup>
import { Head, router } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import EmployerLayout from '@/Layouts/Employer.vue'
import trans from '@/Composables/transComposable'
import notify from '@/Plugins/Admin/notify'
import VueApexCharts from 'vue3-apexcharts'
import { reactive, computed } from 'vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { ref } from 'vue'
import moment from 'moment'

defineOptions({ layout: EmployerLayout })
const props = defineProps([
  'job_posted',
  'shortlisted',
  'applications',
  'saved_candidate',
  'posted_jobs',
  'KYC_MUST_VERIFIED',
  'activeChartFilterBtn',
  'visits',
  'selected_job',
  'user'
])

const { authUser, pickBy } = sharedComposable()
const authUserIdVerified = props.KYC_MUST_VERIFIED ? authUser.value.kyc_verified_at != null : true
const selectedJob = ref(props.selected_job ?? '')

const jobJobVisits = () => {
  if (selectedJob.value) {
    router.get(location.href, pickBy({ selected_job: selectedJob.value }), {
      preserveScroll: true,
      preserveState: true
    })
  }
}

const deleteJob = (id) => {
  form.delete(route('employer.jobs.destroy', id), {
    onSuccess: () => {
      notify.success(trans('Job has been deleted successfully'))
    },
    onError: () => {
      notify.danger(trans("You can' delete this job"))
    }
  })
}

const chartFilterBtns = ['day', 'week', 'month', 'year']

const chart = computed(() => {
  return {
    series: [
      {
        name: 'views',
        data: props.visits.map((item) => item.views)
      }
    ],
    chartOptions: {
      colors: ['#69ae84', '#69ae84', '#69ae84'],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      yaxis: {
        show: false,
        opposite: true,
        labels: {
          formatter: function (val) {
            return val.toFixed(0)
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'string',
        categories: props.visits.map((item) => item.date)
      }
    }
  }
})

const isNearExpiry = computed(() => {
  if (props.user.will_expire) {
    const userWillExpireDate = moment(props.user.will_expire)
    const daysDifference = userWillExpireDate.diff(moment(), 'days')
    return daysDifference < 7
  }
  return false
})
const hasExpired = computed(() => {
  if (props.user.will_expire) {
    const userWillExpireDate = moment(props.user.will_expire)
    return userWillExpireDate.isBefore(moment())
  }
  return false
})
</script>

<template>
  <Head title="Dashboard | Employer Panel" />

  <h2 class="main-title">{{ trans('Dashboard') }}</h2>

  <div v-if="authUserIdVerified">
    <div class="row">
      <div class="col-lg-3 col-6">
        <div class="dash-card-one border-30 position-relative mb-15 bg-white">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
            >
              <img src="/assets/dashboard/images/icon/icon_12.svg" alt="" class="lazy-img" />
            </div>
            <div class="order-sm-0">
              <div class="value fw-500">{{ props.job_posted }}</div>
              <span>{{ trans('Posted Job') }}</span>
            </div>
          </div>
        </div>
        <!-- /.dash-card-one -->
      </div>
      <div class="col-lg-3 col-6">
        <div class="dash-card-one border-30 position-relative mb-15 bg-white">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
            >
              <img src="/assets/dashboard/images/icon/icon_13.svg" alt="" class="lazy-img" />
            </div>
            <div class="order-sm-0">
              <div class="value fw-500">{{ props.shortlisted }}</div>
              <span>{{ trans('Shortlisted') }}</span>
            </div>
          </div>
        </div>
        <!-- /.dash-card-one -->
      </div>
      <div class="col-lg-3 col-6">
        <div class="dash-card-one border-30 position-relative mb-15 bg-white">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
            >
              <img src="/assets/dashboard/images/icon/icon_14.svg" class="lazy-img" />
            </div>
            <div class="order-sm-0">
              <div class="value fw-500">{{ props.applications }}</div>
              <span>{{ trans('Application') }}</span>
            </div>
          </div>
        </div>
        <!-- /.dash-card-one -->
      </div>
      <div class="col-lg-3 col-6">
        <div class="dash-card-one border-30 position-relative mb-15 bg-white">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
            >
              <img src="/assets/dashboard/images/icon/icon_15.svg" alt="img" class="lazy-img" />
            </div>
            <div class="order-sm-0">
              <div class="value fw-500">{{ props.saved_candidate }}</div>
              <span>{{ trans('Save Candidate') }}</span>
            </div>
          </div>
        </div>
        <!-- /.dash-card-one -->
      </div>
    </div>

    <div class="mt-20">
      <!-- alert messages -->
      <Link
        :href="route('employer.membership.index')"
        class="alert alert-danger border-20 d-block pb-0"
        v-if="!user.will_expire || !user.plan || !user.plan_id"
      >
        <p>{{ trans("You haven't purchased any subscription plans yet.") }}</p>
      </Link>
      <a
        :href="route('employer.membership.payment', user.plan_id)"
        class="alert alert-danger border-20 d-block pb-0"
        v-if="hasExpired"
      >
        <p>{{ trans('Your subscription has already expired') }}</p>
      </a>
      <Link
        :href="route('employer.membership.index')"
        class="alert alert-warning border-20 d-block pb-0"
        v-else-if="isNearExpiry"
      >
        <p>
          {{ trans('Your current subscription plan is about to expire in less than 7 days') }}
        </p>
      </Link>
      <!-- end alert messages -->
    </div>

    <div class="row d-flex lg-pt-10 pt-5">
      <div class="col-xl-7 col-lg-6 d-flex flex-column">
        <div class="user-activity-chart border-20 mt-30 h-100 bg-white">
          <h4 class="dash-title-two">{{ trans('Job Views') }}</h4>
          <div v-if="posted_jobs.length" class="d-sm-flex align-items-center job-list">
            <div class="fw-500 pe-3">{{ trans('Jobs') }}:</div>
            <div class="flex-fill xs-mt-10">
              <NiceSelect
                v-model="selectedJob"
                :options="posted_jobs"
                label="title"
                value-by="slug"
                placeholder="Select Job"
                @change="jobJobVisits"
              />
            </div>
          </div>
          <div class="mt-20 pe-5 ps-5">
            <div class="d-flex justify-content-around chart-filter-area mb-4">
              <Link
                v-for="btn in chartFilterBtns"
                :key="btn"
                :href="
                  route(
                    'employer.dashboard',
                    pickBy({
                      chart_filter_by: btn,
                      selected_job: selectedJob
                    })
                  )
                "
                :class="{ active: btn == activeChartFilterBtn }"
                class="text-capitalize"
                preserve-scroll
                preserve-state
              >
                {{ btn }}
              </Link>
            </div>
            <div id="chart">
              <VueApexCharts
                type="area"
                height="350"
                :options="chart.chartOptions"
                :series="chart.series"
              >
              </VueApexCharts>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-5 col-lg-6 d-flex">
        <div class="recent-job-tab border-20 mt-30 w-100 bg-white">
          <h4 class="dash-title-two">{{ trans('Posted Job') }}</h4>
          <div class="wrapper">
            <template v-if="props.posted_jobs">
              <div
                v-for="(item, index) in props.posted_jobs"
                :key="index"
                class="job-item-list d-flex align-items-center"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="45"
                    height="45"
                    x="0"
                    y="0"
                    viewBox="0 0 134 134"
                    style="enable-background: new 0 0 512 512"
                    xml:space="preserve"
                    class=""
                  >
                    <g>
                      <path
                        fill="#e5e8ec"
                        d="m130.11 35.32-37.84 74.87c-.91 1.8-3.1 2.52-4.89 1.61L32.65 84.15c-1.8-.91-2.52-3.1-1.61-4.89l31.32-61.98 24.31-7.99 41.83 21.14c1.79.9 2.51 3.1 1.61 4.89z"
                        opacity="1"
                        data-original="#e5e8ec"
                        class=""
                      ></path>
                      <path
                        fill="#ced2d6"
                        d="m86.67 9.29-6.52 12.9c-.91 1.8-3.1 2.52-4.89 1.61l-12.9-6.52z"
                        opacity="1"
                        data-original="#ced2d6"
                      ></path>
                      <path
                        d="M89.02 112.7c-.64 0-1.28-.15-1.86-.45L32.43 84.59a4.151 4.151 0 0 1-1.83-5.57l31.32-61.98a.48.48 0 0 1 .29-.25L86.52 8.8a.5.5 0 0 1 .38.03l41.83 21.14c.99.5 1.72 1.35 2.07 2.4s.26 2.17-.24 3.16L92.73 110.4c-.5.99-1.35 1.72-2.4 2.07-.44.15-.88.23-1.31.23zm-26.3-95.01L31.49 79.48a3.142 3.142 0 0 0 1.39 4.22l54.73 27.65c.75.38 1.6.44 2.4.18s1.45-.82 1.82-1.57l37.83-74.87c.38-.75.44-1.6.18-2.4s-.82-1.45-1.57-1.82L86.63 9.83z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        d="M76.9 24.69c-.64 0-1.28-.15-1.86-.45l-12.9-6.52c-.18-.09-.29-.28-.27-.48s.15-.37.34-.44l24.31-7.99c.19-.06.4 0 .54.15.13.15.16.37.07.55l-6.52 12.9c-.5.99-1.35 1.72-2.4 2.07-.44.14-.88.21-1.31.21zm-13.24-7.32 11.82 5.97c.75.38 1.6.44 2.4.18s1.45-.82 1.82-1.57l5.97-11.82zM110.73 56.26c-.08 0-.15-.02-.23-.05L63.69 32.55a.49.49 0 0 1-.22-.67c.13-.25.43-.34.67-.22l46.82 23.66c.25.12.35.43.22.67-.09.17-.27.27-.45.27zM106.47 64.69c-.08 0-.15-.02-.23-.05L59.43 40.97a.49.49 0 0 1-.22-.67.5.5 0 0 1 .67-.22l46.82 23.66c.25.12.35.43.22.67-.09.18-.26.28-.45.28zM102.22 73.11c-.08 0-.15-.02-.23-.05L55.18 49.4a.49.49 0 0 1-.22-.67.5.5 0 0 1 .67-.22l46.82 23.66c.25.12.35.43.22.67-.09.17-.27.27-.45.27zM97.96 81.53c-.08 0-.15-.02-.23-.05L50.92 57.82a.49.49 0 0 1-.22-.67c.13-.25.43-.34.67-.22l46.82 23.66c.25.12.35.43.22.67-.09.17-.26.27-.45.27zM93.71 89.95c-.08 0-.15-.02-.23-.05L46.66 66.24a.49.49 0 0 1-.22-.67.49.49 0 0 1 .67-.22l46.82 23.66c.25.12.35.43.22.67-.08.17-.26.27-.44.27zM89.45 98.38c-.08 0-.15-.02-.23-.05L42.41 74.66a.49.49 0 0 1-.22-.67.49.49 0 0 1 .67-.22l46.82 23.66c.25.12.35.43.22.67-.09.18-.27.28-.45.28z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#297d59"
                        d="M94.27 69.82v47.61c0 4.02-3.26 7.29-7.29 7.29H12.56c-4.02 0-7.29-3.26-7.29-7.29V69.82z"
                        opacity="1"
                        data-original="#46cead"
                        class=""
                      ></path>
                      <path
                        fill="#3dbf9d"
                        d="M94.27 69.82v17.2a15.78 15.78 0 0 1-11.64 5.1H16.91c-4.55 0-8.73-1.94-11.64-5.11V69.82z"
                        opacity="1"
                        data-original="#3dbf9d"
                        class=""
                      ></path>
                      <path
                        fill="#fecd57"
                        d="M80.58 83.2v21.87a8.52 8.52 0 0 1-8.52 8.52H27.49a8.52 8.52 0 0 1-8.52-8.52V83.2z"
                        opacity="1"
                        data-original="#fecd57"
                        class=""
                      ></path>
                      <path
                        fill="#edbb4a"
                        d="M18.97 83.2h61.61v8.92H18.97z"
                        opacity="1"
                        data-original="#edbb4a"
                      ></path>
                      <path
                        d="M72.05 114.09H27.49c-4.97 0-9.02-4.05-9.02-9.02V83.2c0-.28.22-.5.5-.5h61.61c.28 0 .5.22.5.5v21.87c-.01 4.97-4.05 9.02-9.03 9.02zM19.47 83.7v21.37c0 4.42 3.6 8.02 8.02 8.02h44.56c4.42 0 8.02-3.6 8.02-8.02V83.7z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        d="M86.99 125.21H12.56c-4.29 0-7.79-3.49-7.79-7.79v-47.6c0-.28.22-.5.5-.5h89c.28 0 .5.22.5.5v47.61c0 4.29-3.49 7.78-7.78 7.78zM5.77 70.32v47.11c0 3.74 3.04 6.79 6.79 6.79h74.43c3.74 0 6.79-3.04 6.79-6.79V70.32z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#297d59"
                        d="m95.97 64.61-2.42 11.87A14.328 14.328 0 0 1 79.5 87.95H20.04c-6.81 0-12.69-4.79-14.05-11.47L3.57 64.61a3.64 3.64 0 0 1 3.57-4.37H92.4c2.3 0 4.03 2.11 3.57 4.37z"
                        opacity="1"
                        data-original="#46cead"
                        class=""
                      ></path>
                      <path
                        d="M79.5 88.45H20.04c-7.02 0-13.13-4.99-14.54-11.87L3.08 64.71c-.25-1.22.06-2.48.85-3.45s1.96-1.52 3.21-1.52H92.4c1.25 0 2.42.56 3.21 1.52s1.1 2.22.85 3.45l-2.42 11.87c-1.41 6.87-7.52 11.87-14.54 11.87zM7.14 60.74c-.95 0-1.83.42-2.43 1.16-.6.73-.83 1.69-.65 2.62l2.42 11.87c1.31 6.42 7.01 11.07 13.56 11.07H79.5c6.55 0 12.25-4.66 13.56-11.07l2.42-11.87a3.142 3.142 0 0 0-3.08-3.77H7.14z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#434a54"
                        d="M59.26 82.75v10.84c0 1.34-1.09 2.43-2.43 2.43H45.65c-1.34 0-2.43-1.09-2.43-2.43V82.75c0-1.34 1.09-2.43 2.43-2.43h11.18c1.35 0 2.43 1.09 2.43 2.43z"
                        opacity="1"
                        data-original="#434a54"
                        class=""
                      ></path>
                      <path
                        d="M56.84 96.52H45.65c-1.61 0-2.93-1.31-2.93-2.93V82.75c0-1.61 1.31-2.93 2.93-2.93h11.18c1.61 0 2.93 1.31 2.93 2.93v10.84c0 1.61-1.31 2.93-2.92 2.93zm-11.19-15.7c-1.06 0-1.93.87-1.93 1.93v10.84c0 1.06.87 1.93 1.93 1.93h11.18c1.06 0 1.93-.87 1.93-1.93V82.75c0-1.06-.87-1.93-1.93-1.93z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#778493"
                        d="M65.82 56.67h-5.2v-2.78c0-.72-.58-1.3-1.3-1.3H40.23c-.72 0-1.3.58-1.3 1.3v2.78h-5.2v-2.78c0-3.59 2.92-6.51 6.51-6.51h19.09c3.59 0 6.51 2.92 6.51 6.51v2.78z"
                        opacity="1"
                        data-original="#778493"
                      ></path>
                      <path
                        d="M65.82 57.17h-5.2c-.28 0-.5-.22-.5-.5v-2.78c0-.44-.36-.8-.8-.8H40.23c-.44 0-.8.36-.8.8v2.78c0 .28-.22.5-.5.5h-5.2c-.28 0-.5-.22-.5-.5v-2.78c0-3.86 3.14-7.01 7.01-7.01h19.09c3.86 0 7.01 3.14 7.01 7.01v2.78c-.02.27-.24.5-.52.5zm-4.7-1h4.2v-2.28c0-3.31-2.69-6.01-6.01-6.01H40.23c-3.31 0-6.01 2.69-6.01 6.01v2.28h4.2v-2.28c0-.99.81-1.8 1.8-1.8h19.09c.99 0 1.8.81 1.8 1.8v2.28z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#434a54"
                        d="M31.61 56.67h9.43v3.57h-9.43z"
                        opacity="1"
                        data-original="#434a54"
                        class=""
                      ></path>
                      <path
                        d="M41.04 60.74h-9.43c-.28 0-.5-.22-.5-.5v-3.57c0-.28.22-.5.5-.5h9.43c.28 0 .5.22.5.5v3.57c0 .28-.22.5-.5.5zm-8.93-1h8.43v-2.57h-8.43z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                      <path
                        fill="#434a54"
                        d="M58.5 56.67h9.43v3.57H58.5z"
                        opacity="1"
                        data-original="#434a54"
                        class=""
                      ></path>
                      <path
                        d="M67.93 60.74H58.5c-.28 0-.5-.22-.5-.5v-3.57c0-.28.22-.5.5-.5h9.43c.28 0 .5.22.5.5v3.57c0 .28-.23.5-.5.5zm-8.93-1h8.43v-2.57H59z"
                        fill="#000000"
                        opacity="1"
                        data-original="#000000"
                        class=""
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="job-title">
                  <h6 class="mb-5">
                    <Link :href="route('jobs.show', item.slug)">{{ item.title }}</Link>
                  </h6>
                  <div class="meta">
                    <span>{{ item.type }}</span> . <span>{{ item.country?.name }}</span>
                  </div>
                </div>
                <div class="job-action">
                  <button
                    class="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" :href="route('jobs.show', item.slug)">{{
                        trans('View Job')
                      }}</Link>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click="deleteJob(item.id)">{{
                        trans('Delete')
                      }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <p v-else class="text-muted mt-20 text-center">
              {{ trans('No item found') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card-box border-20 bg-white" v-else>
    <div class="alert alert-warning">
      <p>{{ trans('You need to submit you KYC info') }}</p>
      <Link class="btn-two" :href="route('employer.kyc.create')">{{ trans('Verify KYC') }}</Link>
    </div>
  </div>
</template>
