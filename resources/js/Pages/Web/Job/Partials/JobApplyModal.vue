<script setup>
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import notify from "@/Plugins/Admin/notify";
import InputFieldError from "@/Components/InputFieldError.vue";

const props = defineProps(["job"]);

const form = useForm({
  email: "",
  message: "",
  fields: [...props.job?.fields ?? []],
});
const jobApplication = () => {
  form.post(route("jobs.apply", props.job.slug), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success(trans("Application has been submitted successfully"));
      $("#applyModalClsBtn").trigger("click");
    },
  });
};
</script>

<template>
  <div
    class="modal fade"
    id="applyModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="applyModalTitle"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="applyModalTitle">
            {{ trans("Job Application") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            id="applyModalClsBtn"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="jobApplication">
          <div class="modal-body">
            <template v-if="job.apply_type == 1">
              <div class="mb-2">
                <label for="">{{ trans("Email") }}</label>
                <input class="form-control" v-model="form.email" type="text" />
                <InputFieldError :message="form.errors.email" />
              </div>
              <div class="mb-2">
                <label for="">{{ trans("Message") }}</label>
                <textarea v-model="form.message" class="form-control"></textarea>
                <InputFieldError :message="form.errors.message" />
              </div>
            </template>

            <div class="mb-2" v-for="field in form.fields" :key="field.label">
              <label>{{ field.label }}</label>
              <input
                v-if="field.type == 'file'"
                type="file"
                @input="field.value = $event.target.files[0]"
                class="mb-20 form-control"
              />

              <textarea
                v-else-if="field.type == 'textarea'"
                v-model="field.value"
                class="mb-20 form-control"
                rows="5"
              >
              </textarea>

              <input
                v-else
                :type="field.type"
                v-model="field.value"
                class="mb-20 form-control"
              />
            </div>

            <div v-if="!form.fields.length" class="alert alert-info">{{ trans('Click the submit application button to apply') }}</div>

            <InputFieldError :message="form.errors.value" />
            <br />

            <div div class="modal-footer">
              <button type="button" class="py-2 btn-eight" data-bs-dismiss="modal">
                {{ trans("Close") }}
              </button>
              <SpinnerBtn
                type="submit"
                :processing="form.processing"
                class="btn-one"
                :btn-text="trans('Submit Application')"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
