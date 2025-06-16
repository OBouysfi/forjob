<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

defineProps(['home'])

const features = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('features').then((res) => {
    features.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="wow fadeInLeft">
            <div class="title-two">
              <div class="sub-title">{{ home.cta_s2.top_title }}</div>
              <h2 class="main-font color-blue">{{ home.cta_s2.title }}</h2>
            </div>
            <div class="accordion accordion-style-one color-two mt-40" id="accordionOne">
              <div
                class="accordion-item"
                v-for="(item, index) in home.cta_s2.features"
                :key="index"
              >
                <div class="accordion-header" :id="`heading${index}`">
                  <button
                    class="accordion-button"
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
            <a :href="home.cta_s2.btn_link" class="btn-five mt-45 lg-mt-20">{{
              home.cta_s2.btn_text
            }}</a>
          </div>
        </div>
        <div class="col-lg-6 col-md-11 me-lg-0 me-auto ms-auto">
          <div class="img-data position-relative md-mt-50">
            <div class="row">
              <div class="col-md-6 col-sm-8 col-10">
                <img v-lazy="home.cta_s2.image1" alt="" class="lazy-img img01" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-5">
                <img v-lazy="home.cta_s2.image2" alt="image" class="lazy-img img02 mt-35" />
              </div>
              <div class="col-md-6 col-7">
                <img v-lazy="home.cta_s2.image3" alt="image" class="lazy-img img01 mt-35" />
              </div>
            </div>
            <img
              v-lazy="home.cta_s2.image4"
              alt="image"
              class="lazy-img shapes screen01 wow fadeInRight"
            />
            <img
              v-lazy="home.cta_s2.image5"
              alt="image"
              class="lazy-img shapes screen02 wow fadeInUp"
            />
            <img
              v-lazy="home.cta_s2.image6"
              alt="image"
              class="lazy-img shapes screen03 wow fadeInUp"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
