<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import sharedComposable from '@/Composables/sharedComposable'
import JobsItemGrid from '@/Components/Job/JobsItemGrid.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'
import moment from 'moment'
import { computed, onMounted } from 'vue'
import JobIntro from '../../Candidate/Partials/JobIntro.vue'
import trans from '@/Composables/transComposable'

import JobApplicationModal from '@/Pages/Web/Job/Partials/JobApplyModal.vue'

defineOptions({ layout: DefaultLayout })

const props = defineProps(['job', 'jobs', 'alreadyApplied', 'seo'])

const { authUser, formatNumber } = sharedComposable()
const socials = computed(() => props.job.user?.meta.social)


onMounted(() => {
  if ($('.related-job-slider').length) {
    $('.related-job-slider').slick({
      dots: false,
      arrows: true,
      lazyLoad: 'ondemand',
      prevArrow: $('.prev_e'),
      nextArrow: $('.next_e'),
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }

})

</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb
    :title="job.title"
    :href="route('companies.show', job.user.username)"
    :href-text="job.user.meta.company.name"
    :subtitle="job.title"
  />
  <!-- /.inner-banner-one -->

  <section class="job-details lg-pt-60 pb-130 lg-pb-80 pt-60">
    <div class="container">
      <div class="row">
        <div class="col-xxl-9 col-xl-8">
          <div class="details-post-data me-xxl-5 pe-xxl-4">
            <div class="post-date">
              {{ moment(job.updated_at).format('D MMM YYYY') }} by
              <Link :href="route('companies.show', job.user.username)" class="fw-500 text-dark">
                {{ job.user.meta.company.name }}
              </Link>
            </div>
            <h3 class="post-title">{{ job.title }}</h3>
            <ul class="flex-wrap share-buttons d-flex style-none">
              <template v-for="(social, key) in socials" :key="key">
                <li v-if="social">
                  <a
                    :href="social"
                    target="_blank"
                    class="d-flex align-items-center justify-content-center"
                  >
                    <i class="bi" :class="`bi-${key}`"></i>
                    <span>{{ key }}</span>
                  </a>
                </li>
              </template>
            </ul>

            <div class="post-block border-style mt-50 lg-mt-30">
              <div class="d-flex align-items-center">
                <div class="text-center text-white block-numb fw-500 rounded-circle me-2">1</div>
                <h4 class="block-title">{{ trans('Overview') }}</h4>
              </div>
              <p>
                {{ job.short_description }}
              </p>
              <div v-if="job.attachment" class="gap-2 d-flex align-items-center">
                <img
                  height="15"
                  src="https://cdn-icons-png.flaticon.com/128/154/154843.png"
                  alt=""
                />
                <a target="_blank" :href="job.attachment">{{ trans('Attachment') }}</a>
              </div>
            </div>
            <div class="post-block border-style mt-30">
              <div class="d-flex align-items-center">
                <div class="text-center text-white block-numb fw-500 rounded-circle me-2">2</div>
                <h4 class="block-title">{{ trans('Job Description') }}</h4>
              </div>

              <div v-html="job.description" class="mt-30"></div>
            </div>
            <div class="post-block border-style mt-30">
              <div class="d-flex align-items-center">
                <div class="text-center text-white block-numb fw-500 rounded-circle me-2">3</div>
                <h4 class="block-title">{{ trans('Required Skills') }}:</h4>
              </div>
              <ul class="list-type-two style-none mb-15">
                <li v-for="tag in job.tags" :key="tag.id">{{ tag.title }}</li>
              </ul>
            </div>
          </div>
          <!-- /.details-post-data -->
        </div>

        <div class="col-xxl-3 col-xl-4">
          <div class="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
            <img
              v-lazy="
                job.user?.avatar == null
                  ? `https://ui-avatars.com/api/?name=${job.user.name}`
                  : `${job.user?.avatar}`
              "
              alt="avatar"
              class="m-auto lazy-img logo"
            />
            <div class="mb-20 text-center text-md text-dark mt-15">
              <Link :href="route('companies.show', job.user.username)">
                {{ job.user.meta.company.name }}
              </Link>
            </div>
            <a
              v-if="job.user.meta.business.site_url"
              target="_blank"
              :href="job.user.meta.business.site_url"
              class="website-btn tran3s"
              >{{ trans('Visit website') }}</a
            >

            <div class="pt-40 mt-40 border-top">
              <ul class="job-meta-data row style-none">
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Salary') }}</span>
                  <div>
                    <template
                      v-if="
                        job.salary_range &&
                        job.salary_range.split('-')[0] > 0 &&
                        job.salary_range.split('-')[1] > 0
                      "
                    >
                      {{ formatNumber(job.salary_range.split('-')[0],0) }}
                      -
                      {{ formatNumber(job.salary_range.split('-')[1],0) }}
                    </template>
                    <template v-else>{{ trans('Negotiable ') }} </template>
                  </div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Currency') }}</span>
                  <div>{{ job.currency }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Duration') }}</span>
                  <div>{{ job.salary_type }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Expertise') }}</span>
                  <div>{{ job.expertise }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6" v-if="JSON.parse(job.meta).is_remote != '0' || JSON.parse(job.meta).is_remote != false">
                  <span>{{ trans('Location') }}</span>
                  <div>{{ trans('Remote') }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6" v-else>
                  <span>{{ trans('Location') }}</span>
                  <div>{{ job.country?.[0]?.name }}, {{ job.state?.[0]?.name }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Job Type') }}</span>
                  <div>{{ job.type }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Date') }}</span>
                  <div>{{ moment(job.updated_at).format('D MMM, YYYY') }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Experience') }}</span>
                  <div>{{ job.experience }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Category') }}</span>
                  <div>{{ job.service?.title }}</div>
                </li>
                <li class="col-xl-6 col-md-4 col-sm-6">
                  <span>{{ trans('Deadline') }}</span>
                  <div>{{ moment(job.expire_at).format('D MMM, YYYY') }}</div>
                </li>
              </ul>

              <div class="flex-wrap job-tags d-flex pt-15">
                <Link :href="`/job-category/${tag.slug}`" v-for="tag in job.tags" :key="tag.id">{{
                  tag.title
                }}</Link>
              </div>

              <div v-if="authUser && authUser.role != 'user'" class="mt-3 text-center"></div>

              <div v-else-if="alreadyApplied" class="mt-3 text-center">
                <button type="button" class="px-3 py-2 btn-eight text-danger" disabled>
                  {{ trans('Already Applied') }}
                </button>
              </div>

              <div v-else-if="job.is_expired" class="mt-3 text-center">
                <p class="text-danger fw-bold">
                  {{ trans('Deadline Expired') }}
                </p>
              </div>

              <div v-else-if="authUser">
                <!-- external -->
                <div v-if="job.apply_type == 2">
                  <a :href="JSON.parse(job.meta).apply_type?.value" class="btn-one w-100 mt-25"  target="_blank"
                    ><i class="bx bx-link-external"></i> {{ trans('Apply Now') }}</a
                  >
                </div>
                <button
                  v-else
                  class="btn-one w-100 mt-25"
                  data-bs-toggle="modal"
                  data-bs-target="#applyModal"
                >
                  {{ trans('Apply Now') }}
                </button>
              </div>
              <div v-else class="mt-3 text-center">
                <Link class="btn-five" :href="route('login')">
                  {{ trans('Login To Apply') }}
                </Link>
              </div>
            </div>
          </div>
          <!-- /.job-company-info -->
        </div>
      </div>
    </div>
  </section>

  <JobApplicationModal :job="job" />

  <section class="related-job-section pt-90 lg-pt-70 pb-120 lg-pb-70" v-if="jobs?.length > 0">
    <div class="container">
      <div class="position-relative">
        <div class="text-center title-three text-md-start mb-55 lg-mb-40">
          <h2 class="main-font">{{ trans('Related Jobs') }}</h2>
        </div>

        <div class="related-job-slider">
          <JobsItemGrid :col="4" :items="jobs" />
        </div>

        <ul
          v-if="jobs?.length > 3"
          class="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20"
        >
          <li class="prev_e slick-arrow"><i class="bi bi-arrow-left"></i></li>
          <li class="next_e slick-arrow"><i class="bi bi-arrow-right"></i></li>
        </ul>
      </div>
    </div>
  </section>

  <JobIntro />
</template>
