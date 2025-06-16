<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import moment from 'moment'

const blogs = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get('blogs').then((res) => {
    blogs.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="blog-section-one mt-160 xl-mt-130 lg-mt-100">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-xl-7">
            <div class="title-one lg-mb-10 mb-20">
              <h2 class="main-font">{{ $page.props.app_name }} {{ trans('Guides') }}</h2>
            </div>
          </div>
        </div>

        <div class="row gx-xl-5">
          <div v-for="(blog, index) in blogs.slice(0, 2)" :key="index" class="col-sm-6">
            <article class="blog-meta-two mt-35 xs-mt-20 wow fadeInUp">
              <figure class="post-img m0">
                <Link :href="route('blogs.show', blog)" class="w-100 d-block"
                  ><img v-lazy="blog.preview?.value" alt="img" class="lazy-img w-100 tran4s" />
                </Link>
                <span class="tags fw-500">
                  {{ blog.categories.map((item) => item.title).join(', ') }}
                </span>
              </figure>
              <div class="post-data mt-35 lg-mt-20">
                <div class="date">
                  <span class="fw-500 text-dark">{{ blog.is_featured ? 'Featured | ' : '' }} </span>
                  <a :href="route('blogs.show', blog)">{{
                    moment(blog.created_at).format('DD MMM, YYYY')
                  }}</a>
                </div>
                <Link :href="route('blogs.show', blog)">
                  <h4 class="tran3s blog-title">{{ blog.title }}</h4>
                </Link>
                <Link
                  :href="route('blogs.show', blog)"
                  class="continue-btn tran3s d-flex align-items-center"
                >
                  <span class="fw-500 me-2">{{ trans('Continue Reading') }}</span>
                  <i class="bi bi-arrow-right"></i>
                </Link>
              </div>
            </article>
            <!-- /.blog-meta-two -->
          </div>
        </div>

        <div class="explore-btn sm-mt-50 text-center">
          <Link href="/blogs" class="btn-six">{{ trans('Explore More') }}</Link>
        </div>
      </div>
    </div>
  </section>
</template>
