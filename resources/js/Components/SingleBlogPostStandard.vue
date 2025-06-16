<script setup>
import { Link } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import moment from 'moment'
const { textExcerpt } = sharedComposable()
const { post } = defineProps(['post'])

</script>

<template>
  <article class="blog-meta-two mb-75 lg-mb-40">
    <figure class="post-img m0">
      <Link :href="route('blogs.show', post)" class="w-100 d-block"
        ><img v-lazy="post.preview.value" alt="preview" class="lazy-img w-100 tran4s"
      /></Link>
      <Link v-if="post?.categories" :href="route('blogs.show', post)" class="tags color-two fw-500">
        {{ post.categories?.[0]?.title }}
      </Link>
    </figure>
    <div class="post-data mt-35 lg-mt-20">
      <div class="date">
        <span class="fw-500 text-dark" v-show="post.featured">{{ trans('Featured') }} - </span>
        <Link :href="route('blogs.show', post)">{{ moment(post.created_at).format('DD MMM, YYYY') }}</Link>
      </div>
      <Link :href="route('blogs.show', post)">
        <h4 class="tran3s blog-title">{{ textExcerpt(post.title, 60) }}</h4>
      </Link>
      <Link :href="route('blogs.show', post)" class="continue-btn tran3s d-flex align-items-center">
        <span class="fw-500 me-2">{{ trans('Continue Reading') }}</span>
        <i class="bi bi-arrow-right"></i>
      </Link>
    </div>
  </article>
</template>
