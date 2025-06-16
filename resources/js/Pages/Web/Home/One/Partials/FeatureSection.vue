<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

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
  <section class="how-it-works position-relative bg-color pt-110 lg-pt-80 pb-110 lg-pb-70">
    <div class="container">
      <div class="title-one mb-65 lg-mb-40 text-center">
        <h2 class="text-white">
          {{ trans('How it’s') }}
          <span class="position-relative"
            >{{ trans('work?') }}
            <img src="/assets/images/shape/shape_07.svg" alt="" class="lazy-img shapes shape"
          /></span>
        </h2>
      </div>

      <div class="row justify-content-center">
        <div
          class="col-xxl-3 col-lg-4 col-md-6"
          v-for="(item, index) in features"
          :key="index"
          :class="{ 'm-auto': index == 1 }"
        >
          <div
            class="card-style-two mt-25 wow fadeInUp text-center"
            :class="{ 'position-relative arrow': index == 1 }"
          >
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
            >
              <img v-lazy="item.preview" alt="preview" class="m-h-40px" />
            </div>
            <div class="title fw-500 text-white">{{ item.title }}</div>
            <p :title="item.full_text">{{ item.text }}</p>
          </div>
          <!-- /.card-style-two -->
        </div>
      </div>
    </div>
    <img src="/assets/images/shape/shape_08.svg" alt="" class="lazy-img shapes shape_01" />
    <img src="/assets/images/shape/shape_09.svg" alt="" class="lazy-img shapes shape_02" />
  </section>
</template>
