<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import { Link } from '@inertiajs/vue3'

const categories = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('featuredCategories').then((res) => {
    categories.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="category-section-five position-relative mt-190 lg-mt-150">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-8">
          <div class="title-four text-lg-start text-center">
            <h2>{{ trans('Most Demanding Categories.') }}</h2>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="d-flex justify-content-lg-end">
            <Link href="/jobs" class="btn-six d-none d-lg-inline-block">
              {{ trans('Explore all fields') }}</Link
            >
          </div>
        </div>
      </div>
      <div
        class="card-wrapper d-flex justify-content-center justify-content-lg-between pt-50 lg-pt-30 flex-wrap"
      >
        <div
          v-for="(item, index) in categories"
          :key="index"
          class="card-style-seven bg-color mt-15 wow fadeInUp text-center"
        >
          <Link
            :href="route('job-categories.show', item.slug)"
            class="wrapper d-flex align-items-center"
          >
            <div class="icon d-flex align-items-center justify-content-center">
              <img v-lazy="item.preview" alt="shape" class="lazy-img category-section-img" />
            </div>
            <div class="title fw-500">{{ item.title }}</div>
          </Link>
        </div>
      </div>
      <!-- /.card-wrapper -->
      <div class="d-lg-none mt-40 text-center">
        <Link href="/jobs" class="btn-six">{{ trans('Explore all fields') }}</Link>
      </div>
    </div>
  </section>
</template>
