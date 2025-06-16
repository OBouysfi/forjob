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
  <section class="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last">
          <div class="ps-lg-4 wow fadeInRight">
            <div class="title-one">
              <div class="sub-title">{{ home.cta_s2.top_title }}</div>
              <h2 class="text-dark">{{ home.cta_s2.title }}</h2>
            </div>
            <div class="accordion accordion-style-one mt-25" id="accordionOne">
              <div
                class="accordion-item"
                v-for="(item, index) in home.cta_s2?.features ?? []"
                :key="index"
              >
                <div class="accordion-header" :id="`heading${index}`">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${index}`"
                    aria-expanded="false"
                    :aria-controls="`collapse${index}`"
                  >
                    {{ item.title }}
                  </button>
                </div>
                <div
                  :id="`collapse${index}`"
                  class="accordion-collapse collapse"
                  :aria-labelledby="`heading${index}`"
                  data-bs-parent="#accordionOne"
                >
                  <div class="accordion-body">
                    <p>{{ item.body }}</p>
                  </div>
                </div>
              </div>
            </div>
            <a :href="home.cta_s2.btn_link" class="btn-seven border6 mt-70 lg-mt-40">{{
              home.cta_s2.btn_text
            }}</a>
          </div>
        </div>
        <div class="col-lg-7 col-md-8 order-lg-first m-auto">
          <div class="img-data position-relative me-xl-5 md-mt-20">
            <div class="row align-items-center">
              <div class="col-6">
                <img
                  v-lazy="home.cta_s2.image1"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInLeft"
                />
              </div>
              <div class="col-6">
                <img
                  v-lazy="home.cta_s2.image2"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInDown"
                />
                <img
                  v-lazy="home.cta_s2.image3"
                  alt="image"
                  class="lazy-img mt-35 md-mt-20 wow fadeInUp"
                />
              </div>
            </div>
            <img
              src="/assets/images/shape/shape_06.svg"
              alt="shape"
              class="lazy-img shapes shape_02"
            />
            <img
              src="/assets/images/shape/shape_21.svg"
              alt="shape"
              class="lazy-img shapes shape_03"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
