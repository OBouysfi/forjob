<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import axios from 'axios'
import { onMounted } from 'vue'
import JobIntro from '../Partials/JobIntro.vue'
import moment from 'moment'
import sharedComposable from '@/Composables/sharedComposable'
import { useForm } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import InputFieldError from '@/Components/InputFieldError.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import Breadcrumb from '@/Components/Breadcrumb.vue'

defineOptions({ layout: DefaultLayout })
const { authUser, formatNumber } = sharedComposable()
const props = defineProps(['candidate', 'seo'])
const meta = props.candidate?.meta ?? {}

const form = useForm({
  body: '',
  email: props.candidate.email
})

const submit = () => {
  if (form.body) {
    form.post(route('employer.message.store'), {
      onSuccess: () => {
        notify.success('Message Send Successfully')
        form.body = ''
      }
    })
  }
}

onMounted(() => {
  axios.get(route('candidates.visit', props.candidate))

  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  $(document).ready(() => {
    if ($('.candidate-portfolio-slider').length) {
      $('.candidate-portfolio-slider').slick({
        dots: true,
        arrows: false,
        lazyLoad: 'ondemand',
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 2,
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
            breakpoint: 450,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      })
    }
  })
})

const candidate_reviews_avg_ratting = Math.round(props.candidate.candidate_reviews_avg_ratting ?? 0)
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb
    :title="candidate.name"
    href="/"
    :href-text="trans('Home')"
    :subtitle="candidate.name"
  />

  <!-- /.inner-banner-one -->

  <section class="candidates-profile pt-100 lg-pt-70 pb-150 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="col-xxl-9 col-lg-8">
          <div class="candidates-profile-details me-xxl-5 pe-xxl-4">
            <div class="inner-card border-style mb-65 lg-mb-40">
              <h3 class="title">{{ trans('Overview') }}</h3>
              <p>{{ meta.overview }}</p>
            </div>
            <!-- /.inner-card -->

            <template v-if="meta?.video_id">
              <h3 class="title">{{ trans('Intro') }}</h3>
              <div
                class="video-post d-flex align-items-center justify-content-center mt-25 lg-mt-20 mb-75 lg-mb-50"
                :style="{
                  backgroundImage: `url(https://img.youtube.com/vi/${meta?.video_id}/sddefault.jpg)`
                }"
              >
                <a
                  class="fancybox rounded-circle video-icon tran3s text-center"
                  data-fancybox=""
                  :href="`https://www.youtube.com/embed/${meta?.video_id}`"
                >
                  <i class="bi bi-play"></i>
                </a>
              </div>
            </template>

            <div class="inner-card border-style mb-75 lg-mb-50">
              <h3 class="title">{{ trans('Education') }}</h3>
              <div class="time-line-data position-relative pt-15">
                <div
                  class="info position-relative"
                  v-for="(item, index) in candidate.educations ?? []"
                  :key="index"
                >
                  <div
                    class="numb fw-500 rounded-circle d-flex align-items-center justify-content-center"
                  >
                    {{ index + 1 }}
                  </div>
                  <p>
                    {{ item.start_at }}
                    {{ item.pass_year ? 'to ' + item.pass_year : 'to continue' }}
                  </p>
                  <div class="text_1 fw-500">{{ item.institute_name }} ({{ item.degree }})</div>
                  <p v-if="!item.is_current">
                    {{ item.result?.toFixed(2) + trans(' out of ') + item.out_of }}
                  </p>
                </div>
              </div>
            </div>
            <!-- /.inner-card -->
            <div class="inner-card border-style mb-75 lg-mb-50">
              <h3 class="title">{{ trans('Skills') }}</h3>
              <ul class="style-none skill-tags d-flex pb-25 flex-wrap">
                <li v-for="(item, index) in candidate.skills ?? []" :key="index">
                  {{ item.title }}
                </li>
                <li v-if="candidate.skills.length > 10" class="more">
                  {{ candidate.skills.length - 10 }}+
                </li>
              </ul>
            </div>
            <!-- /.inner-card -->
            <div
              class="inner-card border-style lg-mb-50 mb-60"
              v-if="meta.work_experiences?.length"
            >
              <h3 class="title">{{ trans('Work Experience') }}</h3>
              <div class="time-line-data position-relative pt-15">
                <div
                  v-for="(item, index) in meta.work_experiences"
                  :key="index"
                  class="info position-relative"
                >
                  <div
                    class="numb fw-500 rounded-circle d-flex align-items-center justify-content-center"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="fw-500" :class="'text_' + (index + 1)">
                    {{ moment(item.from).format('MMM YYYY') }}
                    {{
                      item.is_current || item.to == null
                        ? 'to till now'
                        : 'to ' + moment(item.to).format('MMM YYYY')
                    }}
                  </div>
                  <h4>{{ item.designation }} ({{ item.org_name }})</h4>
                  <p>{{ item.responsibilities }}</p>
                </div>
              </div>
            </div>
            <!-- /.inner-card -->

            <template v-if="candidate.portfolios?.length">
              <h3 class="title">{{ trans('Portfolio') }}</h3>
              <div class="candidate-portfolio-slider">
                <div class="item" v-for="(item, index) in candidate.portfolios" :key="index">
                  <img
                    v-lazy="item.preview"
                    alt="preview"
                    class="w-100"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    :title="item.title"
                  />
                </div>
              </div>
            </template>

            <div class="mt-30 position-relative" v-if="candidate.candidate_reviews?.length">
              <h3 class="fw-bold mb-20">{{ trans('Reviews') }}</h3>

              <div class="candidate-review-slider">
                <div
                  v-for="(review, index) in candidate.candidate_reviews"
                  :key="index"
                  class="item"
                >
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
                        v-lazy="
                          review.company?.avatar == null
                            ? `https://ui-avatars.com/api/?name=${review.company?.name}`
                            : `${review.company?.avatar}`
                        "
                        alt="img"
                        class="author-img rounded-circle"
                      />
                      <div class="ms-3">
                        <div class="name fw-500 text-dark">
                          {{ review.company?.name }}
                        </div>
                        <span class="opacity-50">{{
                          review.company?.countries[0]?.name ?? ''
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- /.feedback-block-four -->
                </div>
              </div>
            </div>
          </div>
          <!-- /.candidates-profile-details -->
        </div>
        <div class="col-xxl-3 col-lg-4">
          <div class="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
            <div class="cadidate-bio bg-wrapper bg-color md-mb-40 mb-60">
              <div class="pt-25">
                <div class="cadidate-avatar m-auto">
                  <img
                    v-lazy="
                      candidate?.avatar == null
                        ? `https://ui-avatars.com/api/?name=${candidate.name}`
                        : `${candidate?.avatar}`
                    "
                    alt="img"
                    class="lazy-img rounded-circle w-100"
                  />
                </div>
              </div>
              <h3 class="cadidate-name text-center">{{ candidate.name }}</h3>

              <ul class="style-none">
                <li>
                  <span>{{ trans('Location') }}: </span>
                  <div>{{ candidate.state ?? '' }} , {{ candidate.country ?? '' }}</div>
                </li>
                <li>
                  <span>{{ trans('Date of Birth') }}: </span>
                  <div>{{ moment(meta.date_of_birth).format('DD-MMM-YYYY') }}</div>
                </li>

                <li>
                  <span>{{ trans('Qualification') }}: </span>
                  <div>{{ candidate.currentEducationDegree }}</div>
                </li>
                <li>
                  <span>{{ trans('Gender') }}: </span>
                  <div class="text-capitalize">{{ meta.gender }}</div>
                </li>
                <li>
                  <span>{{ trans('Expected Salary') }}: </span>
                  <div v-if="meta?.expected_salary && meta?.expected_salary > 1">
                    {{ formatNumber(meta.expected_salary) }}/ {{ meta.currency }}
                  </div>
                  <div v-else>{{ trans('Negotiable') }}</div>
                </li>
                <li v-if="candidate_reviews_avg_ratting > 0">
                  <span>{{ trans('Rating') }}: </span>
                  <div>
                    <div class="d-flex gap-1">
                      <span
                        v-for="(item, index) in Math.round(
                          candidate.candidate_reviews_avg_ratting ?? 0
                        )"
                        :key="index"
                      >
                        <i class="bi bi-star-fill text-warning"></i>
                      </span>
                    </div>
                  </div>
                </li>

                <li v-if="candidate.hasSocial">
                  <span>{{ trans('Social') }}:</span>
                  <div>
                    <a
                      v-if="meta?.social?.facebook"
                      :href="meta?.social?.facebook ?? '#'"
                      class="me-3"
                      ><i class="bi bi-facebook"></i
                    ></a>
                    <a
                      v-if="meta?.social?.instagram"
                      :href="meta?.social?.instagram ?? '#'"
                      class="me-3"
                      ><i class="bi bi-instagram"></i
                    ></a>
                    <a
                      v-if="meta?.social?.twitter"
                      :href="meta?.social?.twitter ?? '#'"
                      class="me-3"
                      ><i class="bi bi-twitter"></i
                    ></a>
                    <a v-if="meta?.social?.linkedin" :href="meta?.social?.linkedin ?? '#'"
                      ><i class="bi bi-linkedin"></i
                    ></a>
                  </div>
                </li>
              </ul>
              <a
                v-if="meta.custom_cv"
                :href="meta.custom_cv"
                download=""
                class="btn-ten fw-500 w-100 tran3s mt-15 text-center text-white"
                >{{ trans('Download CV') }}</a
              >
            </div>
            <!-- /.cadidate-bio -->
            <h4 class="sidebar-title">{{ trans('Location') }}</h4>
            <div class="map-area md-mb-40 mb-60">
              <div class="gmap_canvas h-100 w-100">
                <iframe
                  class="gmap_iframe h-100 w-100"
                  :src="`https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${candidate.state},${candidate.country}&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
                ></iframe>
              </div>
            </div>

            <template v-if="authUser && authUser.role == 'employer'">
              <h4 class="sidebar-title">{{ trans('Send Message') }}</h4>

              <div v-if="candidate.mgs_blocked">
                {{ trans("You can't not send message") }}
              </div>

              <div v-else class="email-form bg-wrapper bg-color">
                <p>{{ trans('Send direct message to this candidate.') }}</p>
                <form @submit.prevent="submit">
                  <div class="d-sm-flex mb-25">
                    <label for="">{{ trans('Name') }}</label>
                    <input type="text" :value="authUser.name" disabled />
                  </div>
                  <div class="d-sm-flex">
                    <label for="">{{ trans('Message') }}</label>
                    <textarea v-model="form.body"></textarea>
                  </div>
                  <InputFieldError class="mb-5" :message="form.errors.body" />
                  <div class="d-sm-flex mt-20">
                    <SpinnerBtn
                      type="submit"
                      :processing="form.processing"
                      classes="btn-ten fw-500 d-flex align-items-center justify-content-center w-100 tran3s text-center text-white"
                      :btn-text="trans('Send ')"
                    />
                  </div>
                </form>
              </div>
            </template>
          </div>
          <!-- /.cadidate-profile-sidebar -->
        </div>
      </div>
    </div>
  </section>
  <!-- /.candidates-profile -->

  <JobIntro />
</template>
