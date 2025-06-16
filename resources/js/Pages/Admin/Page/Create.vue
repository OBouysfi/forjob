<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Create Page" :segments="segments" :buttons="buttons" />

    <form method="post" @submit.prevent="createPage">
      <div class="card">
        <div class="space-y-5 card-body">
          <div class="mb-2">
            <label class="mb-1 label label-required">{{ trans("Page Title") }}</label>
            <input type="text" name="title" v-model="form.title" required class="input" />
          </div>
          <div class="mb-2">
            <label class="mb-1 label label-required">{{
              trans("Page Description")
            }}</label>
            <cke tag-name="textarea" :editor="ClassicEditor" v-model="form.description" />
          </div>

          <div class="mb-2">
            <label class="mb-1 label label-required">{{ trans("SEO Meta Title") }}</label>
            <div class="col-lg-12">
              <input
                v-model="form.meta_title"
                type="text"
                name="meta_title"
                required
                class="input"
              />
            </div>
          </div>
          <div class="mt-2 mb-2">
            <label class="mb-1 label label-required">{{
              trans("SEO Meta Description")
            }}</label>
            <div class="col-lg-12">
              <textarea
                v-model="form.meta_description"
                name="meta_description"
                required
                class="textarea"
              ></textarea>
            </div>
          </div>
          <div class="mt-3 mb-2">
            <label class="mb-1 label label-required">{{ trans("SEO Meta Tags") }}</label>
            <div class="col-lg-12">
              <input
                v-model="form.meta_tags"
                type="text"
                name="meta_tags"
                required
                class="input"
              />
            </div>
          </div>
          <div class="mt-3 mb-2">
            <div>
              <label for="toggle-status" class="toggle toggle-sm">
                <input
                  v-model="form.status"
                  class="sr-only toggle-input peer"
                  id="toggle-status"
                  type="checkbox"
                />
                <div class="toggle-body"></div>
                <span class="label label-md">{{ trans("Make it publish?") }}</span>
              </label>
            </div>
          </div>
          <SpinnerBtn :processing="form.processing" :btnText="trans('Create')" />
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import { useForm } from "@inertiajs/vue3";
import notify from "@/Plugins/Admin/notify";
import trans from '@/Composables/transComposable';
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import ckeEditor from "@/Plugins/ckeEditor";
const { cke, ClassicEditor } = ckeEditor();

defineOptions({ layout: AdminLayout });

const props = defineProps(["buttons", "segments"]);
const form = useForm({
  title: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_tags: "",
  status: false,
});
const createPage = () => {
  form.post(route("admin.page.store"), {
    onSuccess: () => {
      form.reset();
      notify.success(trans("Page has been added successfully"));
    },
  });
};
</script>
