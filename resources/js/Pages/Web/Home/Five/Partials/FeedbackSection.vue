<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const feedbacks = ref([])

onMounted(() => {
  homeApiService
    .get('feedbacks')
    .then((res) => {
      feedbacks.value = res
    })
    .then(() => {
      // ------------------------ Feedback Slider Three
      if ($('.feedback-slider-three-a').length) {
        $('.feedback-slider-three-a').slick({
          dots: false,
          arrows: true,
          prevArrow: $('.prev_d'),
          nextArrow: $('.next_d'),
          lazyLoad: 'ondemand',
          centerPadding: '0px',
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          fade: true,
          autoplaySpeed: 300000,
          asNavFor: '.feedback-slider-three-b'
        })
      }
      if ($('.feedback-slider-three-b').length) {
        $('.feedback-slider-three-b').slick({
          dots: true,
          arrows: false,
          lazyLoad: 'ondemand',
          centerPadding: '0px',
          slidesToShow: feedbacks.value.length > 3 ? 3 : 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 300000,
          asNavFor: '.feedback-slider-three-a',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        })
      }
    })
})
</script>

<template>
  <section class="feedback-section-four position-relative mt-180 xl-mt-150 lg-mt-100">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-6 order-lg-last ms-auto">
          <div class="title-one ps-xxl-5">
            <h2 class="main-font">{{ trans('Our Customer Feedback') }}</h2>
          </div>
        </div>
        <div class="col-xxl-7 col-lg-6 order-lg-first">
          <div class="bg-wrapper position-relative me-xxl-4 md-mt-40 md-mb-40">
            <div class="icon d-flex align-items-center justify-content-center rounded-circle">
              <img v-lazy="'/assets/images/icon/icon_30.svg'" alt="" class="lazy-img" />
            </div>

            <div class="feedback-slider-three-a">
              <div class="item" v-for="(item, index) in feedbacks" :key="index">
                <p>“{{ item.review }}”</p>
                <div class="name text-md text-white">
                  {{ item.author }},<span class="opacity-50">{{ item.author_designation }}</span>
                </div>
              </div>
            </div>
            <ul
              class="slider-arrows d-flex justify-content-between justify-content-lg-center style-none"
            >
              <li class="prev_d slick-arrow"><i class="bi bi-arrow-left"></i></li>
              <li class="next_d slick-arrow"><i class="bi bi-arrow-right"></i></li>
            </ul>
          </div>
          <!-- /.bg-wrapper -->
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="feedback-slider-three-b">
          <div class="item" v-for="(item, index) in feedbacks" :key="index">
            <img :src="item.company_logo" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
