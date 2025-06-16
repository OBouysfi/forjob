<script setup>
import { usePage } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import { watch } from 'vue'
import { useToast } from 'vue-toastification'
// Get toast interface
const toast = useToast()

watch(
  () => usePage().props.notifyMessages,
  () => displayMessages()
)

onMounted(() => {
  if (usePage().props.notifyMessages?.length) {
    displayMessages()
  }
})

const displayMessages = () => {
  usePage().props.notifyMessages?.forEach((alert) => {
    toast[alert.type ?? 'info'](alert.message ?? '', alert.options)
  })
}
</script>
<template></template>
