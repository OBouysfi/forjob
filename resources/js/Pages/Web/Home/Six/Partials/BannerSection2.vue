<script setup>
defineProps(['home'])
</script>

<template>
  <section class="fancy-banner-three mt-150 lg-mt-100">
    <div
      class="bg-wrapper pt-85 lg-pt-50 lg-pb-50 position-relative wow fadeInUp pb-80"
      :style="{ backgroundImage: `url(${home.cta_s1.image1})` }"
    >
      <div class="container">
        <div class="row">
          <div class="col-xxl-5 col-xl-6 col-lg-6 ms-auto">
            <div class="text-wrapper p0 mb-50 md-mb-20 wow fadeInRight">
              <a
                class="fancybox rounded-circle video-icon tran3s d-flex align-items-center justify-content-center"
                data-fancybox=""
                :href="`https://www.youtube.com/embed/${home.cta_s1?.video_id}`"
              >
                <i class="bi bi-play-fill"></i>
              </a>
              <div class="title-one mt-25 mb-25 lg-mb-20">
                <h2 class="text-white main-font" v-html="home.cta_s1.title"></h2>
              </div>
              <p class="text-white text-md">{{ home.cta_s1.subtitle }}</p>
            </div>
          </div>
        </div>

        <div class="row gx-xl-5 justify-content-between">
          <div class="col-lg-4 d-flex">
            <div class="mt-20 card-style-nine w-100 d-flex wow fadeInUp">
              <div class="icon rounded-circle d-flex align-items-center justify-content-center">
                <img v-lazy="'/assets/images/icon/icon_37.svg'" alt="image" class="lazy-img" />
              </div>
              <div class="text d-flex flex-column ps-4">
                <div class="mb-10 text-lg">
                  {{ home.cta_s1.steps[0].title }}
                </div>
                <Link :href="home.cta_s1.steps[0].link" class="fw-500 text-uppercase">{{
                  home.cta_s1.steps[0].text
                }}</Link>
              </div>
            </div>
          </div>
          <div class="col-lg-4 d-flex">
            <div class="mt-20 card-style-nine w-100 d-flex wow fadeInUp" data-wow-delay="0.2s">
              <div class="icon rounded-circle d-flex align-items-center justify-content-center">
                <img v-lazy="'/assets/images/icon/icon_38.svg'" alt="" image class="lazy-img" />
              </div>
              <div class="text d-flex flex-column ps-4">
                <div class="mb-10 text-lg">
                  {{ home.cta_s1.steps[1].title }}
                </div>
                <Link :href="home.cta_s1.steps[1].link" class="fw-500 text-uppercase">{{
                  home.cta_s1.steps[1].text
                }}</Link>
              </div>
            </div>
          </div>
          <div class="col-lg-4 d-flex">
            <div class="mt-20 card-style-nine w-100 d-flex wow fadeInUp" data-wow-delay="0.35s">
              <div class="icon rounded-circle d-flex align-items-center justify-content-center">
                <img v-lazy="'/assets/images/icon/icon_39.svg'" alt="image" class="lazy-img" />
              </div>
              <div class="text d-flex flex-column ps-4">
                <div class="mb-10 text-lg">
                  {{ home.cta_s1.steps[2].title }}
                </div>
                <Link :href="home.cta_s1.steps[2].link" class="fw-500 text-uppercase">{{
                  home.cta_s1.steps[2].text
                }}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.bg-wrapper -->
  </section>
</template>
