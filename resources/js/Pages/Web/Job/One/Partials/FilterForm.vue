<script setup>
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { useJobFiltersStore } from '@/Store/jobFilterStore'
import { onMounted, computed } from 'vue'

const filter = useJobFiltersStore()

const props = defineProps([
  'locations',
  'jobTypes',
  'JobExperiences',
  'services',
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
  <button
    type="button"
    class="filter-btn w-100 fw-500 tran3s d-lg-none mb-40 h-auto pb-2 pt-2"
    data-bs-toggle="offcanvas"
    data-bs-target="#filteroffcanvas"
  >
    <i class="bi bi-funnel"></i>
    {{ trans('Filter') }}
  </button>
  <div class="filter-area-tab offcanvas offcanvas-start" id="filteroffcanvas">
    <button
      type="button"
      class="btn-close text-reset d-lg-none"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
    <div class="main-title fw-500 text-dark">
      {{ trans('Filter By') }}
    </div>
    <div class="light-bg border-20 pt-25 pb-30 mt-20 pe-4 ps-4">
      <div class="filter-block bottom-line pb-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseSemploye"
          role="button"
          aria-expanded="false"
          >{{ trans('Search Job') }}</a
        >
        <div class="show collapse" id="collapseSemploye">
          <div class="main-body">
            <div class="input-box position-relative">
              <input v-model="filter.filterForm.keyword" type="text" placeholder="Job Title" />
            </div>
          </div>
        </div>
      </div>
      <div class="filter-block bottom-line pb-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseLocation"
          role="button"
          aria-expanded="false"
          >{{ trans('Location') }}</a
        >
        <div class="show collapse" id="collapseLocation">
          <div class="main-body">
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
            <template v-if="!filter.filterForm.is_remote">
              <NiceSelect
                v-model="filter.filterForm.country"
                :options="filter.locations"
                value-by="id"
                label="name"
                placeholder="Select Country"
                @change="filter.getStates"
              />

              <div class="mt-2">
                <LabelWithAjaxLoader
                  class="filter-title fw-500 text-dark"
                  text="States"
                  :loading="filter.loading.states"
                />
                <NiceSelect
                  v-model="filter.filterForm.state"
                  :options="filter.states"
                  value-by="id"
                  label="name"
                  placeholder="Select State"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->
      <div class="filter-block bottom-line pb-25 mt-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseJobType"
          role="button"
          aria-expanded="false"
          >{{ trans('Job Type') }}</a
        >
        <div class="show collapse" id="collapseJobType">
          <div class="main-body">
            <ul class="style-none filter-input">
              <li v-for="job in jobTypes" :key="job.type">
                <input
                  type="checkbox"
                  name="JobType"
                  @change="filter.setType(job.type)"
                  :checked="filter.filterForm.job_type === job.type"
                />
                <label
                  >{{ job.type }} <span>{{ job.count }}</span></label
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->
      <div class="filter-block bottom-line pb-25 mt-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseExp"
          role="button"
          aria-expanded="false"
          >{{ trans('Experience') }}</a
        >
        <div class="show collapse" id="collapseExp">
          <div class="main-body">
            <ul class="style-none filter-input">
              <li v-for="job in JobExperiences" :key="job.experience">
                <input
                  type="checkbox"
                  name="Experience"
                  @change="filter.setExperience(job.experience)"
                  :checked="filter.filterForm.experience === job.experience"
                  :value="job.experience"
                />
                <label
                  >{{ job.experience }} <span>{{ job.count }}</span></label
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->
      <div class="filter-block bottom-line pb-25 mt-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseSalary"
          role="button"
          aria-expanded="false"
          >{{ trans('Salary') }}</a
        >
        <div class="show collapse" id="collapseSalary">
          <div class="main-body">
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
                  step="1000"
                />
                <input
                  v-model="filter.filterForm.max_salary"
                  type="range"
                  class="range-max"
                  min="0"
                  :max="props.maxSalary"
                  step="1000"
                />
              </div>
            </div>

            <ul class="style-none d-flex justify-content-between radio-filter mt-5 flex-wrap">
              <li>
                <input
                  v-model="filter.filterForm.salary_type"
                  type="radio"
                  name="jobDuration"
                  value="Weekly"
                />
                <label>{{ trans('Weekly') }}</label>
              </li>
              <li>
                <input
                  v-model="filter.filterForm.salary_type"
                  type="radio"
                  name="jobDuration"
                  value="Monthly"
                />
                <label>{{ trans('Monthly') }}</label>
              </li>
              <li>
                <input
                  v-model="filter.filterForm.salary_type"
                  type="radio"
                  name="jobDuration"
                  value="Hourly"
                />
                <label>{{ trans('Hourly') }}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->
      <div class="filter-block bottom-line pb-25 mt-25">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseCategory"
          role="button"
          aria-expanded="false"
          >{{ trans('Category') }}</a
        >
        <div class="show collapse" id="collapseCategory">
          <div class="main-body">
            <NiceSelect
              v-model="filter.filterForm.service"
              :options="filter.services"
              value-by="slug"
              label="title"
              placeholder="Select Service"
              @change="filter.getCategories()"
              class="mb-2"
            />

            <div v-if="filter.loading.categories">
              <img src="/assets/images/ajax_loading.svg" class="loader-img" />
            </div>

            <ul v-else class="style-none filter-input">
              <li v-for="cat in filter.categories" :key="cat.id">
                <input
                  @change="filter.setCategory(cat.slug)"
                  type="checkbox"
                  name="category"
                  :value="cat.slug"
                  :checked="filter.filterForm.category === cat.slug"
                />
                <label
                  >{{ cat.title }} <span>{{ cat.jobs_count }}</span></label
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->
      <div class="filter-block bottom-line pb-25 mt-25" v-if="filter.filterForm.category">
        <a
          class="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseTag"
          role="button"
          aria-expanded="false"
          >{{ trans('Skills') }}</a
        >
        <div class="show collapse" id="collapseTag">
          <div class="main-body">
            <ul
              v-if="filter.skills.length"
              class="style-none d-flex justify-space-between radio-filter mb-5 flex-wrap"
            >
              <li v-for="tag in filter.skills" :key="tag.id">
                <input
                  type="checkbox"
                  name="tags"
                  @change="filter.setSkill(tag.id)"
                  :value="tag.id"
                  :checked="filter.filterForm.skills.includes(tag.id)"
                />
                <label>{{ tag.title }}</label>
              </li>
            </ul>

            <div v-if="filter.loading.skills">
              <img src="/assets/images/ajax_loading.svg" class="loader-img" />
            </div>

            <div
              v-if="!filter.loading.skills && !filter.skills.length"
              class="text-muted small text-center"
            >
              {{ trans('No items found') }}
            </div>
          </div>
        </div>
      </div>
      <!-- /.filter-block -->

      <button
        type="button"
        @click="filter.submit"
        class="btn-ten fw-500 w-100 tran3s mt-30 text-center text-white"
      >
        {{ trans(' Apply Filter') }}
      </button>
      <button @click="filter.clear" class="btn-nine fw-500 w-100 tran3s mt-30 text-center">
        {{ trans('Clear Filter') }}
      </button>
    </div>
  </div>
  <!-- /.filter-area-tab -->
</template>
