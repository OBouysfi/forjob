<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import BannerSection from '@/Pages/Web/Home/Two/Partials/BannerSection.vue'
import FeatureSection from '@/Pages/Web/Home/Two/Partials/FeatureSection.vue'
import FeatureSection2 from '@/Pages/Web/Home/Two/Partials/FeatureSection2.vue'
import FeatureSection3 from '@/Pages/Web/Home/Two/Partials/FeatureSection3.vue'
import CategorySection from '@/Pages/Web/Home/Two/Partials/CategorySection.vue'
import FeedbackSection from '@/Pages/Web/Home/Two/Partials/FeedbackSection.vue'
import BlogSection from '@/Pages/Web/Home/Two/Partials/BlogSection.vue'
import JobIntroSection from '@/Pages/Web/Home/Two/Partials/JobIntroSection.vue'

defineOptions({ layout: DefaultLayout })

defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />

  <BannerSection :home="home" />
  <FeatureSection />
  <FeatureSection2 :home="home" />
  <CategorySection />
  <FeatureSection3 :home="home" />
  <FeedbackSection :home="home" />
  <BlogSection />
  <JobIntroSection />
</template>
