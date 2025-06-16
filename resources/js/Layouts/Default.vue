<script setup>
import { usePage } from '@inertiajs/vue3'
import { defineAsyncComponent, onMounted, watch } from 'vue'
import Modal from '@/Components/Admin/Modal.vue'
import { useThemeLoaderStore } from '@/Store/themeLoaderStore'
import FlashErrors from '@/Components/FlashErrors.vue'
const themeLoader = useThemeLoaderStore()
const setComponent = () => {
  themeLoader.$patch({ theme: usePage().props.theme })
  themeLoader.loadedComponents[themeLoader.theme] = {
    header: defineAsyncComponent(() => import(`./Default/${themeLoader.theme}/Header.vue`)),
    footer: defineAsyncComponent(() => import(`./Default/${themeLoader.theme}/Footer.vue`))
  }
}
onMounted(() => setComponent())
// only for demo
watch(
  () => usePage().url,
  () => {
    if (route().current('home')) setComponent()
  }
)
const loadDynamicThemes = () => themeLoader.loadedComponents[themeLoader.theme]
</script>

<template>
  <FlashErrors />
  <div class="main-page-wrapper">
    <template v-if="themeLoader.theme">
      <component :is="loadDynamicThemes().header" />
    </template>
    <slot />
    <template v-if="themeLoader.theme">
      <component :is="loadDynamicThemes().footer" />
    </template>
    <button class="scroll-top">
      <i class="bi bi-arrow-up-short"></i>
    </button>
  </div>

  <Modal />
</template>
