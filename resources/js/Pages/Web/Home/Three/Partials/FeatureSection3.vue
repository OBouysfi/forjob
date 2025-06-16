<script setup>
defineProps(['home'])
</script>

<template>
  <section class="text-feature-four position-relative mt-180 xl-mt-150 lg-mt-100">
    <div class="container">
      <div class="bg-wrapper">
        <div class="row align-items-center">
          <div class="col-lg-5">
            <div class="wow fadeInLeft">
              <div class="title-one">
                <h2 class="text-white">{{ home.cta_s4.title }}</h2>
              </div>
              <p class="mb-45 lg-mb-30 mt-20 text-white">
                {{ home.cta_s4.subtitle }}
              </p>
              <a :href="home.cta_s4?.btn_link ?? '/'" class="btn-five">{{ home.cta_s4.btn_text }}</a>
            </div>
          </div>
          <div class="col-lg-6 text-lg-end md-mt-40 text-center">
            <div class="big-circle d-inline-block position-relative wow fadeInRight">
              <img v-lazy="'/assets/images/shape/bg_shape_02.png'" alt="image" class="lazy-img" />
              <div class="logo rounded-circle d-flex align-items-center justify-content-center">
                <img v-lazy="home.cta_s4.image1" alt="image" class="lazy-img" />
              </div>
              <div
                class="brand-icon icon_01 rounded-circle d-flex align-items-center justify-content-center"
              >
                <img v-lazy="home.cta_s4.image2" alt="image" class="lazy-img" />
              </div>
              <div
                class="brand-icon icon_02 rounded-circle d-flex align-items-center justify-content-center"
              >
                <img v-lazy="home.cta_s4.image3" alt="image" class="lazy-img" />
              </div>
              <div
                class="brand-icon icon_03 rounded-circle d-flex align-items-center justify-content-center"
              >
                <img v-lazy="home.cta_s4.image4" alt="image" class="lazy-img" />
              </div>
              <div
                class="brand-icon icon_04 rounded-circle d-flex align-items-center justify-content-center"
              >
                <img v-lazy="home.cta_s4.image5" alt="image" class="lazy-img" />
              </div>
              <div
                class="brand-icon icon_05 rounded-circle d-flex align-items-center justify-content-center"
              >
                <img v-lazy="home.cta_s4.image6" alt="image" class="lazy-img" />
              </div>
              <div class="brand text-md text-start text-white"><span>{{ home.cta_s4.circle_text1 }}</span>{{ home.cta_s4.circle_text2 }}</div>
            </div>
            <!-- /.big-circle -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
