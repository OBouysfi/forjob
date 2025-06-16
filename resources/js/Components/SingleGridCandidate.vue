<script setup>
import { Link } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import { useCandidateFilterStore } from '@/Store/candidateFilterStore'
import sharedComposable from '@/Composables/sharedComposable'
const { formatNumber } = sharedComposable()

const store = useCandidateFilterStore()

defineProps(['candidate'])
const tags = (tags) => {
  const maxTag = 3
  const tagItems = tags?.length > maxTag ? tags?.slice(0, 2) : tags
  const count = tags?.length > maxTag ? tags?.length + 1 : tags?.length
  const remainingTagsCount = Math.max(count - maxTag)
  const showMoreTags = remainingTagsCount > 0

  return {
    tagItems,
    remainingTagsCount,
    showMoreTags
  }
}
</script>

<template>
  <div class="col-xxl-3 col-lg-4 col-sm-6 d-flex">
    <div
      class="candidate-profile-card grid-layout mb-25 text-center"
      :class="{ favourite: candidate.is_star }"
    >
      <button
        @click="store.toggleBookmark(candidate.id, candidate.isBookmarked)"
        class="save-btn tran3s"
      >
        <i
          class="bi"
          :class="[candidate.isBookmarked ? 'text-danger bi-heart-fill' : 'bi-heart']"
        ></i>
      </button>
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
      <h4 class="candidate-name mt-15 mb-0">
        <Link :href="route('candidates.show', candidate.username)" class="tran3s">{{
          candidate.name
        }}</Link>
      </h4>
      <div class="candidate-post">
        {{ candidate.service?.title }}
      </div>
      <ul
        class="cadidate-skills style-none d-flex align-items-center justify-content-center justify-content-md-between pt-30 sm-pt-20 flex-wrap pb-10"
      >
        <li
          class="text-nowrap"
          v-for="(item, index) in tags(candidate.tags).tagItems ?? []"
          :key="index"
        >
          {{ item.title }}
        </li>
        <li class="more" v-if="tags(candidate.tags).showMoreTags">
          {{ tags(candidate.tags).remainingTagsCount }}+
        </li>
      </ul>
      <!-- /.cadidate-skills -->
      <div class="row gx-1">
        <div class="col-md-6">
          <div class="candidate-info mt-10">
            <span>{{ trans('Salary') }}</span>
            <div v-if="candidate.meta?.expected_salary && candidate.meta?.expected_salary > 1">
              {{ formatNumber(candidate.meta?.expected_salary ?? 0) }}/
              {{ candidate.meta?.currency }}
            </div>
            <div v-else>{{ trans('Negotiable') }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="candidate-info mt-10">
            <span>{{ trans('Location') }}</span>
            <div class="text-truncate" :title="candidate.location.join(', ')">
              {{ candidate.location.join(', ') }}
            </div>
          </div>
        </div>
      </div>
      <div class="row gx-2 pt-25 sm-pt-10">
        <div class="col-md-6">
          <Link
            :href="route('candidates.show', candidate.username)"
            class="profile-btn tran3s w-100 mt-5"
          >
            {{ trans('View Profile') }}
          </Link>
        </div>
        <div class="col-md-6">
          <Link
            :href="route('candidates.show', candidate.username)"
            class="msg-btn tran3s w-100 mt-5"
          >
            {{ trans('Message') }}</Link
          >
        </div>
      </div>
    </div>
  </div>
</template>
