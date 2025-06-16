<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import BannerSection from '@/Pages/Web/Home/Five/Partials/BannerSection.vue'
import CategorySection from '@/Pages/Web/Home/Five/Partials/CategorySection.vue'
import FeatureSection from '@/Pages/Web/Home/Five/Partials/FeatureSection.vue'
import JobListSection from '@/Pages/Web/Home/Five/Partials/JobListSection.vue'
import FeatureSection2 from '@/Pages/Web/Home/Five/Partials/FeatureSection2.vue'
import ExpertSection from '@/Pages/Web/Home/Five/Partials/ExpertSection.vue'
import FeedbackSection from '@/Pages/Web/Home/Five/Partials/FeedbackSection.vue'
import BrandSection from '@/Pages/Web/Home/Five/Partials/BrandSection.vue'
import BlogSection from '@/Pages/Web/Home/Five/Partials/BlogSection.vue'
import BannerSection2 from '@/Pages/Web/Home/Five/Partials/BannerSection2.vue'

defineOptions({ layout: DefaultLayout })

defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />

  <BannerSection :home="home" />
  <CategorySection />
  <FeatureSection />
  <JobListSection />
  <FeatureSection2 :home="home" />
  <ExpertSection />

  <FeedbackSection />
  <BrandSection />
  <BlogSection />
  <BannerSection2 :home="home" />
</template>
