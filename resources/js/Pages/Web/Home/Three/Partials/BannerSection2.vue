<script setup>
defineProps(['home'])
</script>

<template>
  <section class="fancy-banner-three mt-75 lg-mt-50">
    <div class="container">
      <div
        class="bg-wrapper position-relative wow fadeInUp"
        :style="{ backgroundImage: `url(${home.cta_s3.image})` }"
      >
        <div class="row">
          <div class="col-xxl-5 col-xl-6 col-lg-6 ms-auto">
            <div class="text-wrapper wow fadeInRight">
              <a
                class="fancybox rounded-circle video-icon tran3s d-flex align-items-center justify-content-center"
                data-fancybox=""
                :href="home.cta_s3.video"
              >
                <i class="bi bi-play-fill"></i>
              </a>
              <div class="title-one mt-35 lg-mt-30 mb-30 lg-mb-20">
                <h2 class="fw-600 text-white">{{ home.cta_s3.title }}</h2>
              </div>
              <p class="text-white">{{ home.cta_s3.subtitle }}</p>
            </div>
          </div>
        </div>

        <div class="bottom-content position-relative">
          <div class="row gx-xxl-5 justify-content-between">
            <div class="col-lg-4">
              <div class="d-flex wow fadeInUp mt-20">
                <div
                  class="count fw-500 rounded-circle d-flex align-items-center justify-content-center text-white"
                >
                  1
                </div>
                <div class="text ps-4">
                  <div class="fw-500 mb-10 text-lg text-white">
                    {{ home.cta_s3.footer_item1 }}
                  </div>
                  <Link href="/register" class="fw-500 text-uppercase">{{
                    trans('Open Account')
                  }}</Link>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-flex wow fadeInUp mt-20" data-wow-delay="0.2s">
                <div
                  class="count fw-500 rounded-circle d-flex align-items-center justify-content-center text-white"
                >
                  2
                </div>
                <div class="text ps-4">
                  <div class="fw-500 mb-10 text-lg text-white">
                    {{ home.cta_s3.footer_item2 }}
                  </div>
                  <Link href="/register" class="fw-500 text-uppercase"
                    >{{ trans('Apply job or hire') }}
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-flex wow fadeInUp mt-20" data-wow-delay="0.35s">
                <div
                  class="count fw-500 rounded-circle d-flex align-items-center justify-content-center text-white"
                >
                  3
                </div>
                <div class="text ps-4">
                  <div class="fw-500 mb-10 text-lg text-white">
                    {{ home.cta_s3.footer_item3 }}
                  </div>
                  <Link href="/register" class="fw-500 text-uppercase"
                    >{{ trans('Payment Method') }}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.bg-wrapper -->
  </section>
</template>
