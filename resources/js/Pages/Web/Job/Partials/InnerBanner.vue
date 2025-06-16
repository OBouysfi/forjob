<script setup>
import JobSearchForm from '@/Components/JobSearchForm.vue'
import { computed } from 'vue'
import { useThemeLoaderStore } from '@/Store/themeLoaderStore'
const themeLoader = useThemeLoaderStore()
const innerBannerColor = computed(() => {
  const themes = ['One', 'Six']
  if (themes.includes(themeLoader.theme)) {
    return ''
  }
  return 'inner-banner-colors'
})
</script>

<template>
  <div class="inner-banner-one position-relative" :class="innerBannerColor">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-xl-6 m-auto text-center">
            <div class="title-two">
              <h2>{{ trans('Job Listing') }}</h2>
            </div>
            <p class="mt-30 lg-mt-20 mb-35 lg-mb-20 text-lg">
              {{ trans('We delivered blazing fast & striking work solution') }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="col-xl-9 col-lg-8 m-auto">
              <div class="job-search-one position-relative">
                <JobSearchForm />
              </div>
              <!-- /.job-search-one -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      v-lazy="'/assets/images/shape/shape_02.svg'"
      alt="shape"
      class="lazy-img shapes shape_01"
    />
    <img
      v-lazy="'/assets/images/shape/shape_03.svg'"
      alt="shape"
      class="lazy-img shapes shape_02"
    />
  </div>
</template>
