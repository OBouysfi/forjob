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
  <section class="blog-section-two pt-180 xl-pt-150 lg-pt-100 pb-150 xl-pb-130 lg-pb-80">
    <div class="container">
      <div class="position-relative">
        <div class="title-one mb-30 lg-mb-10 text-center">
          <h2 class="fw-600">{{ trans('Our Blog') }}</h2>
        </div>

        <div class="row gx-xxl-5">
          <div v-for="(blog, index) in blogs" :key="index" class="col-lg-4 col-md-6">
            <article class="blog-meta-one mt-35 wow fadeInUp">
              <figure class="post-img m0">
                <Link :href="route('blogs.show', blog)" class="w-100 d-block"
                  ><img v-lazy="blog.preview?.value" alt="image" class="lazy-img w-100 tran4s"
                /></Link>
              </figure>
              <div class="post-data mt-30 lg-mt-20">
                <div>
                  <Link :href="route('blogs.show', blog)" class="date text-uppercase">{{
                    blog.created_at_diff
                  }}</Link>
                </div>
                <Link :href="route('blogs.show', blog)" class="mb-25 lg-mb-20 mt-10">
                  <h4 class="tran3s blog-title">{{ blog.title }}</h4>
                </Link>
                <div>
                  <Link :href="route('blogs.show', blog)" class="btn-seven"
                    >{{ trans('Read More') }}
                  </Link>
                </div>
              </div>
            </article>
            <!-- /.blog-meta-one -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
