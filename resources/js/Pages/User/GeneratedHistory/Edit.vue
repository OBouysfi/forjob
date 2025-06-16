<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import ckeEditor from '@/Plugins/ckeEditor'
import sharedComposable from '@/Composables/sharedComposable'
import InputFieldError from '@/Components/InputFieldError.vue'
import notify from '@/Plugins/Admin/notify'
import { ref } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: UserLayout })
const { cke, ClassicEditor } = ckeEditor()
const { textExcerpt, pickBy, copyToClipboard } = sharedComposable()
const props = defineProps(['aiGenerated'])

const form = useForm({
  ...props.aiGenerated
})
const documentName = ref('')
const submit = () => {
  form.patch(route('user.ai-generated-history.update', props.aiGenerated.uuid), {
    onSuccess: () => {
      form.reset()
      notify.success('Submitted Successfully')
    }
  })
}
function downloadHTMLFile(textContent, name) {
  const blob = new Blob([textContent], { type: 'text/html' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name ? name.replace(' ', '-') : 'untitled.html'

  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <Head :title="trans('History')" />
  <div class="row justify-content-center message-wrapper mb-10">
    <form @submit.prevent="submit" class="col-lg-8 rounded bg-white p-4">
      <p class="fs-4">{{ trans('Template') }} : {{ aiGenerated.ai_template.title }}</p>
      <div class="user-activity-chart h-100 rounded">
        <div class="d-flex">
          <button class="me-1" type="button" @click="copyToClipboard(form.content)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 0.6)"
            >
              <path
                d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"
              ></path>
            </svg>
          </button>
          <button class="ms-1" type="button" @click="downloadHTMLFile(form.content, documentName)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 0.6)"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </button>
        </div>
        <div class="mb-20 mt-20">
          <input
            v-model="documentName"
            type="text"
            class="w-100 rounded border-0 p-2"
            placeholder="Untitled Document..."
          />
        </div>
        <div class="ai-ck-section">
          <cke :editor="ClassicEditor" v-model="form.content" />
          <InputFieldError class="mb-5" :message="form.errors.content" />
        </div>
        <div>
          <SpinnerBtn :processing="form.processing" btn-text="Update" />
        </div>
      </div>
    </form>
  </div>
</template>
