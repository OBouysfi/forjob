<script setup>
import LabelWithAjaxLoader from "@/Components/LabelWithAjaxLoader.vue"
import NiceSelect from "@/Components/NiceSelect.vue"
import { useCandidateFilterStore } from "@/Store/candidateFilterStore"
import { computed } from "vue"
const store = useCandidateFilterStore()

const inputRangePercentage = computed(() => {
  return 100 - store.form.max_salary / (store.highestSalaryAmount / 100) + "%"
})
</script>

<template>
  <!-- Modal -->
  <div
    class="modal popUpModal fade"
    id="filterPopUp"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="container">
        <div class="filter-area-tab modal-content">
          <button
            type="button"
            ref="filterPopUpCloseBtn"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <form @submit.prevent="store.submit">
            <div class="position-relative">
              <div
                class="main-title fw-500 text-dark pt-15 pb-15 border-bottom pe-4 ps-4"
              >
                {{ trans("Filter By") }}
              </div>
              <div class="pt-25 pb-30 pe-4 ps-4">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="filter-block pb-50 md-pb-20">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Keyword or Title") }}
                      </div>
                      <div class="input-box position-relative">
                        <input
                          type="text"
                          v-model="store.form.keyword"
                          placeholder="Name or keyword"
                        />
                      </div>
                    </div>
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-block pb-50 md-pb-20">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Service") }}
                      </div>
                      <NiceSelect
                        v-model="store.form.service"
                        :options="store.services"
                        value-by="slug"
                        label="title"
                        placeholder="Service"
                        @change="store.fetchCategories"
                      />
                    </div>
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-title fw-500 text-dark d-flex">
                      {{ trans("Category") }}
                      <LabelWithAjaxLoader text="" :loading="store.loading.categories" />
                    </div>
                    <NiceSelect
                      v-model="store.form.category"
                      :options="store.categories"
                      value-by="slug"
                      label="title"
                      placeholder="Select Category"
                    />
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-block pb-50 md-pb-20">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Country") }}
                      </div>
                      <NiceSelect
                        v-model="store.form.country"
                        :options="store.countries"
                        label="name"
                        value-by="id"
                        placeholder="Select Country"
                        @change="store.fetchStates"
                      />
                    </div>
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-block pb-50 md-pb-20">
                      <LabelWithAjaxLoader
                        text="States"
                        class="filter-title fw-500 text-dark"
                        :loading="store.loading.states"
                      />
                      <NiceSelect
                        v-model="store.form.state"
                        :options="store.states"
                        label="name"
                        value-by="id"
                        placeholder="Select State"
                      />
                    </div>
                    <!-- /.filter-block -->
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-3">
                    <div class="filter-block pb-25">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Expert Level") }}
                      </div>
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
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-block pb-25">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Qualification") }}
                      </div>
                      <div class="main-body">
                        <ul class="style-none filter-input">
                          <li v-for="(item, index) in store.qualifications" :key="index">
                            <input
                              type="checkbox"
                              @change="store.setQualification(item.id)"
                              :checked="store.form.qualification === item.id"
                            />
                            <label>{{ item.title }}</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-block pb-25">
                      <div class="filter-title fw-500 text-dark">
                        {{ trans("Candidate Type") }}
                      </div>
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
                    <!-- /.filter-block -->
                  </div>
                  <div class="col-lg-3">
                    <div class="filter-title fw-500 text-dark">
                      {{ trans("Salary Range") }}
                    </div>
                    <div class="main-body">
                      <div class="salary-slider">
                        <div class="pt-5 price-input d-flex align-items-center">
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
                          <div
                            class="progress"
                            :style="{ right: inputRangePercentage }"
                          ></div>
                        </div>
                        <div class="mb-10 range-input">
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
                            :max="parseInt(store.highestSalaryAmount)"
                            step="1000"
                            @change="store.modified.salary = true"
                          />
                        </div>
                      </div>
                      <!-- /.filter-block -->
                    </div>
                  </div>

                  <div class="row">
                    <div class="m-auto col-xl-2">
                      <button
                        type="submit"
                        class="text-center text-white btn-ten fw-500 w-100 tran3s mt-30"
                      >
                        {{ trans("Apply Filter") }}
                      </button>
                      <button
                        type="button"
                        @click="store.clear"
                        class="text-center btn-nine fw-500 w-100 tran3s mt-30"
                      >
                        {{ trans("Clear Filter") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- /.filter-area-tab -->
      </div>
    </div>
  </div>
</template>
