<script setup>
import { router } from "@inertiajs/vue3";
import moment from "moment";
import { ref } from "vue";
import sharedComposable from "@/Composables/sharedComposable";
const { textExcerpt, getQueryParams } = sharedComposable();

const props = defineProps(["categories", "recent_blogs", "tags"]);
const request = getQueryParams();
const searchInput = ref(request.s ?? "");

const submit = () => {
  router.get(route("blogs.index"), { s: searchInput.value });
};
</script>

<template>
  <div class="blog-sidebar ps-xl-4 md-mt-60">
    <form @submit.prevent="submit" class="search-form position-relative mb-50 lg-mb-40">
      <input v-model="searchInput" type="text" placeholder="Search..." />
      <button><i class="bi bi-search"></i></button>
    </form>

    <div class="category-list lg-mb-40 mb-60" v-if="categories.length">
      <h3 class="sidebar-title">{{ trans("Category") }}</h3>
      <ul class="style-none">
        <li v-for="(item, index) in categories" :key="index">
          <Link :href="`/blogs/category/${item.slug}/${item.id}`">
            {{ item.title }} ({{ item.postcategories_count }})
          </Link>
        </li>
      </ul>
    </div>
    <div class="sidebar-recent-news lg-mb-40 mb-60">
      <h4 class="sidebar-title">{{ trans("Recent News") }}</h4>
      <template v-if="recent_blogs?.length">
        <div
          v-for="(item, index) in recent_blogs"
          :key="index"
          class="pt-20 pb-20 news-block d-flex align-items-center border-top"
        >
          <div>
            <img v-lazy="item.preview?.value" alt="img" class="lazy-img" />
          </div>
          <div class="post ps-4">
            <h4 class="mb-5">
              <Link :href="route('blogs.show', item)" class="title tran3s">
                {{ textExcerpt(item.title, 60) }}</Link
              >
            </h4>
            <div class="date">{{ moment(item.created_at).format("DD MMM, YYYY") }}</div>
          </div>
        </div>
      </template>
      <div v-else>{{ trans("no items found") }}</div>
    </div>
    <div class="sidebar-keyword" v-if="tags.length">
      <h4 class="sidebar-title">{{ trans("Keywords") }}</h4>
      <ul class="flex-wrap style-none d-flex">
        <li v-for="(item, index) in tags" :key="index">
          <Link :href="`/blogs/tag/${item.slug}/${item.id}`"> {{ item.title }}</Link>
        </li>
      </ul>
    </div>
  </div>
</template>
