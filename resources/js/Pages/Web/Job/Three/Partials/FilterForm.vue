<script setup>
import { onMounted, computed } from 'vue'
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import NiceSelect from '@/Components//NiceSelect.vue'
import { useJobFiltersStore } from '@/Store/jobFilterStore'
const filter = useJobFiltersStore()
const props = defineProps([
  'locations',
  'jobTypes',
  'JobExperiences',
  'tags',
  'categories',
  'currencies',
  'request',
  'maxSalary'
])

onMounted(() => {
  filter.updateInitialState(props)
})
const inputRangePercentage = computed(() => {
  return 100 - filter.filterForm.max_salary / (props.maxSalary / 100) + '%'
})
</script>

<template>
  <div class="container">
    <div class="filter-area-tab modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="position-relative">
        <div class="main-title fw-500 text-dark pt-15 pb-15 border-bottom pe-4 ps-4">
          {{ trans('Filter By') }}
        </div>
        <div class="pt-25 pb-30 pe-4 ps-4">
          <div class="row">
            <div class="col-lg-3 col-sm-6">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">{{ trans('Keyword or Title') }}</div>
                <form @submit.prevent="filter" class="input-box position-relative">
                  <input
                    type="text"
                    v-model="filter.filterForm.keyword"
                    placeholder="Search by Keywords"
                  />
                  <button type="submit">
                    <i class="bi bi-search"></i>
                  </button>
                </form>
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">{{ trans('Category') }}</div>
                <NiceSelect
                  v-model="filter.filterForm.category"
                  valueBy="slug"
                  label="title"
                  placeholder="Select Category"
                  :options="filter.categories"
                />
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">{{ trans('Location') }}</div>
                <template v-if="!filter.filterForm.is_remote">
                  <NiceSelect
                    v-model="filter.filterForm.country"
                    valueBy="id"
                    label="name"
                    placeholder="Select Country"
                    :options="filter.locations"
                    @change="filter.getStates"
                  />
                </template>
                <ul class="style-none filter-input">
                  <li>
                    <input
                      type="checkbox"
                      name="JobType"
                      @change="filter.setRemote(true)"
                      :checked="filter.filterForm.is_remote === true"
                    />
                    <label>{{ trans('Remote') }} </label>
                  </li>
                </ul>
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-3 col-sm-6" v-if="!filter.filterForm.is_remote">
              <div class="filter-block pb-50 lg-pb-20">
                <LabelWithAjaxLoader
                  class="filter-title fw-500 text-dark"
                  text="States"
                  :loading="filter.loadingStates"
                />
                <NiceSelect
                  v-model="filter.filterForm.state"
                  valueBy="id"
                  label="name"
                  placeholder="Select City"
                  :options="filter.states"
                />
              </div>
              <!-- /.filter-block -->
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="filter-block d-xl-flex pb-25">
                <div class="filter-title fw-500 text-dark mt-1">{{ trans('Job Type') }} :</div>
                <div class="main-body ps-xl-4 flex-fill">
                  <ul class="style-none filter-input">
                    <li v-for="job in filter.jobTypes" :key="job.type">
                      <input
                        type="checkbox"
                        name="JobType"
                        @change="filter.setType(job.type)"
                        :checked="filter.filterForm.job_type === job.type"
                      />
                      <label>{{ job.type }}</label>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="filter-block d-xl-flex pb-25">
                <div class="filter-title fw-500 text-dark mt-1">
                  {{ trans('Experience Level') }} :
                </div>
                <div class="main-body ps-xl-4 flex-fill">
                  <ul class="style-none filter-input">
                    <li v-for="job in filter.JobExperiences" :key="job.experience">
                      <input
                        type="checkbox"
                        name="Experience"
                        @change="filter.setExperience(job.experience)"
                        :checked="filter.filterForm.experience === job.experience"
                        :value="job.experience"
                      />
                      <label>{{ job.experience }} </label>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-4">
              <div class="filter-block d-xl-flex pb-25">
                <div class="filter-title fw-500 text-dark mt-1">{{ trans('Salary Range') }} :</div>
                <div class="main-body ps-xl-4 flex-fill">
                  <div class="salary-slider">
                    <div class="price-input d-flex align-items-center pt-5">
                      <div class="field d-flex align-items-center">
                        <input
                          type="number"
                          class="input-min"
                          :value="filter.filterForm.min_salary"
                          disabled
                        />
                      </div>
                      <div class="pe-1 ps-1">-</div>
                      <div class="field d-flex align-items-center">
                        <input
                          type="number"
                          class="input-max"
                          :value="filter.filterForm.max_salary"
                          disabled
                        />
                      </div>
                      <div class="filter-currency">
                        <NiceSelect
                          v-model="filter.filterForm.currency"
                          :options="filter.currencies"
                          value-by="code"
                          label="code"
                          placeholder="Currency"
                        />
                      </div>
                    </div>
                    <div class="slider">
                      <div class="progress" :style="{ right: inputRangePercentage }"></div>
                    </div>
                    <div class="range-input mb-10">
                      <input
                        v-model="filter.filterForm.min_salary"
                        type="range"
                        class="range-min"
                        min="0"
                        :max="filter.minMaxSalary"
                        step="10"
                      />
                      <input
                        v-model="filter.filterForm.max_salary"
                        type="range"
                        class="range-max"
                        min="1"
                        :max="props.maxSalary"
                        step="10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.filter-block -->
            </div>
          </div>

          <div class="row">
            <div class="col-xl-2 m-auto">
              <button
                type="button"
                @click.prevent="filter.submit"
                class="btn-ten fw-500 w-100 tran3s mt-30 md-mt-10 text-center text-white"
              >
                {{ trans('Apply Filter') }}
              </button>
              <button @click="filter.clear" class="btn-nine fw-500 w-100 tran3s mt-30 text-center">
                {{ trans('Clear Filter') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
