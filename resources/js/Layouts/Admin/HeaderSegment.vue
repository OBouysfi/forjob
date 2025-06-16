<template>
  <Head :title="title || ''" />

  <div class="mb-4 flex flex-col justify-between gap-y-1 sm:flex-row sm:gap-y-0">
    <ol class="breadcrumb">
      <template v-if="segments != null">
        <li v-for="segment in segments" :key="segment.index" class="breadcrumb-item capitalize">
          {{ segment }}
        </li>
      </template>
    </ol>
    <template v-if="buttons != null">
      <div class="text-right">
        <template v-for="button in buttons" :key="button.index">
          <Link v-if="button.url != '#'" :href="button.url || '#'" class="btn btn-sm btn-primary">
            <div v-html="button.name"></div>
          </Link>
          <button
            v-else
            @click="(e) => e.preventDefault()"
            data-toggle="drawer"
            :data-target="button.target"
            class="btn btn-sm btn-primary mx-2 text-center"
          >
            <div v-html="button.name"></div>
          </button>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup>
import { Head } from '@inertiajs/vue3'

defineProps(['title', 'segments', 'buttons'])
</script>
