<script setup>
import NiceSelect from "@/Components/NiceSelect.vue";
import LabelWithAjaxLoader from "@/Components/LabelWithAjaxLoader.vue";
import sharedComposable from "@/Composables/sharedComposable";
const { getQueryParams } = sharedComposable();
import { useCandidateFilterStore } from "@/Store/candidateFilterStore";
const store = useCandidateFilterStore();
</script>

<template>
  <form @submit.prevent="store.submit">
    <div class="row">
      <div class="col-md-5">
        <div class="input-box">
          <div class="label">{{ trans("What are you looking for?") }}</div>
          <NiceSelect
            v-model="store.form.service"
            :options="store.services"
            value-by="slug"
            label="title"
            :placeholder="trans('Select Service')"
            @change="store.fetchCategories"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-box border-left">
          <LabelWithAjaxLoader
            :text="trans('Category')"
            :loading="store.loading.categories"
          />
          <NiceSelect
            v-model="store.form.category"
            :options="store.categories"
            label="title"
            value-by="slug"
            placeholder="Select Category"
          />
        </div>
      </div>
      <div class="col-md-3">
        <button
          type="submit"
          class="fw-500 text-uppercase h-100 tran3s search-btn"
          :disabled="store.loading.categories"
        >
          {{ trans("Search") }}
        </button>
      </div>
    </div>
  </form>
</template>
