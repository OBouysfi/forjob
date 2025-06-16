<script setup>
defineProps({
  forTable: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <tbody v-if="forTable">
    <tr>
      <td colspan="10">
        <div class="mb-8 mt-5 flex flex-col items-center justify-center">
          <img src="/assets/images/no-data.svg" class="my-3 h-16" alt="" />
          <p class="text-gray-500">{{ trans('No data found') }}</p>
        </div>
      </td>
    </tr>
  </tbody>

  <div v-else class="mb-8 mt-5 flex flex-col items-center justify-center">
    <img src="/assets/images/no-data.svg" class="my-3 h-16" alt="" />
    <p class="text-gray-500">{{ trans('No data found') }}</p>
  </div>
</template>
