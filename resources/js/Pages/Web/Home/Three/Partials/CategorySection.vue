<script setup>
import homeApiService from '@/Composables/homeApiService';
import { ref } from 'vue'

const categories = ref([])
const loading = ref(true)

homeApiService.get('featuredCategories').then((res) => {
  categories.value = res
  loading.value = false
})

</script>

<template>
  <section class="category-section-one position-relative">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-8">
          <div class="title-three">
            <h2 class="fw-600 color-blue">{{ trans('Explore the marketplace.') }}</h2>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="d-flex justify-content-lg-end">
            <Link href="/jobs" class="btn-six d-none d-lg-inline-block">{{
              trans('Explore all fields')
            }}</Link>
          </div>
        </div>
      </div>
      <div class="card-wrapper row justify-content-center mt-45 lg-mt-30">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="card-style-one wow fadeInUp mt-20 text-center"
        >
          <Link :href="route('job-categories.show', category.slug)" class="wrapper">
            <div class="icon d-flex align-items-center justify-content-center">
              <img v-lazy="category.preview" alt="shape" class="lazy-img category-section-img" />
            </div>
            <div class="title fw-500">{{ category.title }}</div>
            <div class="total-job">{{ category.jobs_count }} {{ trans('Jobs') }}</div>
          </Link>
        </div>
        <!-- /.card-style-one -->
      </div>
      <!-- /.card-wrapper -->
      <div class="d-lg-none mt-40 text-center">
        <Link href="/jobs" class="btn-six">{{ trans('Explore all fields') }}</Link>
      </div>
    </div>
  </section>
</template>