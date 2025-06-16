<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import EmployerLayout from "@/Layouts/Employer.vue";
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import notify from "@/Plugins/Admin/notify";
import { ref } from "vue";

defineOptions({ layout: EmployerLayout });

const { kyc_methods } = defineProps(["kyc_methods"]);

const selectedMethod = ref(kyc_methods[0] ? kyc_methods[0] : {});

const flattenObject = (obj, parentKey) => {
  let result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const _key = parentKey ? key : key;

    if (typeof value === "object" && !(value instanceof File)) {
      result = { ...result, ...flattenObject(value, _key) };
    } else {
      result[_key] = value;
    }
  });

  return result;
};

const form = useForm({
  method: selectedMethod.value?.id,
  fields: selectedMethod.value?.fields ?? [],
  note: "",
});

const submit = (method) => {
  form.post(route("employer.kyc.store"), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      notify.success(trans("KYC Document Submitted Successfully"));
    },
    onError(e) {
      Object.values(e).forEach((item) => notify.danger(item));
    },
  });
};
</script>

<template>
  <Head title="KYC verification | Employer Panel" />

  <div class="d-flex justify-content-between align-items-center">
    <h6 class="main-title">{{ trans("KYC verification") }}</h6>
    <Link :href="route('employer.kyc.index')" class="btn-one">
      {{ trans("View my requests") }}
    </Link>
  </div>

  <div class="bg-white card-box border-20">
    <div v-if="kyc_methods.length" class="p-2">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li
          class="nav-item"
          role="presentation"
          v-for="(method, index) in kyc_methods"
          :key="index"
        >
          <button
            @click="selectedMethod = method"
            class="nav-link"
            :class="{ active: selectedMethod?.id == method.id }"
            :id="`tab-nav-${index}`"
            data-bs-toggle="tab"
            :data-bs-target="`#tab-pane-${index}`"
            type="button"
            role="tab"
            :aria-controls="method.id"
            :aria-selected="selectedMethod?.id == method.id ? 'true' : 'false'"
          >
            {{ method.title }}
          </button>
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div
          class="tab-pane"
          v-for="(method, index) in kyc_methods"
          :key="index"
          :id="`tab-pane-${index}`"
          :class="{ active: selectedMethod?.id == method.id }"
          role="tabpanel"
          :aria-labelledby="`tab-${index}`"
        >
          <form class="p-3" @submit.prevent="submit()">
            <template v-for="(field, index) in form.fields" :key="field.id">
              <div v-if="field.type == 'textarea'" class="mb-2 dash-input-wrapper">
                <label> {{ field.label }} </label>
                <textarea v-model="field.value" class="form-control"></textarea>
              </div>

              <div v-else-if="field.type == 'file'" class="mb-2">
                <label> {{ field.label }} </label>
                <input
                  type="file"
                  @change="(e) => (field.value = e.target.files[0])"
                  class="form-control"
                />
              </div>

              <div v-else class="mb-2 dash-input-wrapper">
                <label :for="`fields_${index}`">{{ field.label }}</label>
                <input
                  :type="field.type"
                  v-model="field.value"
                  :id="`fields_${index}`"
                  class="form-control"
                />
              </div>
            </template>

            <div class="mb-2">
              <label>{{ trans("Note") }}</label>
              <textarea v-model="form.note" rows="4" class="form-control"></textarea>
            </div>

            <SpinnerBtn :processing="form.processing" :btn-text="trans('Submit')" />
          </form>
        </div>
      </div>
    </div>
    <div v-else class="text-center fw-bold mb-30">
      {{ trans("No remaining items to submit") }}
    </div>
  </div>
</template>
