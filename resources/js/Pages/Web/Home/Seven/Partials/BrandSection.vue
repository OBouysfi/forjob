<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import 'swiper/css'

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
  <div class="partner-logos pt-45 pb-45 border-0 pe-3 ps-3">
    <Swiper :slides-per-view="6" :space-between="20">
      <SwiperSlide class="item" v-for="(item, index) in brands" :key="index">
        <img class="mx-auto" v-lazy="item.preview" alt="preview" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
