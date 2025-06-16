<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

defineProps(['home'])

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
  <section class="fancy-banner-two mt-200 xl-mt-150 lg-mt-100 md-mt-80">
    <div class="container">
      <div class="bg-wrapper position-relative wow fadeInUp">
        <div class="row">
          <div class="col-xl-6 col-lg-7">
            <div class="text-wrapper">
              <div class="title-two">
                <div class="sub-title">{{ home.cta_s2.top_title }}</div>
                <h2 class="fw-600 text-white">{{ home.cta_s2.title }}</h2>
              </div>
              <p class="mt-25 mb-55 lg-mb-40 text-white">{{ home.cta_s2.subtitle }}</p>
              <div class="counter-wrapper pb-50 lg-pb-30">
                <div class="row">
                  <div class="col-sm-4 col-6">
                    <div class="counter-block wow fadeInUp mt-20">
                      <div class="main-count fw-500 text-white">
                        {{ home.cta_s2.item1 }}
                      </div>
                      <p class="m0 text-white">{{ trans('Worldwide Client') }}</p>
                    </div>
                    <!-- /.counter-block -->
                  </div>
                  <div class="col-sm-4 col-6">
                    <div class="counter-block wow fadeInUp mt-20" data-wow-delay="0.2s">
                      <div class="main-count fw-500 text-white">
                        {{ home.cta_s2.item2 }}
                      </div>
                      <p class="m0 text-white">{{ trans('Top Talents') }}</p>
                    </div>
                    <!-- /.counter-block -->
                  </div>
                  <div class="col-sm-4 col-6">
                    <div class="counter-block wow fadeInUp mt-20" data-wow-delay="0.35s">
                      <div class="main-count fw-500 text-white">
                        {{ home.cta_s2.item3 }}
                      </div>
                      <p class="m0 text-white">{{ trans('Applied Jobs') }}</p>
                    </div>
                    <!-- /.counter-block -->
                  </div>
                </div>
              </div>
              <!-- /.counter-wrapper -->
              <a :href="home.cta_s2.btn_link" class="explore-btn tran3s">{{
                home.cta_s2.btn_text
              }}</a>
            </div>
          </div>
          <div class="col-xl-6 col-lg-5">
            <div class="img-meta ms-xl-5" :style="{ backgroundImage: `url(${home.cta_s2.image1})` }"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.bg-wrapper -->
  </section>
</template>
