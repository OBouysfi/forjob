<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import { computed } from 'vue'
import moment from 'moment'
const props = defineProps(['company', 'jobs', 'seo'])
import JobIntro from '../../Candidate/Partials/JobIntro.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'
defineOptions({ layout: DefaultLayout })
const meta = computed(() => props.company.meta)
const companyDetails = computed(() => meta.value.company)
const business = computed(() => meta.value.business)
const contact = computed(() => meta.value.contact)
const socials = computed(() => meta.value.social)
const shareLink = computed(() => window.location.origin + '/companies/' + props.company.username)

const hasValidLinks = () => {
  for (const key in socials.value) {
    if (socials.value[key] && socials.value[key] !== '') {
      return true
    }
  }
  return false
}
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb :title="companyDetails.name" href="/" :href-text="trans('Home')" :subtitle="companyDetails.name" />

  <!-- /.inner-banner-one -->

  <!-- 
		=============================================
			Company Details
		============================================== 
		-->
  <section class="company-details lg-pt-80 pb-160 xl-pb-150 lg-pb-80 pt-80">
    <div class="container">
      <div class="row">
        <div class="col-xxl-3 col-xl-4 order-xl-last">
          <div class="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
            <img
              v-lazy="
                company.avatar == null
                  ? `https://ui-avatars.com/api/?name=${company.name}`
                  : `${company.avatar}`
              "
              alt="img"
              class="m-auto lazy-img logo"
            />
            <div class="mb-20 text-center text-md text-dark mt-15 lg-mb-10">
              {{ companyDetails.name }}
            </div>
            <div class="text-center">
              <a
                v-if="business.site_url"
                :href="business.site_url"
                class="website-btn-two tran3s"
                target="_blank"
              >
                {{ trans('Visit our website') }}
              </a>
            </div>

            <div class="border-top mt-35 lg-mt-20 pt-25">
              <ul class="job-meta-data row style-none">
                <li class="col-12">
                  <span>{{ trans('Location') }} : </span>
                  <div>
                    {{ companyDetails.address }}, {{ company?.countries[0]?.name }},
                    {{ company?.states[0]?.name }}.
                  </div>
                </li>
                <li class="col-12">
                  <span> {{ trans('Size') }} :</span>
                  <div>{{ companyDetails.size }}+, {{ trans('Employees') }}</div>
                </li>
                <li class="col-12">
                  <span>{{ trans('Email') }}: </span>
                  <div>
                    <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                  </div>
                </li>
                <li class="col-12">
                  <span> {{ trans('Founded') }} : </span>
                  <div>{{ companyDetails.year_of_establishment }}</div>
                </li>
                <li v-if="contact.mobile" class="col-12">
                  <span> {{ trans('Phone') }} :</span>
                  <div>
                    <a href="#">{{ contact.mobile }}</a>
                  </div>
                </li>
                <li class="col-12">
                  <span>{{ trans('Category') }}: </span>
                  <div>
                    {{ company.service?.title }}
                  </div>
                </li>
                <li class="col-12" v-if="hasValidLinks()">
                  <span>{{ trans('Social') }}: </span>
                  <div>
                    <template v-for="(link, key) in socials" :key="key">
                      <a class="ms-2" v-if="link" :href="link" target="_blank">
                        <i class="bi" :class="`bi-${key}`"></i>
                      </a>
                    </template>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- /.job-company-info -->
        </div>
        <div class="col-xxl-9 col-xl-8 order-xl-first">
          <div class="details-post-data me-xxl-5 pe-xxl-4">
            <h3>{{ trans('Overview') }}</h3>
            <p>{{ business.description }}</p>

            <template v-if="meta?.company?.video_id">
              <h3 class="title">{{ trans('Intro') }}</h3>
              <div
                class="video-post d-flex align-items-center justify-content-center mt-25 lg-mt-20 mb-75 lg-mb-50"
                :style="{
                  backgroundImage: `url(https://img.youtube.com/vi/${meta?.company?.video_id}/sddefault.jpg)`
                }"
              >
                <a
                  class="text-center fancybox rounded-circle video-icon tran3s"
                  data-fancybox=""
                  :href="`https://www.youtube.com/embed/${meta?.company?.video_id}`"
                >
                  <i class="bi bi-play"></i>
                </a>
              </div>
            </template>
            <div class="position-relative" v-if="company.company_reviews?.length">
              <h3>{{ trans('Reviews') }}</h3>

              <div class="company-review-slider">
                <div v-for="(review, index) in company.company_reviews" :key="index" class="item">
                  <div class="feedback-block-four">
                    <div class="d-flex align-items-center">
                      <ul class="style-none d-flex rating">
                        <li v-for="(item, index) in review.ratting" :key="index">
                          <a href="#" tabindex="0"><i class="bi bi-star-fill"></i></a>
                        </li>
                      </ul>
                      <div class="review-score">
                        <span class="fw-500 text-dark">{{ review.ratting?.toFixed(1) }}</span>
                        {{ trans('out of 5') }}
                      </div>
                    </div>
                    <blockquote>
                      {{ review.comment }}
                    </blockquote>
                    <div class="d-flex align-items-center">
                      <img
                        :src="review.author?.avatar"
                        alt="img"
                        class="author-img rounded-circle"
                      />
                      <div class="ms-3">
                        <div class="name fw-500 text-dark">{{ review.author?.name }}</div>
                        <span class="opacity-50">{{
                          review.author?.countries[0]?.name ?? ''
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- /.feedback-block-four -->
                </div>
              </div>
            </div>

            <div class="share-option mt-60">
              <ul class="style-none d-flex align-items-center">
                <li class="fw-500 me-2">{{ trans('Share') }}:</li>
                <li>
                  <a
                    target="_blank"
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`"
                    ><i class="bi bi-facebook"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                </li>
                <li>
                  <a target="_blank" :href="`https://twitter.com/intent/tweet?url=${shareLink}`"
                    ><i class="bi bi-twitter"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./company-details -->

  <section class="company-open-position lg-pt-60 pb-100 lg-pb-60 pt-80" v-if="jobs?.length > 0">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-6">
          <div class="title-two">
            <h2>{{ trans('Open Position') }}</h2>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="d-flex justify-content-lg-end">
            <Link :href="route('jobs.index')" class="btn-six">{{ trans('Explore More') }}</Link>
          </div>
        </div>
      </div>
      <div class="mt-50">
        <div
          class="mb-20 job-list-one style-two position-relative"
          v-for="job in jobs"
          :key="job.id"
        >
          <div class="row justify-content-between align-items-center">
            <div class="col-xxl-3 col-lg-4">
              <div class="job-title d-flex align-items-center">
                <Link :href="route('jobs.show', job.slug)" class="logo"
                  ><img
                    v-lazy="
                      job.user?.avatar == null
                        ? `https://ui-avatars.com/api/?name=${job.user.name}`
                        : `${job.user?.avatar}`
                    "
                    alt="img"
                    class="m-auto lazy-img"
                /></Link>
                <Link :href="route('jobs.show', job.slug)" class="title fw-500 tran3s">{{
                  job.title
                }}</Link>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 ms-auto">
              <Link :href="route('jobs.show', job.slug)" class="job-duration fw-500">
                {{ job.type }}</Link
              >
              <div class="job-date">
                {{ moment(job.created).format('DD MMM, YYYY') }} {{ trans('by') }}
                <a :href="route('jobs.show', job.slug)">{{ company.name }}</a>
              </div>
            </div>
            <div class="col-xxl-2 col-lg-3 col-md-4 col-sm-6 xs-mt-10 ms-auto">
              <div class="job-location">
                <Link :href="route('jobs.show', job.slug)" v-if="JSON.parse(job.meta).is_remote">{{
                  trans('Remote')
                }}</Link>
                <Link :href="route('jobs.show', job.slug)" v-else>
                  {{ job.country ? job.country?.[0]?.name : '' }},
                  {{ job.state ? job.state?.[0]?.name : '' }}
                </Link>
              </div>
              <div class="job-category">
                <a
                  v-for="cat in job.categories"
                  :key="cat.id"
                  :href="route('jobs.index', { category: cat.slug })"
                  >{{ cat.title }},</a
                >
              </div>
            </div>
            <div class="col-lg-2 col-md-4">
              <div class="btn-group d-flex align-items-center justify-content-md-end sm-mt-20">
                <Link
                  :href="route('jobs.show', job.slug)"
                  class="text-center save-btn rounded-circle tran3s me-3"
                  title="Save Job"
                  ><i class="bi bi-bookmark-dash"></i
                ></Link>
                <Link :href="route('jobs.show', job.slug)" class="text-center apply-btn tran3s"
                  >{{ trans('APPLY') }}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <JobIntro />
</template>
