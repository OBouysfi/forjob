<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import Paginate from '@/Components/WebPaginate.vue'
import JobsItemGrid from '@/Components/Job/JobsItemGrid.vue'
import JobsItemList from '@/Components/Job/JobsItemList.vue'
import InnerBanner from '@/Pages/Web/Job/Partials/InnerBanner.vue'
import JobIntro from '@/Pages/Web/Candidate/Partials/JobIntro.vue'
import FilterForm from './Partials/FilterForm.vue'
import { useJobFiltersStore } from '@/Store/jobFilterStore'
import NiceSelect from '@/Components/NiceSelect.vue'
import { onMounted } from 'vue'
defineOptions({ layout: DefaultLayout })
defineProps([
  'openings',
  'locations',
  'jobTypes',
  'JobExperiences',
  'categories',
  'tags',
  'seo',
  'currencies',
  'request',
  'maxSalary'
])

const filter = useJobFiltersStore()
onMounted(() => {
  if (!filter.layout) {
    filter.$patch({
      layout: 'grid'
    })
  }
})
</script>

<template>
  <Seo :metaData="seo" />

  <InnerBanner />
  <!-- /.inner-banner-one -->

  <section class="job-listing-three bg-color pt-90 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="job-post-item-wrapper">
            <div
              class="upper-filter d-flex justify-content-between align-items-start align-items-md-center mb-25"
            >
              <div class="d-md-flex justify-content-between align-items-center">
                <button
                  type="button"
                  class="filter-btn fw-500 tran3s me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#filterPopUp"
                >
                  <i class="bi bi-funnel"></i>
                  {{ trans('Filter') }}
                </button>
                <div class="total-job-found md-mt-10">
                  {{ trans('All') }}
                  <span class="text-dark fw-500">{{ openings.total }}</span>
                  {{ trans('jobs found') }}
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="short-filter d-flex align-items-center">
                  <div class="text-dark fw-500 me-2">{{ trans('Sort') }}:</div>
                  <NiceSelect
                    v-model="filter.filterForm.sort"
                    valueBy="order"
                    label="name"
                    :options="filter.sorts"
                    @change="filter.submit"
                    :placeholder="trans('Default')"
                  />
                </div>
                <button
                  class="style-changer-btn rounded-circle tran3s list-btn ms-2 text-center"
                  :class="[filter.layout == 'grid' ? 'active' : '']"
                  @click="filter.setLayout('list')"
                  title="Active List"
                >
                  <i class="bi bi-list"></i>
                </button>
                <button
                  class="style-changer-btn rounded-circle tran3s grid-btn ms-2 text-center"
                  :class="[filter.layout == 'list' ? 'active' : '']"
                  @click="filter.setLayout('grid')"
                  title="Active Grid"
                >
                  <i class="bi bi-grid"></i>
                </button>
              </div>
            </div>
            <!-- list -->
            <div class="accordion-box list-style" :class="[filter.layout == 'list' ? 'show' : '']">
              <JobsItemList :items="openings.data" />
            </div>
            <!-- grid -->
            <div class="accordion-box grid-style" :class="[filter.layout == 'grid' ? 'show' : '']">
              <div class="row">
                <JobsItemGrid :items="openings.data" />
              </div>
            </div>

            <div v-if="!openings.total" class="alert alert-info mt-30 text-center" role="alert">
              {{ trans('No jobs found') }}
            </div>

            <Paginate :links="openings.links" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <JobIntro />
  <!-- modal -->
  <div
    class="modal popUpModal fade"
    id="filterPopUp"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <FilterForm
        :locations="locations"
        :jobTypes="jobTypes"
        :JobExperiences="JobExperiences"
        :tags="tags"
        :categories="categories"
        :currencies="currencies"
        :maxSalary="maxSalary"
        :request="request"
      />
    </div>
  </div>
</template>
