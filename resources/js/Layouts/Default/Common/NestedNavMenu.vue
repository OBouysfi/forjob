<script setup>
import NestedComponent from '@/Layouts/Default/Common/NestedNavMenu.vue'
const props = defineProps({
  children: {
    type: [Array, Object]
  }
})
</script>

<template>
  <ul class="dropdown-menu">
    <li v-for="child in children" :key="child.id" :class="{ dropdown: child.children?.length > 0 }">
      <a class="dropdown-item" v-if="child.target == '_top'" :href="child.href ?? '#'">
        {{ child.text }}
      </a>

      <Link v-else class="dropdown-item" :href="child.href ?? '#'" :target="child.target">
        {{ child.text }}
      </Link>
      <template v-if="child.children?.length > 0">
        <NestedComponent :children="child.children" />
      </template>
    </li>
  </ul>
</template>
