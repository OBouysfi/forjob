<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import { useForm, router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import { onBeforeMount, ref } from 'vue'
defineOptions({ layout: AdminLayout })

const props = defineProps(['languages', 'segments', 'buttons', 'about', 'current_lang'])

const about = ref({ ...props.about })

const isProcessing = ref(false)

onBeforeMount(() => {
  let properties = ['cta_s1', 'cta_s2', 'video_s1']
  properties.forEach((key) => (about.value[key] = about.value[key] || {}))

  if (!about.value.cta_s1?.features?.length) {
    about.value.cta_s1.features = [
      {
        title: '',
        body: ''
      }
    ]
  }
})

const defaultFeature = {
  title: '',
  body: ''
}

const addFeatureItem = () => {
  about.value.cta_s1.features.push({ ...defaultFeature })
}

const removeFeatureItem = (index) => {
  about.value.cta_s1.features.splice(index, 1)
}

const submit = () => {
  isProcessing.value = true
  router.post(
    route('admin.about.store'),
    {
      about: about.value
    },
    {
      onSuccess: () => notify.success(trans('About Page Updated successfully')),
      onFinish: () => (isProcessing.value = false)
    }
  )
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Edit About Page')" :segments="segments" :buttons="buttons" />

    <div class="flex justify-center">
      <div class="card mx-auto max-w-[800px]">
        <div class="card-body">
          <form @submit.prevent="submit" class="space-y-5">
            <h6>{{ trans('Faq Section') }}</h6>
            <div>
              <div class="mb-2">
                <label>{{ trans('Title') }}</label>
                <input type="text" class="input" v-model="about.cta_s1.title" />
              </div>

              <div class="mb-2">
                <label class="mr-2">{{ trans('Faqs') }}</label>
                <div
                  class="mb-3 flex items-center gap-2 rounded-md border p-2 dark:border-gray-600"
                  v-for="(item, index) in about.cta_s1.features"
                  :key="index"
                >
                  <span class="h-6 w-6 rounded-full bg-indigo-600 text-center text-white">
                    {{ index + 1 }}
                  </span>
                  <div class="flex flex-grow flex-col gap-1">
                    <input type="text" class="input" placeholder="question" v-model="item.title" />
                    <textarea class="textarea" v-model="item.body" placeholder="answer"> </textarea>
                  </div>
                  <button type="button" @click="removeFeatureItem(index)" class="btn btn-danger">
                    X
                  </button>
                </div>
                <button type="button" @click="addFeatureItem" class="btn btn-primary">+</button>
              </div>
            </div>

            <h6>{{ trans('Video Section') }}</h6>
            <div>
              <div class="mb-2">
                <label>{{ trans('Video Link') }}</label>
                <input type="text" v-model="about.video_s1.link" class="input" />
              </div>
              <div class="mb-2">
                <label>{{ trans('Background image') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.video_s1.image = e.target.files[0])"
                />
              </div>

              <div class="mb-2">
                <label>{{ trans('Completed Jobs') }}</label>
                <input type="text" v-model="about.video_s1.completed_jobs" class="input" />
              </div>
              <div class="mb-2">
                <label>{{ trans('Worldwide Client') }}</label>
                <input type="text" v-model="about.video_s1.clients" class="input" />
              </div>
              <div class="mb-2">
                <label>{{ trans('Applied Jobs') }}</label>
                <input type="text" v-model="about.video_s1.applied_jobs" class="input" />
              </div>
            </div>

            <h6>{{ trans('Call to action') }}</h6>
            <div>
              <div class="mb-2">
                <label>{{ trans('Title') }}</label>
                <input type="text" class="input" v-model="about.cta_s2.title" />
              </div>

              <div class="mb-2">
                <label>{{ trans('Sub title') }}</label>
                <input type="text" class="input" v-model="about.cta_s2.subtitle" />
              </div>

              <div class="mb-2">
                <label>{{ trans('features') }}</label>
                <input type="text" class="input" v-model="about.cta_s2.features" />
                <p>{{ trans('use comma (,) for line break') }}</p>
              </div>

              <div class="mb-2">
                <label>{{ trans('Button Text') }}</label>
                <input type="text" class="input" v-model="about.cta_s2.btn_text" />
              </div>

              <div class="mb-2">
                <label>{{ trans('Button Link') }}</label>
                <input type="text" class="input" v-model="about.cta_s2.btn_link" />
              </div>

              <div class="mb-2">
                <label>{{ trans('Image 1') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image1 = e.target.files[0])"
                />
              </div>
              <div class="mb-2">
                <label>{{ trans('Image 2') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image2 = e.target.files[0])"
                />
              </div>
              <div class="mb-2">
                <label>{{ trans('Image 3') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image3 = e.target.files[0])"
                />
              </div>
              <div class="mb-2">
                <label>{{ trans('Image 4') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image4 = e.target.files[0])"
                />
              </div>
              <div class="mb-2">
                <label>{{ trans('Image 5') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image5 = e.target.files[0])"
                />
              </div>
              <div class="mb-2">
                <label>{{ trans('Image 6') }}</label>
                <input
                  type="file"
                  accept="image/*"
                  class="input"
                  @input="(e) => (about.cta_s2.image6 = e.target.files[0])"
                />
              </div>
            </div>

            <SpinnerBtn :processing="isProccessing" :btn-text="trans('Save Changes')" />
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
