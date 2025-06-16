<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import trans from '@/Composables/transComposable'

const features = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('features').then((res) => {
    features.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="how-it-works-two position-relative pt-130 xl-pt-110">
    <div class="container">
      <div
        class="title-one d-flex align-items-center justify-content-between mb-45 lg-mb-20 text-center"
      >
        <span class="line"></span>
        <h2 class="fw-600 pe-3 ps-3">{{ trans(`How it’s Work?`) }}</h2>
        <span class="line"></span>
      </div>

      <div class="border-bottom border-md0">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6" v-for="(item, index) in features" :key="index">
            <div
              class="card-style-five position-relative mt-25 pb-35 lg-pb-20 wow fadeInUp text-center"
            >
              <div class="numb fw-500 d-flex align-items-center justify-content-center m-auto">
                <span>0{{ index + 1 }}</span>
              </div>
              <div class="title fw-500 text-dark mt-25 mb-10 text-lg">{{ item.title }}</div>
              <p>{{ item.text }}</p>
            </div>
            <!-- /.card-style-five -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
