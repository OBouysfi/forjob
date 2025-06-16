<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import Paginate from '@/Components/WebPaginate.vue'
import JobsItemGrid from '@/Components/Job/JobsItemGrid.vue'
import JobsItemList from '@/Components/Job/JobsItemList.vue'
import JobIntro from '@/Pages/Web/Candidate/Partials/JobIntro.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import InnerBanner from '@/Pages/Web/Job/Partials/InnerBanner.vue'
import FilterForm from './Partials/FilterForm.vue'
import { useJobFiltersStore } from '@/Store/jobFilterStore'
import { onMounted } from 'vue'
const filter = useJobFiltersStore()

defineOptions({ layout: DefaultLayout })
const props = defineProps([
  'openings',
  'locations',
  'jobTypes',
  'JobExperiences',
  'services',
  'seo',
  'currencies',
  'request',
  'maxSalary'
])

onMounted(() => {
  if (!filter.layout) {
    filter.$patch({
      layout: 'list'
    })
  }
})
</script>

<template>
  <Seo :metaData="seo" />

  <InnerBanner />

  <section class="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4">
          <FilterForm
            :locations="locations"
            :currencies="currencies"
            :jobTypes="jobTypes"
            :JobExperiences="JobExperiences"
            :services="services"
            :maxSalary="maxSalary"
            :request="request"
          />
        </div>

        <div class="col-xl-9 col-lg-8">
          <div class="job-post-item-wrapper ms-xxl-5 ms-xl-3">
            <div class="upper-filter d-flex justify-content-between align-items-center mb-20">
              <div class="total-job-found">
                <span class="text-dark">{{ openings.total }}</span>
                {{ trans('jobs found') }}
              </div>
              <div class="d-flex align-items-center">
                <div class="short-filter d-flex align-items-center">
                  <div class="text-dark fw-500 me-2">{{ trans('Sort') }}:</div>
                  <NiceSelect
                    v-model="filter.filterForm.sort"
                    value-by="order"
                    label="name"
                    :options="filter.sorts"
                    placeholder="Default"
                    @change="filter.submit"
                  />
                </div>
                <button
                  class="style-changer-btn rounded-circle tran3s list-btn ms-2 text-center"
                  title="Active List"
                  :class="[filter.layout == 'grid' ? 'active' : '']"
                  @click="filter.setLayout('list')"
                >
                  <i class="bi bi-list"></i>
                </button>
                <button
                  class="style-changer-btn rounded-circle tran3s grid-btn ms-2 text-center"
                  title="Active Grid"
                  :class="[filter.layout == 'list' ? 'active' : '']"
                  @click="filter.setLayout('grid')"
                >
                  <i class="bi bi-grid"></i>
                </button>
              </div>
            </div>
            <!-- /.upper-filter -->

            <template v-if="openings.total">
              <div
                class="accordion-box list-style"
                :class="[filter.layout == 'list' ? 'show' : '']"
              >
                <JobsItemList :items="openings.data" />
              </div>

              <div
                class="accordion-box grid-style"
                :class="[filter.layout == 'grid' ? 'show' : '']"
              >
                <div class="row">
                  <JobsItemGrid :items="openings.data" />
                </div>
              </div>
              <Paginate :links="openings.links" />
            </template>

            <div class="alert alert-info mt-30 text-center" role="alert" v-else>
              {{ trans('No jobs found') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <JobIntro />
</template>
