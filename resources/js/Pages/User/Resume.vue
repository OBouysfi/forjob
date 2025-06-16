<script setup>
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import { ref, onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import NiceSelect from '@/Components/NiceSelect.vue'
import trans from '@/Composables/transComposable'
import { modal } from '@/Composables/modalComposable'
defineOptions({ layout: UserLayout })

const props = defineProps([
  'meta',
  'portfolios',
  'countries',
  'services',
  'education_qualifications',
  'expertLevels',
  'candidate',
  'currencies'
])

const errors = ref([])
const states = ref([])
const categories = ref([])
const skills = ref([])

const form = useForm({
  // step 1
  overview: '',
  gender: '',
  date_of_birth: '',
  phone: '',

  // step 2
  country_id: '',
  state_id: '',
  address: '',

  // step 3
  service_id: '',
  category_id: '',
  expert_level: '',
  skills: [],
  work_experiences: [
    {
      from: '',
      to: '',
      is_current: false,
      org_name: '',
      designation: ''
    }
  ],

  // step 4
  education_qualifications: [
    {
      institute_name: '',
      result: '',
      pass_year: '',
      degree: '',
      out_of: 5
    }
  ],

  // step 5
  avatar: '',
  resume: '',
  expected_salary: 0,
  currency: ''
})

onMounted(() => {
  form.gender = props.meta?.gender
  form.phone = props.candidate?.phone
  form.overview = props.meta?.overview
  form.date_of_birth = props.meta?.date_of_birth

  form.country_id = props.meta?.country_id
  if (form.country_id) fetchStates()
  form.state_id = props.meta.state_id

  form.address = props.candidate?.address ?? ''
  form.service_id = props.meta?.service_id ?? ''
  if (form.service_id) {
    fetchCategories()
  }
  form.category_id = props.meta?.category_id ?? ''

  if (form.category_id) {
    fetchTags()
  }
  form.skills = props.meta?.skills ?? ''

  form.expected_salary = props.meta?.expected_salary ?? ''
  form.currency = props.meta?.currency ?? 'USD'
  form.expert_level = props.meta?.expert_level ?? ''
  form.work_experiences = props.meta?.work_experiences ?? []

  if (props.meta?.education_qualifications) {
    form.education_qualifications = props.meta.education_qualifications
  }
})

const submitForm = () => {
  form.post(route('user.resume.store'), {
    // preserveScroll: true,
    onSuccess: () => {
      notify.success(trans('Information has been updated successfully'))
    },
    onError: () => {
      notify.danger(trans('Something went wrong, please check the form again'))
    }
  })
}

// resume upload

const cvForm = useForm({
  submit_type: 'resume',
  resume: ''
})

const uploadCV = (file) => {
  cvForm.resume = file
  cvForm.post(route('user.resume.store'), {
    onSuccess: () => {
      notify.success(trans('CV has been updated successfully'))
    },
    onError: (errors) => {
      console.log(errors)
      notify.danger('Something went wrong')
    }
  })
}

const removeResume = () => {
  let actionUrl = route('user.resume.destroy')
  modal.init(actionUrl, {
    data: {
      submit_type: 'resume'
    },
    method: 'post',
    callback: () => {
      notify.danger(trans('CV Removed'))
    }
  })
}

const removeVideoIntro = () => {
  let actionUrl = route('user.resume.destroy')

  modal.init(actionUrl, {
    data: {
      submit_type: 'video_intro'
    },
    method: 'post',
    callback: () => {
      notify.danger(trans('Video Intro Removed'))
    }
  })
}

// education qualification
const addEducationItem = () => {
  form.education_qualifications.push({
    institute_name: '',
    result: '',
    pass_year: '',
    degree: '',
    out_of: 5,
    is_current: false
  })
}

const removeEducationItem = (index) => {
  modal.init(null, {
    callback: () => {
      form.education_qualifications.splice(index, 1)
    }
  })
}

// service category tags
const gettingCategories = ref(false)
const fetchCategories = () => {
  form.category_id = ''
  categories.value = []

  form.skills = []
  skills.value = []
  if (form.service_id) {
    gettingCategories.value = true
    axios.get(`/api/categories?service_id=${form.service_id}`).then((res) => {
      gettingCategories.value = false
      categories.value = res.data
    })
  }
}

const gettingSkills = ref(false)
const fetchTags = () => {
  form.skills = []
  skills.value = []
  if (form.category_id) {
    gettingSkills.value = true
    axios.get(`/api/categories?category_id=${form.category_id}`).then((res) => {
      gettingSkills.value = false
      skills.value = res.data

      // if (props.meta?.skills) {
      //   form.skills = props.meta?.skills ?? ''
      // }
    })
  }
}

// Location
const gettingStates = ref(false)
const fetchStates = () => {
  states.value = []
  form.state_id = ''
  if (form.country_id) {
    gettingStates.value = true
    return axios.get(`/api/locations?location_id=${form.country_id}`).then((res) => {
      gettingStates.value = false
      states.value = res.data
    })
  }
}

// work experience
const addWorkExperienceItem = () => {
  form.work_experiences.push({
    from: '',
    to: '',
    is_current: false,
    org_name: '',
    designation: ''
  })
}
const removeWorkExperienceItem = (index) => {
  modal.init(null, {
    callback: () => {
      form.work_experiences.splice(index, 1)
    }
  })
}

// portfolio
const portfolioForm = useForm({
  title: '',
  preview: ''
})

const portfolioModalClsBtn = ref(null)
const addPortfolio = () => {
  portfolioForm.post(route('user.portfolios.store'), {
    preserveScroll: true,
    onSuccess: (page) => {
      notify.success('Portfolio added')
      portfolioModalClsBtn.value.click()
      portfolioForm.reset()
    }
  })
}

const removePortfolio = (route) => {
  modal.init(null, {
    callback: () => {
      portfolioForm.delete(route, {
        preserveScroll: true,
        onSuccess: () => {
          notify.success('Portfolio removed')
          portfolioForm.reset()
        }
      })
    }
  })
}

// video intro
let videoIntroForm = useForm({
  submit_type: 'video_intro',
  video_intro: ''
})
const uploadVideoIntro = () => {
  videoIntroForm.post(route('user.resume.store'), {
    onSuccess: () => {
      $('#addVideoIntro .btn-close').trigger('click')
      notify.success(trans('Video Intro has been updated successfully'))
      videoIntroForm.reset()
    },
    onError: (errors) => {
      console.log(errors)
      notify.danger(trans('Something went wrong'))
    }
  })
}

const arrayRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)
</script>
<template>
  <Head :title="trans('My Resume')" />
  <h2 class="main-title">{{ trans('My Resume') }}</h2>

 

  <div class="card-box border-20 bg-white">
    <h4 class="dash-title-three">{{ trans('Resume Attachment') }}</h4>
    <div class="dash-input-wrapper mb-20">
      <label for="">{{ trans('CV Attachment') }} *</label>

      <div
        v-if="meta?.resume"
        class="attached-file d-flex align-items-center justify-content-between mb-15"
      >
        <span>{{ meta?.resume }}</span>
        <a href="#" @click="removeResume()" class="remove-btn"><i class="bi bi-x"></i></a>
      </div>
      <p v-else>{{ trans('No CV found') }}</p>
    </div>
    <!-- /.dash-input-wrapper -->
    <div for="upload-cv" class="dash-btn-one d-inline-block position-relative me-3">
      <label for="upload-cv"><i class="bi bi-plus"></i>
      {{ trans(' Upload CV') }}</label>
      <input id="upload-cv" type="file" @input="uploadCV($event.target.files[0])" :disabled="meta?.resume" />
    </div>
    <small>{{ trans('Upload file') }} .pdf, .doc</small>
    <InputFieldError :message="cvForm.errors.resume" />
  </div>
  <!-- /.card-box -->

  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans('Intro & Overview') }}</h4>
    <div class="dash-input-wrapper mb-35 md-mb-20">
      <label for="">{{ trans('Overview') }} *</label>
      <textarea
        class="size-lg"
        v-model="form.overview"
        :placeholder="trans('Write something interesting about you....')"
      ></textarea>
      <div class="alert-text">{{ trans('Brief description for your resume') }}</div>
    </div>
    <!-- /.dash-input-wrapper -->

    <div class="row">
      <div class="col-md-4 mb-2">
        <label for="">{{ trans('Gender') }} *</label>
        <div class="dash-input-wrapper">
          <NiceSelect v-model="form.gender" :options="['male', 'female', 'other']" />
        </div>
        <InputFieldError :message="form.errors.gender" />
      </div>
      <div class="col-md-4 mb-2">
        <label for="">{{ trans('Date of birth') }} *</label>
        <div class="dash-input-wrapper">
          <input type="date" v-model="form.date_of_birth" />
        </div>
        <InputFieldError :message="form.errors.date_of_birth" />
      </div>

      <div class="col-md-4 mb-2">
        <label for="">{{ trans('Phone') }} * </label>
        <input type="text" v-model="form.phone" class="form-control p-3" />
        <InputFieldError :message="form.errors.phone" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 d-flex" :class="[meta?.video_id ? 'col-lg-6' : 'col-lg-12']">
        <div
          v-if="meta?.video_id"
          class="intro-video-post position-relative mt-20"
          :style="{
            backgroundImage: `url(https://img.youtube.com/vi/${meta?.video_id}/sddefault.jpg)`
          }"
        >
          <a
            class="fancybox rounded-circle video-icon tran3s text-center"
            data-fancybox=""
            :href="`https://www.youtube.com/embed/${meta?.video_id}`"
          >
            <i class="bi bi-play"></i>
          </a>
          <a href="#" @click="removeVideoIntro" class="close"><i class="bi bi-x"></i></a>
        </div>
        <!-- /.intro-video-post -->
      </div>
      <div class="col-sm-6 d-flex" :class="[meta?.video_id ? 'col-lg-6' : 'col-lg-12']">
        <div class="intro-video-post position-relative empty mt-20">
          <button class="w-100 h-100" data-bs-toggle="modal" data-bs-target="#addVideoIntro">
            <span>+ {{ trans('Add Intro Video') }}</span>
          </button>
        </div>
        <!-- /.intro-video-post -->
      </div>
    </div>
  </div>
  <!-- /.card-box -->

  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans('Location / Area') }}</h4>

    <div class="row">
      <div class="col-md-6 dash-input-wrapper mb-2">
        <label class="mb-1" for="">{{ trans('Country') }}*</label>
        <NiceSelect
          v-model="form.country_id"
          :options="countries"
          placeholder="Select Country"
          label="name"
          value-by="id"
          :required="true"
          @change="fetchStates()"
        />

        <InputFieldError :message="form.errors.country_id" />
      </div>
      <div class="col-md-6 dash-input-wrapper mb-2">
        <LabelWithAjaxLoader text="State *" :loading="gettingStates" class="mb-1" />
        <NiceSelect
          v-model="form.state_id"
          :options="states"
          placeholder="Select City"
          label="name"
          value-by="id"
          :required="true"
        />
        <InputFieldError :message="form.errors.state_id" />
      </div>
    </div>

    <div class="mb-2">
      <label for="">{{ trans('Address') }} *</label>
      <div class="dash-input-wrapper">
        <input
          type="text"
          v-model="form.address"
          class="form-control"
          :disabled="!form.country_id"
          placeholder=""
        />
      </div>
      <InputFieldError :message="form.errors.address" />
    </div>
  </div>

  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans('Education') }}</h4>

    <div class="accordion dash-accordion-one" id="accordionOne">
      <template v-for="(item, index) in form.education_qualifications" :key="index">
        <div class="accordion-item">
          <div class="accordion-header" :id="`item-${index}`">
            <div class="d-flex">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapseItem-${index}`"
                aria-expanded="false"
                :aria-controls="`collapseItem-${index}`"
              >
                {{ trans('Education') }} {{ index + 1 }}
              </button>
              <button type="button" class="btn text-danger" @click="removeEducationItem(index)">
                {{ trans('X') }}
              </button>
            </div>
          </div>
          <div
            :id="`collapseItem-${index}`"
            class="accordion-collapse collapse"
            :aria-labelledby="`item-${index}`"
            :data-bs-parent="`#item-${index}`"
          >
            <div class="accordion-body">
              <div class="row">
                <div class="form-check mb-20">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="item.is_current"
                    @change="setCurrentlyStudingDate(item)"
                    :id="`currentItem${index}`"
                  />
                  <label class="form-check-label" :for="`currentItem${index}`">
                    {{ trans(' Currenly Studing') }}
                  </label>
                </div>
                <div class="row">
                  <div class="col-md-2 dash-input-wrapper mb-2">
                    <label for="">{{ trans('Degree') }} *</label>

                    <select class="form-control select-input-degree" v-model="item.degree">
                      <option
                        v-for="(item, index) in education_qualifications"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.title }}
                      </option>
                    </select>

                    <InputFieldError
                      :message="form.errors['education_qualifications.' + index + '.degree']"
                    />
                  </div>
                  <div class="col-md-4 dash-input-wrapper mb-2">
                    <label for="">{{ trans('Institue Name') }} *</label>
                    <input type="text" v-model="item.institute_name" />
                    <InputFieldError
                      :message="
                        form.errors['education_qualifications.' + index + '.institute_name']
                      "
                    />
                  </div>
                  <div class="col-md-2 dash-input-wrapper mb-2">
                    <label for="">{{ trans('Result') }} *</label>
                    <input
                      type="number"
                      v-model="item.result"
                      step="0.01"
                      max="5.00"
                      :disabled="item.is_current"
                    />
                    <InputFieldError
                      :message="form.errors['education_qualifications.' + index + '.result']"
                    />
                  </div>
                 
                  <div class="col-md-2 dash-input-wrapper mb-2">
                    <label for="">{{ trans('Start Year') }} *</label>
                    <input type="number" v-model="item.start_at" placeholder="2020" />
                    <InputFieldError
                      :message="form.errors['education_qualifications.' + index + '.start_at']"
                    />
                  </div>
                  <div class="col-md-2 dash-input-wrapper mb-2">
                    <label for="">{{ trans('Passing year') }} *</label>
                    <input
                      type="number"
                      v-model="item.pass_year"
                      placeholder="2024"
                      :disabled="item.is_current"
                    />
                    <InputFieldError
                      :message="form.errors['education_qualifications.' + index + '.pass_year']"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- /.dash-accordion-one -->
    <button type="button" @click="addEducationItem" class="dash-btn-one">
      <i class="bi bi-plus"></i> {{ trans('Add more') }}
    </button>
  </div>
  <!-- /.card-box -->

  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans('Skills & Experience') }}</h4>
    <div class="row">
      <div class="col-md-6 dash-input-wrapper mb-2">
        <label for="">{{ trans('Service') }} *</label>
        <NiceSelect
          v-model="form.service_id"
          :options="props.services"
          label="title"
          value-by="id"
          :placeholder="trans('Select Service')"
          @change="fetchCategories"
        />
        <InputFieldError :message="form.errors.service_id" />
      </div>
      <div class="col-md-6 dash-input-wrapper mb-2">
        <LabelWithAjaxLoader text="Service Category *" :loading="gettingCategories" />
        <NiceSelect
          v-model="form.category_id"
          :options="categories"
          label="title"
          value-by="id"
          :placeholder="trans('Select Category')"
          @change="fetchTags"
        />
        <InputFieldError :message="form.errors.category_id" />
      </div>
    </div>

    <div class="mb-2 rounded bg-white p-3">
      <label class="d-flex me-3"
        >{{ trans('Skills') }}:
        <LabelWithAjaxLoader text="" :loading="gettingSkills" />
      </label>

      <div class="form-check form-check-inline" v-for="tag in skills" :key="tag.id">
        <input
          class="form-check-input"
          v-model="form.skills"
          type="checkbox"
          :id="'tagId' + tag.id"
          :value="tag.id"
        />
        <label class="form-check-label" :for="'tagId' + tag.id">{{ tag.title }} </label>
      </div>

      <InputFieldError :message="form.errors.skills" />
    </div>

    <div class="row mb-40">
      <div class="col-md-4 dash-input-wrapper mb-2">
        <label for="">{{ trans('Expert Level') }} *</label>

        <NiceSelect
          v-model="form.expert_level"
          :options="expertLevels"
          label="title"
          value-by="id"
          :placeholder="trans('Select Level')"
        />
        <InputFieldError :message="form.errors.expert_level" />
      </div>

      <div class="col-md-4 mb-2">
        <label for="" class="mb-2">{{ trans('Expected Salery') }}</label>
        <div class="dash-input-wrapper">
          <input
            type="number"
            v-model="form.expected_salary"
            placeholder="100000"
            class="form-control"
          />
        </div>
        <InputFieldError :message="form.errors.expected_salary" />
      </div>
      <div class="col-md-4 dash-input-wrapper mb-2">
        <label for="">{{ trans('Currency') }} *</label>

        <NiceSelect
          v-model="form.currency"
          :options="currencies"
          label="code"
          value-by="code"
          :placeholder="trans('Currency')"
        />
        <InputFieldError :message="form.errors.currency" />
      </div>
    </div>

    <div class="dash-input-wrapper mb-15">
      <label for="">{{ trans('Work Experiences') }} *</label>
    </div>
    <!-- /.dash-input-wrapper -->
    <div class="accordion dash-accordion-one" id="accordionTwo">
      <template v-for="(item, index) in form.work_experiences" :key="index">
        <div class="accordion-item">
          <div class="accordion-header" :id="`heading-${index}`">
            <div class="d-flex">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapseOneA-${index}`"
                aria-expanded="false"
                :aria-controls="`collapseOneA-${index}`"
              >
                {{ trans('Work Experience') }} {{ index + 1 }}
              </button>
              <button
                type="button"
                class="btn text-danger"
                @click="removeWorkExperienceItem(index)"
              >
                {{ trans('X') }}
              </button>
            </div>
          </div>
          <div
            :id="`collapseOneA-${index}`"
            class="accordion-collapse collapse"
            :aria-labelledby="`heading-${index}`"
            data-bs-parent="#accordionTwo"
          >
            <div class="accordion-body">
              <div class="row">
                <div class="col-lg-2">
                  <div class="dash-input-wrapper mb-30 md-mb-10">
                    <label for="">{{ trans('Title') }} *</label>
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
                <div class="col-lg-10">
                  <div class="dash-input-wrapper mb-30">
                    <input
                      type="text"
                      v-model="item.designation"
                      placeholder="Lead Product Designer "
                    />
                    <InputFieldError
                      :message="form.errors[`work_experiences.${index}.designation`]"
                    />
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2">
                  <div class="dash-input-wrapper mb-30 md-mb-10">
                    <label for="">{{ trans('Company') }} *</label>
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
                <div class="col-lg-10">
                  <div class="dash-input-wrapper mb-30">
                    <input type="text" v-model="item.org_name" placeholder="Amazon Inc" />
                    <InputFieldError :message="form.errors[`work_experiences.${index}.org_name`]" />
                  </div>
                  <!-- /.dash-input-wrapper -->
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="item.is_current"
                      :id="`isCurrent${index}`"
                    />
                    <label class="form-check-label" :for="`isCurrent${index}`">
                      {{ trans('Currently working') }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2">
                  <div class="dash-input-wrapper mb-30 md-mb-10">
                    <label for="">{{ trans('Date') }} *</label>
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
                <div class="col-lg-10">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="dash-input-wrapper mb-30">
                        <input type="date" v-model="item.from" />
                        <InputFieldError :message="form.errors[`work_experiences.${index}.from`]" />
                      </div>
                      <!-- /.dash-input-wrapper -->
                    </div>
                    <div class="col-sm-6">
                      <div class="dash-input-wrapper mb-30">
                        <input type="date" v-model="item.to" :disabled="item.is_current" />
                        <InputFieldError :message="form.errors[`work_experiences.${index}.to`]" />
                      </div>
                      <!-- /.dash-input-wrapper -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2">
                  <div class="dash-input-wrapper mb-30 md-mb-10">
                    <label for="">{{ trans('Description') }} *</label>
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
                <div class="col-lg-10">
                  <div class="dash-input-wrapper mb-30">
                    <textarea
                      v-model="item.responsibilities"
                      class="size-lg"
                      placeholder="Enter short brif about your role or responsibilities (Optional)"
                    ></textarea>
                    <InputFieldError
                      :message="form.errors[`work_experiences.${index}.responsibilities`]"
                    />
                  </div>
                  <!-- /.dash-input-wrapper -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4"></div>
      </template>
    </div>
    <!-- /.dash-accordion-one -->
    <button type="button" @click="addWorkExperienceItem" class="dash-btn-one">
      <i class="bi bi-plus"></i> {{ trans('Add more') }}
    </button>
  </div>
  <!-- /.card-box -->

  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans('Portfolio') }}</h4>
    <div class="row">
      <div class="col-lg-3 col-6" v-for="portfolio in portfolios" :key="portfolio.id">
        <div class="candidate-portfolio-block position-relative mb-25">
          <div class="d-flex align-items-center justify-content-between">
            <span>{{ portfolio.title }}</span>
            <button
              @click="removePortfolio(route('user.portfolios.destroy', portfolio))"
              class="btn text-danger"
            >
              X
            </button>
          </div>
          <img v-lazy="portfolio.preview" class="lazy-img w-100" />
        </div>
        <!-- /.candidate-portfolio-block -->
      </div>
    </div>
    <button data-bs-toggle="modal" data-bs-target="#addNewPortfolioModal" class="dash-btn-one">
      <i class="bi bi-plus"></i> {{ trans('Add more') }}
    </button>
  </div>
  <!-- /.card-box -->

  <div class="button-group d-inline-flex align-items-center mt-30">
    <button type="button" @click="submitForm" class="dash-btn-two tran3s me-3">
      {{ trans('Save') }}
    </button>
    <button type="button" class="dash-cancel-btn tran3s">{{ trans('Cancel') }}</button>
  </div>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div
    class="modal fade"
    id="addNewPortfolioModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="addNewPortfolioModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <form @submit.prevent="addPortfolio">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewPortfolioModalTitle">
              {{ trans('Add Portfolio') }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for="title">{{ trans('Title') }}</label>
              <input type="text" v-model="portfolioForm.title" class="form-control" />
              <InputFieldError :message="portfolioForm.errors.title" />
            </div>
            <div class="mb-2">
              <label for="title">{{ trans('Preview Image') }}</label>
              <input
                type="file"
                @input="(e) => (portfolioForm.preview = e.target.files[0])"
                class="form-control"
                accept="image/*"
              />
              <InputFieldError :message="portfolioForm.errors.preview" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              ref="portfolioModalClsBtn"
              class="dash-btn-two"
              data-bs-dismiss="modal"
            >
              {{ trans('Close') }}
            </button>
            <SpinnerBtn
              :btn-text="trans('Add Portfolio')"
              classes="btn-one d-flex align-items-center"
              :processing="portfolioForm.processing"
            />
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div
    class="modal fade"
    id="addVideoIntro"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="addVideoIntroModal"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
      role="document"
    >
      <div class="modal-content">
        <form @submit.prevent="uploadVideoIntro">
          <div class="modal-header">
            <h5 class="modal-title" id="addVideoIntroModal">
              {{ trans('Add Video intro') }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dash-input-wrapper mb-1">
              <label for="">{{ trans('Youtube video link') }}</label>
              <input
                type="text"
                v-model="videoIntroForm.video_intro"
                placeholder="enter a youtube video link here"
              />
              <InputFieldError :message="videoIntroForm.errors.video_intro" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-eight py-2" data-bs-dismiss="modal">
              {{ trans('Close') }}
            </button>
            <SpinnerBtn
              type="submit"
              classes="btn-one d-flex align-items-center"
              :processing="videoIntroForm.processing"
              :btn-text="trans('Save')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
