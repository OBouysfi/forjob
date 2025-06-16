<script setup>
defineProps(['home'])

</script>

<template>
  <section class="fancy-banner-one mt-150 xl-mt-120 lg-mt-100">
    <div class="container">
      <div class="bg-wrapper position-relative pt-55 wow fadeInUp pe-4 ps-4">
        <div class="row">
          <div class="m-auto col-xxl-11">
            <div class="row">
              <div class="col-xl-5 col-lg-6 order-lg-last">
                <div class="text-wrapper">
                  <div class="title-two">
                    <h2 class="text-white" v-html="home.cta_s3.title">
                    </h2>
                  </div>
                  <p class="text-md mt-25 lg-mt-20 mb-45 lg-mb-30">
                    {{ home.cta_s3.subtitle }}
                  </p>
                  <form action="#" class="upload-btn position-relative d-flex align-items-center justify-content-center">
                    <img v-lazy="'/assets/images/icon/icon_11.svg'" alt="" class="lazy-img" />
                    <Link :href="home.cta_s3.btn_link" class="fw-500 text-dark ms-2">{{ home.cta_s3.btn_text }}</Link>
                  </form>
                </div>
              </div>
              <div class="col-xl-7 col-lg-6 order-lg-first">
                <div class="img-meta md-mt-20 position-relative">
                  <img v-lazy="home.cta_s3.image ?? '/assets/images/assets/img_09.png'" alt="" class="m-auto lazy-img" />
                  <img src="/assets/images/shape/shape_12.svg" alt="" class="lazy-img shapes shape_01" />
                  <img src="/assets/images/shape/shape_13.svg" alt="" class="lazy-img shapes shape_02" />
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
