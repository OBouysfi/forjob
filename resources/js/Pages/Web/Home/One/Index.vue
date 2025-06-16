<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import JobIntro from "@/Pages/Web/Home/Common/JobIntroSection.vue";
import BlogSection from "@/Pages/Web/Home/One/Partials/BlogSection.vue";
import BrandSection from "@/Pages/Web/Home/One/Partials/BrandSection.vue";
import ExpertSection from "@/Pages/Web/Home/One/Partials/ExpertSection.vue";
import CategorySection from "@/Pages/Web/Home/One/Partials/CategorySection.vue";
import FeedbackSection from "@/Pages/Web/Home/One/Partials/FeedbackSection.vue";
import BannerSection from "@/Pages/Web/Home/One/Partials/BannerSection.vue";
import FeatureSection from "@/Pages/Web/Home/One/Partials/FeatureSection.vue";
import FeatureSection2 from "@/Pages/Web/Home/One/Partials/FeatureSection2.vue";
import BannerSection2 from "@/Pages/Web/Home/One/Partials/BannerSection2.vue";
import Seo from "@/Components/Seo.vue";

defineOptions({ layout: DefaultLayout });
defineProps(["home", "seo"]);
</script>

<template>
  <Seo :metaData="seo" />
  <BannerSection :home="home" />
  <CategorySection :home="home" />
  <FeatureSection2 :home="home" />
  <FeatureSection />
  <ExpertSection />
  <FeedbackSection />
  <BrandSection :home="home" />
  <BlogSection />
  <BannerSection2 :home="home" />
  <JobIntro />
</template>
