<script setup>
const props = defineProps({
  message: String,
  classes: String,
  size: {
    type: Number,
    default: 30
  }
})
</script>

<template>
  <p
    v-show="message?.length"
    class="text-danger small lh-base mb-0 mt-1 text-red-500"
    :class="classes"
  >
    {{ message }}
  </p>
</template>
