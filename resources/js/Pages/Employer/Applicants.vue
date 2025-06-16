<script setup>
import { Head, router } from '@inertiajs/vue3'
import EmployerLayout from '@/Layouts/Employer.vue'
import CandidateCard from '@/Layouts/Employer/CandidateCard.vue'
import Paginate from '@/Components/WebPaginate.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { ref, watch } from 'vue'
import sharedComposable from '@/Composables/sharedComposable'
const { pickBy } = sharedComposable()
defineOptions({ layout: EmployerLayout })
const props = defineProps(['applicants'])
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
    router.get(route('employer.job-applicants'), pickBy(filterForm.value), {
      preserveState: true
    })
  }
)
</script>

<template>
  <Head title="Job Applicants" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h4 class="main-title m0">{{ trans('Job Applicants') }}</h4>
    <div class="d-flex">
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
  <template v-if="applicants.total">
    <CandidateCard :applicants="applicants.data" :has-opening="true" />
  </template>
  <div v-else class="bg-white card-box border-20">
    <div class="text-center">{{ trans('No record found') }}</div>
  </div>

  <div class="dash-pagination d-flex justify-content-end mt-30">
    <Paginate :links="applicants.links" />
  </div>
  
</template>
