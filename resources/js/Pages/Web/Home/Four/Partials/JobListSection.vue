<script setup>
import { onMounted, ref } from "vue"
import homeApiService from "@/Composables/homeApiService"
import JobsItemList from "@/Components/Job/JobsItemList.vue"
import { Link } from "@inertiajs/vue3"

const jobs = ref([])
const loading = ref(true)

onMounted(async () => {
  homeApiService.get("jobList").then((res) => {
    jobs.value = res
    loading.value = false
  })
})
</script>

<template>
  <section class="job-listing-one mt-180 xl-mt-150 lg-mt-100" v-if="jobs.length > 0">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-6">
          <div class="title-one">
            <h2 class="text-dark">{{ trans("New job listing") }}</h2>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="d-flex justify-content-lg-end">
            <Link href="/jobs" class="btn-six d-none d-lg-inline-block">{{
              trans("Explore all jobs")
            }}</Link>
          </div>
        </div>
      </div>

      <div
        class="job-listing-wrapper border-wrapper lg-mt-40 wow fadeInUp mt-80"
      >
        <JobsItemList :items="jobs" />
      </div>
      <!-- /.job-listing-wrapper -->

      <div class="d-lg-none mt-40 text-center">
        <Link href="/jobs" class="btn-six">{{
          trans("Explore all jobs")
        }}</Link>
      </div>

      <div class="lg-mt-30 wow fadeInUp mt-80 text-center">
        <div class="btn-eight fw-500">
          {{ trans("Do you want to post a job for your company?") }}
          <span>{{ trans("We can help.") }}</span>
          <a href="/register">{{ trans("Click here") }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
