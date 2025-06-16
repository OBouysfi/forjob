<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import BannerSection from '@/Pages/Web/Home/Six/Partials/BannerSection.vue'
import BrandSection from '@/Pages/Web/Home/Six/Partials/BrandSection.vue'
import CategorySection from '@/Pages/Web/Home/Six/Partials/CategorySection.vue'
import CategorySection2 from '@/Pages/Web/Home/Six/Partials/CategorySection2.vue'
import JobListSection from '@/Pages/Web/Home/Six/Partials/JobListSection.vue'
import BannerSection2 from '@/Pages/Web/Home/Six/Partials/BannerSection2.vue'
import FeatureSection from '@/Pages/Web/Home/Six/Partials/FeatureSection.vue'
import FeedbackSection from '@/Pages/Web/Home/Six/Partials/FeedbackSection.vue'
import BlogSection from '@/Pages/Web/Home/Six/Partials/BlogSection.vue'
import FeatureSection2 from '@/Pages/Web/Home/Six/Partials/FeatureSection2.vue'
import JobIntroSection from '@/Pages/Web/Home/Six/Partials/JobIntroSection.vue'

defineOptions({ layout: DefaultLayout })

defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />

  <BannerSection :home="home" />
  <BrandSection />
  <CategorySection />
  <CategorySection2 />
  <JobListSection />
  <BannerSection2 :home="home" />
  <FeatureSection :home="home" />
  <FeedbackSection :home="home" />
  <BlogSection />
  <FeatureSection2 :home="home" />
  <JobIntroSection :home="home"  />
</template>
