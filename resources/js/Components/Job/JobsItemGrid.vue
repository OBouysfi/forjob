<script setup>
import sharedComposable from "@/Composables/sharedComposable";
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
const { formatNumber, textExcerpt } = sharedComposable();
defineProps({
  items: {
    type: Object,
  },
  col: {
    default: 6,
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
  <div v-for="job in items" :key="job.id" class="mb-30" :class="`col-sm-${col}`">
    <div
      class="job-list-two style-two position-relative"
      :class="{ favourite: job.featured_expire_at }"
    >
      <Link :href="route('jobs.show', job.slug)" class="logo"
        ><img
          v-lazy="
            job.user?.avatar == null
              ? `https://ui-avatars.com/api/?name=${job.user.name}`
              : `${job.user?.avatar}`
          "
          alt="avatar"
          class="m-auto lazy-img"
      /></Link>
      <button
        type="button"
        @click="toggleBookmark(job)"
        class="text-center save-btn rounded-circle tran3s me-3"
        :class="{ 'bg-success': job.is_bookmarked }"
        title="Save Job"
      >
        <i class="bi bi-bookmark-dash"></i>
      </button>
      <div>
        <a :href="route('jobs.show', job.slug)" class="job-duration fw-500">{{
          job.type
        }}</a>
      </div>
      <div>
        <Link :href="route('jobs.show', job.slug)" class="title fw-500 tran3s">
          {{ textExcerpt(job.title, 50) }}</Link
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
          {{ formatNumber(job.salary_range.split("-")[0]) }}
          -
          {{ formatNumber(job.salary_range.split("-")[1]) }}
        </span>
        <span class="fw-500 text-dark" v-else>{{ trans("Negotiable ") }}</span>
        /
        {{ job.salary_type }}
      </div>
      <div class="mt-auto d-flex align-items-center justify-content-between">
        <div class="job-location" v-if="!job.country?.[0]?.name">
          {{ trans("Remote") }}
        </div>
        <div class="job-location" v-else>
          {{ job.country?.[0]?.name ?? "" }},{{ job.state?.[0]?.name ?? "" }}
        </div>
        <Link :href="route('jobs.show', job.slug)" class="text-center apply-btn tran3s">
          {{ trans("Details") }}
        </Link>
      </div>
    </div>
    <!-- /.job-list-two -->
  </div>
</template>
