<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import Paginate from "@/Components/WebPaginate.vue";
import InnerBanner from "@/Pages/Web/Job/Partials/InnerBanner.vue";
import JobIntro from "@/Pages/Web/Candidate/Partials/JobIntro.vue";
import FilterForm from "./Partials/FilterForm.vue";
import { useJobFiltersStore } from "@/Store/jobFilterStore";
import NiceSelect from "@/Components/NiceSelect.vue";
import sharedComposable from "@/Composables/sharedComposable";
const { formatNumber, textExcerpt } = sharedComposable();
defineOptions({ layout: DefaultLayout });
defineProps([
  "openings",
  "locations",
  "jobTypes",
  "JobExperiences",
  "categories",
  "tags",
  "seo",
  "currencies",
  "request",
  "maxSalary",
]);
const filter = useJobFiltersStore();
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
              class="upper-filter d-flex justify-content-between align-items-start align-items-sm-center mb-30"
            >
              <div class="d-sm-flex align-items-center">
                <button
                  type="button"
                  class="filter-btn fw-500 tran3s me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#filterPopUp"
                >
                  <i class="bi bi-funnel"></i>
                  {{ trans("Filter") }}
                </button>
                <div class="total-job-found xs-mt-10">
                  {{ trans("All") }}
                  <span class="text-dark fw-500">{{ openings.total }}</span>
                  {{ trans("jobs found") }}
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="short-filter d-flex align-items-center">
                  <div class="text-dark fw-500 me-2">{{ trans("Sort") }}:</div>
                  <NiceSelect
                    v-model="filter.filterForm.sort"
                    valueBy="order"
                    label="name"
                    :options="filter.sorts"
                    @change="filter.submit"
                    :placeholder="trans('Default')"
                  />
                </div>
              </div>
            </div>
            <!-- /.upper-filter -->
            <div class="wrapper">
              <div class="row">
                <div class="col-lg-6 mb-30" v-for="job in openings.data" :key="job.id">
                  <div
                    class="job-list-three d-flex h-100 w-100"
                    :class="{ favourite: job.featured_expire_at }"
                  >
                    <div class="main-wrapper h-100 w-100">
                      <button
                        type="button"
                        @click="filter.toggleBookmark(job)"
                        class="text-center save-btn rounded-circle tran3s"
                        :class="{ 'bg-success': job.is_bookmarked }"
                        title="Save Job"
                      >
                        <i class="bi bi-bookmark-dash"></i>
                      </button>
                      <div class="list-header d-flex align-items-center">
                        <Link :href="route('jobs.show', job.slug)" class="logo"
                          ><img
                            v-lazy="
                              job.user?.avatar == null
                                ? `https://ui-avatars.com/api/?name=${job.user.name}`
                                : `${job.user?.avatar}`
                            "
                            alt="avatar"
                            class="m-auto lazy-img"
                        /></Link>
                        <div class="info-wrapper">
                          <Link
                            :href="route('jobs.show', job.slug)"
                            class="title fw-500 tran3s"
                            >{{ job.title }}</Link
                          >
                          <ul class="flex-wrap style-none d-flex info-data">
                            <li
                              v-if="
                                job.salary_range &&
                                job.salary_range.split('-')[0] > 0 &&
                                job.salary_range.split('-')[1] > 0
                              "
                            >
                              {{ formatNumber(job.salary_range.split("-")[0]) }}
                              -
                              {{ formatNumber(job.salary_range.split("-")[1]) }}
                              /{{ job.salary_type }}
                            </li>
                            <li v-else>
                              {{ trans("Negotiable ") }}/{{ job.salary_type }}
                            </li>
                            <li>{{ job.expertise }}</li>
                            <li  v-if="!job.country?.[0]?.name">
                              {{ trans("Remote") }}
                            </li>
                            <li v-else>
                              {{ job.country?.[0]?.name }},{{ job.state?.[0]?.name }}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- ./.list-header -->
                      <div v-html="textExcerpt(job.short_description, 200)"></div>
                      <div
                        class="mt-auto d-sm-flex align-items-center justify-content-between"
                      >
                        <div class="d-flex align-items-center">
                          <img src="/assets/images/icon/icon_51.svg" alt="" />
                          <span class="fw-500 client-status">
                            {{ trans("Verified Client") }} .</span
                          >
                          <Link
                            :href="route('jobs.show', job.slug)"
                            class="job-duration fw-500"
                            >{{ job.type }}</Link
                          >
                        </div>
                        <Link
                          :href="route('jobs.show', job.slug)"
                          class="text-center apply-btn tran3s xs-mt-20"
                          >{{ trans("Details") }}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="!openings.total"
              class="text-center alert alert-info mt-30"
              role="alert"
            >
              {{ trans("No jobs found") }}
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
