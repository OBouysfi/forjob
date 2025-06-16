<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Edit Page" :segments="segments" :buttons="buttons" />

    <form method="post" @submit.prevent="editPage">
      <!-- Alerts -->
      <div class="card">
        <div class="space-y-5 card-body">
          <div>
            <label class="mb-1 label label-required">{{ trans('Page Title') }}</label>
            <input type="text" name="title" v-model="info.title" required class="input" />
          </div>
          <div>
            <label class="mb-1 label label-required">{{ trans('Page Description') }}</label>

            <cke tag-name="textarea" :editor="ClassicEditor" v-model="info.description.value" />
          </div>

          <div class="mb-2">
            <label class="mb-1 label label-required">{{ trans('SEO Meta Title') }}</label>
            <input
              v-model="seoMeta.meta_title"
              type="text"
              name="meta_title"
              required
              class="input"
            />
          </div>
          <div class="mt-2 mb-2">
            <label class="mb-1 label label-required">{{ trans('SEO Meta Description') }}</label>
            <textarea
              v-model="seoMeta.meta_description"
              name="meta_description"
              required
              class="textarea"
            ></textarea>
          </div>
          <div class="mt-3 mb-2">
            <label class="mb-1 label label-required">{{ trans('SEO Meta Tags') }}</label>
            <input
              v-model="seoMeta.meta_tags"
              type="text"
              name="meta_tags"
              required
              class="input"
            />
          </div>

          <div class="mt-3 mb-2">
                <div>
                  <label for="toggle-status" class="toggle toggle-sm">
                    <input
                      v-model="info.status"
                      class="sr-only toggle-input peer"
                      id="toggle-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Make it publish?') }}</span>
                  </label>
                </div>
              </div>

          <SpinnerBtn :processing="isProcessing" :btnText="trans('Save Changes')" />
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { router } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/ckeEditor'
const { cke, ClassicEditor } = ckeEditor()
defineOptions({ layout: AdminLayout })

const props = defineProps(['buttons', 'segments', 'info', 'seo'])

const isProcessing = ref(false)

const seoMeta = ref({
  meta_title: '',
  meta_description: '',
  meta_tags: ''
})

onMounted(() => {
  seoMeta.value.meta_title = props.seo.title
  seoMeta.value.meta_description = props.seo.description
  seoMeta.value.meta_tags = props.seo.tags
})

const editPage = () => {
  const data = { ...seoMeta.value, ...props.info }
  isProcessing.value = true
  router.patch(route('admin.page.update', props.info.id), data, {
    onSuccess: () => {
      isProcessing.value = false
      notify.success(trans('Page has been updated successfully'))
    }
  })
}
</script>
