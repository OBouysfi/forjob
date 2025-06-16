<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import { Link, useForm } from '@inertiajs/vue3'
import axios from 'axios'
import trans from '@/Composables/transComposable'
import moment from 'moment'
import { ref, computed } from 'vue'
const { formatNumber, uiAvatar, textExcerpt } = sharedComposable()

const props = defineProps({
  applicants: [Object, Array],
  hasOpening: {
    type: Boolean,
    default: false
  },
  job: {
    type: [Number, String],
    default: null
  },
  jobObj: Object
})

const candidateId = ref(null)
const maxTag = ref(2)

const findCandidate = computed(() => {
  return props.applicants.find((a) => a.id == candidateId.value)
})

const toggleBookmark = (id) => {
  const form = props.job ? useForm({ opening_id: props.job }) : useForm({})
  form.post(route('candidates.bookmark', id), {
    preserveScroll: true,
    onSuccess: () => {}
  })
}

const candidateData = (candidate) => {
  const user = candidate
  const username = user.username
  const avatar = candidate.avatar
  const isBookmarked = candidate.isBookmarked
  const expectedSalary = user.meta?.expected_salary ?? 'NA'
  const location = `${user.states?.length ? user.states[0]?.name : ''}, ${
    user.countries?.length ? user.countries[0]?.name : ''
  }`

  const tagItems = user.tags?.slice(0, maxTag.value)
  const remainingTagsCount = Math.max(user.tags?.length ?? 0 - maxTag.value, 0)
  const showMoreTags = remainingTagsCount > 0
  const name = candidate.name
  const categoryTitle = user.categories?.[0]?.title
  return {
    id: user.id,
    avatar,
    username,
    name,
    isBookmarked,
    expectedSalary,
    location,
    tagItems,
    remainingTagsCount,
    showMoreTags,
    categoryTitle
  }
}

const fields = ref([])

const showApplication = (candidate) => {
  candidateId.value = candidate.id

  let meta = candidate.pivot?.meta ?? ''

  if (meta) {
    meta = JSON.parse(meta) ?? {}
  }

  fields.value = meta?.fields ?? []

  if (!meta.pivot?.seen_at) {
    seenAt()
  }
}

const seenAt = () => {
  let data = {
    candidate_id: candidateId.value,
    job_id: props.job
  }
  axios.post(route('employer.job-application-seen'), data)
}

const hired = () => {
  useForm({
    job_id: props.job,
    candidate_id: candidateId.value
  }).post(route('employer.hire-candidate'), {
    onSuccess() {
      $('#candidateDetails .btn-close').trigger('click')
      notify.success(trans('Hired successfully'))
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <template v-for="candidate in applicants" :key="candidate.id">
      <div class="candidate-profile-card list-layout mb-25 border-0">
        <div class="d-flex">
          <div class="cadidate-avatar online position-relative d-block me-auto ms-auto">
            <Link :href="route('candidates.show', candidate.username)" class="rounded-circle">
              <img
                :src="uiAvatar(candidate.name, candidate.avatar)"
                alt="avatar"
                class="lazy-img rounded-circle"
              />
            </Link>
          </div>
          <div class="right-side">
            <div class="row gx-1 align-items-start">
              <div class="col-xl-3">
                <div class="position-relative">
                  <h4 class="candidate-name mb-0">
                    <Link :href="route('candidates.show', candidate.username)" class="tran3s">
                      {{ textExcerpt(candidate.name, 16) }}
                    </Link>
                    <span v-if="candidate?.pivot?.is_hired" class="badge bg-success ms-2">{{
                      trans('Hired')
                    }}</span>
                  </h4>
                  <div class="candidate-post">
                    {{ candidate.categories?.[0]?.title }}
                  </div>
                  <ul class="cadidate-skills style-none d-flex align-items-center">
                    <li v-for="(item, index) in candidateData(candidate).tagItems" :key="index">
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
                  <span>{{ trans('Salary') }}</span>
                  <div>
                    {{ formatNumber(candidateData(candidate).expectedSalary) }}/
                    {{ candidate.meta?.currency }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-6">
                <div class="candidate-info">
                  <span>{{ trans('Location') }}</span>
                  <div>
                    {{ candidateData(candidate).location }}
                  </div>
                </div>
                <!-- /.candidate-info -->
              </div>
              <div class="col-xl-2 col-md-4 col-sm-6">
                <div class="candidate-info">
                  <span>{{ trans('Submission Date') }}</span>
                  <div>
                    {{ moment(candidate.created_at).format('DD MMM, Y') }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-md-2 d-flex align-item-center">
                <Link
                  :href="route('candidates.show', candidateData(candidate).username)"
                  class="save-btn rounded-circle tran3s fw-normal text-center"
                  ><i class="bi bi-eye"></i>
                </Link>
                <button
                  @click="toggleBookmark(candidateData(candidate).id)"
                  class="save-btn tran3s rounded-circle ms-1"
                >
                  <i
                    class="bi bi-heart"
                    :class="{
                      'text-danger': candidateData(candidate).isBookmarked
                    }"
                  ></i>
                </button>
              </div>
              <div class="col-xl-1 col-md-2">
                <div class="d-flex justify-content-md-end align-items-center">
                  <div class="action-dots float-end ms-2 mt-10">
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
                          @click="showApplication(candidate)"
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#candidateDetails"
                        >
                          <img
                            src="/assets/dashboard/images/icon/icon_18.svg"
                            alt=""
                            class="lazy-img"
                          />
                          {{ trans('Details') }}
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
            {{ trans('Candidate Details') }}
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
                uiAvatar(candidateData(findCandidate).name, candidateData(findCandidate).avatar)
              "
              alt="avatar"
              class="lazy-img logo m-auto"
            />
            <div class="h3 text-dark mt-15 mb-10 text-center">
              {{ findCandidate?.name }}
            </div>

            <div class="border-top mt-2 pt-20">
              <div class="justify-content-around d-flex rounded bg-white py-3">
                <div>
                  <strong>{{ trans('Expected Salary') }}</strong>
                  <div class="mt-2">
                    {{ formatNumber(findCandidate && candidateData(findCandidate).expectedSalary) }}
                    /

                    <template v-if="findCandidate?.meta">
                      {{ findCandidate?.meta.currency }}
                    </template>
                  </div>
                </div>
                <div>
                  <strong>{{ trans('Skills / Expertise') }}</strong>
                  <div class="d-flex mt-2 flex-wrap gap-2" v-if="findCandidate">
                    <span
                      class="bg-light rounded border p-1"
                      v-for="(item, index) in candidateData(findCandidate).tagItems"
                      :key="index"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>{{ trans('Location') }}</strong>
                  <div class="mt-2">
                    {{ findCandidate && candidateData(findCandidate).location }}
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <div class="rounded bg-white p-3">
                  <h5 class="border-bottom mb-3 pb-2">{{ trans('Application Information') }}:</h5>
                  <table class="table-borderless table">
                    <tbody>
                      <tr v-for="field in fields" :key="field.label">
                        <td>{{ field.label }}</td>
                        <td>
                          <a v-if="field.type == 'file'" :href="field.value" class="btn-six">{{
                            trans('View')
                          }}</a>
                          <span v-else>{{ field.value }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-3">
                <button v-if="findCandidate?.pivot?.is_hired != 1" class="btn-five" @click="hired">
                  {{ trans('Hire') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
