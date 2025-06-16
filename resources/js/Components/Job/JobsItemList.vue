<script setup>
import sharedComposable from "@/Composables/sharedComposable";
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
const { formatNumber, textExcerpt } = sharedComposable();
defineProps({
  items: {
    type: Object,
    default: [],
  },
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
  <div
    v-for="job in items"
    :key="job.id"
    class="mb-20 job-list-one style-two position-relative border-style"
    :class="{ favourite: job.featured_expire_at }"
  >
    <div class="row justify-content-between align-items-center">
      <div class="col-md-5">
        <div class="job-title d-flex align-items-center">
          <Link :href="route('jobs.show', job.slug)" class="logo">
            <img
              v-lazy="
                job.user?.avatar == null
                  ? `https://ui-avatars.com/api/?name=${job.user.name}&rounded=true&background=random&color=#fff`
                  : `${job.user?.avatar}`
              "
              alt="avatar"
              class="m-auto candidate-avatar-rounded"
            />
          </Link>
          <div class="split-box1">
            <Link :href="route('jobs.show', job.slug)" class="job-duration fw-500">
              {{ job.type }}
            </Link>
            <Link :href="route('jobs.show', job.slug)" class="title fw-500 tran3s">
              {{ textExcerpt(job.title, 50) }}</Link
            >
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="job-location" v-if="!job.country?.[0]?.name">
          {{ trans("Remote") }}
        </div>
        <div class="job-location" v-else>
          <Link :href="route('jobs.show', job.slug)">
            {{ job.country?.[0]?.name }}, {{ job.state?.[0]?.name }}</Link
          >
        </div>
        <div class="job-salary">
          <span
            class="fw-500 text-dark"
            v-if="
              job.salary_range &&
              job.salary_range.split('-')[0] > 0 &&
              job.salary_range.split('-')[1] > 0
            "
          >
            {{ formatNumber(job.salary_range.split("-")[0], 0) }}
            -
            {{ formatNumber(job.salary_range.split("-")[1], 0) }}
          </span>
          <span class="fw-500 text-dark" v-else>{{ trans("Negotiable ") }}</span>
          / {{ job.salary_type }} .
          {{ job.experience }}
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
          <button
            type="button"
            @click="toggleBookmark(job)"
            class="text-center save-btn rounded-circle tran3s me-3"
            :class="{ 'bg-success': job.is_bookmarked }"
            title="Save Job"
          >
            <i class="bi bi-bookmark-dash"></i>
          </button>
          <Link :href="route('jobs.show', job.slug)" class="text-center apply-btn tran3s">
            {{ trans("Details") }}
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
