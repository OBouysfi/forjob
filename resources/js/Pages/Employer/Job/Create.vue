<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import EmployerLayout from '@/Layouts/Employer.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import ckeEditor from '@/Plugins/ckeEditor'
import Multiselect from '@vueform/multiselect'
import notify from '@/Plugins/Admin/notify'
import axios from 'axios'
import { ref, computed } from 'vue'
import sharedComposable from '@/Composables/sharedComposable'
import moment from 'moment'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: EmployerLayout })
const { cke, ClassicEditor } = ckeEditor()
const { authUser, pickBy, textExcerpt } = sharedComposable()
const props = defineProps([
  'services',
  'countries',
  'plan',
  'job_count',
  'currencies',
  'shortcodes',
  'user'
])
const form = useForm({
  title: '',
  description: '',
  short_description: '',
  type: '',
  service_id: '',
  category_id: '',
  salary_type: '',
  currency: 'USD',
  min_salary: 0,
  max_salary: 0,
  experience: '',
  expertise: '',
  featured_expire_at: '',
  attachment: '',
  address: '',
  apply_type: 0,
  country_id: '',
  state_id: '',
  skills: [],
  fields: [],
  meta: {
    apply_type: {
      value: null
    },
    map: {
      latitude: '',
      longitude: ''
    },
    is_remote: false
  },
  expired_at: ''
})
const shortCodesForm = computed(() => {
  return {
    company_name: props.user.meta?.company?.name,
    company_size: props.user.meta?.company?.size,
    year_of_establishment: props.user?.meta.company?.year_of_establishment,
    company_address: props.user.meta?.company?.address,
    company_intro: props.user.meta?.company?.intro,
    job_name: form.title || 'Job Title'
  }
})
const descriptionTemplates = ref([])
const companyShortcodes = ref({})
const categories = ref([])
const tags = ref([])
const states = ref([])
const fields = ref([
  {
    label: '',
    type: ''
  }
])
const applyTypes = ref([
  { label: 'Default', value: 0 },
  { label: 'Email', value: 1 },
  { label: 'External', value: 2 }
])
const hasExpired = computed(() => {
  if (authUser.value.will_expire) {
    const userWillExpireDate = moment(authUser.value.will_expire)
    return userWillExpireDate.isBefore(moment())
  }
  return false
})
const today = () => {
  let currentDate = new Date()
  let year = currentDate.getFullYear()
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  let day = currentDate.getDate().toString().padStart(2, '0')

  return year + '-' + month + '-' + day
}
const maxExpiredDate = computed(() => {
  if (form.expired_at) {
    return moment(form.expired_at)
      .clone()
      .add(props.plan.live_job_for_days, 'days')
      .format('YYYY-MM-DD')
  }
  return moment(authUser.value.will_expire).format('YYYY-MM-DD')
})
const submit = () => {
  if (!props.plan || !authUser.value.will_expire) {
    notify.danger('You have not purchased a plan.')
    return
  }
  if (hasExpired.value) {
    notify.danger('Your subscription has expired. Please renew it.')
    return
  }
  if (props.plan.job_limit !== -1 && props.job_count >= props.plan.job_limit) {
    notify.danger('You have reached your Job post limit. Please upgrade your plan!')
    return
  }

  if (
    form.apply_type === 2 ||
    (fields.value.length < 2 && !fields.value[0]?.label && !fields.value[0]?.type)
  ) {
    form.fields = null
  } else {
    form.fields = fields.value
  }

  form.post(route('employer.jobs.store'), {
    onSuccess: () => {
      notify.success('Submitted Successfully')
      form.reset()
    }
  })
}
const getCategories = () => {
  axios.get(route('api.categories', { service_id: form.service_id })).then((res) => {
    categories.value = res.data
  })
}
const getTags = () => {
  axios.get(route('api.categories', { category_id: form.category_id })).then((res) => {
    tags.value = res.data
  })
}
const getState = () => {
  axios.get(route('api.locations', { country_id: form.country_id })).then((res) => {
    states.value = res.data
  })
}
const newFields = () => {
  const newFields = {
    label: '',
    type: ''
  }
  fields.value.push(newFields)
}

