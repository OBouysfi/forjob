<script setup>
defineProps(['home'])
</script>

<template>
  <section class="fancy-banner-six mt-150 xl-mt-120 lg-mt-100">
    <div class="container">
      <div class="bg-wrapper position-relative pt-70 lg-pt-50 wow fadeInUp pe-4 ps-4">
        <div class="row">
          <div class="m-auto col-xxl-11">
            <div class="row">
              <div class="col-lg-6 order-lg-last">
                <div class="text-wrapper ps-xl-5">
                  <div class="title-two">
                    <h2 class="main-font">{{ home.cta_s2.title }}</h2>
                  </div>
                  <p class="text-md text-dark mt-25 lg-mt-20 mb-45 lg-mb-30 opacity-70">
                    {{ home.cta_s2.subtitle }}
                  </p>
                  <a
                    :href="home.cta_s2.btn_link"
                    class="upload-btn position-relative d-flex align-items-center justify-content-center"
                  >
                    <img v-lazy="'/assets/images/icon/icon_46.svg'" alt="image" class="lazy-img" />
                    <span class="text-white fw-500 ms-2">{{ home.cta_s2.btn_text }}</span>
                  </a>
                </div>
              </div>
              <div class="col-lg-6 order-lg-first">
                <div class="img-meta position-relative md-mt-20">
                  <img v-lazy="home.cta_s2.image" alt="image" class="m-auto lazy-img" />
                  <img
                    src="/assets/images/shape/shape_12.svg"
                    alt="img"
                    class="lazy-img shapes shape_01"
                  />
                  <img
                    src="/assets/images/shape/shape_13.svg"
                    alt="img"
                    class="lazy-img shapes shape_02"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/images/shape/shape_14.svg" alt="" class="lazy-img shapes shape_03" />
      </div>
    </div>
    <!-- /.bg-wrapper -->
  </section>
</template>
