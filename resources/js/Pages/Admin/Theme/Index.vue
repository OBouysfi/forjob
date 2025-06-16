<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import notify from '@/Plugins/Admin/notify'
import { router } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
defineOptions({ layout: AdminLayout })
const props = defineProps(['theme_path', 'buttons', 'segments'])
const isProcessing = ref(false)
const themeData = computed(() => JSON.parse(props.theme_path))

const homePage = [
  {
    img: '/assets/images/theme/home/one.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/home/two.png',
    value: 'Two'
  },
  {
    img: '/assets/images/theme/home/three.png',
    value: 'Three'
  },
  {
    img: '/assets/images/theme/home/four.png',
    value: 'Four'
  },
  {
    img: '/assets/images/theme/home/five.png',
    value: 'Five'
  },
  {
    img: '/assets/images/theme/home/six.png',
    value: 'Six'
  },
  {
    img: '/assets/images/theme/home/seven.png',
    value: 'Seven'
  }
]
const jobLists = [
  {
    img: '/assets/images/theme/job_list/job_list_one_list.png',
    path: 'One',
    type: 'List'
  },
  {
    img: '/assets/images/theme/job_list/job_list_one_grid.png',
    path: 'One',
    type: 'Grid'
  },
  {
    img: '/assets/images/theme/job_list/job_list_two_list.png',
    path: 'Two',
    type: 'List'
  },
  {
    img: '/assets/images/theme/job_list/job_list_two_list.png',
    path: 'Two',
    type: 'Grid'
  },
  {
    img: '/assets/images/theme/job_list/job_list_three_list.png',
    path: 'Three',
    type: 'List'
  },
  {
    img: '/assets/images/theme/job_list/job_list_three_list.png',
    path: 'Three',
    type: 'Grid'
  }
]
const jobDetails = [
  {
    img: '/assets/images/theme/job_detail/one.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/job_detail/two.png',
    value: 'Two'
  }
]
const candidateLists = [
  {
    img: '/assets/images/theme/candidate/candidate_one_grid.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/candidate/candidate_one_list.png',
    value: 'Two'
  },
  {
    img: '/assets/images/theme/candidate/candidate_two_grid.png',
    value: 'Three'
  },
  {
    img: '/assets/images/theme/candidate/candidate_two_list.png',
    value: 'Four'
  }
]
const candidateDetails = [
  {
    img: '/assets/images/theme/candidate/candidate_detail_one.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/candidate/candidate_detail_two.png',
    value: 'Two'
  }
]
const companyLists = [
  {
    img: '/assets/images/theme/company/company_one.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/company/company_two.png',
    value: 'Two'
  },
  {
    img: '/assets/images/theme/company/company_three.png',
    value: 'Three'
  },
  {
    img: '/assets/images/theme/company/company_four.png',
    value: 'Four'
  }
]
const blogs = [
  {
    img: '/assets/images/theme/blog/one.png',
    value: 'One'
  },
  {
    img: '/assets/images/theme/blog/two.png',
    value: 'Two'
  },
  {
    img: '/assets/images/theme/blog/three.png',
    value: 'Three'
  }
]
function btnInfo(condition) {
  const buttonText = condition ? 'Deactivate' : 'Activate'

  const buttonClass = condition ? 'btn-outline-secondary' : 'btn-outline-success'

  return { text: buttonText, class: buttonClass }
}
const themeForm = ref({
  home: themeData.value?.home || '',
  job_list: {
    path: themeData.value?.job_list?.path,
    type: themeData.value?.job_list?.type
  },
  job_detail: themeData.value?.job_detail || '',
  candidate_list: themeData.value?.candidate_list || '',
  candidate_detail: themeData.value?.candidate_detail || '',
  company_list: themeData.value?.company_list || '',
  blog: themeData.value?.blog || ''
})
const updateThemePath = () => {
  isProcessing.value = true

  router.put(
    route('admin.page-settings.update', 'theme'),
    { themeData: themeForm.value },
    {
      preserveScroll: true,
      onSuccess: () => {
        notify.success('Theme Updated successfully')
        isProcessing.value = false
      }
    }
  )
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Themes Settings" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div class="card">
        <div class="card-body">
          <form
            class="space-y-6"
            method="POST"
            @submit.prevent="updateThemePath"
            enctype="multipart/form-data"
          >
            <div>
              <h5>{{ trans('Home') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div class="rounded-md" v-for="theme in homePage" :key="theme.value">
                  <a :href="theme.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.home === theme.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="theme.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.home = theme.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.home === theme.value).class"
                    >
                      {{ btnInfo(themeData.home === theme.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Job Listing') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div class="rounded-md" v-for="(jobList, i) in jobLists" :key="i">
                  <a :href="jobList.img" target="_blank" class="relative">
                    <span
                      v-if="
                        themeData.job_list.type === jobList.type &&
                        themeData.job_list.path === jobList.path
                      "
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="jobList.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      @click="
                        () => {
                          themeForm.job_list.path = jobList.path
                          themeForm.job_list.type = jobList.type
                        }
                      "
                      type="submit"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="
                        btnInfo(
                          themeData.job_list.type === jobList.type &&
                            themeData.job_list.path === jobList.path
                        ).class
                      "
                    >
                      {{
                        btnInfo(
                          themeData.job_list.type === jobList.type &&
                            themeData.job_list.path === jobList.path
                        ).text
                      }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Job Details') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div class="rounded-md" v-for="jobDetail in jobDetails" :key="jobDetail.value">
                  <a :href="jobDetail.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.job_detail === jobDetail.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="jobDetail.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.job_detail = jobDetail.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.job_detail === jobDetail.value).class"
                    >
                      {{ btnInfo(themeData.job_detail === jobDetail.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Candidate Lists') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div
                  class="rounded-md"
                  v-for="candidateList in candidateLists"
                  :key="candidateList.value"
                >
                  <a :href="candidateList.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.candidate_list === candidateList.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="candidateList.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.candidate_list = candidateList.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.candidate_list === candidateList.value).class"
                    >
                      {{ btnInfo(themeData.candidate_list === candidateList.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Candidate Details') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div
                  class="rounded-md"
                  v-for="candidateDetail in candidateDetails"
                  :key="candidateDetail.value"
                >
                  <a :href="candidateDetail.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.candidate_detail === candidateDetail.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="candidateDetail.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.candidate_detail = candidateDetail.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.candidate_detail === candidateDetail.value).class"
                    >
                      {{ btnInfo(themeData.candidate_detail === candidateDetail.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Company Lists') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div
                  class="rounded-md"
                  v-for="companyList in companyLists"
                  :key="companyList.value"
                >
                  <a :href="companyList.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.company_list === companyList.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="companyList.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.company_list = companyList.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.company_list === companyList.value).class"
                    >
                      {{ btnInfo(themeData.company_list === companyList.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>{{ trans('Blog Lists') }}</h5>
              <div class="grid grid-cols-4 gap-5 mt-3">
                <div class="rounded-md" v-for="blog in blogs" :key="blog.value">
                  <a :href="blog.img" target="_blank" class="relative">
                    <span
                      v-if="themeData.blog === blog.value"
                      class="absolute -rotate-45 badge badge-danger badge-rounded -left-3 top-2"
                    >
                      {{ trans('Active') }}
                    </span>
                    <img v-lazy="blog.img" class="border rounded-md" alt="img" />
                  </a>
                  <div class="flex items-center justify-center mt-2">
                    <button
                      :disabled="isProcessing"
                      type="submit"
                      @click="themeForm.blog = blog.value"
                      class="btn btn-xs disabled:cursor-not-allowed"
                      :class="btnInfo(themeData.blog === blog.value).class"
                    >
                      {{ btnInfo(themeData.blog === blog.value).text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
