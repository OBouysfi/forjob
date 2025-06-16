<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import JobIntro from "@/Pages/Web/Candidate/Partials/JobIntro.vue";
import BlogSidebarRight from "@/Pages/Web/Blog/Partials/BlogSidebarRight.vue";
import moment from "moment";
import Breadcrumb from "@/Components/Breadcrumb.vue";

defineOptions({ layout: DefaultLayout });

const props = defineProps([
  "blog",
  "categories",
  "tags",
  "recent_blogs",
  "seo",
  "nextBlog",
  "lastBlog",
]);
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb
    :title="blog.title"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('Blog')"
  />

  <section class="blog-section pt-100 lg-pt-80">
    <div class="container">
      <div class="border-bottom pb-160 xl-pb-130 lg-pb-80">
        <div class="row">
          <div class="col-lg-8">
            <div class="blog-details-page pe-xxl-5 me-xxl-3">
              <article class="blog-details-meta">
                <div class="blog-pubish-date">
                  {{ blog.categories[0]?.title }} .
                  {{ moment(blog.created_at).format("DD MMM, YYYY") }}
                </div>
                <h2 class="blog-heading">{{ blog.title }}</h2>
                <div class="img-meta mb-15">
                  <img v-lazy="blog.preview?.value" alt="preview" class="lazy-img" />
                </div>

                <h4>{{ trans('Overview') }}</h4>
                <div v-html="blog.short_description?.value"></div>
                <br>
                <hr />
                <br>
                <div v-html="blog.long_description?.value"></div>

                <div
                  class="bottom-widget d-sm-flex align-items-center justify-content-between"
                >
                  <ul class="pb-20 d-flex tags style-none">
                    <li>{{ trans("Tag") }}:</li>
                    <li>
                      <Link
                        v-for="(item, index) in blog.tags"
                        :key="index"
                        :href="`/blogs/tag/${item.slug}/${item.id}`"
                        >{{ item.title }}</Link
                      >
                    </li>
                  </ul>
                  <ul class="pb-20 d-flex share-icon align-items-center style-none">
                    <li>{{ trans("Share") }}:</li>
                    <li>
                      <a
                        target="_blank"
                        :href="`https://www.facebook.com/sharer/sharer.php?u=${route(
                          'blogs.show',
                          blog.slug
                        )}`"
                        ><i class="bi bi-facebook"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        :href="`https://twitter.com/intent/tweet?url=${route(
                          'blogs.show',
                          blog.slug
                        )}`"
                        ><i class="bi bi-twitter"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        :href="`https://www.linkedin.com/shareArticle?mini=true&url=${route(
                          'blogs.show',
                          blog.slug
                        )}`"
                        ><i class="bi bi-linkedin"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>

          <div class="col-lg-4">
            <BlogSidebarRight
              :categories="categories"
              :tags="tags"
              :recent_blogs="recent_blogs"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./blog-section -->

  <JobIntro />
</template>
