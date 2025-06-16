<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import FeatureSection from "@/Pages/Web/Home/One/Partials/FeatureSection.vue";
import FeedbackSection from "@/Pages/Web/Home/One/Partials/FeedbackSection.vue";
import JobIntro from "@/Pages/Web/Candidate/Partials/JobIntro.vue";
import { Head } from "@inertiajs/vue3";
import Breadcrumb from "@/Components/Breadcrumb.vue";
defineOptions({ layout: DefaultLayout });
const { about, home, seo } = defineProps(["about", "home", "seo"]);
</script>

<template>
  <Head :title="seo.site_name" />

  <Breadcrumb
    :title="trans('About us')"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('About')"
  />
  <!-- /.inner-banner-one -->

  <section class="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
    <div class="container">
      <div class="row">
        <div class="m-auto col-xxl-11">
          <div class="row">
            <div class="col-lg-5">
              <div class="title-one mt-30 md-mb-40">
                <h2 class="fw-500">{{ about.cta_s1.title }}</h2>
              </div>
            </div>
            <div class="col-lg-6 ms-auto">
              <div class="wow fadeInRight">
                <div
                  class="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4"
                  id="accordionOne"
                >
                  <div
                    v-for="(item, index) in about.cta_s1.features"
                    :key="index"
                    class="accordion-item"
                  >
                    <div class="accordion-header" :id="`item${index}`">
                      <button
                        class="accordion-button"
                        :class="{ collapsed: index != 0 }"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="`#collapse${index}`"
                        aria-expanded="false"
                        :aria-controls="`collapse${index}`"
                      >
                        {{ item.title }}
                      </button>
                    </div>
                    <div
                      :id="`collapse${index}`"
                      class="accordion-collapse collapse"
                      :class="{ show: index == 0 }"
                      data-bs-parent="#accordionOne"
                    >
                      <div class="accordion-body">
                        <p>{{ item.body }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="video-post d-flex align-items-center justify-content-center mt-100 lg-mt-50 mb-50 lg-mb-30"
            :style="{ backgroundImage: `url(${about.video_s1.image})` }"
          >
            <a
              class="text-center fancybox rounded-circle video-icon tran3s"
              data-fancybox=""
              :href="about.video_s1.link"
            >
              <i class="bi bi-play"></i>
            </a>
          </div>
          <div class="border-bottom pb-50 lg-pb-10">
            <div class="row">
              <div class="col-sm-4">
                <div class="text-center counter-block-one mt-25 wow fadeInUp">
                  <h2 class="main-count fw-500">
                    {{ about.video_s1.completed_jobs }}
                  </h2>
                  <p>{{ trans("Completed Jobs") }}</p>
                </div>
                <!-- /.counter-block-one -->
              </div>
              <div class="col-sm-4">
                <div
                  class="text-center counter-block-one mt-25 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <h2 class="main-count fw-500">
                    {{ about.video_s1.clients }}
                  </h2>
                  <p>{{ trans("Worldwide Client") }}</p>
                </div>
                <!-- /.counter-block-one -->
              </div>
              <div class="col-sm-4">
                <div
                  class="text-center counter-block-one mt-25 wow fadeInUp"
                  data-wow-delay="0.35s"
                >
                  <h2 class="main-count fw-500">
                    {{ about.video_s1.applied_jobs }}
                  </h2>
                  <p>{{ trans("Applied Jobs") }}</p>
                </div>
                <!-- /.counter-block-one -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /.text-feature-three -->

  <section
    class="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-5 order-lg-last">
          <div class="ps-xxl-4 wow fadeInRight">
            <div class="title-one">
              <h2>{{ about.cta_s2.title }}</h2>
            </div>
            <p class="mt-40 mb-40 md-mt-20 md-mb-20">
              {{ about.cta_s2.subtitle }}
            </p>
            <ul v-if="about.cta_s2?.features?.length" class="list-style-one style-none">
              <li v-for="item in about.cta_s2.features.split(',')" :key="item">
                {{ item }}
              </li>
            </ul>
            <a :href="about.cta_s2.btn_link" class="btn-one lg mt-50 md-mt-30">{{
              about.cta_s2.btn_text
            }}</a>
          </div>
        </div>
        <div class="m-auto col-lg-7 col-md-11 order-lg-first">
          <div class="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
            <div class="row">
              <div class="col-md-6 col-sm-8 col-10">
                <img v-lazy="about.cta_s2.image1" alt="image" class="lazy-img img01" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-5">
                <img
                  v-lazy="about.cta_s2.image2"
                  alt="image"
                  class="lazy-img img02 mt-35"
                />
              </div>
              <div class="col-md-6 col-7">
                <img
                  v-lazy="about.cta_s2.image3"
                  alt="image"
                  class="lazy-img img01 mt-35"
                />
              </div>
            </div>
            <img
              v-lazy="about.cta_s2.image4"
              alt="image"
              class="lazy-img shapes screen01 wow fadeInRight"
            />
            <img
              v-lazy="about.cta_s2.image5"
              alt="image"
              class="lazy-img shapes screen02 wow fadeInUp"
            />
            <img
              v-lazy="about.cta_s2.image6"
              alt="image"
              class="lazy-img shapes screen03 wow fadeInUp"
            />
            <img
              src="/assets/images/shape/shape_06.svg"
              alt="image"
              class="lazy-img shapes shape_01"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <FeatureSection />
  <FeedbackSection />
  <JobIntro />
</template>
