<script setup>
defineProps(['home'])
</script>

<template>
  <section class="fancy-banner-five mt-160 xl-mt-130 lg-mt-100 md-mt-80">
    <div class="container">
      <div class="bg-wrapper position-relative">
        <div class="row">
          <div class="m-auto col-lg-11">
            <div class="row">
              <div class="col-md-7">
                <div class="title-one mb-35 md-mb-20">
                  <h2 class="text-white main-font" v-html="home.cta_s2.title">
                  </h2>
                </div>
                <ul class="btn-group style-none d-flex">
                  <li class="me-2">
                    <Link :href="home.cta_s2.left_btn_link" class="btn-seven border6">{{ home.cta_s2.left_btn_text }}</Link>
                  </li>
                  <li class="ms-2">
                    <Link :href="home.cta_s2.right_btn_link" class="btn-five border6">{{ home.cta_s2.right_btn_text }}</Link>
                  </li>
                </ul>
              </div>
              <div class="col-md-5">
                <div class="img-meta sm-mt-30 position-relative">
                  <img v-lazy="home.cta_s2.image1" alt="" class="m-auto lazy-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/images/shape/shape_30.svg" alt="shape" class="lazy-img shapes shape_01" />
        <img src="/assets/images/shape/shape_31.svg" alt="shape" class="lazy-img shapes shape_02" />
      </div>
    </div>
  </section>
</template>
