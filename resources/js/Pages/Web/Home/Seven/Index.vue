<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import BannerSection from '@/Pages/Web/Home/Seven/Partials/BannerSection.vue'
import BrandSection from '@/Pages/Web/Home/Seven/Partials/BrandSection.vue'
import CategorySection from '@/Pages/Web/Home/Seven/Partials/CategorySection.vue'
import FeatureSection from '@/Pages/Web/Home/Seven/Partials/FeatureSection.vue'
import FeedbackSection from '@/Pages/Web/Home/Seven/Partials/FeedbackSection.vue'
import BlogSection from '@/Pages/Web/Home/Seven/Partials/BlogSection.vue'
import FeatureSection2 from '@/Pages/Web/Home/Seven/Partials/FeatureSection2.vue'
import JobIntroSection from '@/Pages/Web/Home/Seven/Partials/JobIntroSection.vue'
import CompanyListSection from '@/Pages/Web/Home/Seven/Partials/CompanyListSection.vue'
import FaqSection from '@/Pages/Web/Home/Seven/Partials/FaqSection.vue'

defineOptions({ layout: DefaultLayout })
defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />

  <BannerSection :home="home" />
  <BrandSection />
  <CategorySection />
  <FeatureSection />
  <FeatureSection2 :home="home" />
  <CompanyListSection />
  <FeedbackSection />
  <FaqSection />
  <BlogSection />
  <JobIntroSection :home="home" />
</template>
