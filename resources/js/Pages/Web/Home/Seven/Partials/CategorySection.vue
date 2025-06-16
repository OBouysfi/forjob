<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const categories = ref([])
const totalJobsCount = ref(0)
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('featuredCategories').then((res) => {
    categories.value = res
    loading.value = false
  })

  homeApiService.get('totalJobsCount').then((res) => {
    totalJobsCount.value = res
  })
})
</script>

<template>
  <section
    class="category-section-two bg-color position-relative mt-45 md-mt-10 pt-150 xl-pt-130 lg-pt-80 pb-170 xl-pb-130 lg-pb-70"
  >
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-sm-8">
          <div class="title-three">
            <h2 class="main-font">{{ trans('Most Demanding Categories.') }}</h2>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="d-none d-sm-flex justify-content-sm-end mt-15">
            <Link href="/jobs" class="btn-six">{{ trans('All Categories') }}</Link>
          </div>
        </div>
      </div>
      <div class="card-wrapper row lg-mt-20 mt-80" v-show="categories.length">
        <div
          v-for="(item, index) in categories"
          :key="index"
          class="col-lg-3 col-md-4 col-sm-6 d-flex"
        >
          <div class="card-style-four tran3s w-100 mt-30 wow fadeInUp">
            <Link :href="route('job-categories.show', item.slug)" class="d-block">
              <div class="icon tran3s d-flex align-items-center justify-content-center">
                <img v-lazy="item.preview" alt="preview" class="lazy-img" />
              </div>
              <div class="title tran3s fw-500 text-lg">{{ item.title }}</div>
              <div class="total-job">{{ item.jobs_count }} {{ trans('jobs') }}</div>
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
        <a href="/jobs" class="btn-six">{{ trans('All Categories') }}</a>
      </div>
    </div>
    <img src="/assets/images/shape/shape_24.svg" alt="" class="lazy-img shapes shape_01" />
  </section>
</template>
