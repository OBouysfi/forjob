<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const categories = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService
    .get('featuredServices')
    .then((res) => {
      categories.value = res
      loading.value = false
    })
    .then(() => {
      if ($('.category-slider-one').length) {
        $('.category-slider-one').slick({
          dots: false,
          arrows: true,
          lazyLoad: 'ondemand',
          prevArrow: $('.prev_d'),
          nextArrow: $('.next_d'),
          centerPadding: '0px',
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
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
  <section class="category-section-three pt-140 lg-pt-100">
    <div class="container">
      <div class="position-relative">
        <div class="title-one lg-mb-40 mb-60">
          <h2 class="main-font color-blue">{{ trans('Trending Job') }}</h2>
        </div>
        <div class="card-wrapper category-slider-one row">
          <div v-for="(item, index) in categories" :key="index" class="item">
            <div
              class="card-style-six position-relative"
              :style="`background-image: url(${item.preview});`"
            >
              <Link
                :href="route('job-categories.show', item.slug)"
                class="w-100 h-100 d-flex align-items-end pb-20 ps-4"
              >
                <div class="title fw-500 text-lg text-white">{{ item.title }}</div>
              </Link>
            </div>
          </div>
        </div>
        <!-- /.card-wrapper -->
        <ul
          class="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20"
        >
          <li class="prev_d slick-arrow"><i class="bi bi-arrow-left"></i></li>
          <li class="next_d slick-arrow"><i class="bi bi-arrow-right"></i></li>
        </ul>
      </div>
    </div>
  </section>
</template>
