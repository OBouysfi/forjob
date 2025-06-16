<script setup>
import { router } from '@inertiajs/vue3'
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const selectContainer = ref(null)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const outsideClick = (event) => {
  if (isOpen.value && !selectContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClick)
})
const switchLanguage = (key) => {
  router.patch(route('set-locale', key))
}
</script>

<template>
  <div class="nice-select border" :class="{ open: isOpen }">
    <div class="current text-dark me-2" @click.stop="toggleDropdown">
      {{ $page.props.languages[$page.props.locale] }}
    </div>

    <ul class="list" ref="selectContainer">
      <li
        @click="switchLanguage(key)"
        class="option"
        v-for="(language, key) in $page.props.languages"
        :key="key"
        :class="key === $page.props.locale ? 'selected focus' : 'text-dark'"
      >
        {{ trans(language) }}
      </li>
    </ul>
  </div>
</template>
