<script setup>
defineProps(["home"]);
</script>

<template>
  <section
    class="fancy-banner-five bg-image position-relative pt-100 lg-pt-60 pb-100 lg-pb-60"
    :style="{backgroundImage: `url(${home.cta_s4.image1})`}"
  >
    <div class="container">
      <div class="position-relative">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="text-center title-one text-lg-start">
              <h2 class="text-white main-font">{{ home.cta_s4?.title }}</h2>
            </div>
          </div>
          <div class="col-lg-5 ms-auto">
            <p
              class="text-lg text-center text-white mb-35 lg-mb-20 md-mt-20 text-lg-start"
            >
              {{ home.cta_s4?.subtitle }}
            </p>
            <ul
              class="btn-group style-none d-flex justify-content-center justify-content-lg-start"
            >
              <li class="me-2 ms-2 ms-lg-0">
                <Link :href="home.cta_s4.left_btn_link" class="btn-seven border6">{{
                  home.cta_s4.left_btn_text
                }}</Link>
              </li>
              <li class="ms-2 ms-lg-0">
                <a :href="home.cta_s4.right_btn_link" class="btn-five border6">{{
                  home.cta_s4.right_btn_text
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
