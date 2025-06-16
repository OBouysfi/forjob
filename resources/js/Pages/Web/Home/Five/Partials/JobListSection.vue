<script setup>
import { onMounted, ref } from "vue";
import homeApiService from "@/Composables/homeApiService";
import { Link, useForm } from "@inertiajs/vue3";

const jobs = ref([]);
const loading = ref(true);

onMounted(async () => {
  homeApiService.get("jobList").then((res) => {
    jobs.value = res;
    loading.value = false;
  });
});

const toggleBookmark = (job) => {
  let form = useForm({});
  form.post(route("jobs.bookmark", job), {
    preserveScroll: true,
    onSuccess: () => {},
  });
};
</script>

<template>
  <section 
    v-if="jobs.length > 0"
    class="job-listing-two pt-120 xl-pt-100 md-pt-80 pb-130 xl-pb-100 lg-pb-80 mt-110 xl-mt-90 md-mt-50"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xl-6 col-lg-5">
          <div class="text-center title-one text-lg-start md-mb-20">
            <h2 class="main-font">{{ trans("New job listing") }}</h2>
          </div>
        </div>

        <div class="row">
          <div class="mb-3 col-md-4" v-for="(item, index) in jobs" :key="index">
            <div class="mt-40 job-list-two lg-mt-20">
              <Link :href="route('jobs.show', item.slug)" class="logo">
                <img
                  v-lazy="
                    item.user?.avatar == null
                      ? `https://ui-avatars.com/api/?name=${item.user.name}`
                      : `${item.user?.avatar}`
                  "
                  alt="avatar"
                  class="m-auto lazy-img"
                />
              </Link>

              <button
                type="button"
                @click="toggleBookmark(item)"
                class="text-center save-btn rounded-circle tran3s me-3"
                :class="{ 'bg-success': item.is_bookmarked }"
                title="Save Job"
              >
                <i class="bi bi-bookmark-dash"></i>
              </button>

              <div>
                <Link :href="route('jobs.show', item.slug)" class="job-duration fw-500">{{
                  item.type
                }}</Link>
              </div>
              <div>
                <Link :href="route('jobs.show', item.slug)" class="title fw-500 tran3s">{{
                  item.title
                }}</Link>
              </div>
              <div class="job-date">{{ item.created_at_date }}</div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="job-location">
                  <Link :href="route('jobs.show', item.slug)">{{ item.address }}</Link>
                </div>
                <Link
                  :href="route('jobs.show', item.slug)"
                  class="text-center apply-btn tran3s"
                  >{{ trans("APPLY") }}</Link
                >
              </div>
            </div>
            <!-- /.job-list-two -->
          </div>
        </div>
        <!-- /.item -->
      </div>
    </div>
  </section>
</template>
