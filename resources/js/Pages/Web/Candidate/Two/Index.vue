<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import WebPaginate from '@/Components/WebPaginate.vue'
import JobIntro from '@/Pages/Web/Candidate/Partials/JobIntro.vue'
import InnerBanner from '@/Pages/Web/Candidate/Partials/InnerBanner.vue'
import SingleGridCandidate from '@/Components/SingleGridCandidate.vue'
import SingleListCandidate from '@/Components/SingleListCandidate.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import AsideFilterForm from '@/Pages/Web/Candidate/Common/AsideFilterForm.vue'
import { useCandidateFilterStore } from '@/Store/candidateFilterStore'
import { onMounted } from 'vue'
import sharedComposable from '@/Composables/sharedComposable'

defineOptions({ layout: DefaultLayout })

const { getQueryParams } = sharedComposable()
const store = useCandidateFilterStore()
const request = getQueryParams()

const props = defineProps([
  'candidates',
  'services',
  'categories',
  'countries',
  'expertLevels',
  'qualifications',
  'meta',
  'currencies',
  'highestSalaryAmount'
])

onMounted(() => {
  store.$patch({
    services: props.services,
    categories: props.categories,
    countries: props.countries,
    expertLevels: props.expertLevels,
    qualifications: props.qualifications,
    currencies: props.currencies,
    highestSalaryAmount: parseInt(props.highestSalaryAmount),
    form: {
      keyword: request.keyword,
      v: request.v,

      order_by: request.order_by,
      service: Number(request.service ?? 0) || '',
      category: Number(request.category ?? 0) || '',
      country: Number(request.country ?? 0) || '',
      state: Number(request.state) || '',

      expert_level: Number(request.expert_level ?? 0) || '',
      currency: request.currency,
      qualification: Number(request.qualification ?? 0) || '',
      gender: request.gender ?? '',
      max_salary: parseInt(request.max_salary ?? props.highestSalaryAmount),
      min_salary: Number(request.min_salary) || 0
    }
  })

  if (!store.layout) {
    store.$patch({
      layout: 'list'
    })
  }
  if (request.country) {
    store.fetchStates(store.form.state)
  }
})
</script>

<template>
  <Seo :metaData="meta" />
  <InnerBanner />
  <!-- /.inner-banner-one -->

  <section class="candidates-profile pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4">
          <AsideFilterForm />
        </div>

        <div class="col-xl-9 col-lg-8">
          <div class="ms-xxl-5 ms-xl-3">
            <div class="upper-filter d-flex justify-content-between align-items-center mb-20">
              <div class="total-job-found">
                <span class="text-dark fw-500">{{ candidates.total }}</span>
                {{ trans('candidates found') }}
              </div>
              <div class="d-flex align-items-center">
                <div class="short-filter d-flex align-items-center">
                  <div class="text-dark fw-500 me-2">{{ trans('Sort') }}:</div>
                  <NiceSelect
                    v-model="store.form.order_by"
                    :options="store.sorts"
                    value-by="value"
                    label="label"
                    @change="store.sort()"
                    placeholder="Default"
                  />
                </div>
                <button
                  class="style-changer-btn rounded-circle tran3s list-btn ms-2 text-center"
                  title="Active List"
                  :class="[store.layout == 'grid' ? 'active' : '']"
                  @click="store.setLayout('list')"
                >
                  <i class="bi bi-list"></i>
                </button>
                <button
                  class="style-changer-btn rounded-circle tran3s grid-btn ms-2 text-center"
                  title="Active Grid"
                  :class="[store.layout == 'list' ? 'active' : '']"
                  @click="store.setLayout('grid')"
                >
                  <i class="bi bi-grid"></i>
                </button>
              </div>
            </div>
            <!-- /.upper-filter -->

            <template v-if="candidates.total">
              <div class="accordion-box grid-style" :class="[store.layout == 'grid' ? 'show' : '']">
                <div class="row">
                  <SingleGridCandidate
                    v-for="candidate in candidates.data"
                    :key="candidate.id"
                    :candidate="candidate"
                    class="col-xxl-4 col-lg-4 col-sm-3 d-flex"
                  />
                </div>
              </div>
              <!-- /.accordion-box -->

              <div class="accordion-box list-style" :class="[store.layout == 'list' ? 'show' : '']">
                <SingleListCandidate
                  v-for="candidate in candidates.data"
                  :key="candidate.id"
                  :candidate="candidate"
                />
              </div>
              <!-- /.accordion-box -->

              <div class="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                <p class="m0 order-sm-last text-sm-start xs-pb-20 text-center">
                  {{ trans('Showing') }}
                  <span class="text-dark fw-500"
                    >{{ candidates.from }} {{ trans('to') }} {{ candidates.to }}</span
                  >
                  {{ trans('of') }}
                  <span class="text-dark fw-500">{{ candidates.total }}</span>
                </p>
                <WebPaginate :links="candidates.links" />
              </div>
            </template>
            <h4 v-else class="alert alert-info">{{ trans('No record found') }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./candidates-profile -->

  <JobIntro />
</template>
