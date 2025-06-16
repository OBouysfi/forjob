<script setup>
import { Head, router } from '@inertiajs/vue3'
import EmployerLayout from '@/Layouts/Employer.vue'
import CandidateCard from '@/Layouts/Employer/CandidateCard.vue'
import Paginate from '@/Components/WebPaginate.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { ref, watch } from 'vue'
defineOptions({ layout: EmployerLayout })
const props = defineProps(['candidates'])
const sorts = [
  {
    label: 'Latest',
    value: 'asc'
  },
  {
    label: 'Oldest',
    value: 'desc'
  }
]
const filterForm = ref({
  sort: ''
})
watch(
  () => filterForm.value.sort,
  () => {
    router.get(route('employer.saved-candidates'), filterForm.value, {
      preserveState: true
    })
  }
)
</script>

<template>
  <Head :title="trans('Saved Candidates')" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h2 class="main-title m0">{{ trans('Saved Candidate') }}</h2>
    <div class="short-filter d-flex align-items-center">
      <div class="text-dark fw-500 text-nowrap me-2">{{ trans('Sort by') }}:</div>
      <NiceSelect
        v-model="filterForm.sort"
        :options="sorts"
        value-by="value"
        label="label"
        placeholder="Default"
      />
    </div>
  </div>

  <CandidateCard v-if="candidates.total" :applicants="candidates.data" :hideApplyInfo="true" />
  <div class="bg-white card-box border-20" v-else>
    <div class="text-center">{{ trans('No record found') }}</div>
  </div>
  <!-- /.card-box -->

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="candidates.links" />
  </div>
</template>
