<template>
  <main class="container p-4 sm:p-6">
    <Head title="Edit Admin Role" />
    <HeaderSegment :title="trans('Edit Admin Role')" :segments="segments" :buttons="buttons" />
  </main>
</template>

<script>
import AdminLayout from "@/Layouts/Admin.vue"
export default {
  layout: AdminLayout
}

</script>

<script setup>
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { Head } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
const props = defineProps(['segments', 'buttons'])
</script>