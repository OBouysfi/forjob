<script setup>
defineProps(["home"]);
</script>

<template>
  <section class="text-feature-three position-relative pt-225 lg-pt-150 md-pt-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-lg-last ms-auto">
          <div class="wow fadeInRight ms-xxl-5">
            <div class="title-one">
              <div class="sub-title">{{ home.cta_s2?.top_title }}</div>
              <h2 class="fw-600">{{ home.cta_s2?.title }}</h2>
            </div>
            <div class="mt-40 accordion accordion-style-one" id="accordionOne">
              <div
                class="accordion-item"
                v-for="(item, index) in home.cta_s2?.features ?? []"
                :key="index"
              >
                <div class="accordion-header" :id="`heading${index}`">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: index != 0 }"
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
                  :class="{ show: index == 0 }"
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
            <Link :href="home.cta_s2?.btn_link ?? '#'" class="btn-five border6 mt-70 lg-mt-40">{{
              trans(home.cta_s2?.btn_text ?? "")
            }}</Link>
          </div>
        </div>
        <div class="col-lg-6 order-lg-first">
          <div
            class="img-box position-relative d-flex align-items-center justify-content-center wow fadeInLeft"
          >
            <img
              v-lazy="home.cta_s2.image2"
              alt="image"
              class="lazy-img"
            />
            <img
              v-lazy="home.cta_s2.image1"
              alt="image"
              class="lazy-img shapes screen_01"
            />
            <img
              v-lazy="'/assets/images/shape/shape_25.svg'"
              alt="image"
              class="lazy-img shapes shape_01"
            />
          </div>
          <!-- /.big-circle -->
        </div>
      </div>
    </div>
  </section>
</template>
