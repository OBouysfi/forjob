<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

defineProps(['home'])

const services = ref([])
const featuredCategories = ref([])

onMounted(async () => {
  homeApiService.get('services').then((res) => {
    services.value = res
  })

  homeApiService.get('featuredCategories').then((res) => {
    featuredCategories.value = res
  })
})
</script>

<template>
  <div class="hero-banner-three position-relative pt-120 md-pt-80 xs-pt-40 lg-pb-20 pb-80">
    <div class="img-box">
      <img v-lazy="home.hero.image4 ?? '/assets/images/assets/ils_01.svg'" alt="image" class="lazy-img" />
      <img
        v-lazy="home.hero.image5 ?? '/assets/images/assets/ils_01_02.svg'"
        alt="image"
        class="lazy-img shapes screen_01"
      />
      <img
        v-lazy="home.hero.image6 ?? '/assets/images/assets/ils_01_01.svg'"
        alt="image"
        class="lazy-img shapes screen_02 wow fadeInLeft"
      />
    </div>
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-lg-6 col-md-7">
            <div class="mb-5 slogan fw-500">{{ home.hero.top_title }}</div>
            <h1>{{ home.hero.title }}</h1>
            <p class="text-lg mt-35 md-mt-30 mb-30 md-mb-20 pe-xl-5">{{ home.hero.subtitle }}</p>
            <a :href="home.hero.btn_link" class="btn-five">{{ home.hero.btn_text }}</a>
            <div class="flex-wrap d-flex align-items-center mt-70 lg-mt-50 md-mt-40">
              <div class="partner-title">{{ trans('Trusted by') }}:</div>
              <img v-lazy="home.hero.image1" alt="image" class="lazy-img me-4 ms-2" />
              <img v-lazy="home.hero.image2" alt="image" class="lazy-img me-4" />
              <img v-lazy="home.hero.image3" alt="image" class="lazy-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
