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
  <section class="how-it-works-two position-relative pt-130 lg-pt-80">
    <div class="container">
      <div class="title-one mb-70 lg-mb-30 text-center">
        <h2 class="main-font">{{ trans("How it's Work?") }}</h2>
      </div>

      <div class="border-bottom">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6" v-for="(item, index) in features" :key="index">
            <div
              class="card-style-five position-relative mt-25 pb-70 lg-pb-20 wow fadeInUp text-center"
            >
              <div
                class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
              >
                <img v-lazy="item.preview" alt="preview" class="w-50" />
              </div>
              <div class="title fw-500 text-dark mt-25 lg-mt-20 mb-10 text-lg">
                {{ item.title }}
              </div>
              <p>{{ item.text }}</p>
            </div>
            <!-- /.card-style-five -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
