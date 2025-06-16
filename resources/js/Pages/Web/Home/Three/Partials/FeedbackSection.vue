<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const feedbacks = ref([])
const loading = ref(true)
onMounted(() => {
  homeApiService.get('feedbacks').then((res) => {
    feedbacks.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="feedback-section-three position-relative mt-170 xl-mt-150 lg-mt-100">
    <div class="position-relative container">
      <div class="row">
        <div class="col-xl-6 col-lg-7 col-md-8 m-auto">
          <div class="title-two text-center">
            <img
              v-lazy="'/assets/images/icon/icon_22.svg'"
              alt="img"
              class="lazy-img mb-10 me-auto ms-auto"
            />
            <h2 class="fw-600 color-blue">{{ trans('Check what these clients have to say.') }}</h2>
          </div>
        </div>
      </div>

      <div id="feedBack_carousel" class="carousel slide mt-55 lg-mt-30" data-bs-ride="carousel">
        <div class="row">
          <div class="col-xxl-9 col-lg-8 col-md-10 m-auto">
            <div class="carousel-inner text-center">
              <template v-for="(item, index) in feedbacks" :key="index">
                <div class="carousel-item" :class="{ active: index == 0 }">
                  <p>“{{ item.review }}”</p>
                  <div class="d-inline-block position-relative name fw-500 text-dark text-lg">
                    {{ item.author }},
                    <span class="fw-normal opacity-50"> {{ item.author_designation }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev carousel-btn"
          type="button"
          data-bs-target="#feedBack_carousel"
          data-bs-slide="prev"
        >
          <i class="bi bi-chevron-left"></i>
          <span class="visually-hidden">{{ trans('Previous') }}</span>
        </button>
        <button
          class="carousel-control-next carousel-btn"
          type="button"
          data-bs-target="#feedBack_carousel"
          data-bs-slide="next"
        >
          <i class="bi bi-chevron-right"></i>
          <span class="visually-hidden">{{ trans('Next') }}</span>
        </button>

        <div class="carousel-indicators">
          <template v-for="(item, index) in feedbacks" :key="index">
            <button
              type="button"
              data-bs-target="#feedBack_carousel"
              :data-bs-slide-to="index"
              :class="{ active: index == 0 }"
              :aria-current="index == 0 ? 'true' : ''"
              :aria-label="`Slide ${index + 1}`"
            >
              <img v-lazy="item.company_logo" alt="logo" class="w-100 h-100 rounded-circle" />
            </button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
