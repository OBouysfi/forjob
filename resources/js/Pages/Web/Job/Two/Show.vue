<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import sharedComposable from '@/Composables/sharedComposable'
import moment from 'moment'
import { computed } from 'vue'
import JobIntro from '../../Candidate/Partials/JobIntro.vue'
import trans from '@/Composables/transComposable'
import JobApplicationModal from '@/Pages/Web/Job/Partials/JobApplyModal.vue'
import { useThemeLoaderStore } from '@/Store/themeLoaderStore'
const themeLoader = useThemeLoaderStore()

defineOptions({ layout: DefaultLayout })
const props = defineProps(['job', 'jobs', 'alreadyApplied', 'seo'])

const { authUser, formatNumber } = sharedComposable()
const socials = computed(() => props.job.user?.meta.social)
const breadcrumbColor = computed(() => {
  const themes = ['One', 'Six']
  if (themes.includes(themeLoader.theme)) {
    return ''
  }
  return 'inner-breadcrumb-colors'
})
</script>

<template>
  <Seo :metaData="seo" />
  <div class="inner-banner-one position-relative" :class="breadcrumbColor">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="m-auto text-center col-xl-8">
            <div class="post-date">
              {{ moment(job.updated_at).format('D MMM, YYYY') }} by
              <Link class="fw-500" :href="route('companies.show', job.user.username)">
                {{ job.user.meta.company.name }}
              </Link>
            </div>
            <div class="title-two">
              <h2>{{ job.title }}</h2>
            </div>
            <ul class="flex-wrap mt-10 share-buttons d-flex justify-content-center style-none">
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
          </div>
        </div>
      </div>
    </div>
    <img src="/assets/images/shape/shape_02.svg" alt="" class="lazy-img shapes shape_01" />
    <img src="/assets/images/shape/shape_03.svg" alt="" class="lazy-img shapes shape_02" />
  </div>
  <!-- /.inner-banner-one -->

  <section class="job-details style-two pt-100 lg-pt-80 pb-130 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="m-auto col-xxl-9 col-xl-10">
          <div class="details-post-data ps-xxl-4 pe-xxl-4">
            <ul
              class="flex-wrap job-meta-data-two d-flex justify-content-center justify-content-lg-between style-none"
            >
              <div class="text-center bg-white bg-wrapper">
                <img src="/assets/images/icon/icon_52.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Salary') }}</span>
                <div>
                  <template
                    v-if="
                      job.salary_range &&
                      job.salary_range.split('-')[0] > 0 &&
                      job.salary_range.split('-')[1] > 0
                    "
                  >
                    {{ formatNumber(job.salary_range.split('-')[0],1) }}
                    -
                    {{ formatNumber(job.salary_range.split('-')[1],1) }}/{{ job.currency }}
                  </template>
                  <template v-else>{{ trans('Negotiable ') }} </template>
                  <br>
                  {{ job.salary_type }}
                </div>
              </div>
              <div class="text-center bg-white bg-wrapper">
                <img src="/assets/images/icon/icon_53.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Expertise') }}</span>
                <div>{{ job.expertise }}</div>
              </div>
              <div class="text-center bg-white bg-wrapper" v-if="JSON.parse(job.meta).is_remote">
                <img src="/assets/images/icon/icon_54.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Location') }}</span>
                <div>{{ trans('Remote') }}</div>
              </div>
              <div class="text-center bg-white bg-wrapper" v-else>
                <img src="/assets/images/icon/icon_54.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Location') }}</span>
                <div>{{ job.country?.[0]?.name }}, {{ job.state?.[0]?.name }}</div>
              </div>
              <div class="text-center bg-white bg-wrapper">
                <img src="/assets/images/icon/icon_55.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Job Type') }}</span>
                <div>{{ job.type }}</div>
              </div>
              <div class="text-center bg-white bg-wrapper">
                <img src="/assets/images/icon/icon_56.svg" alt="" class="m-auto lazy-img icon" />
                <span>{{ trans('Experience') }}</span>
                <div>{{ job.experience }}</div>
              </div>
            </ul>

            <div class="post-block mt-50 lg-mt-40">
              <h4 class="block-title">{{ trans('Overview') }}</h4>
              <p>
                {{ job.short_description }}
              </p>
            </div>
            <div class="post-block lg-mt-40 mt-60">
              <h4 class="block-title">{{ trans('Job Description') }}</h4>
              <div v-html="job.description" class="mt-30"></div>
            </div>

            <div class="post-block mt-55 lg-mt-40">
              <h4 class="block-title">{{ trans('Required Skills') }}:</h4>
              <ul class="list-type-two style-none mb-15">
                <li v-for="tag in job.tags" :key="tag.id">{{ tag.title }}</li>
              </ul>
            </div>

            <div v-if="job.attachment" class="post-block mt-55 lg-mt-40">
              <h4 class="block-title">{{ trans('Attachments') }}:</h4>
              <div class="gap-2 mt-10 d-flex align-items-center">
                <img
                  height="15"
                  src="https://cdn-icons-png.flaticon.com/128/154/154843.png"
                  alt=""
                />
                <a class="btn btn-link" target="_blank" :href="job.attachment">{{
                  trans('Attachment')
                }}</a>
              </div>
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
              <!-- email -->
           
              <!-- external -->
              <div v-if="job.apply_type == 2">
                <a :href="job.meta.apply_type.value" target="_blank"
                  ><i class="bx bx-link-external"></i> {{ trans('Apply Now') }}</a
                >
              </div>

              <button
                v-else
                data-bs-toggle="modal"
                data-bs-target="#applyModal"
                class="text-center text-white btn-ten fw-500 tran3s mt-30"
              >
                {{ trans('Apply for this position') }}
              </button>
            </div>
            <div v-else class="mt-3 text-center">
              <Link class="btn-five" :href="route('login')">
                {{ trans('Login To Apply') }}
              </Link>
            </div>
          </div>
          <!-- /.details-post-data -->
        </div>
      </div>
    </div>
  </section>

  <JobApplicationModal :job="job" />

  <JobIntro />
</template>
