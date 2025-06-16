<script setup>
import axios from 'axios'
import { Head, useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import { ref, computed, onMounted } from 'vue'
import DefaultLayout from '@/Layouts/Default.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import NiceSelect from '@/Components/NiceSelect.vue'
import { modal } from '@/Composables/modalComposable'
import trans from '@/Composables/transComposable'

defineOptions({ layout: DefaultLayout })

const props = defineProps([
  'user',
  'meta',
  'countries',
  'services',
  'education_qualifications',
  'expertLevels',
  'currencies'
])

const completedSteps = props.meta?.step_completed ?? 0
const nextStepToComplete = completedSteps ? new Number(completedSteps) + 1 : 1
const step = ref(nextStepToComplete ?? 1)
const completedAllSteps = ref(step.value == 6)
const stepProgress = computed(() => {
  return ((step.value * 100) / 5).toFixed(2)
})

const states = ref([])
const categories = ref([])
const skills = ref([])

const form = useForm({
  // step 1
  overview: '',
  gender: '',
  date_of_birth: '',
  avatar: '',
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
      start_at: '',
      pass_year: '',
      degree: '',
      out_of: 5,
      is_current: false
    }
  ],

  // step 5
  resume: '',
  expected_salary: 0,
  currency: 'USD'
})

onMounted(() => {
  form.overview = props.meta?.overview ?? ''
  form.gender = props.meta?.gender ?? ''
  form.phone = props.user?.phone ?? ''
  form.date_of_birth = props.meta?.date_of_birth ?? ''

  form.country_id = props.meta?.country_id ?? ''
  if (form.country_id) {
    fetchStates()
  }
  form.address = props.user?.address ?? ''
  form.service_id = props.meta?.service_id ?? ''
  if (form.service_id) {
    fetchCategories()
  }

  form.category_id = props.meta?.category_id ?? ''
  if (form.category_id) {
    fetchTags()
  }

  form.expert_level = props.meta?.expert_level ?? ''
  form.skills = props.meta?.skills ?? []
  form.work_experiences = props.meta?.work_experiences ?? []
  form.expected_salary = props.meta?.expected_salary ?? ''

  if (props.meta?.education_qualifications?.length) {
    form.education_qualifications = props.meta.education_qualifications
  }
  form.custom_cv = ''
})

const addWorkExperienceItem = () => {
  form.work_experiences.push({
    from: '',
    to: '',
    is_current: false,
    org_name: '',
    designation: ''
  })
}

const setWorkingExpDate = (item) => {
  if (item.is_current) {
    item.to = ''
  }
}

const setCurrentlyStudingDate = (item) => {
  if (item.is_current) {
    item.result = ''
    // item.out_of = ''
    item.pass_year = ''
  }
}

const removeWorkExperienceItem = (index) => {
  modal.initCallback(() => form.work_experiences.splice(index, 1))
}

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
  modal.initCallback(() => form.education_qualifications.splice(index, 1))
}

const gettingCategories = ref(false)
const fetchCategories = () => {
  form.category_id = ''
  categories.value = []

  form.skills = []
  skills.value = []
  if (form.service_id) {
    gettingCategories.value = true
    axios
      .get(`/api/categories?service_id=${form.service_id}`)
      .then((res) => {
        gettingCategories.value = false
        categories.value = res.data
      })
      .catch((e) => {
        gettingCategories.value = false
      })
  }
}

const gettingSkills = ref(false)
const fetchTags = () => {
  if (form.category_id) {
    gettingSkills.value = true
    axios
      .get(`/api/categories?category_id=${form.category_id}`)
      .then((res) => {
        gettingSkills.value = false
        skills.value = res.data
      })
      .catch((e) => {
        gettingSkills.value = false
      })
  }
}

const gettingStates = ref(false)
const fetchStates = () => {
  states.value = []
  form.state_id = ''
  if (form.country_id) {
    gettingStates.value = true
    axios
      .get(`/api/locations?location_id=${form.country_id}`)
      .then((res) => {
        gettingStates.value = false
        states.value = res.data
        if (props.meta?.state_id) {
          form.state_id = props.meta?.state_id
        }
      })
      .catch((e) => {
        gettingStates.value = false
      })
  }
}

const nextStep = () => {
  form.post(route('user.profile-setup.store', { step: step.value, is_editing: false }), {
    preserveScroll: true,
    // preserveState: true,
    onSuccess: () => {
      completedAllSteps.value = true
      notify.success('Information has been updated successfully')
      if (step.value < 5) step.value += 1
    }
  })
}

const prevStep = () => {
  if (step.value > 1) {
    step.value -= 1
  }
}
</script>

