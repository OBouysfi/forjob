<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import { onMounted, ref } from 'vue'
import axios from 'axios'
// swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
const navigationOptions = {
  nextEl: '.prev_a',
  prevEl: '.next_a'
}
const modules = [Navigation]
const items = ref([])
const loading = ref(true)
onMounted(() => {
  axios.get(route('api.home-experts')).then((res) => {
    setTimeout(() => {
      items.value = res.data
      loading.value = false
    }, 1000)
  })
})
</script>

<template>
  <section class="expert-section-one position-relative mt-180 xl-mt-150 lg-mt-100">
    <div class="position-relative container">
      <div class="row">
        <div class="col-md-7">
          <div class="title-one text-md-start mb-65 md-mb-50 text-center">
            <h2>
              {{ trans('Find the best') }}
              <span class="position-relative">{{ trans('talented') }}
                <img src="/assets/images/shape/shape_04.svg" alt="" class="lazy-img shapes shape" /></span>
              {{ trans('expert in ') }} {{ $page.props.app_name }}.
            </h2>
          </div>
        </div>
      </div>

      <div class="">
        <Swiper :slides-per-view="1" :space-between="10" :modules="modules" :navigation="navigationOptions">
          <SwiperSlide v-for="(item, index) in items" :key="index" class="item">
            <div class="card-style-three text-center">
              <div class="img-meta lg-mb-20 mb-40">
                <Link :href="route('candidates.show', item.username)" class="name text-md fw-500 text-dark">
                <img v-lazy="item.avatar" alt="" class="expertSectionImg m-auto" />
                </Link>
              </div>
              <a href="#" class="name text-md fw-500 text-dark">{{ item.name }}</a>
              <div class="post">{{ item.designation }}</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <ul class="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
        <li class="prev_a slick-arrow">
          <i class="bi bi-arrow-left"></i>
        </li>
        <li class="next_a slick-arrow">
          <i class="bi bi-arrow-right"></i>
        </li>
      </ul>
    </div>
  </section>
</template>
