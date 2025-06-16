<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const brands = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService
    .get('brands')
    .then((res) => {
      brands.value = res
      loading.value = false
    })
    .then(() => {
      if ($('.partner-slider').length) {
        $('.partner-slider').slick({
          dots: false,
          arrows: false,
          lazyLoad: 'ondemand',
          centerPadding: '0px',
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3500,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 3
              }
            }
          ]
        })
      }
    })
})
</script>

<template>
  <div class="container">
    <div class="partner-logos pt-120 lg-pt-80 lg-pb-40 pb-80">
      <div class="title fw-500 text-dark text-uppercase mb-65 lg-mb-30 text-center">
       {{ trans('Trusted by') }} <span>{{ trans('500+') }}</span> {{ trans('companies') }}
      </div>
      <div class="partner-slider">
        <div class="item" v-for="(item, index) in brands" :key="index">
          <div class="logo d-flex align-items-center"><img v-lazy="item.preview" alt="" /></div>
        </div>
      </div>
    </div>
    <!-- /.partner-logos -->
  </div>
</template>
