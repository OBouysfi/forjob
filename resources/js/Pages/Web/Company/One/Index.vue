<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import Paginate from '@/Components/WebPaginate.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import JobIntro from '../../Candidate/Partials/JobIntro.vue'
import SideFilterForm from '../Partials/SideFilterForm.vue'
import { useCompanyFilterStore } from '@/Store/companyFilterStore'
import Breadcrumb from '@/Components/Breadcrumb.vue'
import { onMounted } from 'vue'
defineOptions({ layout: DefaultLayout })
const props = defineProps(['companies', 'services', 'locations', 'seo', 'request'])

const filter = useCompanyFilterStore()

onMounted(() => {
  if (!filter.layout) {
    filter.setLayout('grid')
  }
})
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb
    :title="trans('Company')"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('Companies')"
  />

  <!-- /.inner-banner-one -->

  <section class="company-profiles pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
    <div class="container">
      <div class="row">
        <SideFilterForm :services="services" :request="request" :locations="locations" />

        <div class="col-xl-9 col-lg-8">
          <div class="ms-xxl-5 ms-xl-3">
            <div class="upper-filter d-flex justify-content-between align-items-center mb-20">
              <div class="total-job-found">
                {{ trans('All') }}
                <span class="text-dark fw-500">{{ companies.total }}</span>
                {{ trans(' company found') }}
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

            <div class="accordion-box grid-style" :class="[filter.layout == 'grid' ? 'show' : '']">
              <div class="row">
                <template v-for="company in companies.data" :key="company.id">
                  <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex">
                    <div class="company-grid-layout mb-30" :class="{ favourite: company.is_star }">
                      <Link
                        :href="`/companies/${company.username}`"
                        class="company-logo rounded-circle me-auto ms-auto"
                      >
                        <img
                          v-lazy="
                            company?.avatar == null
                              ? `https://ui-avatars.com/api/?name=${company.name}`
                              : `${company?.avatar}`
                          "
                          alt="avatar"
                          class="lazy-img rounded-circle"
                        />
                      </Link>
                      <h5 class="text-center">
                        <Link :href="`/companies/${company.username}`" class="company-name tran3s">
                          {{ company.meta.company.name }}
                        </Link>
                      </h5>
                      <p class="mb-auto text-center">
                        {{ company.states[0]?.name }}
                        ,
                        {{ company.countries[0]?.name }}
                      </p>
                      <div class="bottom-line d-flex">
                        <Link :href="`/companies/${company.username}`"
                          >{{ company.jobs_count }} {{ trans('Vacancy') }}
                        </Link>
                        <Link :href="`/companies/${company.username}`"
                          ><i class="bi bi-bookmark-dash"></i> {{ trans('Save') }}</Link
                        >
                      </div>
                    </div>
                    <!-- /.company-grid-layout -->
                  </div>
                </template>
              </div>
            </div>
            <!-- list style -->
            <div class="accordion-box list-style" :class="[filter.layout == 'list' ? 'show' : '']">
              <template v-for="company in companies.data" :key="company.id">
                <div class="company-list-layout mb-20" :class="{ favourite: company.is_star }">
                  <div class="row justify-content-between align-items-center">
                    <div class="col-xl-5">
                      <div class="d-flex align-items-xl-center">
                        <Link
                          :href="`/companies/${company.username}`"
                          class="company-logo rounded-circle"
                        >
                          <img
                            v-lazy="
                              company?.avatar == null
                                ? `https://ui-avatars.com/api/?name=${company.name}`
                                : `${company?.avatar}`
                            "
                            alt="avatar"
                            class="lazy-img rounded-circle"
                          />
                        </Link>
                        <div class="company-data">
                          <h5 class="m0">
                            <Link
                              :href="`/companies/${company.username}`"
                              class="company-name tran3s"
                            >
                              {{ company.meta.company.name }}
                            </Link>
                          </h5>
                          <p>
                            {{ company.states[0]?.name }}
                            ,
                            {{ company.countries[0]?.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4 col-md-8">
                      <div class="d-flex align-items-center ps-xxl-5 lg-mt-20">
                        <div class="d-flex align-items-center">
                          <template v-if="company.meta.company?.teams?.length > 0">
                            <img
                              v-for="team in company?.meta?.company?.teams"
                              :key="team"
                              v-lazy="team"
                              alt="img"
                              class="lazy-img rounded-circle team-img"
                            />
                          </template>
                          <template v-else>
                            <img
                              v-lazy="'/assets/images/assets/img_42.png'"
                              alt="img"
                              class="lazy-img rounded-circle team-img"
                            />
                            <img
                              v-lazy="'/assets/images/assets/img_43.png'"
                              alt="img"
                              class="lazy-img rounded-circle team-img"
                            />
                            <img
                              v-lazy="'/assets/images/assets/img_44.png'"
                              alt="img"
                              class="lazy-img rounded-circle team-img"
                            />
                          </template>
                          <div class="team-text">
                            <span class="text-md fw-500 text-dark d-block">
                              {{ company.meta.company.size }}
                            </span>
                            {{ trans(' Team Size') }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-4">
                      <div
                        class="btn-group d-flex align-items-center justify-content-md-end lg-mt-20"
                      >
                        <Link
                          :href="`/companies/${company.username}`"
                          class="open-job-btn fw-500 tran3s me-2 text-center"
                        >
                          {{ company.jobs_count }} {{ trans('open job') }}</Link
                        >
                        <Link
                          :href="`/companies/${company.username}`"
                          class="save-btn rounded-circle tran3s text-center"
                          title="Save Job"
                          ><i class="bi bi-bookmark-dash"></i
                        ></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <template v-if="companies.total > 0">
              <div class="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                <p class="m0 order-sm-last text-sm-start xs-pb-20 text-center">
                  {{ trans('Showing') }}
                  <span class="text-dark fw-500"
                    >{{ companies.from }} {{ trans('to') }} {{ companies.to }}</span
                  >
                  {{ trans('of') }}
                  <span class="text-dark fw-500">{{ companies.total }}</span>
                </p>
                <Paginate :links="companies.links" />
              </div>
            </template>

            <div class="alert alert-info mt-30 text-center" role="alert" v-else>
              {{ trans('No company found') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./company-profiles -->

  <JobIntro />
</template>
