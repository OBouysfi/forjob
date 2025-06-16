<script setup>
defineProps(['type', 'text'])
</script>

<template>
    <div class="alert alert-info m-2" :class="`alert-${type ?? 'success'}`" role="alert">
        <i width="1rem" height="1rem" data-feather="alert-circle"></i>
        <span>{{ text ?? '' }}</span>
    </div>
</template>