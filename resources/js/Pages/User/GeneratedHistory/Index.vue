<script setup>
import UserLayout from '@/Layouts/User.vue'
import Paginate from '@/Components/WebPaginate.vue'
import sharedComposable from '@/Composables/sharedComposable'
import { router, Head } from '@inertiajs/vue3'
import moment from 'moment'
import { ref, computed } from 'vue'
import trans from '@/Composables/transComposable'
defineOptions({ layout: UserLayout })

const props = defineProps(['aiGenerated', 'total', 'totalCharges', 'totalResults', 'request'])
const stats = computed(() => {
  return [
    {
      value: props.total,
      title: trans('Total'),
      iconSrc: '/assets/dashboard/images/icon/icon_43.svg'
    },
    {
      value: props.totalCharges,
      title: trans('Total Charges'),
      iconSrc: '/assets/dashboard/images/icon/money.png'
    },
    {
      value: props.totalResults,
      title: trans('Total Results'),
      iconSrc: '/assets/dashboard/images/icon/icon_14.svg'
    }
  ]
})
const { pickBy, textExcerpt, formatCurrency } = sharedComposable()
const filterForm = ref({
  order: props.request?.order ?? ''
})
const filter = () => {
  router.get(route('employer.ai-generated-history'), pickBy(filterForm.value), {
    preserveState: true
  })
}
const setOrder = (val) => {
  filterForm.value.order = val
  filter()
}
</script>

<template>
  <Head title="Ai History" />

  <div class="d-sm-flex align-items-center justify-content-between lg-mb-30 mb-40">
    <h2 class="main-title m0">{{ trans('Ai Generated History') }}</h2>
    <div class="d-flex xs-mt-30 ms-auto">
      <div class="nav nav-tabs tab-filter-btn me-4">
        <button
          @click="setOrder('')"
          :class="{ active: filterForm.order === '' }"
          class="nav-link"
          type="button"
        >
          {{ trans('All') }}
        </button>
        <button
          @click="setOrder('desc')"
          class="nav-link"
          :class="{ active: filterForm.order === 'desc' }"
          type="button"
        >
          {{ trans('New') }}
        </button>
        <button
          @click="setOrder('asc')"
          class="nav-link"
          :class="{ active: filterForm.order === 'asc' }"
          type="button"
        >
          {{ trans('Old') }}
        </button>
      </div>
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-4 col-6" v-for="stat in stats" :key="stat">
      <div class="dash-card-one border-30 position-relative mb-15 bg-white">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div
            class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
          >
            <img v-lazy="stat.iconSrc" alt="lazy" class="lazy-img" />
          </div>
          <div class="order-sm-0">
            <div class="value fw-500">{{ stat.value }}</div>
            <span>{{ stat.title }}</span>
          </div>
        </div>
      </div>
      <!-- /.dash-card-one -->
    </div>
  </div>
  <div class="card-box border-20 bg-white">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="a1" role="tabpanel">
        <div v-if="aiGenerated.total" class="table-responsive">
          <table class="job-alert-table table">
            <thead>
              <tr>
                <th>{{ trans('Template') }}</th>

                <th>{{ trans('Charge') }}</th>

               
                <th>
                  {{ trans('Total Words') }}
                </th>
               

                <th>
                  <p class="text-end">{{ trans('Date') }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="border-0">
              <tr v-for="generated in aiGenerated.data" :key="generated.id">
                <td>
                  <Link :href="route('user.ai-generated-history.edit', generated.uuid)">
                    {{ textExcerpt(generated.ai_template.title, 30) }}
                  </Link>
                </td>

                <td>
                  {{ formatCurrency(generated.charge) }}
                </td>
                

                <td>
                  {{ generated.length }}
                </td>
               

                <td class="text-left">
                  <p class="text-end">{{ moment(generated.updated_at).format('DD MMM, YYYY') }}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- /.table job-alert-table -->
        </div>
        <div class="text-center" v-else>{{ trans('No record found') }}</div>
      </div>
    </div>
  </div>
  <!-- /.card-box -->

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="aiGenerated.links" />
  </div>
</template>
