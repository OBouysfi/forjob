<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import { Link } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
const { formatNumber } = sharedComposable()
const props = defineProps(['home'])

const categories = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('featuredCategories').then((res) => {
    categories.value = res
    loading.value = false
  })
})

const category_section_title = props.home.category_section.title
const category_section_titles = category_section_title.split(' ')
</script>

<template>
  <section
    class="category-section-one bg-color position-relative pt-180 xl-pt-150 lg-pt-80 pb-140 xl-pb-120 lg-pb-60"
  >
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-6">
          <div class="title-one">
            <h2>
              <template
                v-for="(category_section_title, index) in category_section_titles"
                :key="index"
              >
                <template v-if="index == 1">
                  <span class="position-relative">
                    {{ category_section_title }}
                    <img
                      src="/assets/images/shape/shape_04.svg"
                      alt=""
                      class="lazy-img shapes shape"
                    />
                  </span>
                </template>

                <template v-else>
                  {{ category_section_title + '&nbsp;' }}
                </template>
              </template>
            </h2>
          </div>
        </div>
        <div class="col-xxl-5 col-lg-6">
          <p class="text-md mb-25 lg-mb-10 md-mt-20">
            {{ home.category_section.title_right }}
          </p>
          <Link :href="home.category_section.btn_link" class="btn-two d-none d-lg-inline-block">
            {{ home.category_section.btn_text }}
          </Link>
        </div>
      </div>
      <div class="card-wrapper row justify-content-center mt-75 lg-mt-40 md-mt-10">
        <div v-if="loading" class="d-flex gap-3">
          <div class="skeleton p-3" v-for="item in 6" :key="item">
            <div class="skeleton-line mt-25 w-25 b-radius-30 mx-auto py-3"></div>
            <div class="skeleton-line w-75 mx-auto mt-40 py-2"></div>
            <div class="skeleton-line mt-50 mb-20"></div>
          </div>
        </div>
        <template v-else>
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="card-style-one mt-20 text-center"
          >
            <Link :href="route('job-categories.show', category.slug)" class="bg wrapper">
              <div class="icon d-flex align-items-center justify-content-center">
                <img :src="category.preview" />
              </div>
              <div class="title fw-500">{{ category.title }}</div>
              <div class="total-job">
                {{ formatNumber(category.jobs_count, 0) }} {{ trans('Jobs') }}
              </div>
            </Link>
          </div>
        </template>
      </div>

      <!-- /.card-wrapper -->
      <div class="d-lg-none mt-40 text-center">
        <Link href="/jobs" class="btn-two">{{ trans('Explore all fields') }}</Link>
      </div>
    </div>
    <img src="/assets/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_01" />
  </section>
</template>
