<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

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
  <section
    class="text-feature-two position-relative pt-180 xl-pt-150 lg-pt-100 pb-180 xl-pb-150 lg-pb-120"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last">
          <div class="wow fadeInRight">
            <div class="title-one">
              <div class="sub-title">{{ trans('TOP BRAND') }}</div>
              <h2>{{ trans('Collaboration with Top Brands.') }}</h2>
            </div>
            <p class="lg-mt-20 lg-mb-30 mb-40 mt-40 text-lg">
             {{ trans(`We collaborate with a number of top tier companies on imagining the future of work,
              have a look.`) }}
            </p>
            <Link href="/about-us" class="btn-nine tran3s d-flex align-items-center">
              <span class="fw-500 me-2">{{ trans('Learn More') }}</span>
              <i class="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div class="col-lg-7 order-lg-first">
          <div
            class="big-circle rounded-circle position-relative d-flex align-items-center justify-content-center ms-lg-5 wow fadeInLeft"
          >
            <div
              v-for="(item, index) in brands"
              :key="index"
              class="inner-circle rounded-circle d-flex align-items-center justify-content-center"
            >
              <img v-lazy="item.preview" alt="image" class="lazy-img" />
            </div>
          </div>
          <!-- /.big-circle -->
        </div>
      </div>
    </div>
  </section>
</template>
