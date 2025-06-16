<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

const categories = ref([])
const loading = ref(true)
onMounted(() => {
  homeApiService.get('menuCategories').then((res) => {
    categories.value = res
    loading.value = false
  })
})
</script>

<template>
  <nav class="category-menu d-none d-lg-block">
    <ul class="style-none nav-item d-flex align-items-center justify-content-start">
      <li v-for="(item, index) in categories" :key="index">
        <Link :href="route('job-categories.show', item.slug)">{{ item.title }}</Link>
      </li>
    </ul>
  </nav>
</template>
