s
<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import { Link, useForm } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'

const { pickBy } = sharedComposable()

defineProps(['home'])

const popularCategories = ref([])

const form = useForm({
  keyword: ''
})

onMounted(async () => {
  homeApiService.get('popularCategories').then((res) => {
    popularCategories.value = res
  })
})

const formSubmit = () => {
  form.transform((data) => pickBy(data)).get(route('jobs.index'))
}
</script>

<template>
  <div class="hero-banner-two position-relative">
    <div class="container">
      <div class="position-relative pt-225 xl-pt-200 lg-pt-150 lg-pb-60 pb-80">
        <div class="row">
          <div class="col-lg-6 col-md-8">
            <h1>{{ home.hero.title }}</h1>
            <p class="text-md mt-35 mb-50 lg-mb-30 pe-xxl-5">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="col-lg-6 col-md-8">
              <div class="job-search-two position-relative me-xxl-5">
                <form
                  @submit.prevent="formSubmit"
                  class="d-flex align-items-center justify-content-between"
                >
                  <input
                    type="text"
                    v-model="form.keyword"
                    placeholder="Search job, title etc...."
                  />
                  <button type="submit" class="btn-five h-100">
                    {{ trans('Search') }}
                  </button>
                </form>
                <ul class="filter-tags d-flex style-none mt-25 flex-wrap">
                  <li class="fw-500 text-dark me-2">{{ trans('Popular') }}:</li>
                  <li v-for="(item, index) in popularCategories" :key="index" class="me-2">
                    <Link :href="route('job-categories.show', item.slug)">{{ item.title }}</Link>
                  </li>
                </ul>
              </div>
              <!-- /.job-search-two -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="img-box">
      <img v-lazy="home.hero.image1" alt="image" class="lazy-img" />
      <img v-lazy="home.hero.image2" alt="image" class="lazy-img shapes screen_01" />
      <img v-lazy="home.hero.image3" alt="image" class="lazy-img shapes screen_02 wow fadeInLeft" />
    </div>
    <!-- /.img-box -->
    <div class="rating-box position-relative">
      <div class="d-sm-flex justify-content-end">
        <div class="me-sm-5 pe-xxl-4">
          <div class="d-flex align-items-center">
            <img v-lazy="home.hero.image4" alt="image" class="lazy-img me-lg-4 me-2" />
            <div>
              <div class="fw-500 text-dark text-lg">{{ home.hero.footer_item1 }}</div>
              <span>{{ trans('Individual Freelancer') }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="fw-500 text-dark mb-10 text-lg">{{ home.hero.footer_item2 }}</div>
          <ul class="d-flex align-items-center style-none rating">
            <template v-for="item in 5" :key="item">
              <li>
                <i
                  :class="
                    item > parseInt(home.hero.footer_item3 ?? 0) ? 'bi bi-star' : 'bi bi-star-fill'
                  "
                ></i>
              </li>
            </template>

            <li>{{ home.hero.footer_item4 }}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- /.rating-box -->
    <img
      v-lazy="'/assets/images/shape/shape_15.svg'"
      alt="image"
      class="lazy-img shapes shape_01"
    />
    <img
      v-lazy="'/assets/images/shape/shape_16.svg'"
      alt="image"
      class="lazy-img shapes shape_02"
    />
    <img
      v-lazy="'/assets/images/shape/shape_17.svg'"
      alt="image"
      class="lazy-img shapes shape_03"
    />
    <img
      v-lazy="'/assets/images/shape/shape_18.svg'"
      alt="image"
      class="lazy-img shapes shape_04"
    />
    <img
      v-lazy="'/assets/images/shape/shape_19.svg'"
      alt="image"
      class="lazy-img shapes shape_05"
    />
    <img
      v-lazy="'/assets/images/shape/shape_20.svg'"
      alt="image"
      class="lazy-img shapes shape_06"
    />
  </div>
  <!-- /.hero-banner-two -->
</template>
