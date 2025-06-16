<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Edit a blog" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div class="mx-auto max-w-6xl">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="infoUpdate" class="space-y-4">
              <div class="mb-2">
                <label class="label">{{ trans('Blog Title') }}</label>
                <input type="text" name="title" required v-model="editForm.title" class="input" />
              </div>

              <div>
                <label class="label">{{ trans('Blog Image (Preview)') }}</label>
                <input
                  type="file"
                  @input="(e) => (editForm.preview = e.target.files[0])"
                  class="input"
                  name="preview"
                  accept="image/*"
                />
              </div>
              <div>
                <label class="label">{{ trans('Short Description') }}</label>
                <textarea
                  name="short_description"
                  required
                  class="textarea"
                  v-model="editForm.short_description"
                  maxlength="500"
                ></textarea>
              </div>
              <div>
                <label class="label">{{ trans('Main Description') }}</label>
                <div class="">
                  <cke
                    tag-name="textarea"
                    :editor="ClassicEditor"
                    v-model="editForm.main_description"
                  />
                </div>
              </div>
              <div>
                <label class="label">{{ trans('Select Language') }}</label>
                <select v-model="editForm.language" name="language" class="select">
                  <template v-for="(language, languagesKey) in languages" :key="language">
                    <option :value="languagesKey" :selected="languagesKey == info.lang">
                      {{ language }}
                    </option>
                  </template>
                </select>
              </div>
              <div>
                <label class="label">{{ trans('Select Category') }}</label>
                <Multiselect
                  class="multiselect-dark"
                  v-model="editForm.categories"
                  label="title"
                  valueProp="id"
                  mode="tags"
                  :options="categories"
                  :searchable="true"
                  placeholder="Select Category"
                />
              </div>
              <div>
                <label class="label">{{ trans('Select Tags') }}</label>
                <div class="">
                  <Multiselect
                    class="multiselect-dark"
                    v-model="editForm.tags"
                    label="title"
                    valueProp="id"
                    mode="tags"
                    :options="tags"
                    :searchable="true"
                    placeholder="Select Tags"
                  />
                </div>
              </div>
              <hr />
              <div>
                <label class="label">{{ trans('SEO Meta Title') }}</label>
                <input
                  type="text"
                  name="meta_title"
                  required
                  v-model="editForm.meta_title"
                  class="input"
                />
              </div>
              <div>
                <label class="label">{{ trans('SEO Meta Image') }}</label>
                <input
                  type="file"
                  @input="(e) => (editForm.meta_image = e.target.files[0])"
                  class="input"
                  name="meta_image"
                  accept="image/*"
                />
              </div>
              <div>
                <label class="label">{{ trans('SEO Meta Description') }}</label>
                <textarea
                  name="meta_description"
                  required
                  class="textarea"
                  v-model="editForm.meta_description"
                ></textarea>
              </div>
              <div>
                <label class="label">{{ trans('SEO Meta Tags') }}</label>
                <input
                  type="text"
                  name="meta_tags"
                  required
                  class="input"
                  v-model="editForm.meta_tags"
                />
              </div>
              <div>
                <div>
                  <label for="toggle-status" class="toggle toggle-sm">
                    <input
                      v-model="editForm.status"
                      class="toggle-input peer sr-only"
                      id="toggle-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Make it publish?') }}</span>
                  </label>
                </div>
              </div>
              <div>
                <div class="">
                  <SpinnerBtn
                    classes="btn btn-primary"
                    :processing="editForm.processing"
                    :btn-text="trans('Save Changes')"
                  />
                </div>
              </div>
              <ValidationErrors />
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import ValidationErrors from '@/Components/Admin/ValidationErrors.vue'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/ckeEditor'
const { cke, ClassicEditor } = ckeEditor()
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'info',
  'tags',
  'categories',
  'cats',
  'seo',
  'languages',
  'buttons',
  'segments',
  'tagsArr'
])

const editForm = useForm({
  title: props.info.title,
  short_description: props.info.short_description.value,
  main_description: props.info.long_description.value,
  categories: props.cats,
  tags: props.tagsArr,
  meta_title: props.seo.title,
  meta_description: props.seo.description,
  meta_tags: props.seo.tags,
  language: props.info.lang,
  featured: props.info.featured,
  status: props.info.status
})

const infoUpdate = () => {
  editForm
    .transform((data) => {
      return { _method: 'PATCH', blog: data }
    })
    .post(route('admin.blog.update', props.info.id), {
      onSuccess: () => {
        notify.success(trans('Blog has been deleted successfully'))
      }
    })
}
</script>
