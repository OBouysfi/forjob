<script setup>
defineProps(['home'])
</script>

<template>
  <section class="text-feature-one position-relative pt-150 lg-pt-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="row">
          <div class="col-lg-5 order-lg-last">
            <div class="wow fadeInLeft">
              <div class="title-two">
                <div class="sub-title">{{ home.cta_s1.top_title }}</div>
                <h2 class="main-font color-blue">{{ home.cta_s1.title }}</h2>
              </div>
              <div class="accordion accordion-style-one color-two mt-40" id="accordionOne">
                <div
                  class="accordion-item"
                  v-for="(item, index) in home.cta_s1.features"
                  :key="index"
                >
                  <div class="accordion-header" :id="`heading${index}`">
                    <button
                      class="accordion-button collapsed"
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
                    :aria-labelledby="`heading${index}`"
                    data-bs-parent="#accordionOne"
                  >
                    <div class="accordion-body">
                      <p>{{ item.body }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.accordion-style-one -->
              <a :href="home.cta_s1.btn_link" class="btn-five mt-45 lg-mt-20">{{
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
