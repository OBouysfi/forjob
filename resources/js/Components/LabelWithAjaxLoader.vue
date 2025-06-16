<script setup>
defineProps(['loading', 'text'])

</script>

<template>
    <label class="d-flex">{{ text ?? '' }} <img v-show="loading ?? false" src="/assets/images/ajax_loading.svg"></label>
</template>