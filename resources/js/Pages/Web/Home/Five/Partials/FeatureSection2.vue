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
  <section class="text-feature-three position-relative pt-200 xl-pt-150 md-pt-80">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last ms-auto">
          <div class="wow fadeInRight">
            <div class="title-one">
              <h2 class="main-font">{{ home.cta_s1.title }}</h2>
            </div>
            <div class="accordion accordion-style-one mt-25" id="accordionOne">
              <div
                class="accordion-item"
                v-for="(item, index) in home.cta_s1.features"
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
            <!-- /.accordion-style-one -->
            <a :href="home.cta_s1.btn_link" class="btn-five border6 mt-45">{{
              home.cta_s1.btn_text
            }}</a>
          </div>
        </div>
        <div class="col-lg-6 order-lg-first">
          <div
            class="img-box position-relative rounded-circle d-flex align-items-center justify-content-center wow fadeInLeft"
          >
            <img v-lazy="home.cta_s1.image1" alt="image" class="lazy-img" />
            <img v-lazy="home.cta_s1.image2" alt="image" class="lazy-img shapes screen_02" />
            <img src="/assets/images/shape/shape_25.svg" alt="" class="lazy-img shapes shape_01" />
          </div>
          <!-- /.big-circle -->
        </div>
      </div>
    </div>
  </section>
</template>
