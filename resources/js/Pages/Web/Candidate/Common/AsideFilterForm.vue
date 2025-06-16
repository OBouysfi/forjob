<script setup>
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { useCandidateFilterStore } from '@/Store/candidateFilterStore'
import { computed } from 'vue'
const store = useCandidateFilterStore()

const inputRangePercentage = computed(() => {
  return 100 - store.form.max_salary / (store.highestSalaryAmount / 100) + '%'
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
    <div class="main-title fw-500 text-dark">{{ trans('Filter By') }}</div>
    <div class="light-bg border-20 pt-25 pb-30 mt-20 pe-4 ps-4">
      <form @submit.prevent="store.submit(true)">
        <div class="filter-block bottom-line pb-25">
          <a
            class="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseSemploye"
            role="button"
            aria-expanded="false"
            >{{ trans('Name or Keyword') }}</a
          >
          <div class="show collapse" id="collapseSemploye">
            <div class="main-body">
              <div class="input-box position-relative">
                <input type="text" v-model="store.form.keyword" placeholder="Name or keyword" />
              </div>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <div class="filter-block bottom-line pb-25 mt-25">
          <a
            class="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseService"
            role="button"
            aria-expanded="false"
            >{{ trans('Service') }}</a
          >

          <div class="show collapse" id="collapseService">
            <div class="main-body">
              <NiceSelect
                v-model="store.form.service"
                :options="store.services"
                value-by="slug"
                label="title"
                placeholder="Select Service"
                @change="store.fetchCategories()"
              />
              <br />
              <LabelWithAjaxLoader :text="trans('Category')" :loading="store.loading.categories" />
              <NiceSelect
                v-model="store.form.category"
                :options="store.categories"
                label="title"
                value-by="slug"
                placeholder="Select Category"
              />
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <div class="filter-block bottom-line pb-25 mt-25">
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
              <div class="mb-2">
                <label for="">{{ trans('Country') }} *</label>
                <NiceSelect
                  v-model="store.form.country"
                  :options="store.countries"
                  label="name"
                  value-by="id"
                  :placeholder="trans('Select Country')"
                  @change="store.fetchStates"
                />
              </div>
              <div class="mb-2">
                <LabelWithAjaxLoader text="States *" :loading="store.loading.states" />
                <NiceSelect
                  v-model="store.form.state"
                  :options="store.states"
                  label="name"
                  value-by="id"
                  placeholder="Select State"
                />
              </div>
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
            >{{ trans('Expert Level') }}</a
          >
          <div class="show collapse" id="collapseExp">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li v-for="(item, index) in store.expertLevels" :key="index">
                  <input
                    type="checkbox"
                    @change="store.setExpertLevel(item.id)"
                    :checked="store.form.expert_level === item.id"
                  />
                  <label>{{ item.title }}</label>
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
            href="#collapseQualification"
            role="button"
            aria-expanded="false"
            >{{ trans('Qualification') }}</a
          >
          <div class="show collapse" id="collapseQualification">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li v-for="(item, index) in store.qualifications" :key="index">
                  <input
                    type="checkbox"
                    @change="store.setQualification(item.id)"
                    :checked="store.form.qualification == item.id"
                  />
                  <label>{{ item.title }}</label>
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
            href="#collapseCType"
            role="button"
            aria-expanded="false"
            >{{ trans('Candidate Type') }}</a
          >
          <div class="show collapse" id="collapseCType">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li v-for="item in store.genders" :key="item">
                  <input
                    type="checkbox"
                    @change="store.setGender(item.toLocaleLowerCase())"
                    :checked="store.form.gender == item.toLocaleLowerCase()"
                  />
                  <label>{{ item }}</label>
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
            >{{ trans('Salary Range') }}</a
          >
          <div class="show collapse" id="collapseSalary">
            <div class="main-body">
              <div class="salary-slider">
                <div class="price-input d-flex align-items-center pt-5">
                  <div class="field d-flex align-items-center">
                    <input
                      type="number"
                      class="input-min"
                      :value="store.form.min_salary"
                      disabled
                    />
                  </div>
                  <div class="pe-1 ps-1">-</div>
                  <div class="field d-flex align-items-center">
                    <input
                      type="number"
                      class="input-max"
                      :value="store.form.max_salary"
                      disabled
                    />
                  </div>
                  <div class="filter-currency">
                    <NiceSelect
                      v-model="store.form.currency"
                      :options="store.currencies"
                      value-by="code"
                      label="code"
                      placeholder="Currency"
                      @change="store.modified.salary = true"
                    />
                  </div>
                </div>
                <div class="slider">
                  <div class="progress" :style="{ right: inputRangePercentage }"></div>
                </div>
                <div class="range-input mb-10">
                  <input
                    v-model="store.form.min_salary"
                    type="range"
                    class="range-min"
                    min="0"
                    :max="store.form.max_salary"
                    step="1000"
                    @change="store.modified.salary = true"
                  />
                  <input
                    v-model="store.form.max_salary"
                    type="range"
                    class="range-max"
                    min="1000"
                    :max="store.highestSalaryAmount"
                    step="1000"
                    @change="store.modified.salary = true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn-ten fw-500 w-100 tran3s mt-30 text-center text-white">
          {{ trans('Apply Filter') }}
        </button>

        <button @click="store.clear" class="btn-nine fw-500 w-100 tran3s mt-30 text-center">
          {{ trans('Clear Filter') }}
        </button>
      </form>
    </div>
  </div>
</template>
