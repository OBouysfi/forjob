<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'
defineOptions({ layout: DefaultLayout })
defineProps(['info', 'seo'])
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb :title="info.title" href="/" :href-text="trans('Home')" :subtitle="info.title" />

  <section class="faq-section position-relative pt-100 lg-pt-80">
    <div class="container" v-html="info.description?.value"></div>
  </section>
</template>
