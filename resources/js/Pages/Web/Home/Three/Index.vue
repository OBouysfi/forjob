<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import ServiceSection from '@/Pages/Web/Home/Three/Partials/ServiceSection.vue'
import CategorySection from '@/Pages/Web/Home/Three/Partials/CategorySection.vue'
import CategorySection2 from '@/Pages/Web/Home/Three/Partials/CategorySection2.vue'
import FeatureSection from '@/Pages/Web/Home/Three/Partials/FeatureSection.vue'
import FeatureSection2 from '@/Pages/Web/Home/Three/Partials/FeatureSection2.vue'
import FeatureSection3 from '@/Pages/Web/Home/Three/Partials/FeatureSection3.vue'
import BannerSection from '@/Pages/Web/Home/Three/Partials/BannerSection.vue'
import BannerSection2 from '@/Pages/Web/Home/Three/Partials/BannerSection2.vue'
import FeedbackSection from '@/Pages/Web/Home/Three/Partials/FeedbackSection.vue'
import JobIntroSection from '@/Pages/Web/Home/Three/Partials/JobIntroSection.vue'

defineOptions({ layout: DefaultLayout })

defineProps(['home', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />
  <BannerSection :home="home" />
  <ServiceSection />
  <CategorySection />

  <FeatureSection :home="home" />
  <FeatureSection2 :home="home" />

  <BannerSection2 :home="home" />
  <FeedbackSection />

  <FeatureSection3 :home="home" />
  <CategorySection2 :home="home" />

  <div class="footer-with-bg">
    <JobIntroSection />
  </div>
</template>
