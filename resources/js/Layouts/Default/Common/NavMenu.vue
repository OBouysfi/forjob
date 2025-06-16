<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import NestedComponent from '@/Layouts/Default/Common/NestedNavMenu.vue'
const mainMenu = computed(() => {
  return (
    usePage().props.menus.filter(item => item.position === 'main-menu') || []
  )
})


</script>

<template>
  <template v-for="items in mainMenu" :key="items.id">
    <li
      class="nav-item"
      :class="{ 'dropdown nested': item.children?.length > 0 }"
      v-for="item in JSON.parse(items.data)"
      :key="item.id"
    >
      <Link
        v-if="item.href"
        :href="item.href"
        :target="item.target"
        class="nav-link"
        role="button"
      >
        {{ item.text }}
      </Link>
      <Link
        v-else
        href="#"
        class="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        {{ item.text }}
      </Link>
      <template v-if="item.children?.length > 0">
        <NestedComponent :children="item.children" />
      </template>
    </li>
  </template>
</template>
