<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
defineProps(["home"]);

const feedbacks = ref([])
const brands = ref([])

const loading = ref(true)

onMounted(() => {
  homeApiService.get('feedbacks').then((res) => {
    feedbacks.value = res

    homeApiService
      .get('brands')
      .then((res) => {
        brands.value = res
        loading.value = false
      })
      .then(() => {
        $('.feedback-slider-one').slick({
          dots: false,
          arrows: true,
          lazyLoad: 'ondemand',
          prevArrow: $('.prev_b'),
          nextArrow: $('.next_b'),
          centerPadding: '0px',
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000000,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        })
      })
  })
})
</script>

<template>
  <section class="feedback-section-five position-relative mt-180 xl-mt-150 pt-90 md-pt-60 pb-130 xl-pb-100 md-pb-70"
  :style="{backgroundImage:`url(${home.feedback_section.image})`}">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-md-6">
            <div class="title-one mb-55 lg-mb-40">
              <h2 class="text-white main-font">{{ home.feedback_section.title }}</h2>
            </div>
          </div>
        </div>

        <div class="row feedback-slider-one">
          <div v-for="(item, index) in feedbacks" :key="index" class="item">
            <div class="feedback-block-three position-relative">
              <img src="/assets/images/icon/icon_41.svg" alt="" class="quote-icon" />
              <div class="review fw-500">{{ item.ratting_type }}</div>
              <ul class="style-none d-flex rating">
                <li v-for="sl in 5" :key="sl">
                  <a href="#"><i :class="sl <= item.ratting_point ? 'bi bi-star-fill' : 'bi bi-star'"></i></a>
                </li>
              </ul>
              <blockquote class="mt-50 lg-mt-20 mb-15 lg-mb-10 text-dark">
                {{ item.review }}
              </blockquote>
              <div class="block-footer d-flex align-items-center justify-content-between pt-35 lg-pt-10">
                <div class="d-flex align-items-center">
                  <div class="name fw-500 text-dark">{{ item.author }},</div>
                  <span class="opacity-50 ps-1">{{ item.author_designation }}</span>
                </div>
                <img :src="item.company_logo" alt="logo" class="author-img rounded-circle" />
              </div>
            </div>
            <!-- /.feedback-block-three -->
          </div>
        </div>
        <ul class="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-30">
          <li class="text-white prev_b slick-arrow"><i class="bi bi-arrow-left"></i></li>
          <li class="text-white next_b slick-arrow"><i class="bi bi-arrow-right"></i></li>
        </ul>
      </div>
    </div>
  </section>
</template>
