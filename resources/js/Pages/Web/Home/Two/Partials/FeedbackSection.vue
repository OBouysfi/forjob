<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
defineProps(["home"]);

import 'swiper/css'
import 'swiper/css/navigation'

const navigationOptions = {
  nextEl: '.next_a',
  prevEl: '.prev_a'
}
const modules = [Navigation]

const feedbacks = ref([])

const loading = ref(true)

onMounted(() => {
  homeApiService.get('feedbacks').then((res) => {
    feedbacks.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="feedback-section-two position-relative pt-65 lg-pt-20 mt-180 xl-mt-150 md-mt-30">
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-4">
          <div class="title-one mt-50">
            <div class="sub-title">{{ home.feedback_section?.top_title }}</div>
            <h2 class="fw-600">{{ home.feedback_section?.title }}</h2>
          </div>
          <div class="mb-5 fw-500 rating-title lg-mt-40 mt-80">
            {{ home.feedback_section?.bottom_title }}
          </div>
          <p>
            {{ home.feedback_section?.bottom_sub_title }}
          </p>
        </div>

        <div class="pb-40 col-lg-8">
          <Swiper :slides-per-view="2" class="ps-4" :space-between="30" :modules="modules" :navigation="navigationOptions">
            <SwiperSlide v-for="(item, index) in feedbacks" :key="index">
              <div class="feedback-block-two">
                <div class="review fw-500">{{ item.rating_type }}</div>
                <ul class="style-none d-flex rating">
                  <li v-for="sl in 5" :key="sl">
                    <a href="#"><i :class="sl <= item.ratting_point ? 'bi bi-star-fill' : 'bi bi-star'"></i></a>
                  </li>
                </ul>
                <blockquote class="mt-40 lg-mt-20 mb-50 lg-mb-30 text-md text-dark">
                  “{{ item.review }}”
                </blockquote>
                <div class="block-footer d-flex align-items-center justify-content-between pt-35 lg-pt-20">
                  <div class="d-flex align-items-center">
                    <img v-lazy="item.company_logo" alt="image" class="author-img rounded-circle" />
                    <div class="ms-3">
                      <div class="name fw-500 text-dark">{{ item.author }}</div>
                      <span class="opacity-50">{{ item.author_designation }}</span>
                    </div>
                  </div>
                  <img src="/assets/images/shape/shape_26.svg" alt="image" class="quote-icon" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <img src="/assets/images/shape/shape_27.svg" alt="image" class="lazy-img shapes shape_01" />
  </section>
</template>
