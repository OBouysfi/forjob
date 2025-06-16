<script setup>
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import InputFieldError from "@/Components/InputFieldError.vue";
import sharedComposable from "@/Composables/sharedComposable";
import notify from "@/Plugins/Admin/notify";
import { Link, router, useForm } from "@inertiajs/vue3";
import axios from "axios";
import trans from '@/Composables/transComposable';
import moment from "moment";
import { toRaw } from "vue";
import { ref, computed } from "vue";

const { uiAvatar, formatNumber, textExcerpt } = sharedComposable()
const props = defineProps({
  applicants: [Object, Array],
  hasOpening: {
    type: Boolean,
    default: false,
  },
  job: {
    type: [Number, String],
    default: null,
  },
  hideApplyInfo: {
    type: Boolean,
    default: false,
  },
  jobObj: Object,
})

const maxTag = ref(2)

const applicationId = ref(null)
const findCandidate = computed(() => {
  return props.applicants.find((a) => a.id == applicationId.value)
})

const toggleBookmark = (id) => {
  const form = props.job ? useForm({ opening_id: props.job }) : useForm({})
  form.post(route("candidates.bookmark", id), {
    preserveScroll: true,
    onSuccess: () => {},
  })
}

const candidateData = (candidate) => {
  const isOpening = props.hasOpening
  const user = isOpening ? candidate.user : candidate
  const avatar = isOpening ? candidate.user.avatar : candidate.avatar
  const isBookmarked = isOpening
    ? user?.candidate_bookmarks.length
    : candidate.isBookmarked
  const expectedSalary = user.meta?.expected_salary ?? "NA"

  const location = `${user.states?.length ? user.states[0]?.name : ""}, ${
    user.countries?.length ? user.countries[0]?.name : ""
  }`

  const tagItems = user.tags?.slice(0, maxTag.value)
  const remainingTagsCount = Math.max(user.tags?.length ?? 0 - maxTag.value, 0)
  const showMoreTags = remainingTagsCount > 0
  const name = isOpening ? user.name : candidate.name
  const categoryTitle = user.categories?.[0]?.title

  return {
    id: user.id,
    avatar,
    name,
    isBookmarked,
    expectedSalary,
    location,
    tagItems,
    remainingTagsCount,
    showMoreTags,
    categoryTitle,
  }
}

const fields = ref([])

const showApplication = (apply_id) => {
  applicationId.value = apply_id
  let meta = findCandidate.value?.meta

  if (meta) {
    meta = JSON.parse(findCandidate.value?.meta)
  }

  fields.value = meta?.fields ?? []

  if (!findCandidate.value?.pivot?.seen_at) {
    seenAt()
  }
}

const seenAt = () => {
  let data = {
    apply_id: applicationId.value,
  }
  axios.post(route("employer.job-application-seen"), data)
}

const hired = () => {
  useForm({
    apply_id: applicationId.value,
  }).post(route("employer.hire-candidate"), {
    onSuccess() {
      $("#candidateDetails .btn-close").trigger("click")
      notify.success(trans("Hired successfully"))
    },
  })
}

// reviews

const form = useForm({
  ratting: 5,
  comment: "",
  job: {},
  candidate_id: null,
})

const setJobAndCandidate = (candidate) => {
  form.job = candidate.opening
  form.candidate_id = candidate.user_id
}

const submit = () => {
  form.post(route("employer.candidate-reviews.store"), {
    onSuccess: () => {
      notify.success("Review has been submitted successfully")
      $("#reviewModal .btn-close").trigger("click")
    },
  })
}
</script>

