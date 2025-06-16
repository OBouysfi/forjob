<script setup>
import trans from '@/Composables/transComposable'
defineProps(['home'])
</script>

<template>
  <section class="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last">
          <div class="ps-lg-4 wow fadeInRight">
            <div class="title-one">
              <h2 class="fw-600">{{ home.cta_s1?.title }}</h2>
            </div>
            <p class="md-mt-20 md-mb-20 text-md mb-40 mt-40">
              {{ home.cta_s1?.subtitle }}
            </p>
            <ul v-if="home.cta_s1?.features?.length" class="list-style-one style-none">
              <li v-for="(item, index) in home.cta_s1?.features.split(',')" :key="index">
                {{ item }}
              </li>
            </ul>
            <Link :href="home.cta_s1?.btn_link ?? '#'" class="btn-five border6 mt-70 md-mt-30">{{
              home.cta_s1?.btn_text ?? ''
            }}</Link>
          </div>
        </div>
        <div class="col-lg-7 col-md-8 order-lg-first m-auto">
          <div class="img-data position-relative me-xl-5 md-mt-20">
            <div class="row align-items-center gx-xl-5">
              <div class="col-6">
                <img
                  v-lazy="home.cta_s1?.image1"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInLeft"
                />
              </div>
              <div class="col-6">
                <img
                  v-lazy="home.cta_s1?.image2"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInDown"
                />
                <img
                  v-lazy="home.cta_s1?.image3"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInUp"
                />
              </div>
            </div>
            <img
              src="/assets/images/shape/shape_06.svg"
              alt="image"
              class="lazy-img shapes shape_02"
            />
            <img
              src="/assets/images/shape/shape_21.svg"
              alt="image"
              class="lazy-img shapes shape_03"
            />
            <a
              class="fancybox rounded-circle video-icon tran3s text-center"
              data-fancybox=""
              :href="`https://www.youtube.com/embed/${home.cta_s1?.video_id}`"
            >
              <i class="bi bi-play-fill"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="border-bottom pb-50 lg-pb-20 mt-90 lg-mt-30">
        <div class="row">
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center">
              <h2 class="main-count fw-500">
                {{ home.cta_s1?.item1 }}
              </h2>
              <p>{{ trans('Completed Jobs') }}</p>
            </div>
            <!-- /.counter-block-one -->
          </div>
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center" data-wow-delay="0.2s">
              <h2 class="main-count fw-500">
                {{ home.cta_s1?.item2 }}
              </h2>
              <p>{{ trans('Worldwide Client') }}</p>
            </div>
            <!-- /.counter-block-one -->
          </div>
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center" data-wow-delay="0.35s">
              <h2 class="main-count fw-500">
                {{ home.cta_s1?.item3 }}
              </h2>
              <p>{{ trans('Applied Jobs') }}</p>
            </div>
            <!-- /.counter-block-one -->
          </div>
        </div>
      </div>
      <!-- /.border-bottom -->
    </div>
  </section>
</template>
