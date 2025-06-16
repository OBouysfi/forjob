<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

defineProps(['home'])

const brands = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('brands').then((res) => {
    brands.value = res
    loading.value = false
  })
})
</script>

<template>
  <section
    class="text-feature-two position-relative pt-180 xl-pt-150 lg-pt-100 pb-180 xl-pb-150 lg-pb-120"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last">
          <div class="wow fadeInRight">
            <div class="title-one">
              <div class="sub-title">{{ home.cta_s2.top_title }}</div>
              <h2>{{ home.cta_s2.title }}</h2>
            </div>
            <p class="lg-mt-20 lg-mb-30 mb-40 mt-40 text-lg">
              {{ home.cta_s2.subtitle }}
            </p>
            <a :href="home.cta_s2.btn_link" class="btn-nine tran3s d-flex align-items-center">
              <span class="fw-500 me-2">{{ home.cta_s2.btn_text }}</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-7 order-lg-first">
          <div
            class="big-circle rounded-circle position-relative d-flex align-items-center justify-content-center ms-lg-5 wow fadeInLeft"
          >
            <div
              class="inner-circle rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image1" alt="" class="lazy-img" />
            </div>
            <!-- /.inner-circle -->
            <div
              class="brand-icon icon_01 rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image2" alt="" class="lazy-img" />
            </div>
            <div
              class="brand-icon icon_02 rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image3" alt="" class="lazy-img" />
            </div>
            <div
              class="brand-icon icon_03 rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image4" alt="" class="lazy-img" />
            </div>
            <div
              class="brand-icon icon_04 rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image5" alt="" class="lazy-img" />
            </div>
            <div
              class="brand-icon icon_05 rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="home.cta_s2.image6" alt="" class="lazy-img" />
            </div>
            <img src="/assets/images/shape/shape_10.svg" class="lazy-img shapes shape_01" />
          </div>
          <!-- /.big-circle -->
        </div>
      </div>
    </div>
  </section>
</template>
