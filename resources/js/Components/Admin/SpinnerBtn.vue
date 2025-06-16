<script setup>
import { computed } from 'vue'


const defaultClasses = computed(() => {
  return location.pathname.startsWith('/admin') ? "btn btn-primary" : "btn-one d-flex align-items-center"
})

const props = defineProps({
  processing: Boolean,
  btnText: {
    type: String,
    default: "Save"
  },
  classes: {
    type: String,
    // "btn btn-primary btn-one align-items-center d-flex flex items-center mt-5"
    default: '' // for adminend default btn
  },
  size: {
    type: Number,
    default: 30
  }
})
</script>

<template>
  <button type="submit" :class="classes == '' ? defaultClasses : classes" :disabled="props.processing">
    <img v-show="props.processing ?? false" src="/assets/images/ajax_loading_white.svg" class="spinner_btn_img" />
    <span v-html="props.btnText"></span>
  </button>
</template>
