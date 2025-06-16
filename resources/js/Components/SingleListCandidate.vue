<script setup>
import notify from '@/Plugins/Admin/notify'
import { Link, useForm } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
import { useCandidateFilterStore } from '@/Store/candidateFilterStore'

const { formatNumber } = sharedComposable()
const store = useCandidateFilterStore()
defineProps(['candidate'])

const tags = (tags) => {
  const maxTag = 3
  const tagItems = tags?.slice(0, maxTag)
  const remainingTagsCount = Math.max(tags?.length - maxTag, 0)
  const showMoreTags = remainingTagsCount > 0

  return {
    tagItems,
    remainingTagsCount,
    showMoreTags
  }
}
</script>

<template>
  <div class="candidate-profile-card list-layout mb-25" :class="{ favourite: candidate.is_star }">
    <div class="d-flex">
      <div class="cadidate-avatar online position-relative d-block m-auto">
        <Link :href="route('candidates.show', candidate.username)" class="rounded-circle">
          <img
            v-lazy="
              candidate?.avatar == null
                ? `https://ui-avatars.com/api/?name=${candidate.name}`
                : `${candidate?.avatar}`
            "
            alt="avatar"
            class="lazy-img rounded-circle"
          />
        </Link>
      </div>
      <div class="right-side">
        <div class="row gx-1 align-items-center">
          <div class="col-xl-3">
            <div class="position-relative">
              <h4 class="candidate-name mb-0">
                <Link :href="route('candidates.show', candidate.username)" class="tran3s">{{
                  candidate.name
                }}</Link>
              </h4>
              <div class="candidate-post">
                {{ candidate.designation }}
              </div>
              <ul class="cadidate-skills style-none d-flex align-items-center text-nowrap">
                <li v-for="(item, index) in tags(candidate.tags).tagItems ?? []" :key="index">
                  {{ item.title }}
                </li>
                <li class="more" v-if="tags(candidate.tags).showMoreTags">
                  {{ tags(candidate.tags).remainingTagsCount }}+
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-md-4 col-sm-6 mb-2">
            <div class="candidate-info">
              <span>{{ trans('Salary') }}</span>
              <div v-if="candidate.meta?.expected_salary && candidate.meta?.expected_salary > 1">
                {{ formatNumber(candidate.meta?.expected_salary) }}/
                {{ candidate.meta?.currency }}
              </div>
              <div v-else>{{ trans('Negotiable') }}</div>
            </div>
            <!-- /.candidate-info -->
          </div>
          <div class="col-xl-3 col-md-4 col-sm-6">
            <div class="candidate-info">
              <span>{{ trans('Location') }}</span>
              <div class="text-truncate" :title="candidate.location.join(', ')">
                {{ candidate.location.join(', ') }}
              </div>
            </div>
            <!-- /.candidate-info -->
          </div>
          <div class="col-xl-3 col-md-4">
            <div class="d-flex justify-content-lg-end">
              <button
                @click="store.toggleBookmark(candidate.id, candidate.isBookmarked)"
                class="save-btn rounded-circle tran3s mt-10 text-center"
              >
                <i
                  class="bi"
                  :class="[candidate.isBookmarked ? 'text-danger bi-heart-fill' : 'bi-heart']"
                ></i>
              </button>

              <Link
                :href="route('candidates.show', candidate.username)"
                class="profile-btn tran3s ms-md-2 sm-mt-20 mt-10"
                >{{ trans('View Profile') }}</Link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
