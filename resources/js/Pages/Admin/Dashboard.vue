<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import Alert from '@/Components/Admin/Alert.vue'
import AdminLayout from '@/Layouts/Admin.vue'
import VueApexCharts from 'vue3-apexcharts'
import { router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import moment from 'moment'
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'totalOrders',
  'totalSales',
  'totalJobs',
  'totalEmployer',
  'totalCandidate',
  'totalAppliedJobs',
  'totalKYCRequest',
  'totalJobBookmarks',
  'mostViewedJob',
  'mostOrderedPlan',
  'popularPlans',
  'recentOrders',
  'recentJobs',
  'recentKycRequest',
  'salesOverview',
  'request'
])
const { formatCurrency, textExcerpt, pickBy } = sharedComposable()

const primaryOverview = computed(() => {
  return [
    {
      title: 'Total Orders',
      value: props.totalOrders,
      url: route('admin.order.index'),
      icon: 'bx bx-box',
      classes: 'bg-primary-500 text-primary-500'
    },
    {
      title: 'Total Sales',
      value: props.totalSales,
      url: route('admin.order.index'),
      icon: 'bx bx-dollar-circle',
      classes: 'text-success-500 bg-success-500'
    },
    {
      title: 'Total Jobs',
      value: props.totalJobs,
      url: route('admin.job.index'),
      icon: 'bx bxs-receipt',
      classes: 'text-warning-500 bg-warning-500'
    },
    {
      title: 'Total Employer',
      value: props.totalEmployer,
      url: route('admin.companies.index'),
      icon: 'bx bx-group',
      classes: 'text-info-500 bg-info-500'
    },
    {
      title: 'Total Candidate',
      value: props.totalCandidate,
      url: route('admin.candidates.index'),
      icon: 'bx bx-user',
      classes: 'text-sky-500 bg-sky-500'
    },
    {
      title: 'Total Applied Jobs',
      value: props.totalAppliedJobs,
      url: route('admin.job.index'),
      icon: 'bx bx-mail-send',
      classes: 'text-lime-500 bg-lime-500'
    },
    {
      title: 'Total KYC Request',
      value: props.totalKYCRequest,
      url: route('admin.kyc-requests.index'),
      icon: 'bx bx-id-card',
      classes: 'text-teal-500 bg-teal-500'
    },
    {
      title: 'Total Job Bookmarks',
      url: route('admin.job.index'),
      value: props.totalJobBookmarks,
      icon: 'bx bx-bookmark-heart',
      classes: 'text-red-500 bg-red-500'
    }
  ]
})

