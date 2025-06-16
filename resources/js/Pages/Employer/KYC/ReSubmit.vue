<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import EmployerLayout from "@/Layouts/Employer.vue";
import sharedComposable from "@/Composables/sharedComposable";
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
defineOptions({ layout: EmployerLayout });

const { authUser } = sharedComposable();
const { kyc } = defineProps(["kyc"]);

let form = useForm({
  fields: kyc.fields,
  note: kyc.note,
});

const submit = () => {
  form.post(route("employer.kyc.resubmit", kyc), {
    onSuccess: (visit) => {
      notify.success("KYC Document Submitted Successfully");
    },
    onError(e) {
      notify.danger(Object.values(e)[0] ?? "");
    },
  });
};
</script>

<template>
  <Head title="Re-Submit KYC verification | Employer Panel" />

  <h2 class="main-title">{{ trans("Re-Submit KYC verification") }}</h2>
  <div class="card-box border-20 bg-white">
    <div class="fs-4 text-center">{{ trans("Re-Submit KYC") }}</div>
    <form class="p-3" @submit.prevent="submit()">
      <template v-for="(field, index) in form.fields" :key="field.id">
        <div v-if="field.type == 'textarea'" class="dash-input-wrapper mb-2">
          <label> {{ field.label }} </label>
          <textarea v-model="field.value" class="form-control"></textarea>
        </div>

        <div v-else-if="field.type == 'file'" class="mb-2">
          <label> {{ field.label }} </label>
          <input
            type="file"
            @change="(e) => (field.value = e.target.files[0])"
            class="form-control"
            required
          />
        </div>

        <div v-else class="dash-input-wrapper mb-2">
          <label :for="`fields_${index}`">{{ field.label }}</label>
          <input
            :type="field.type"
            v-model="field.value"
            :id="`fields_${index}`"
            class="form-control"
            required
          />
        </div>
      </template>

      <div class="mb-2">
        <label>{{ trans("Note") }}</label>
        <textarea v-model="form.note" rows="4" class="form-control"></textarea>
      </div>

      <SpinnerBtn
        type="submit"
        classes="btn-one mt-5"
        :processing="form.processing"
        :btn-text="trans('Submit')"
      />
    </form>
  </div>
</template>