<template>
  <div class="wrapper">
    <template v-for="candidate in applicants" :key="candidate.id">
      <div class="border-0 candidate-profile-card list-layout mb-25">
        <div class="d-flex">
          <div class="cadidate-avatar online position-relative d-block me-auto ms-auto">
            <Link
              :href="route('candidates.show', candidateData(candidate))"
              class="rounded-circle"
            >
              <img
                :src="
                  uiAvatar(candidateData(candidate).name, candidateData(candidate).avatar)
                "
                alt="avatar"
                class="lazy-img rounded-circle"
              />
            </Link>
          </div>
          <div class="right-side">
            <div class="row gx-1 align-items-start">
              <div class="col-xl-3">
                <div class="position-relative">
                  <div class="mb-2" v-if="candidate.opening?.title">
                    <a
                      target="_blank"
                      :href="route('jobs.show', candidate.opening?.slug)"
                      >{{ candidate.opening?.title }}</a
                    >
                  </div>

                  <h4 class="mb-0 candidate-name">
                    <Link
                      :href="route('candidates.show', candidateData(candidate))"
                      class="tran3s"
                    >
                      {{ textExcerpt(candidateData(candidate).name, 16) }}
                    </Link>
                  </h4>

                  <div class="candidate-post">
                    {{ candidateData(candidate).categoryTitle }}
                  </div>
                  <ul class="cadidate-skills style-none d-flex align-items-center">
                    <li
                      v-for="(item, index) in candidateData(candidate).tagItems"
                      :key="index"
                    >
                      {{ item.title }}
                    </li>
                    <li class="more" v-if="candidateData(candidate).showMoreTags">
                      {{ candidateData(candidate).remainingTagsCount }}+
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-6">
                <div class="candidate-info">
                  <span>{{ trans("Salary") }}</span>
                  <div>
                    {{ formatNumber(candidateData(candidate).expectedSalary) }}/
                    {{
                      candidate.user
                        ? candidate.user.meta.currency
                        : candidate.meta.currency
                    }}
                  </div>
                </div>
                <div class="mt-3">
                  <span v-if="candidate?.is_hired == 1" class="badge bg-success">{{
                    trans("Hired")
                  }}</span>
                  <span
                    v-if="candidate?.is_reviewed == 1"
                    class="ms-2 badge bg-primary"
                    >{{ trans("Reviewed") }}</span
                  >
                </div>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-6">
                <div class="candidate-info">
                  <span>{{ trans("Location") }}</span>
                  <div>
                    {{ candidateData(candidate).location }}
                  </div>
                </div>
                <div class="mt-2 candidate-info">
                  <span>{{ trans(" Avg Ratting") }}</span>
                  <div>
                    {{ candidate.user_avg_ratting ?? "NA" }}
                  </div>
                </div>
                <!-- /.candidate-info -->
              </div>
              <div class="col-xl-2 col-md-4 col-sm-6">
                <div class="candidate-info">
                  <span>{{ trans("Submission Date") }}</span>
                  <div>
                    {{ moment(candidate.created_at).format("DD MMM, Y") }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-md-2 d-flex align-item-center">
                <Link
                  :href="route('candidates.show', candidateData(candidate))"
                  class="text-center save-btn rounded-circle tran3s fw-normal"
                  ><i class="bi bi-eye"></i>
                </Link>
                <button
                  @click="toggleBookmark(candidateData(candidate).id)"
                  class="save-btn tran3s rounded-circle ms-1"
                >
                  <i
                    class="bi bi-heart"
                    :class="{
                      'text-danger': candidateData(candidate).isBookmarked,
                    }"
                  ></i>
                </button>
              </div>
              <div class="col-xl-1 col-md-2">
                <div class="d-flex justify-content-md-end align-items-center">
                  <div class="mt-10 action-dots float-end ms-2">
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
                        <button
                          @click="showApplication(candidate.id)"
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#candidateDetails"
                        >
                          <img
                            src="/assets/dashboard/images/icon/icon_18.svg"
                            alt=""
                            class="lazy-img"
                          />
                          {{ trans("Details") }}
                        </button>
                      </li>
                      <li v-if="candidate?.is_hired == 1 && !candidate.is_reviewed">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#reviewModal"
                          @click="setJobAndCandidate(candidate)"
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
        </div>
      </div>
    </template>
  </div>
  <!-- modal -->

  <div
    class="modal fade"
    id="candidateDetails"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="candidateDetailsTitle"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title fw-bold" id="candidateDetailsTitle">
            {{ trans("Candidate Details") }}
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="candidate-card-bg">
            <img
              :src="
                findCandidate &&
                uiAvatar(
                  candidateData(findCandidate).name,
                  candidateData(findCandidate).avatar
                )
              "
              alt="avatar"
              class="m-auto lazy-img logo"
            />
            <div class="mb-10 text-center h3 text-dark mt-15">
              {{ findCandidate?.name }}
            </div>

            <div class="pt-20 mt-2 border-top">
              <div class="py-3 bg-white rounded justify-content-around d-flex">
                <div>
                  <strong>{{ trans("Expected Salary") }}</strong>
                  <div class="mt-2">
                    {{
                      formatNumber(
                        findCandidate && candidateData(findCandidate).expectedSalary
                      )
                    }}
                    /

                    <template v-if="findCandidate && findCandidate.user">
                      {{ findCandidate?.user?.meta.currency }}
                    </template>
                    <template v-if="findCandidate && findCandidate.meta">
                      {{ findCandidate?.meta.currency }}
                    </template>
                  </div>
                </div>
                <div>
                  <strong>{{ trans("Skills / Expertise") }}</strong>
                  <div class="flex-wrap gap-2 mt-2 d-flex" v-if="findCandidate">
                    <span
                      class="p-1 border rounded bg-light"
                      v-for="(item, index) in candidateData(findCandidate).tagItems"
                      :key="index"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>{{ trans("Location") }}</strong>
                  <div class="mt-2">
                    {{ findCandidate && candidateData(findCandidate).location }}
                  </div>
                </div>
                <div>
                  <strong>{{ trans("Ratting") }}</strong>
                  <div class="mt-2">
                    {{ findCandidate?.user_avg_ratting ?? "NA" }}
                  </div>
                </div>
              </div>

              <template v-if="!hideApplyInfo">
                <div class="mt-3">
                  <div class="p-3 bg-white rounded">
                    <h5 class="pb-2 mb-3 border-bottom">
                      {{ trans("Application Information") }}:
                    </h5>
                    <table class="table table-borderless">
                      <tbody>
                        <tr v-for="field in fields" :key="field.label">
                          <td>{{ field.label }}</td>
                          <td>
                            <a
                              v-if="field.type == 'file'"
                              :href="field.value"
                              class="btn-six"
                              >{{ trans("View") }}</a
                            >
                            <span v-else>{{ field.value }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="mt-3 d-flex justify-content-end">
                  <button
                    v-if="findCandidate?.is_hired != 1"
                    class="btn-five"
                    @click="hired"
                  >
                    {{ trans("Hire") }}
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
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
