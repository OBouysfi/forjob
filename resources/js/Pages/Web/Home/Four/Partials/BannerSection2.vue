<script setup>
defineProps(['home'])
</script>

<template>
  <section class="fancy-banner-four mt-180 xl-mt-150 lg-mt-100">
    <div class="container">
      <div class="bg-wrapper position-relative wow fadeInUp">
        <div class="row">
          <div class="col-lg-6 order-lg-last ms-auto">
            <div class="text-wrapper wow fadeInRight">
              <div class="title-one mb-45 lg-mb-30">
                <h2 class="text-white">{{ home.cta_s1.title }}</h2>
              </div>
              <p class="text-md mb-55 lg-mb-30 text-white">{{ home.cta_s1.subtitle }}</p>

              <a
                :href="home.cta_s1.btn_link"
                class="find-job-btn d-flex align-items-center text-white"
              >
                <span class="fw-500">{{ home.cta_s1.btn_text }}</span>
                <span class="ms-1">
                  <u>{{ trans('Explore all') }}</u></span
                >
                <span class="ms-auto"><i class="bi bi-chevron-right"></i></span>
              </a>
            </div>
          </div>
          <div class="col-lg-6 order-lg-first">
            <div
              class="img-meta me-xl-4 position-relative"
              :style="{ backgroundImage: `url(${home.cta_s1.image1})` }"
            >
              <img
                src="/assets/images/lazy.svg"
                v-lazy="home.cta_s1.image2"
                alt="img"
                class="lazy-img shapes screen_01"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- /.bg-wrapper -->
      <div class="border-bottom pb-50 lg-pb-20 mt-110 xl-mt-80 lg-mt-30">
        <div class="row">
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center">
              <h2 class="main-count fw-500">
                {{ home.cta_s1.item1 }}
              </h2>
              <p>{{ trans('Completed Jobs') }}</p>
            </div>
            <!-- /.counter-block-one -->
          </div>
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center" data-wow-delay="0.2s">
              <h2 class="main-count fw-500">
                {{ home.cta_s1.item2 }}
              </h2>
              <p>{{ trans('Worldwide Client') }}</p>
            </div>
            <!-- /.counter-block-one -->
          </div>
          <div class="col-sm-4">
            <div class="counter-block-one mt-25 wow fadeInUp text-center" data-wow-delay="0.35s">
              <h2 class="main-count fw-500">
                {{ home.cta_s1.item3 }}
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
