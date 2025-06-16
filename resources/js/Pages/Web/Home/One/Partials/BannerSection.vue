<script setup>
import { onMounted, ref } from "vue";
import homeApiService from "@/Composables/homeApiService";
import { Link } from "@inertiajs/vue3";
import JobSearchForm from "@/Components/JobSearchForm.vue";

defineProps(["home"]);
const popularCategories = ref([]);

onMounted(async () => {
  homeApiService.get("popularCategories").then((res) => {
    popularCategories.value = res;
  });
});
</script>

<template>
  <div class="hero-banner-one position-relative">
    <div class="container">
      <div class="position-relative pt-200 md-pt-150 pb-150 xl-pb-120 md-pb-80">
        <div class="row">
          <div class="col-lg-6">
            <h1 v-html="home?.hero?.title"></h1>
            <p class="md-mt-30 mb-50 md-mb-30 mt-40 text-lg text-white">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="col-xl-9 col-lg-8">
              <div class="job-search-one position-relative me-xl-5">
                <JobSearchForm />
                <ul class="tags d-flex style-none mt-20 flex-wrap">
                  <li class="fw-500 me-2 text-white">{{ trans("Popular") }}:</li>
                  <li
                    v-for="(item, index) in popularCategories"
                    :key="index"
                    class="me-2"
                  >
                    <Link :href="route('job-categories.show', item.slug)">{{
                      item.title
                    }}</Link>
                  </li>
                </ul>
              </div>
              <!-- /.job-search-one -->
            </div>
          </div>
        </div>

        <div class="img-box">
          <img src="/assets/images/shape/shape_01.svg" alt="" class="lazy-img shapes" />
          <img :src="home.hero.image" alt="" class="lazy-img w-100" />
        </div>
        <!-- /.img-box -->
      </div>
    </div>
    <img
      src="/assets/images/shape/shape_02.svg"
      alt=""
      class="lazy-img shapes shape_01"
    />
    <img
      src="/assets/images/shape/shape_03.svg"
      alt=""
      class="lazy-img shapes shape_02"
    />
  </div>
</template>
