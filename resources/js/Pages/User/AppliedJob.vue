<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3"
import UserLayout from "@/Layouts/User.vue"
import Paginate from "@/Components/Paginate.vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import notify from "@/Plugins/Admin/notify"
import InputFieldError from "@/Components/InputFieldError.vue"
import sharedComposable from "@/Composables/sharedComposable"
import NiceSelect from "@/Components/NiceSelect.vue"

const { formatNumber } = sharedComposable()

defineOptions({ layout: UserLayout })
defineProps(["jobs"])

const form = useForm({
  ratting: 5,
  comment: "",
  job: {},
})

const submit = () => {
  form.post(route("user.company-reviews.store"), {
    onSuccess: () => {
      notify.success("Review has been submitted successfully")
      $("#reviewModal .btn-close").trigger("click")
      form.reset()
    },
  })
}

const sorts = [
  {
    value: "asc",
    label: "Newest",
  },
  {
    value: "desc",
    label: "Oldest",
  },
]

const sortForm = useForm({
  order_by: "",
})

const sortSubmit = () => {
  sortForm.get(window.location.href, {
    preserveState: true,
  })
}
</script>

<template>
  <Head title="Applied Jobs" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h2 class="main-title m0">{{ trans("Applied Jobs") }}</h2>
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
      class="mb-20 overflow-visible job-list-one style-two position-relative"
      v-for="(job, index) in jobs.data"
      :key="index"
    >
      <div class="row justify-content-between align-items-center">
        <div class="col-xxl-3 col-lg-4">
          <div class="job-title d-flex align-items-center">
            <a :href="route('jobs.show', job.slug)" class="logo"
              ><img
                v-lazy="
                  job.user?.avatar == null
                    ? `https://ui-avatars.com/api/?name=${job.user?.name}`
                    : `${job.user?.avatar}`
                "
                alt=""
                class="m-auto lazy-img"
            /></a>
            <a :href="route('jobs.show', job.slug)" class="title fw-500 tran3s">{{
              job.title
            }}</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 ms-auto">
          <a href="#" class="job-duration fw-500">{{ job.type }}</a>
          
          <span v-if="job?.pivot?.is_hired" class="ms-3 badge bg-success">
            {{ trans("Hired") }}
          </span>
          
          <span v-if="job?.is_reviewed" class="badge bg-primary">
            {{ trans("Reviewed") }}
          </span>

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
                <a
                  target="_blank"
                  class="dropdown-item"
                  :href="route('jobs.show', job.slug)"
                  ><img
                    src="/assets/dashboard/images/icon/icon_18.svg"
                    alt=""
                    class="lazy-img"
                  />
                  {{ trans("View Job") }}</a
                >
              </li>
              <li v-if="job.pivot?.is_hired && !job.is_reviewed">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#reviewModal"
                  @click="form.job = job"
                  class="dropdown-item"
                >
                  <img
                    src="/assets/dashboard/images/icon/icon_19.svg"
                    alt=""
                    class="lazy-img"
                  />
                  {{ trans("Write a review") }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white card-box border-20">
    <div class="text-center fw-bold">{{ trans("No job found") }}</div>
  </div>

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="jobs.links" />
  </div>

  <div
    class="modal fade"
    id="reviewModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="reviewModalTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title" id="reviewModalTitleId">
            {{ trans("Add a review") }}
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submit">
          <div class="modal-body">
            <div class="mb-4">
              <label class="form-label">{{ trans("Ratting Star (out of 5)") }}</label>
              <select v-model="form.ratting" class="form-control">
                <option v-for="item in 5" :key="item" :value="item">
                  {{ item }}
                </option>
              </select>
              <InputFieldError :message="form.errors.ratting" />
            </div>
            <div class="mb-2">
              <label class="form-label">{{ trans("Comment") }}</label>
              <textarea
                v-model="form.comment"
                class="form-control"
                rows="5"
                placeholder="enter your review comment here...."
              ></textarea>
              <InputFieldError :message="form.errors.comment" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="px-0 py-2 btn-seven" data-bs-dismiss="modal">
              {{ trans("Close") }}
            </button>
            <SpinnerBtn
              type="submit"
              :processing="form.processing"
              :btn-text="trans('Submit')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
