<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import CategorySection from '@/Pages/Web/Home/Four/Partials/CategorySection.vue'
import FeatureSection from '@/Pages/Web/Home/Four/Partials/FeatureSection.vue'
import BannerSection from '@/Pages/Web/Home/Four/Partials/BannerSection.vue'
import BannerSection2 from '@/Pages/Web/Home/Four/Partials/BannerSection2.vue'
import FeedbackSection from '@/Pages/Web/Home/Four/Partials/FeedbackSection.vue'
import JobIntroSection from '@/Pages/Web/Home/Four/Partials/JobIntroSection.vue'
import FaqSection from '@/Pages/Web/Home/Four/Partials/FaqSection.vue'
import JobListSection from '@/Pages/Web/Home/Four/Partials/JobListSection.vue'

defineOptions({ layout: DefaultLayout })

defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />
  <BannerSection :home="home" />
  <CategorySection />
  <BannerSection2 :home="home" />
  <JobListSection />
  <FeedbackSection />
  <FeatureSection :home="home" />
  <FaqSection />
  <JobIntroSection />
</template>
