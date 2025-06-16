<template>
  <li>
    <Link :href="href" class="d-flex w-100 align-items-center" :class="{ active: active }">
    <img :src="`/assets/dashboard/images/icon/${iconLink + iconExt}`" alt="icon" class="lazy-img" />
    <span>{{ trans(text) }}</span>
    </Link>
  </li>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  href: String,
  active: {
    type: Boolean,
    default: false
  },
  iconName: String,
  iconExt: {
    type: String,
    default: '.svg'
  },
  text: String
})

const iconLink = computed(() => {
  return props.active ? `${props.iconName}_active` : `${props.iconName}`
})
</script>
