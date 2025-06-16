<script setup>
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import notify from "@/Plugins/Admin/notify";
import Multiselect from "@vueform/multiselect";
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import { computed, ref } from "vue";
import AdminLayout from "@/Layouts/Admin.vue";
defineOptions({ layout: AdminLayout });
const props = defineProps(["buttons", "segments", "categories", "shortcodes"]);

const types = {
  companyProfile: "company",
  jobDescription: "job",
};

const dynamicShortCodes = computed(() => {
  if (form.type == types.jobDescription) {
    return [
      ...props.shortcodes[types.jobDescription],
      ...props.shortcodes[types.companyProfile],
    ];
  }

  return props.shortcodes[types.companyProfile];
});

const form = useForm({
  type: types.companyProfile,
  body: "",
  categories: [],
  status: "active",
});

const submit = () => {
  form.post(route("admin.description-templates.store"), {
    onSuccess: () => {
      notify.success(trans("Template has been added successfully", "Success"));
      form.reset();
    },
  });
};

const bodyEl = ref("");
const addToBody = (code) => {
  let curPos = bodyEl.value.selectionStart;
  let text = form.body;
  form.body = text.slice(0, curPos) + code + text.slice(curPos);

  let focusPosition = curPos + code.length;
  setTimeout(() => {
    bodyEl.value.setSelectionRange(focusPosition, focusPosition);
    bodyEl.value.focus();
  }, 100);
};
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Create Description Template')"
      :segments="segments"
      :buttons="buttons"
    />

    <div class="w-2/3 mx-auto card">
      <div class="card-body">
        <h3 class="mb-3 card-title">{{ trans("Create New Description Template") }}</h3>

        <form @submit.prevent="submit">
          <div class="flex gap-1">
            <div class="w-1/2 mb-3">
              <label>{{ trans("Description Type") }}</label>
              <select class="select" v-model="form.type">
                <option v-for="t in types" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
            </div>
            <div class="w-1/2 mb-3">
              <label>{{ trans("Status") }}</label>
              <select class="select" v-model="form.status">
                <option v-for="t in ['active', 'inactive']" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
            </div>
          </div>

          <div class="w-full mb-3">
            <label>{{ trans("Categories") }}</label>
            <Multiselect
              class="multiselect-dark"
              v-model="form.categories"
              mode="tags"
              :options="categories"
              :searchable="true"
              label="title"
              trackBy="title"
              valueProp="id"
              placeholder="Select Categories"
            />
          </div>
          <div class="mb-2">
            <label>{{ trans("Description Body") }}</label>
            <textarea v-model="form.body" ref="bodyEl" class="textarea"></textarea>
          </div>
          <label>{{ trans("ShortCodes") }}:</label>
          <ul class="flex flex-wrap items-center gap-1 mb-3">
            <li
              v-for="code in dynamicShortCodes"
              @click="addToBody(code)"
              :key="code"
              class="p-1 border rounded"
            >
              {{ code }}
            </li>
          </ul>
          <div class="mb-2">
            <SpinnerBtn :processing="form.processing" :btn-text="trans('Submit')" />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
