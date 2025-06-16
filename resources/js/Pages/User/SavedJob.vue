<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import UserLayout from "@/Layouts/User.vue";
import Paginate from "@/Components/Paginate.vue";
import sharedComposable from "@/Composables/sharedComposable";
import NiceSelect from "@/Components/NiceSelect.vue";
import notify from "@/Plugins/Admin/notify";
import { modal } from "@/Composables/modalComposable";
const { formatNumber, copyToClipboard } = sharedComposable();

defineOptions({ layout: UserLayout });
defineProps(["jobs"]);

const toggleBookmark = (job) => {
  modal.init(route("jobs.bookmark", job), {
    callback: () => {
      let form = useForm({});
      form.post(route("jobs.bookmark", job), {
        preserveScroll: true,
        onSuccess: () => {
          notify.success("Removed successfully");
        },
      });
    },
  });
};

const sorts = [
  {
    value: "asc",
    label: "Newest",
  },
  {
    value: "desc",
    label: "Oldest",
  },
];

const sortForm = useForm({
  order_by: "",
});

const sortSubmit = () => {
  sortForm.get(window.location.href, {
    preserveState: true,
  });
};
</script>

<template>
  <Head title="Saved Jobs" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h2 class="main-title m0">{{ trans("Saved Job") }}</h2>
    <div class="short-filter d-flex align-items-center">
      <div class="text-dark fw-500 me-2">{{ trans("Sort by") }}:</div>
      <NiceSelect
        v-model="sortForm.order_by"
        :options="sorts"
        label="label"
        value-by="value"
        placeholder="Default"
        @change="sortSubmit"
      />
    </div>
  </div>

  <div v-if="jobs.total" class="wrapper">
    <div
      v-for="(job, index) in jobs.data"
      :key="index"
      class="mb-20 overflow-visible job-list-one style-two position-relative"
    >
      <div class="row justify-content-between align-items-center">
        <div class="col-xxl-3 col-lg-4">
          <div class="job-title d-flex align-items-center">
            <a target="_blank" :href="route('jobs.show', job.slug)" class="logo"
              ><img
                v-lazy="
                  job.user?.avatar == null
                    ? `https://ui-avatars.com/api/?name=${job.user?.name}`
                    : `${job.user?.avatar}`
                "
                alt=""
                class="m-auto lazy-img"
            />
            </a>
            <a target="_blank" :href="route('jobs.show', job.slug)" class="title fw-500 tran3s">{{
              job.title
            }}</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 ms-auto">
          <a href="#" class="job-duration fw-500">{{ job.type }}</a>
          <div class="job-salary">
            <span
              class="fw-500 text-dark"
              v-if="
                job.salary_range &&
                job.salary_range.split('-')[0] > 0 &&
                job.salary_range.split('-')[1] > 0
              "
            >
              {{ formatNumber(job.salary_range.split("-")[0] ?? 0, 0) }}-{{
                formatNumber(job.salary_range.split("-")[1] ?? 0, 0)
              }}
            </span>
            <span class="fw-500 text-dark" v-else>
              {{ trans("Negotiable ") }}
            </span>
            / {{ job.salary_type }} .
            {{ job.expertise }}
          </div>
        </div>
        <div class="col-xxl-2 col-lg-3 col-md-4 col-sm-6 xs-mt-10 ms-auto">
          <div class="job-location">
            <a href="#"> {{ job.address }}</a>
          </div>
          <div class="job-category">
            {{ job.categories.map((item) => item.title).join(", ") }}
          </div>
        </div>
        <div class="col-lg-2 col-md-4">
          <div class="action-dots float-end">
            <button
              class="action-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <Link class="dropdown-item" :href="route('jobs.show', job.slug)"
                  ><img
                    src="/assets/dashboard/images/icon/icon_18.svg"
                    alt=""
                    class="lazy-img"
                  />
                  {{ trans("View in website") }}</Link
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="copyToClipboard(route('jobs.show', job.slug))"
                  ><img
                    src="/assets/dashboard/images/icon/icon_19.svg"
                    alt=""
                    class="lazy-img"
                  />
                  {{ trans("Copy link") }}</a
                >
              </li>

              <li>
                <a class="dropdown-item" href="#" @click="toggleBookmark(job)"
                  ><img
                    src="/assets/dashboard/images/icon/icon_21.svg"
                    alt=""
                    class="lazy-img"
                  />
                  {{ trans("Delete") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center bg-white fw-bold card-box">
    {{ trans("No job found") }}
  </div>

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="jobs.links" />
  </div>
</template>