<template>
  <Head title="Complete candidate profile" />

  <div class="inner-banner-one position-relative p-70px"></div>

  <div class="dashboard-body container mx-auto mt-4 rounded p-5">
    <h2 class="main-title ml-5">{{ trans('Setup Your CV') }}</h2>

    <div class="mb-30">
      <div class="progress h-25px">
        <div
          class="progress-bar"
          role="progressbar"
          :aria-label="'Step ' + step + ' of 5'"
          :style="{ width: stepProgress + '%', background: 'rgb(36 64 52)' }"
          :aria-valuenow="stepProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ trans('Step') }} {{ step }} {{ trans(' of 5') }}
        </div>
      </div>
    </div>

    <form @submit.prevent="nextStep">
      <div v-if="step == 1">
        <div class="dash-input-wrapper mb-4">
          <label for="">{{ trans('Overview') }} *</label>
          <textarea
            v-model="form.overview"
            placeholder="enter something about yourself (max 500 character)"
            rows="5"
          ></textarea>
          <InputFieldError :message="form.errors.overview" />
        </div>
        <div class="row">
          <div class="col-md-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Gender') }} *</label>
            <NiceSelect
              v-model="form.gender"
              :options="['male', 'female', 'other']"
              placeholder="SELECT"
            />
            <InputFieldError :message="form.errors.gender" />
          </div>
          <div class="col-md-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Date of birth') }} *</label>
            <input type="date" v-model="form.date_of_birth" />
            <InputFieldError :message="form.errors.date_of_birth" />
          </div>
          <div class="col-md-6 mb-2">
            <label for="">{{ trans('Phone') }} * </label>
            <input type="tel" v-model="form.phone" class="form-control p-3" placeholder="" />
            <InputFieldError :message="form.errors.phone" />
          </div>
          <div class="col-md-6 mb-2">
            <label for="">{{ trans('Avatar') }} </label>
            <input
              type="file"
              @change="(e) => (form.avatar = e.target.files[0])"
              class="form-control p-3"
            />
            <InputFieldError :message="form.errors.avatar" />
          </div>
        </div>
      </div>

      <div v-if="step == 2">
        <div class="row">
          <div class="col-md-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Country') }} *</label>
            <NiceSelect
              v-model="form.country_id"
              :options="props.countries"
              label="name"
              value-by="id"
              :placeholder="trans('Select Country')"
              @change="fetchStates()"
            />
            <InputFieldError :message="form.errors.country_id" />
          </div>
          <div class="col-md-6 dash-input-wrapper mb-2">
            <LabelWithAjaxLoader text="State *" :loading="gettingStates" />
            <NiceSelect
              v-model="form.state_id"
              :options="states"
              label="name"
              value-by="id"
              :placeholder="trans('Select State')"
            />
            <InputFieldError :message="form.errors.state_id" />
          </div>
        </div>

        <div class="dash-input-wrapper mb-2">
          <label for="">{{ trans('Address') }} *</label>
          <input type="text" v-model="form.address" placeholder="" />
          <InputFieldError :message="form.errors.address" />
        </div>
      </div>

      <div v-if="step == 3">
        <div class="row">
          <div class="col-md-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Service') }} *</label>
            <NiceSelect
              v-model="form.service_id"
              :options="props.services"
              @change="fetchCategories()"
              label="title"
              value-by="id"
              :placeholder="trans('Select Service')"
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
              @change="fetchTags()"
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

        <div class="row">
          <div class="col-md-4 dash-input-wrapper mb-2">
            <label for="">{{ trans('Expert Level ') }}*</label>
            <NiceSelect
              v-model="form.expert_level"
              :options="expertLevels"
              label="title"
              value-by="id"
              :placeholder="trans('Select Level')"
            />
            <InputFieldError :message="form.errors.expert_level" />
          </div>

          <div class="col-md-4 dash-input-wrapper mb-2">
            <label for="">{{ trans('Expected Salary') }}</label>
            <input type="number" v-model="form.expected_salary" />
            <InputFieldError :message="form.errors.expected_salary" />
          </div>
          <div class="col-md-4 dash-input-wrapper mb-2">
            <label for="">{{ trans('Currency ') }}*</label>
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

        <!-- work experiences -->
        <div class="mt-30">
          <p class="fw-bold">{{ trans('Work Experiences') }}:</p>
          <div
            v-for="(item, index) in form.work_experiences"
            :key="index"
            class="row m-0 mb-2 rounded bg-white p-2"
          >
            <div class="col-md-12 border-bottom mb-3 pb-2">
              <div class="d-flex justify-content-between align-items-center">
                <h5>{{ trans('Work Experience #') }}{{ index + 1 }}</h5>
                <button
                  type="button"
                  class="btn-nine text-danger fw-bold"
                  @click="removeWorkExperienceItem(index)"
                >
                  X
                </button>
              </div>
            </div>

            <div class="col-md-12 dash-input-wrapper mb-3">
              <label for="">{{ trans('Organization') }} *</label>
              <input type="text" v-model="item.org_name" />
              <InputFieldError :message="form.errors['work_experiences.' + index + '.org_name']" />
            </div>

            <div class="col-md-4 dash-input-wrapper">
              <label for="">{{ trans('Designation') }} *</label>
              <input type="text" v-model="item.designation" />
              <InputFieldError
                :message="form.errors['work_experiences.' + index + '.designation']"
              />
            </div>

            <div class="col-md-4 dash-input-wrapper">
              <label for="">{{ trans('from') }} *</label>
              <input type="date" v-model="item.from" />
              <InputFieldError :message="form.errors['work_experiences.' + index + '.from']" />
            </div>
            <div class="col-md-4">
              <div class="d-flex justify-content-between mb-2">
                <span>{{ trans('To') }}</span>
                <span>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="item.is_current"
                      @change="setWorkingExpDate(item)"
                      :id="`isCurrent-${index + 1}`"
                    />
                    <label class="form-check-label" :for="`isCurrent-${index + 1}`">
                      {{ trans('Currently working') }}
                    </label>
                  </div>
                </span>
              </div>
              <div class="dash-input-wrapper">
                <input type="date" v-model="item.to" :disabled="item.is_current" />
              </div>
              <InputFieldError :message="form.errors['work_experiences.' + index + '.to']" />
            </div>

            <div class="col-md-12 dash-input-wrapper mt-2">
              <textarea
                v-model="item.responsibilities"
                rows="6"
                placeholder="Enter short brif about your role or responsibilities (Optional)"
              >
              </textarea>
              <InputFieldError
                :message="form.errors['work_experiences.' + index + '.responsibilities']"
              />
            </div>
          </div>
        </div>
        <button type="button" @click="addWorkExperienceItem" class="btn-two">
          <i class="bi bi-plus"></i> {{ trans('Add Work Experience') }}
        </button>
      </div>

      <div v-if="step == 4">
       
        <div v-for="(item, index) in form.education_qualifications" :key="index">
          <div class="row align-items-center bg-light mb-3 mt-2 rounded border pt-2">
            <div class="col-md-12 mb-2 pb-2">
              <div class="col-md-12 border-bottom mb-3 pb-2">
                <div class="d-flex justify-content-between align-items-center">
                  <h5>{{ trans('Education History #') }}{{ index + 1 }}</h5>

                  <button
                    type="button"
                    class="btn-nine text-danger fw-bold"
                    @click="removeEducationItem(index)"
                  >
                    X
                  </button>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2 dash-input-wrapper mb-2">
                  <label for="">{{ trans('Degree') }} *</label>

                  <NiceSelect
                    v-model="item.degree"
                    :options="education_qualifications"
                    label="title"
                    value-by="id"
                    :placeholder="trans('Select Degree')"
                  />

                  <InputFieldError
                    :message="form.errors['education_qualifications.' + index + '.degree']"
                  />
                </div>
                <div class="col-md-4 dash-input-wrapper mb-2">
                  <label for="">{{ trans('Institute Name') }} *</label>
                  <input type="text" v-model="item.institute_name" />
                  <InputFieldError
                    :message="form.errors['education_qualifications.' + index + '.institute_name']"
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
                <div class="col-md-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="item.is_current"
                      @change="setCurrentlyStudingDate(item)"
                      :id="`currentItem${index}`"
                    />
                    <label class="form-check-label" :for="`currentItem${index}`">
                      {{ trans(' Currently Studying') }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-end">
          <button type="button" class="btn-two" @click="addEducationItem">
            {{ trans('Add More') }}
          </button>
        </div>
      </div>

      <div v-if="step == 5">
        <div class="row">
          <div class="col-md-12 dash-input-wrapper mb-2">
            <label for="">{{ trans('Resume / CV') }} </label>
            <input
              type="file"
              @change="(e) => (form.resume = e.target.files[0])"
              class="form-control p-3"
            />
            <InputFieldError :message="form.errors.resume" />
          </div>
         
        </div>
      </div>

      <div class="d-flex justify-content-between mt-40 gap-3">
        <button type="button" @click="prevStep" :disabled="step == 1" class="btn-five bg-secondary">
          Prev
        </button>
        <SpinnerBtn
          :processing="form.processing"
          btn-text="Next"
          classes="btn-five d-flex align-items-center justify-content-center"
        />
      </div>
    </form>
  </div>
</template>
