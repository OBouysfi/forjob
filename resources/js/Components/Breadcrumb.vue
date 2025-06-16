<script setup>
import { computed } from "vue";
import { useThemeLoaderStore } from "@/Store/themeLoaderStore";
const themeLoader = useThemeLoaderStore();
import sharedComposable from "@/Composables/sharedComposable";
const { textExcerpt } = sharedComposable();
defineProps({
  title: String,
  href: String,
  hrefText: String,
  subtitle: String,
});

const breadcrumbColor = computed(() => {
  const themes = ["One", "Six"];
  if (themes.includes(themeLoader.theme)) {
    return "";
  }
  return "inner-breadcrumb-colors";
});
</script>
<template>
  <div class="inner-banner-one position-relative" :class="breadcrumbColor">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="m-auto text-center">
            <div class="title-two">
              <h2 :title="title">{{ textExcerpt(title || "Title", 40) }}</h2>
            </div>
            <ul class="style-none d-flex justify-content-center page-pagination mt-15">
              <li>
                <Link v-if="href" :href="href">
                  {{ hrefText }}
                </Link>
                <template>{{ trans("Home") }} </template>
              </li>
              <li><i class="bi bi-chevron-right"></i></li>
              <li>{{ textExcerpt(subtitle, 60) }}</li>
            </ul>
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
