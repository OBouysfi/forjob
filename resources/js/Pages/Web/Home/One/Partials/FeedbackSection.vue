<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

import 'swiper/css'
import 'swiper/css/navigation'

const navigationOptions = {
  nextEl: '.next_a',
  prevEl: '.prev_a'
}
const modules = [Navigation]

const feedbacks = ref([])
const brands = ref([])
const loading = ref(true)
const breakpoints = {
  769: {
    slidesPerView: 2,
    spaceBetween: 10
  }
}
onMounted(() => {
  homeApiService.get('feedbacks').then((res) => {
    feedbacks.value = res
  })

  homeApiService.get('brands').then((res) => {
    brands.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="feedback-section-one pt-180 xl-pt-150 lg-pt-100">
    <div class="position-relative container">
      <div class="row">
        <div class="col-lg-5 col-md-6">
          <div class="title-one text-md-start mb-65 md-mb-50 text-center">
            <h2>{{ trans('Trusted by leading startups.') }}</h2>
          </div>
        </div>
      </div>

      <Swiper :breakpoints="breakpoints" :modules="modules" :navigation="navigationOptions">
        <SwiperSlide class="feedback-block-one" v-for="(item, index) in feedbacks" :key="index">
          <div class="logo">
            <img v-lazy="item.banner_logo" alt="image" />
          </div>
          <blockquote class="fw-500 mt-50 md-mt-30 mb-50 md-mb-30">“{{ item.review }}”</blockquote>
          <div class="name text-dark">
            <span class="fw-500">{{ item.author }},</span> {{ item.author_designation }}
          </div>
          <div
            class="review md-pt-20 md-mt-30 d-flex justify-content-between align-items-center mt-40 pt-40"
          >
            <div class="text-md fw-500 text-dark">
              {{ item.ratting_point }}.0 {{ item.rating_type }}
            </div>
            <ul class="style-none d-flex">
              <li v-for="sl in 5" :key="sl">
                <a href="#"
                  ><i :class="sl <= item.ratting_point ? 'bi bi-star-fill' : 'bi bi-star'"></i
                ></a>
              </li>
            </ul>
          </div>
        </SwiperSlide>
      </Swiper>

      <ul
        v-show="feedbacks?.length > 2"
        class="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30"
      >
        <li class="prev_a slick-arrow">
          <i class="bi bi-arrow-left"></i>
        </li>
        <li class="next_a slick-arrow">
          <i class="bi bi-arrow-right"></i>
        </li>
      </ul>

      <div class="partner-logos pt-150 xl-pt-120 md-pt-80 sm-pt-40 md-pb-40 pb-80">
        <Swiper :slides-per-view="6" :space-between="30">
          <SwiperSlide class="item" v-for="(item, index) in brands" :key="index">
            <img v-lazy="item.preview" alt="image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
