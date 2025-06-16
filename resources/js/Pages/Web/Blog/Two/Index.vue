<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import JobIntro from '@/Pages/Web/Candidate/Partials/JobIntro.vue'
import SingleBlogPostStandard from '@/Components/SingleBlogPostStandard.vue'
import BlogSidebarRight from '@/Pages/Web/Blog/Partials/BlogSidebarRight.vue'
import WebPaginate from '@/Components/WebPaginate.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'

defineOptions({ layout: DefaultLayout })
const props = defineProps(['blogs', 'categories', 'recent_blogs', 'tags', 'meta'])
</script>

<template>
  <Seo :metaData="meta" />
  <Breadcrumb
    :title="trans('Blog')"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('Blog')"
  />
  <section class="blog-section pt-100 lg-pt-80 pb-120 lg-pb-80">
    <div class="container">
      <div class="row">
        <div class="m-auto col-xxl-11">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <template v-if="blogs.total">
                  <SingleBlogPostStandard class="col-md-6" v-for="post in blogs.data" :key="post.id" :post="post" />
                </template>
                <h3 v-else class="text-center text-muted">
                  {{ trans('No blog posts') }}
                </h3>
              </div>
              <WebPaginate :links="props.blogs.links" />
            </div>

            <div class="col-lg-4">
              <BlogSidebarRight
                :categories="props.categories"
                :tags="props.tags"
                :recent-blogs="props.recent_blogs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./blog-section -->

  <JobIntro />
</template>
