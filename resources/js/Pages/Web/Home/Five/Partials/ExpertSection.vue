<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import { onMounted, ref } from 'vue'
import axios from 'axios'
// swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import trans from '@/Composables/transComposable'
const navigationOptions = {
  nextEl: '.prev_a',
  prevEl: '.next_a'
}
const modules = [Navigation]
const items = ref([])
const loading = ref(true)
onMounted(() => {
  axios.get(route('api.home-experts')).then((res) => {
    items.value = res.data
    loading.value = false
  })
})
</script>

<template>
  <section class="expert-section-one position-relative mt-180 xl-mt-150 md-mt-100" v-if="items.length > 0">
    <div class="position-relative container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-6">
          <div class="title-one">
            <h2 class="main-font">{{ trans('Top Experts') }}</h2>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="d-flex justify-content-lg-end">
            <Link href="/candidates" class="btn-six d-none d-lg-inline-block">{{
              trans('Explore all')
            }}</Link>
          </div>
        </div>
      </div>

      <div class="pt-70 lg-pt-40">
        <Swiper
          :slides-per-view="4"
          :space-between="10"
          :modules="modules"
          :navigation="navigationOptions"
        >
          <SwiperSlide v-for="(item, index) in items" :key="index" class="item">
            <div class="card-style-eight">
              <div class="img-meta mb-20">
                <Link
                  :href="route('candidates.show', item.username)"
                  class="name text-md fw-500 text-dark"
                >
                  <img v-lazy="item.avatar" alt="" class="expertSectionImg m-auto" />
                </Link>
              </div>
              <Link :href="route('candidates.show', item.username)" class="name fw-500 tran3s">{{
                item.name
              }}</Link>
              <div class="post">{{ item.designation }}</div>
            </div>
            <!-- /.card-style-eight -->
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="d-lg-none mt-40 text-center">
        <Link href="/candidates" class="btn-six">{{ trans('Explore all') }}</Link>
      </div>
    </div>
  </section>
</template>
