<script setup>
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import InputFieldError from "@/Components/InputFieldError.vue";
import AdminLayout from "@/Layouts/Admin.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import notify from "@/Plugins/Admin/notify";
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import { ref } from "vue";
defineOptions({ layout: AdminLayout });

const props = defineProps(["buttons", "segments", "aiModels"]);

const defaultInputFieldItem = {
  type: "",
  name: "",
  placeholder: "",
  value: "",
};

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "bn",
    name: "Bangla",
  },
];

const form = useForm({
  title: "",
  description: "",
  preview: "",
  icon: "",
  status: "",
  ai_model: "",
  type: "",
  fields: [{ ...defaultInputFieldItem }],
  // lang: "en",
  prompt: "",
});

const addNewField = () => {
  form.fields.push({ ...defaultInputFieldItem });
};

const removeField = (index) => {
  form.fields.splice(index, 1);
};

const submit = () => {
  form.post(route("admin.ai-templates.store"), {
    onSuccess: () => {
      notify.success(trans("Template has been added successfully", "Success"));
      form.reset();
    },
  });
};

const bodyEl = ref("");
const addToPrompt = (code) => {
  let curPos = bodyEl.value.selectionStart;
  let text = form.prompt;
  form.prompt = text.slice(0, curPos) + code + text.slice(curPos);

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

    <div class="w-9/12 mx-auto">
      <h3 class="mb-3 card-title">{{ trans("Create New Template") }}</h3>

      <form @submit.prevent="submit" class="space-y-7">
        <div class="card card-body">
          <div class="mb-2">
            <label>{{ trans("Template Title") }}</label>
            <input type="text" v-model="form.title" class="input" />
            <InputFieldError :message="form.errors.title" />
          </div>
          <div class="mb-2">
            <label>{{ trans("Template Description") }}</label>
            <textarea v-model="form.description" class="textarea"></textarea>
            <InputFieldError :message="form.errors.description" />
          </div>

          <div class="grid grid-cols-2 space-x-2">
            <div class="mb-2">
              <label>{{ trans("Template Icon") }}</label>
              <input
                type="file"
                @change="(e) => (form.icon = e.target.files[0])"
                class="input"
              />
              <InputFieldError :message="form.errors.icon" />
            </div>

            <div class="mb-2">
              <label>{{ trans("Template Preview") }}</label>
              <input
                type="file"
                @change="(e) => (form.preview = e.target.files[0])"
                class="input"
              />
              <InputFieldError :message="form.errors.preview" />
            </div>
          </div>

          <div class="flex gap-1">
            <div class="w-1/2 mb-3">
              <label>{{ trans("Template for") }}</label>
              <select class="select" v-model="form.type">
                <option value="" disabled selected>SELECT</option>
                <option v-for="t in ['candidate', 'employer']" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
              <InputFieldError :message="form.errors.type" />
            </div>
            <div class="w-1/2 mb-3">
              <label>{{ trans("Status") }}</label>
              <select class="select" v-model="form.status">
                <option value="" disabled selected>SELECT</option>
                <option v-for="t in ['active', 'draft']" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
              <InputFieldError :message="form.errors.status" />
            </div>
            <div class="w-1/2 mb-3">
              <label>{{ trans("AI Model") }}</label>
              <select class="select" v-model="form.ai_model">
                <option value="" disabled selected>SELECT</option>
                <option v-for="t in aiModels" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
              <InputFieldError :message="form.errors.ai_model" />
            </div>
          </div>
        </div>

        <div class="card card-body">
          <div class="flex justify-between">
            <h5>{{ trans("Input Fields") }}</h5>
            <button type="button" class="btn btn-primary" @click="addNewField">+</button>
          </div>
          <div
            v-for="(field, index) in form.fields"
            class="flex items-center gap-3 gap-y-5"
          >
            <div class="mb-2 space-y-1">
              <label>{{ trans("Field Type") }}</label>
              <select class="select" v-model="field.type">
                <option value="" disabled selected>SELECT</option>
                <option v-for="t in ['input', 'textarea']" :value="t" :key="t">
                  {{ t.toUpperCase() }}
                </option>
              </select>
              <InputFieldError :message="form.errors['fields.' + index + '.type']" />
            </div>
            <div class="mb-2 space-y-1">
              <label>{{ trans("Field Name") }}</label>
              <input type="text" v-model="field.name" class="input" />
              <InputFieldError :message="form.errors['fields.' + index + '.name']" />
            </div>
            <div class="mb-2 space-y-1">
              <label>{{ trans("Field Placeholder") }}</label>
              <input type="text" v-model="field.placeholder" class="input" />
              <InputFieldError
                :message="form.errors['fields.' + index + '.placeholder']"
              />
            </div>
            <div>
              <button
                type="button"
                class="mt-5 btn btn-danger"
                @click="removeField(index)"
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div class="card card-body">
        
          <div class="mb-2">
            <label>{{ trans("Custom Prompt") }}</label>
            <textarea v-model="form.prompt" ref="bodyEl" class="textarea"></textarea>
            <InputFieldError :message="form.errors.prompt" />
          </div>
          <ul class="flex flex-wrap items-center gap-1 mb-3">
            <li
              v-for="code in form.fields
                .filter((item) => item.name.length)
                .map((item) => `[${item.name}]`)"
              @click="addToPrompt(code)"
              :key="code"
              class="p-1 border rounded"
            >
              {{ code }}
            </li>
          </ul>
          <div class="mb-2">
            <SpinnerBtn :processing="form.processing" :btn-text="trans('Create ')" />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
