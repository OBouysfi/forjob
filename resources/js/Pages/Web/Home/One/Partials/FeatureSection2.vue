<script setup>
defineProps(['home'])
</script>

<template>
  <section
    class="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-5 order-lg-last">
          <div class="ps-xxl-4 wow fadeInRight">
            <div class="title-one">
              <h2>{{ home.cta_s1.title }}</h2>
            </div>
            <p class="md-mt-20 md-mb-20 mb-40 mt-40">
              {{ home.cta_s1.subtitle }}
            </p>
            <ul v-if="home.cta_s1?.features?.length" class="list-style-one style-none">
              <li v-for="item in home.cta_s1.features.split(',')" :key="item">{{ item }}</li>
            </ul>
            <a :href="home.cta_s1.btn_link" class="btn-one lg mt-50 md-mt-30">{{
              home.cta_s1.btn_text
            }}</a>
          </div>
        </div>
        <div class="col-lg-7 col-md-11 order-lg-first m-auto">
          <div class="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
            <div class="row">
              <div class="col-md-6 col-sm-8 col-10">
                <img v-lazy="home.cta_s1.image1" alt="image" class="lazy-img img01" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-5">
                <img v-lazy="home.cta_s1.image2" alt="image" class="lazy-img img02 mt-35" />
              </div>
              <div class="col-md-6 col-7">
                <img v-lazy="home.cta_s1.image3" alt="image" class="lazy-img img01 mt-35" />
              </div>
            </div>
            <img
              v-lazy="home.cta_s1.image4"
              alt="image"
              class="lazy-img shapes screen01 wow fadeInRight"
            />
            <img
              v-lazy="home.cta_s1.image5"
              alt="image"
              class="lazy-img shapes screen02 wow fadeInUp"
            />
            <img
              v-lazy="home.cta_s1.image6"
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
</template>