const filterForm = ref({
  job: props.request.job || '',
  plan: props.request.plan || '',
  sales: props.request.sales || ''
})
const mostSorts = [
  { label: 'Today', value: 'today' },
  { label: 'Month', value: 'month' },
  { label: 'All', value: '' }
]
const filter = () => {
  router.get(route('admin.dashboard'), pickBy(filterForm.value), {
    preserveState: true,
    replace: true
  })
}
const salesChart = computed(() => {
  return {
    series: [
      {
        name: 'Sales',
        data: props.salesOverview.map((item) => item.sales)
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
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'string',
        categories: props.salesOverview.map((item) => item.date)
      }
    }
  }
})
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Dashboard')" />

    <div class="space-y-6">
      <!-- Overview Section Start -->
      <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <!-- Product Views  -->
        <template v-for="(item, index) in primaryOverview" :key="index">
          <Link :href="item.url">
            <div class="card">
              <div class="card-body flex items-center gap-4">
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20"
                  :class="item.classes"
                >
                  <i class="text-3xl" :class="item.icon"></i>
                </div>
                <div class="flex flex-1 flex-col gap-1">
                  <p class="text-sm tracking-wide text-slate-500">{{ item.title }}</p>
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <h4>{{ item.value }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </template>
      </section>
      <!-- Overview Section End -->

      <!-- Sales Chart  -->
      <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="card order-2 col-span-1 md:col-span-2 xl:order-3">
          <div class="card-body flex h-full flex-col justify-between gap-4">
            <div class="flex flex-wrap justify-between gap-2">
              <h6>{{ trans('Overview Of Sales') }}</h6>
              <select
                v-model="filterForm.sales"
                @change="filter"
                class="select select-xl w-full capitalize md:w-40"
              >
                <option value="" selected>{{ trans('Filter By') }}</option>
                <option
                  :value="item"
                  v-for="item in ['day', 'week', 'month', 'year']"
                  :key="item"
                  :selected="filterForm.sales === item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="min-h-min">
              <!-- Sales Location Chart  -->
              <VueApexCharts
                type="area"
                height="350"
                :options="salesChart.chartOptions"
                :series="salesChart.series"
              />
            </div>
          </div>
        </div>

        <!-- Most Ordered Plan  -->
        <div class="order-4 col-span-1 space-y-6">
          <div class="card">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between">
                <h6>{{ trans('Most Ordered Plan') }}</h6>
                <div class="flex items-center gap-2">
                  <template v-for="(sort, i) in mostSorts" :key="sort.label">
                    <button
                      type="button"
                      @click="
                        () => {
                          filterForm.plan = sort.value
                          filter()
                        }
                      "
                    >
                      <span
                        class="text-xs capitalize"
                        :class="{
                          'font-medium text-primary-500': filterForm.plan == sort.value
                        }"
                      >
                        {{ trans(sort.label) }}
                      </span>
                    </button>
                    <span v-if="i < 2" class="text-sm text-slate-200 dark:text-slate-600">|</span>
                  </template>
                </div>
              </div>
              <div
                v-if="mostOrderedPlan"
                class="mt-4 flex items-center gap-4 rounded-primary bg-slate-50 p-4 dark:bg-slate-900"
              >
                <Link :href="route('admin.plan.index')">
                  <div class="flex flex-1 flex-col gap-1">
                    <h3 class="text-sm font-semibold">{{ mostOrderedPlan.title }}</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                      {{ trans('Price') }}: {{ formatCurrency(mostOrderedPlan.price) }},
                      {{ mostOrderedPlan.days == 30 ? 'Monthly' : 'Yearly' }},
                      {{ trans('Total Order') }}:
                      {{ mostOrderedPlan.orders_count }}
                    </p>
                  </div>
                </Link>
              </div>
              <Alert v-else text="Nothing found..." />
            </div>
          </div>
          <!-- Most Viewed Product -->
          <div class="card">
            <div class="card-body flex flex-col gap-2">
              <div class="flex flex-wrap items-center justify-between">
                <h6>{{ trans('Most Viewed Job') }}</h6>
                <div class="flex items-center gap-2">
                  <template v-for="(sort, i) in mostSorts" :key="sort.label">
                    <button
                      type="button"
                      @click="
                        () => {
                          filterForm.job = sort.value
                          filter()
                        }
                      "
                    >
                      <span
                        class="text-xs"
                        :class="{
                          'font-medium text-primary-500': filterForm.job == sort.value
                        }"
                      >
                        {{ trans(sort.label) }}
                      </span>
                    </button>
                    <span v-if="i < 2" class="text-sm text-slate-200 dark:text-slate-600">|</span>
                  </template>
                </div>
              </div>
              <template v-if="mostViewedJob">
                <Link :href="route('admin.job.show', mostViewedJob)">
                  <div
                    class="flex items-center gap-4 rounded-primary bg-slate-50 p-2 dark:bg-slate-900"
                  >
                    <img
                      v-lazy="
                        mostViewedJob?.user?.avatar == null
                          ? `https://ui-avatars.com/api/?name=${mostViewedJob?.user?.name}`
                          : `${mostViewedJob?.user?.avatar}`
                      "
                      alt="product-img"
                      class="w-16 rounded-primary bg-white p-1 dark:bg-slate-800"
                    />
                    <div class="flex flex-1 flex-col gap-1">
                      <h3 class="text-sm font-semibold">
                        {{ mostViewedJob ? textExcerpt(mostViewedJob?.title) : '' }}
                      </h3>
                      <p class="text-sm text-slate-500 dark:text-slate-400">
                        {{ mostViewedJob?.service?.title }}, {{ mostViewedJob?.type }}
                      </p>
                      <p class="text-xs text-slate-700 dark:text-slate-200">
                        {{ trans('By') }} {{ mostViewedJob?.user?.name }}
                      </p>
                    </div>
                  </div>
                </Link>
              </template>
              <Alert v-else text="Nothing found..." />
            </div>
          </div>
        </div>
      </section>
      <!-- Store Analytics, Active Users, Sales By Location, Top & Most Viewed Product Section End  -->

      <!-- Top Sellers Section start  -->
      <section class="grid grid-cols-12 place-items-start gap-6">
        <div class="card col-span-8">
          <div class="card-body space-y-2">
            <h6>{{ trans('Popular Plans') }}</h6>
            <!-- Seller Table  -->
            <div
              v-if="popularPlans?.length > 0"
              class="table-responsive whitespace-nowrap rounded-primary"
            >
              <table class="table min-w-[43rem]">
                <thead>
                  <tr>
                    <th>{{ trans('Plan') }}</th>
                    <th>{{ trans('Active Users') }}</th>
                    <th>{{ trans('Sales') }}</th>
                    <th>{{ trans('Total Amount') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plan in popularPlans" :key="plan.id">
                    <td class="whitespace-nowrap">
                      <Link :href="route('admin.plan.index')">
                        {{ plan.name }}
                      </Link>
                    </td>
                    <td class="whitespace-nowrap">{{ plan.activeuser }}</td>
                    <td class="whitespace-nowrap">
                      <p>{{ plan.orders_count }}</p>
                    </td>
                    <td>{{ plan.total_amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Alert v-else text="Nothing found..." />
          </div>
        </div>
        <div class="card col-span-4">
          <div class="card-body flex h-full flex-col">
            <!-- Header  -->
            <h6>{{ trans('Recent Orders') }}</h6>

            <div v-if="recentOrders?.length > 0" class="mt-auto divide-y dark:divide-slate-600">
              <template v-for="order in recentOrders" :key="order.id">
                <div class="flex items-center gap-4 py-2">
                  <div class="min-w-12 flex h-12 w-12 items-center justify-center">
                    <img
                      :src="order.avatar"
                      v-lazy="
                        order.avatar == null
                          ? `https://ui-avatars.com/api/?name=${order?.name}`
                          : `${order.avatar}`
                      "
                      class="rounded-primary"
                      alt="avatar"
                    />
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <Link :href="'/admin/order/' + order.id">
                      <div>
                        <h6 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {{ order.invoice }}
                        </h6>
                        <p class="text-sm text-slate-400">{{ order.plan }}</p>
                        <p class="text-xs text-slate-200">By {{ order.name }}</p>
                      </div>
                    </Link>

                    <div>
                      <h6 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {{ order.amount }}
                      </h6>
                      <p class="text-sm text-slate-400">{{ order.created_at }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <Alert v-else text="Nothing found..." />
          </div>
        </div>
      </section>

      <!-- Recent Kyc Request -->
      <section class="grid grid-cols-1 place-items-start gap-6 lg:grid-cols-2">
        <div class="card">
          <div class="card-body">
            <!-- Header  -->
            <h6>{{ trans('Recent Kyc Request') }}</h6>
            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Method') }}</th>
                    <th>{{ trans('User Name') }}</th>
                    <th>{{ trans('Status') }}</th>
                    <th>{{ trans('Note') }}</th>
                    <th>{{ trans('Documents') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in recentKycRequest" :key="index">
                    <td>
                      <Link :href="`/admin/kyc-requests/${item.id}`">
                        {{ item.method?.title }}
                      </Link>
                    </td>
                    <td class="whitespace-nowrap">
                      {{ item.user?.name }}
                    </td>
                    <td>
                      <span v-if="item.status == 0" class="badge badge-warning">{{
                        trans('Pending')
                      }}</span>
                      <span v-else-if="item.status == 1" class="badge badge-primary">{{
                        trans('Approved')
                      }}</span>
                      <span v-else-if="item.status == 2" class="badge badge-danger">{{
                        trans('Rejected')
                      }}</span>
                      <span v-else-if="item.status == 3" class="badge badge-dark">{{
                        trans('Re-Submitted')
                      }}</span>
                    </td>
                    <td>{{ item.note || 'None' }}</td>
                    <td>{{ item.data?.length || 0 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- jobs  -->
        <div class="card">
          <div class="card-body">
            <h6>{{ trans('Recent Jobs') }}</h6>

            <!-- jobs Table  -->
            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Title') }}</th>
                    <th>{{ trans('Date') }}</th>
                    <th>{{ trans('Type') }}</th>
                    <th>{{ trans('Range') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(job, index) in recentJobs" :key="index">
                    <td>
                      <Link :href="route('admin.job.show', job)">
                        <div class="flex gap-2">
                          <div class="avatar avatar-circle">
                            <img
                              v-lazy="
                                job.user.avatar == null
                                  ? `https://ui-avatars.com/api/?name=${job.user?.name}`
                                  : `${job.user.avatar}`
                              "
                              alt="avatar-img"
                              class="avatar-img"
                            />
                          </div>
                          <div>
                            <p class="text-sm font-medium">{{ job.title }}</p>
                            <p class="text-xs font-normal text-slate-500">
                              {{ job.service?.title }}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td class="whitespace-nowrap">
                      {{ moment(job.created_at).format('DD MMM, YYYY') }}
                    </td>
                    <td>{{ job.type }}</td>
                    <td>{{ job.salary_range }} / {{ job.salary_type.charAt(0) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
