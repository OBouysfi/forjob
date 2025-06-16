<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const categories = ref([])
const totalJobsCount = ref(0)
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('categories').then((res) => {
    categories.value = res
    loading.value = false
  })

  homeApiService.get('totalJobsCount').then((res) => {
    totalJobsCount.value = res
  })
})
</script>

<template>
  <section class="category-section-two position-relative pt-150 lg-pt-100 pb-140 lg-pb-80">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-6 col-sm-8">
          <div class="title-one text-sm-start text-center">
            <h2 class="fw-600">{{ trans('Most demanding job categories.') }}</h2>
          </div>
        </div>
        <div class="col-md-5 col-sm-4">
          <div class="d-none d-sm-flex justify-content-sm-end mt-25">
            <Link href="/jobs" class="btn-six border-0"
              >{{ trans('All Categories') }}
              <img src="/assets/images/shape/shape_23.svg" alt="image" class="lazy-img shapes"
            /></Link>
          </div>
        </div>
      </div>
      <div class="card-wrapper row lg-mt-40 mt-80">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="col-lg-3 col-md-4 col-sm-6 d-flex"
        >
          <div class="card-style-four tran3s w-100 mt-30 wow fadeInUp">
            <Link :href="route('job-categories.show', category.slug)" class="d-block">
              <div class="icon tran3s d-flex align-items-center justify-content-center">
                <img v-lazy="category.preview" alt="shape" class="lazy-img category-section-img" />
              </div>
              <div class="title tran3s fw-500 text-lg">{{ category.title }}</div>
              <div class="total-job">{{ category.jobs_count }} {{ trans('Jobs') }}</div>
            </Link>
          </div>
          <!-- /.card-style-four -->
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 d-flex">
          <div
            class="card-style-four bg-color tran3s w-100 mt-30 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Link :href="route('jobs.index')" class="d-block">
              <div class="title text-white">{{ totalJobsCount }} +</div>
              <div class="text-lg text-white">{{ trans('Job already posted') }}</div>
              <div class="d-flex align-items-center justify-content-end mt-50">
                <img v-lazy="'/assets/images/shape/shape_22.svg'" alt="image" class="lazy-img" />
                <div class="icon tran3s d-flex align-items-center justify-content-center ms-5">
                  <img v-lazy="'/assets/images/icon/icon_19.svg'" alt="image" class="lazy-img" />
                </div>
              </div>
            </Link>
          </div>
          <!-- /.card-style-four -->
        </div>
      </div>
      <!-- /.card-wrapper -->
      <div class="d-sm-none mt-50 text-center">
        <a href="#" class="btn-six border-0">
          {{ trans('All Categories ') }}
          <img v-lazy="'/assets/images/shape/shape_23.svg'" alt="image" class="lazy-img shapes"
        /></a>
      </div>
    </div>
    <img src="/assets/images/shape/shape_24.svg" alt="image" class="lazy-img shapes shape_01" />
  </section>
</template>
