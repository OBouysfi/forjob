<script setup>
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { Head, useForm } from "@inertiajs/vue3"
import trans from '@/Composables/transComposable'
import AdminLayout from "@/Layouts/Admin.vue"
import notify from "@/Plugins/Admin/notify"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
defineOptions({ layout: AdminLayout })

const props = defineProps(["candidateReview", "segments", "buttons"])

const form = useForm({
  ratting: props.candidateReview.ratting,
  comment: props.candidateReview.comment,
})

const update = () => {
  const url = route("admin.candidate-reviews.update", props.candidateReview.id)
  form.put(url, {
    onSuccess: () => {
      notify.success(trans("Review has been updated successfully"))
    },
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Edit Candidate Review')"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <form
        @submit.prevent="update"
        class="ajaxform_instant_reload"
        enctype="multipart/form-data"
      >
        <div class="grid lg:grid-cols-5">
          <div class="lg:col-span-2">
            <strong>{{ trans("Edit candidate reviews") }}</strong>
            <p>{{ trans("modify the necessary information from here") }}</p>
          </div>

          <div class="lg:col-span-3">
            <div class="card">
              <div class="card-body">
                <div class="mb-2">
                  <label class="">{{ trans("Select Ratting") }}</label>
                  <div class="">
                    <select v-model="form.ratting" class="select">
                      <option v-for="(i, key) in 5" :key="key" :value="i">{{ i }}</option>
                    </select>
                    <div
                      class="invalid-feedback text-danger d-block"
                      v-if="form.errors.ratting"
                    >
                      {{ form.errors.ratting }}
                    </div>
                  </div>
                </div>

                <div class="mt-2 mb-2">
                  <label class="">{{ trans("Comment") }}</label>
                  <textarea
                    v-model="form.comment"
                    required=""
                    class="textarea h-100"
                    maxlength="500"
                  ></textarea>
                  <div
                    class="invalid-feedback text-danger d-block"
                    v-if="form.errors.comment"
                  >
                    {{ form.errors.comment }}
                  </div>
                </div>

                <div class="mt-3 mb-2">
                  <SpinnerBtn :processing="form.processing" btn-text="Submit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
