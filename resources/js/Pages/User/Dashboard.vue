<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import notify from '@/Plugins/Admin/notify'
import VueApexCharts from 'vue3-apexcharts'
import { computed, reactive } from 'vue'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
const { deleteRow } = sharedComposable()

defineOptions({ layout: UserLayout })

const props = defineProps([
  'sassError',
  'buttons',
  'segments',
  'user',
  'success',
  'total_visitors',
  'total_shortlisted',
  'total_bookmarks',
  'total_applied_jobs',
  'appliedJobs',
  'activeChartFilterBtn',
  'visits'
])

const deleteAppliedJob = (id) => {
  deleteRow(route('user.applied-jobs.destroy', id))
}

const chartFilterBtns = ['day', 'week', 'month', 'year']

const areaChart = computed(() => {
  return {
    series: [
      {
        name: 'views',
        data: props.visits.map((item) => item.views)
      }
    ],

    xaxis: {
      type: 'string',
      categories: props.visits.map((item) => item.date)
    }
  }
})

const chart = reactive({
  series: areaChart.value.series,
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
    xaxis: areaChart.value.xaxis
  }
})
</script>

<template>
  <Head title="Dashboard | Candidate Panel" />
  <h2 class="main-title">{{ trans('Dashboard') }}</h2>

  <div class="row">
    <div class="col-lg-3 col-6">
      <div class="dash-card-one border-30 position-relative mb-15 bg-white">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div
            class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
          >
            <img src="/assets/images/icon/icon_60.svg" alt="" class="lazy-img" />
          </div>
          <div class="order-sm-0">
            <div class="value fw-500">{{ total_visitors }}</div>
            <span>{{ trans('Total Visitor') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="dash-card-one border-30 position-relative mb-15 bg-white">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div
            class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
          >
            <img src="/assets/images/icon/icon_18.svg" alt="" class="lazy-img" />
          </div>
          <div class="order-sm-0">
            <div class="value fw-500">{{ total_shortlisted }}</div>
            <span>{{ trans('Shortlisted') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="dash-card-one border-30 position-relative mb-15 bg-white">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div
            class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
          >
            <img src="/assets/images/icon/icon_09.svg" alt="" class="lazy-img" />
          </div>
          <div class="order-sm-0">
            <div class="value fw-500">{{ total_bookmarks }}</div>
            <span>{{ trans('Bookmarked') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="dash-card-one border-30 position-relative mb-15 bg-white">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div
            class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
          >
            <img src="/assets/images/icon/icon_53.svg" alt="" class="lazy-img" />
          </div>
          <div class="order-sm-0">
            <div class="value fw-500">{{ total_applied_jobs }}</div>
            <span>{{ trans('Applied Job') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row d-flex pt-50 lg-pt-10">
    <div class="col-xl-7 col-lg-6 d-flex flex-column">
      <div class="user-activity-chart border-20 mt-30 h-100 bg-white">
        <h4 class="dash-title-two">{{ trans('Profile Views') }}</h4>
        <div class="mt-20 pe-5 ps-5">
          <div class="d-flex justify-content-around chart-filter-area mb-4">
            <Link
              v-for="btn in chartFilterBtns"
              :key="btn"
              :href="route('user.dashboard', { chart_filter_by: btn })"
              :class="{ active: btn == activeChartFilterBtn }"
              class="text-capitalize"
              preserve-scroll
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
        <h4 class="dash-title-two">{{ trans('Recent Applied Job') }}</h4>
        <div class="wrapper">
          <template v-if="total_applied_jobs">
            <div
              v-for="item in appliedJobs"
              :key="item"
              class="job-item-list d-flex align-items-center"
            >
              <div>
                <img
                  v-lazy="
                    item.user?.avatar == null
                      ? `https://ui-avatars.com/api/?name=${item.user?.name}`
                      : `${item.user?.avatar}`
                  "
                  alt=""
                  height="50"
                  class="lazy-img m-auto"
                />
              </div>
              <div class="job-title">
                <h6 class="mb-5">
                  <a :href="route('jobs.show', item.slug)">{{ item.title }}</a>
                </h6>
                <div class="meta">
                  <span>{{ item.type }}</span> . <span>{{ item.address }}</span>
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
                    <a class="dropdown-item" :href="route('jobs.show', item.slug)">{{
                      trans('View Job')
                    }}</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="deleteAppliedJob(item.id)">{{
                      trans('Delete')
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <div v-else class="fw-bold mt-20 text-center">
            {{ trans('No applied job') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