const deleteFields = (targetIndex) => {
  fields.value = fields.value.filter((_, index) => index !== targetIndex)
}
const getDescriptionTemplates = () => {
  companyShortcodes.value = props.shortcodes.reduce((acc, key) => {
    if (key in shortCodesForm.value) {
      acc[key] = shortCodesForm.value[key]
    }
    return acc
  }, {})
  axios
    .get(route('api-description-templates', { service: form.service_id, type: 'job' }))
    .then((res) => {
      descriptionTemplates.value = res.data
    })
}
const createdDescription = (template) => {
  return template.replace(/\[(.*?)\]/g, (match, key) => companyShortcodes.value[key])
}
</script>

<template>
  <Head title="Create Job" />

  <h2 class="main-title">{{ trans('Post a New Job') }}</h2>

  <form @submit.prevent="submit" enctype="multipart/form-data" class="card-box border-20 bg-white">
    <h4 class="dash-title-three">{{ trans('Job Details') }}</h4>
    <label class="mb-1" for="">{{ trans('Job Title') }}*</label>
    <div class="dash-input-wrapper mb-30">
      <input type="text" v-model="form.title" required placeholder="Ex: Product Designer" />
      <InputFieldError :message="form.errors.title" />
    </div>
    <div class="row mb-30">
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Service') }}*</label>
        <Multiselect
          @deselect="form.category_id = ''"
          @clear="
            () => {
              categories = []
              form.category_id = ''
            }
          "
          @change="form.category_id = ''"
          @select="
            () => {
              getCategories()
              getDescriptionTemplates()
            }
          "
          v-model="form.service_id"
          :options="services"
          label="title"
          valueProp="id"
          placeholder="Select Service"
          :required="true"
        />
        <InputFieldError :message="form.errors.service_id" />
      </div>
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Job Category') }}*</label>
        <Multiselect
          @deselect="form.skills = []"
          @clear="
            () => {
              tags = []
              form.skills = []
            }
          "
          @change="form.skills = []"
          @select="getTags"
          v-model="form.category_id"
          :options="categories"
          label="title"
          valueProp="id"
          placeholder="Select Category"
          :required="true"
        />

        <InputFieldError :message="form.errors.category_id" />
      </div>
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Job Type') }}*</label>
        <Multiselect
          v-model="form.type"
          :options="['Full time', 'Part time', 'Hourly-Contract', 'Fixed-Price']"
          placeholder="Select Type"
          :required="true"
        />
        <InputFieldError :message="form.errors.type" />
      </div>
    </div>
    <!-- /.dash-input-wrapper -->
    <div class="d-flex justify-content-between align-items-center">
      <label class="mb-1" for="">{{ trans('Job Description') }}*</label>
      <button
        v-if="form.service_id && descriptionTemplates?.length > 0"
        class="btn-one mb-3"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#suggestionModal"
      >
        {{ trans('Suggestions') }}
      </button>
    </div>

    <div class="dash-input-wrapper mb-30">
      <cke :editor="ClassicEditor" v-model="form.description" />

      <InputFieldError :message="form.errors.description" />
    </div>
    <div class="dash-input-wrapper">
      <label for="">{{ trans('Overview') }}*</label>
      <textarea
        v-model="form.short_description"
        class="size-lg"
        placeholder="Brief description for your Job...."
      ></textarea>

      <InputFieldError :message="form.errors.short_description" />
    </div>
    <!-- /.dash-input-wrapper -->

    <div class="row align-items-md-end mb-30">
      <div class="col-md-5">
        <label class="mb-1" for="">{{ trans('Salary') }}*</label>
        <Multiselect
          v-model="form.salary_type"
          :options="['Monthly', 'Weekly', 'Hourly']"
          placeholder="Select Salary"
          :required="true"
        />

        <InputFieldError :message="form.errors.salary_type" />
      </div>
      <div class="col-md-3">
        <label class="mb-1" for="">{{ trans('Currency') }}*</label>
        <Multiselect
          v-model="form.currency"
          :options="currencies"
          label="code"
          valueProp="code"
          placeholder="Select Currency"
          :required="true"
        />

        <InputFieldError :message="form.errors.currency" />
      </div>
      <div class="col-md-2">
        <label class="mb-1" for="">{{ trans('Min') }}</label>
        <div class="dash-input-wrapper">
          <input v-model="form.min_salary" type="number" placeholder="Min" />
          <InputFieldError :message="form.errors.min_salary" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-2">
        <label class="mb-1" for="">{{ trans('Max') }}</label>
        <div class="dash-input-wrapper">
          <input v-model="form.max_salary" type="number" placeholder="Max" />
          <InputFieldError :message="form.errors.max_salary" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
    </div>
    <h4 class="dash-title-three pt-50 lg-pt-30">
      {{ trans('Skills & Experience') }}
    </h4>

    <!-- /.dash-input-wrapper -->
    <div class="row align-items-end">
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Skills') }}*</label>
        <Multiselect
          mode="tags"
          v-model="form.skills"
          :options="tags"
          placeholder="Select Skills"
          label="title"
          valueProp="id"
          :required="true"
        />
      </div>
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Expertise') }}*</label>
        <Multiselect
          v-model="form.expertise"
          :options="['Intermediate', 'No-Experience', 'Expert']"
          placeholder="Expertise"
          :required="true"
        />
        <InputFieldError :message="form.errors.expertise" />
      </div>
      <div class="col-md-4">
        <label class="mb-1" for="">{{ trans('Experience') }}*</label>
        <Multiselect
          v-model="form.experience"
          :options="['Fresher', '1+ Year', '2+ Year', '4+ Year', '5+ Year', '10+ Year']"
          placeholder="Select Experience"
          :required="true"
        />
        <InputFieldError :message="form.errors.experience" />
      </div>
    </div>
    <h4 class="dash-title-three pt-50 lg-pt-30">
      {{ trans('File Attachment') }}
    </h4>
    <label class="mb-1" for="">{{ trans('File Attachment') }}*</label>
    <div class="dash-input-wrapper mb-20">
      <div class="attached-file d-flex align-items-center justify-content-between mb-15">
        <span>{{ form.attachment ? form.attachment.name : 'No File Uploaded' }}</span>
      </div>
    </div>
    <!-- /.dash-input-wrapper -->
    <div class="dash-btn-one d-inline-block position-relative me-3">
      <i class="bi bi-plus"></i>
      {{ trans('Upload File') }}
      <input
        type="file"
        @input="(e) => (form.attachment = e.target.files[0])"
        id="uploadCV"
        name="uploadCV"
        accept=".csv,.docx,.pdf,.xlsx,.xls,.jpg,.png"
      />
    </div>
    <InputFieldError :message="form.errors.attachment" />
    <small>{{ trans('Upload file .pdf, .doc, .docx') }}</small>
    <h4 class="dash-title-three pt-50 lg-pt-30">
      {{ trans('Address & Location') }}
    </h4>
    <div class="form-check mb-20">
      <input class="form-check-input" type="checkbox" id="remote" v-model="form.meta.is_remote" />
      <label class="form-check-label" for="remote">
        {{ trans('Is Remote?') }}
      </label>
    </div>
    <div class="row" v-if="!form.meta.is_remote">
      <div class="col-12">
        <label for="">{{ trans('Address') }}*</label>
        <div class="dash-input-wrapper mb-25">
          <input v-model="form.address" required type="text" placeholder="New work, Dhaka, Delhi" />
          <InputFieldError :message="form.errors.address" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-lg-6 mb-30">
        <label class="mb-1" for="">{{ trans('Country') }}*</label>
        <Multiselect
          @deselect="states = []"
          @clear="
            () => {
              states = []
              form.state_id = ''
            }
          "
          @change="form.state_id = ''"
          @select="getState"
          v-model="form.country_id"
          :options="countries"
          placeholder="Select Country"
          label="name"
          valueProp="id"
          :required="true"
        />

        <InputFieldError :message="form.errors.country_id" />
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-lg-6 mb-30">
        <label class="mb-1" for="">{{ trans('City') }}*</label>
        <Multiselect
          v-model="form.state_id"
          :options="states"
          placeholder="Select City"
          label="name"
          valueProp="id"
          :required="true"
        />

        <InputFieldError :message="form.errors.state_id" />
      </div>
      <div class="col-6">
        <label for="">{{ trans('Latitude') }}*</label>
        <div class="dash-input-wrapper mb-25">
          <div class="position-relative">
            <input v-model="form.meta.map.latitude" type="text" placeholder="Latitude" />
            <InputFieldError :message="form.errors.meta?.map?.latitude" />
          </div>
        </div>
      </div>
      <div class="col-6">
        <label for="">{{ trans('Longitude') }}*</label>
        <div class="dash-input-wrapper mb-25">
          <div class="position-relative">
            <input v-model="form.meta.map.longitude" type="text" placeholder="Longitude" />
            <InputFieldError :message="form.errors.meta?.map?.longitude" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="form.apply_type !== 2">
      <div>
        <label class="fw-bold">{{ trans('Custom Fields') }}</label>
        <div class="row">
          <div class="col-md-6">
            <label for="">{{ trans('Label') }}</label>
          </div>
          <div class="col-md-5">
            <label for="">{{ trans('Type') }}</label>
          </div>
          <div class="col-md-1 d-flex justify-content-end">
            <button type="button" @click="newFields" class="btn btn-success">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>
        <template v-for="(field, i) in fields" :key="i">
          <div class="row d-flex align-items-center mb-30 mt-10">
            <div class="col-md-6">
              <div class="dash-input-wrapper">
                <input v-model="field.label" type="text" placeholder="Label" />
                <InputFieldError :message="form.errors['fields.' + i + '.label']" />
              </div>
            </div>
            <div class="col-md-5 mb-1">
              <Multiselect
                v-model="field.type"
                :options="['email', 'text', 'number', 'file']"
                placeholder="Select Input Type"
              />
              <InputFieldError :message="form.errors['fields.' + i + '.type']" />
            </div>

            <div class="col-md-1 d-flex justify-content-end">
              <button type="button" @click="deleteFields(i)" class="fs-4 ps-2">
                <i class="bi bi-x-circle text-danger"></i>
              </button>
            </div>
          </div>
        </template>
      </div>
    </template>
    <div class="row align-items-end">
      <div class="col-md-6">
        <label class="mb-1" for="">{{ trans('Apply Type') }}*</label>
        <Multiselect
          @deselect="form.apply_type = 0"
          @clear="form.apply_type = 0"
          v-model="form.apply_type"
          :options="applyTypes"
          placeholder="Select Apply Type"
          :required="true"
        />
        <InputFieldError :message="form.errors.apply_type" />
      </div>
      <div class="col-md-6" v-if="form.apply_type === 1 || form.apply_type === 2">
        <label class="mb-1" for="">
          {{ form.apply_type == 1 ? trans('Email') : trans('External Link') }}
        </label>
        <div class="dash-input-wrapper">
          <input
            v-model="form.meta.apply_type.value"
            type="text"
            :placeholder="form.apply_type == 1 ? 'Email' : 'External Link'"
          />
          <InputFieldError :message="form.errors['meta.apply_type.value']" />
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-30">
      <label class="mb-1" for="">{{ trans('Job Deadline') }}</label>
      <div class="dash-input-wrapper mb-30">
        <input
          :min="today()"
          :max="maxExpiredDate"
          v-model="form.expired_at"
          required
          type="date"
          placeholder="Label"
        />
        <InputFieldError :message="form.errors.expired_at" />
      </div>
    </div>
    <div class="button-group d-inline-flex align-items-center mt-30">
      <SpinnerBtn :processing="form.processing" btn-text="Save" />
    </div>
  </form>

  <!-- suggestion Modal -->
  <div
    class="modal fade"
    id="suggestionModal"
    tabindex="-1"
    aria-labelledby="suggestionModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="d-flex align-items-center justify-content-between p-3">
          <p class="fs-5" id="suggestionModalLabel">{{ trans('Suggestions') }}</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group" v-if="descriptionTemplates.length > 0">
            <li
              class="d-flex align-items-center justify-content-between fs-7 mb-4 rounded p-2 shadow-sm"
              v-for="templates in descriptionTemplates"
              :key="templates.id"
            >
              {{ textExcerpt(createdDescription(templates.body), 660) }}
              <button
                type="button"
                @click="
                  () => {
                    form.description = createdDescription(templates.body)
                  }
                "
                class="btn-four ms-3 p-2"
                data-bs-dismiss="modal"
              >
                {{ trans('Select') }}
              </button>
            </li>
          </ul>
          <p v-else class="text-danger text-center">
            {{ trans("Opp's! Nothing Found") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
