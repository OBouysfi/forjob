<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'

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
  <section class="blog-section-one">
    <div class="container">
      <div class="position-relative">
        <div class="title-one mb-30 lg-mb-10">
          <h2>{{ $page.props.app_name }} {{ trans('Guides') }}</h2>
        </div>

        <div class="row gx-xxl-5">
          <div v-for="(blog, index) in blogs" :key="index" class="col-lg-4 col-md-6">
            <article class="blog-meta-one mt-35 wow fadeInUp">
              <figure class="post-img m0">
                <Link :href="route('blogs.show', blog)" class="w-100 d-block">
                  <img v-lazy="blog.preview?.value" alt="" class="lazy-img w-100 tran4s" />
                </Link>
              </figure>
              <div class="post-data mt-30 lg-mt-20">
                <ul class="tags style-none d-flex">
                  <li
                    class="me-1"
                    v-for="(item, index) in blog.categories.slice(0, 3)"
                    :key="index"
                  >
                    <a href="#"> {{ item.title }}</a>
                  </li>
                </ul>
                <Link :href="route('blogs.show', blog)" class="mb-10 mt-10">
                  <h4 class="tran3s blog-title">
                    {{ blog.title }}
                  </h4>
                </Link>
              </div>
            </article>
            <!-- /.blog-meta-one -->
          </div>
        </div>

        <div class="explore-btn sm-mt-30 text-center">
          <Link :href="route('blogs.index')" class="btn-one">{{ trans('Explore More') }}</Link>
        </div>
      </div>
    </div>
  </section>
</template>
