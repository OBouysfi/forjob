<script setup>
import { Head, router } from "@inertiajs/vue3";
import EmployerLayout from "@/Layouts/Employer.vue";
import Paginate from "@/Components/WebPaginate.vue";
import NiceSelect from "@/Components/NiceSelect.vue";
import { ref, watch } from "vue";
import moment from "moment";
import sharedComposable from "@/Composables/sharedComposable";
const { textExcerpt } = sharedComposable();
defineOptions({ layout: EmployerLayout });
const props = defineProps(["reviews"]);
const sorts = [
  {
    label: "Latest",
    value: "asc",
  },
  {
    label: "Oldest",
    value: "desc",
  },
];
const filterForm = ref({
  sort: "",
});
watch(
  () => filterForm.value.sort,
  () => {
    router.get(route("employer.job-reviews"), filterForm.value, {
      preserveState: true,
    });
  }
);
</script>

<template>
  <Head :title="trans('Job Reviews')" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h2 class="main-title m0">{{ trans("Job Reviews") }}</h2>
    <div class="short-filter d-flex align-items-center">
      <div class="text-dark fw-500 text-nowrap me-2">{{ trans("Sort by") }}:</div>
      <NiceSelect
        v-model="filterForm.sort"
        :options="sorts"
        value-by="value"
        label="label"
        placeholder="Default"
      />
    </div>
  </div>

  <div class="bg-white card-box border-20">
    <div class="table-responsive" v-if="reviews.total">
      <table class="table job-alert-table">
        <thead>
          <tr>
            <th scope="col">{{ trans("Candidate") }}</th>
            <th scope="col">{{ trans("Job") }}</th>
            <th scope="col">{{ trans("Ratting") }}</th>
            <th scope="col">{{ trans("Comment") }}</th>
            <th scope="col">{{ trans("Created At") }}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="border-0">
          <tr v-for="review in reviews.data">
            <td>
              <div class="gap-3 d-flex align-items-center">
                <img
                  class="review-avatar-img"
                  v-lazy="
                    review.author.avatar == null
                      ? `https://ui-avatars.com/api/?name=${review.author.name}`
                      : `${review.author.avatar}`
                  "
                />
                <a
                  target="_blank"
                  class="fw-bold"
                  :href="route('candidates.show', review.author?.username)"
                  >{{ review.author?.name }}</a
                >
              </div>
            </td>

            <td>
              <div v-if="review.job?.id">
                <a target="_blank" :href="route('jobs.show', review.job.slug)">
                  {{ review.job.title }}
                </a>
              </div>
            </td>

            <td>{{ review.ratting }} {{ trans("Star") }}</td>
            <td>{{ textExcerpt(review.comment, 30) }}</td>
            <td>
              {{ moment(review.created_at).format("DD-MMM-YYYY") }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- /.table job-alert-table -->
    </div>
    <div v-else class="bg-white card-box border-20">
      <div class="text-center">{{ trans("No record found") }}</div>
    </div>
  </div>

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="reviews.links" />
  </div>
</template>
