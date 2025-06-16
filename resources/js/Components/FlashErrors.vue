<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

const errors = computed(() => usePage().props.flash)
const close = () => (usePage().props.flash = [])
const hasErrors = computed(() => Object.keys(errors.value).length > 0)
if (hasErrors) {
  setTimeout(() => {
    usePage().props.flash = []
  }, 3000)
}
</script>

<template>
  <transition name="slide-right">
    <div v-if="hasErrors" class="validation-errors-user" @click="close">
      <ul class="list-unstyled mb-0">
        <li
          class="d-flex align-items-center gap-2 text-white"
          v-for="(error, key) in errors"
          :key="key"
        >
          <img src="/assets/images/icon/warning-outline.svg" alt="" />
          {{ error.replace(/[.,]/g, ' ') }}
        </li>
      </ul>
    </div>
  </transition>
</template>
