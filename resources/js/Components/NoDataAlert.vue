<script setup>
import trans from '@/Composables/transComposable';

</script>

<template>
    <div class="mb-8 mt-5 d-flex flex-column align-items-center justify-content-center">
        <img src="/assets/images/no-data.svg" class="my-3 no-data-found-img" alt="" />
        <p class="text-dark">{{ trans('no data found') }}</p>
    </div>
</template>