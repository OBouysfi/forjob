<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import helper from '@/Composables/sharedComposable'

const { textExcerpt } = helper()

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
  <section class="blog-section-one mt-160 xl-mt-150 lg-mt-100">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-xl-7">
            <div class="title-one mb-30 lg-mb-10">
              <h2 class="main-font color-blue">{{ $page.props.app_name }} {{ trans('Guides') }}</h2>
            </div>
          </div>
        </div>

        <div class="row gx-xxl-5">
          <div v-for="(item, index) in blogs" :key="index" class="col-lg-4 col-md-6">
            <article class="blog-meta-one mt-35 xs-mt-20 wow fadeInUp">
              <figure class="post-img m0">
                <Link :href="route('blogs.show', item)" class="w-100 d-block"
                  ><img v-lazy="item.preview?.value" alt="" class="w-100 tran4s" />
                </Link>
              </figure>
              <div class="post-data mt-30 lg-mt-20">
                <div>
                  <Link :href="route('blogs.show', item)" class="date">{{
                    item.created_at_diff
                  }}</Link>
                </div>
                <Link :href="route('blogs.show', item)" class="mb-5 mt-10">
                  <h4 class="tran3s blog-title">{{ item.title }}</h4>
                </Link>
                <p class="mb-20">{{ textExcerpt(item.meta[0].value, 120) }}</p>
                <Link :href="route('blogs.show', item)" class="read-more">
                  <img src="/assets/images/icon/icon_42.svg" alt="" />
                </Link>
              </div>
            </article>
            <!-- /.blog-meta-one -->
          </div>
        </div>

        <div class="explore-btn sm-mt-50 text-center">
          <Link href="/blogs" class="btn-six">{{ trans('Explore More') }}</Link>
        </div>
      </div>
    </div>
  </section>
</template>
