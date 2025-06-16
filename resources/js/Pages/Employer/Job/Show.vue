<script setup>
import { Head, router } from '@inertiajs/vue3'
import EmployerLayout from '@/Layouts/Employer.vue'
import CandidateCardJobShow from '@/Layouts/Employer/CandidateCardJobShow.vue'
import Paginate from '@/Components/WebPaginate.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { ref, watch } from 'vue'
import sharedComposable from '@/Composables/sharedComposable'
const { pickBy } = sharedComposable()
defineOptions({ layout: EmployerLayout })
const props = defineProps(['applicants', 'job'])
const filterForm = ref({
  order: ''
})
const sorts = [
  {
    label: 'Latest',
    value: 'desc'
  },
  {
    label: 'Oldest',
    value: 'asc'
  }
]

watch(
  () => filterForm.value.order,
  () => {
    router.get(route('employer.jobs.show', props.job.slug), pickBy(filterForm.value), {
      preserveState: true
    })
  }
)
</script>

<template>
  <Head :title="job.title" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h4 class="main-title m0">{{ job.title }}</h4>
    <div class="d-flex">
      <a :href="route('employer.jobs.show', job.slug) + '?export=1'" class="btn-one btn-sm me-5">{{
        trans('Export in Excel')
      }}</a>
      <div class="short-filter d-flex align-items-center">
        <div class="text-dark fw-500 me-2">{{ trans('Sort') }}:</div>
        <NiceSelect
          v-model="filterForm.order"
          :options="sorts"
          value-by="value"
          label="label"
          placeholder="Default"
        />
      </div>
    </div>
  </div>
  <CandidateCardJobShow
    v-if="applicants.total"
    :applicants="applicants.data"
    :job="job.id"
    :jobObj="job"
  />
  <div class="bg-white card-box border-20" v-else>
    <div class="text-center">{{ trans('No record found') }}</div>
  </div>

  <div class="dash-pagination d-flex justify-content-end mt-30">
    <Paginate :links="applicants.links" />
  </div>
</template>
