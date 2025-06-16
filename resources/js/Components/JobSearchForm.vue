<script setup>
import homeApiService from '@/Composables/homeApiService'
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { useJobFiltersStore } from '@/Store/jobFilterStore'

const filter = useJobFiltersStore()
homeApiService.get('services').then((res) => {
  filter.services = res
})

</script>

<template>
  <form @submit.prevent="filter.submit('clear')">
    <div class="row">
      <div class="col-md-5">
        <div class="input-box">
          <div class="label">{{ trans('What are you looking for?') }}</div>
          <NiceSelect v-model="filter.filterForm.service" :options="filter.services" value-by="slug" label="title"
            placeholder="Select Service" @change="filter.getCategories" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-box border-left">
          <LabelWithAjaxLoader class="label" :text="trans('Category')" :loading="filter.loading.categories" />
          <NiceSelect v-model="filter.filterForm.category" :options="filter.categories" label="title" value-by="slug"
            placeholder="Select Category" @change="() => filter.setCategory(filter.filterForm.category)" />
        </div>
      </div>
      <div class="col-md-3">
        <button type="submit" class="fw-500 text-uppercase h-100 tran3s search-btn" :disabled="filter.loading.categories">
          {{ trans('Search') }}
        </button>
      </div>
    </div>
  </form>
</template>
