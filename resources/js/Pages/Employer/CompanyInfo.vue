<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import Multiselect from '@vueform/multiselect'
import { ref, computed } from 'vue'
import axios from 'axios'
import sharedComposable from '@/Composables/sharedComposable'
defineOptions({ layout: DefaultLayout })

const { authUser } = sharedComposable()
const props = defineProps(['services', 'countries', 'shortcodes'])
const step = ref(1)
const states = ref([])
const categories = ref([])
const descriptionTemplates = ref([])
const companyShortcodes = ref({})

const form = useForm({
  // step 1
  company_name: authUser.value.name,
  company_size: '',
  year_of_establishment: '',
  company_address: '',
  company_intro: '',
  company_teams: [],
  country_id: '',
  state_id: '',
  service_id: '',
  category_id: [],

  // step 2
  business: {
    description: '',
    license_no: '',
    rl_no: '',
    site_url: ''
  },
  contact: {
    name: '',
    designation: '',
    email: '',
    mobile: ''
  },
  social: {
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: ''
  },
  terms: false
})

const submit = () => {
  form.company_name = authUser.value.name
  form.post(route('employer.company-info.store', { step: step.value }), {
    onSuccess: () => form.reset()
  })
}

const nextStep = () => {
  form.post(route('employer.company-info.store', { step: step.value }), {
    preserveState: true,
    onSuccess: () => {
      if (step.value < 2) {
        step.value += 1
        companyShortcodes.value = props.shortcodes.reduce((acc, key) => {
          if (key in form) {
            acc[key] = form[key]
          }
          return acc
        }, {})
      }
    }
  })
}

const prevStep = () => {
  if (step.value > 1) {
    step.value -= 1
  }
}
const addOrUpdateCategory = (id) => {
  const find = form.category_id.indexOf(id)

  if (find !== -1) {
    form.category_id.splice(find, 1)
  } else {
    form.category_id.push(id)
  }
}

const getState = () => {
  form.state_id = ''
  axios.get(route('api.locations', { country_id: form.country_id })).then((res) => {
    states.value = res.data
  })
}
const getCategories = () => {
  axios.get(route('api.categories', { service_id: form.service_id })).then((res) => {
    categories.value = res.data
  })
}
const stepProgress = computed(() => {
  return ((step.value * 100) / 2).toFixed(2)
})
const previewFlies = (event) => {
  const images = []
  for (const image of event.target.files) {
    images.push(image)
  }
  const maxGallerySize = 3
  const oldImagesCount = Math.max(form.company_teams.length + images.length - maxGallerySize, 0)

  const newImages = images.slice(0, maxGallerySize - oldImagesCount)
  const updatedGallery = form.company_teams.slice(oldImagesCount).concat(newImages)

  form.company_teams = updatedGallery
}
const setImageURL = (value) => {
  return URL.createObjectURL(value)
}
const clearImage = (i) => {
  const listImages = Array.from(form.company_teams)
  listImages.splice(i, 1)
  form.company_teams = listImages
}

const getDescriptionTemplates = () => {
  axios
    .get(route('api-description-templates', { service: form.service_id, type: 'company' }))
    .then((res) => {
      descriptionTemplates.value = res.data
    })
}
const createdDescription = (template) => {
  return template.replace(/\[(.*?)\]/g, (match, key) => companyShortcodes.value[key])
}
</script>

<template>
  <Head title="Employer Information" />

  <div class="inner-banner-one position-relative p-70px"></div>
  <div class="mt-30 container">
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
        {{ trans('Step') }} {{ step }} {{ trans(' of 2') }}
      </div>
    </div>
  </div>
  <div class="dashboard-body company-i-pt-3 container mx-auto mt-4 rounded">
    <form @submit.prevent="submit" class="card-box">
      <h2 class="main-title ml-5">{{ trans('Employer Information') }}</h2>
      <div v-if="step == 1">
        <div class="row">
          <div class="col-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Company Name') }}</label>
            <input
              type="text"
              required
              :value="form.company_name"
              readonly
              disabled
              placeholder="Company Name"
            />
            <InputFieldError :message="form.errors.company_name" />
          </div>
          <div class="col-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Year of Establishment') }}</label>
            <input
              required
              type="date"
              v-model="form.year_of_establishment"
              placeholder="Year of Establishment"
            />
            <InputFieldError :message="form.errors.year_of_establishment" />
          </div>
        </div>
        <div class="row">
          <div class="col-6 dash-input-wrapper mb-2">
            <label for="">{{ trans('Company Intro') }}</label>
            <input type="text" v-model="form.company_intro" placeholder="Company Intro" />
            <InputFieldError :message="form.errors.company_intro" />
          </div>
          <div class="col-6 mb-2">
            <label for="" class="c-input-label">{{ trans('Company Size') }}*</label>
            <Multiselect
              v-model="form.company_size"
              :options="[
                '1-15',
                '16-30',
                '31-50',
                '51-120',
                '121-300',
                '301-500',
                '501-1000',
                '1001-5000',
                '5001-10000',
                '10000'
              ]"
              placeholder="Company Size"
              :required="true"
            >
              <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label">{{ value.label }}+</div>
              </template>
              <template v-slot:option="{ option }"> {{ option.label }}+ </template>
            </Multiselect>

            <InputFieldError :message="form.errors.company_size" />
          </div>
        </div>
        <div class="row">
          <label for="" class="c-input-label">{{ trans('Company Address') }}*</label>
          <div class="col-6 mb-2">
            <Multiselect
              @deselect="states = []"
              @clear="
                () => {
                  states = []
                  form.state_id = ''
                }
              "
              @select="getState"
              v-model="form.country_id"
              :options="countries"
              placeholder="Select Country"
              label="name"
              valueProp="id"
              :required="true"
            />
            <InputFieldError :message="form.errors.country_id" />
          </div>
          <div class="col-6 mb-2">
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
        </div>
        <div class="dash-input-wrapper mb-2">
          <textarea
            required
            v-model="form.company_address"
            placeholder="Write Company Address"
            class="size-lg"
          ></textarea>
          <InputFieldError :message="form.errors.company_address" />
        </div>

        <div class="mb-3">
          <div class="dash-btn-one d-inline-block position-relative me-3">
            <i class="bi bi-plus"></i>
            {{ trans('Upload Team Images (Max: 3)') }}
            <input multiple type="file" @input="previewFlies" name="teams" accept="image/*" />
          </div>
          <InputFieldError :message="form.errors.company_teams" />
          <small>{{ trans('Upload file .jpg, .png, .webp, .jpeg') }}</small>
        </div>
        <template v-if="form.company_teams?.length > 0">
          <div class="d-flex mb-20 flex-wrap">
            <section class="col-1 mb-5 me-3 w-10" v-for="(image, i) in form.company_teams" :key="i">
              <button
                @click="clearImage(i)"
                type="button"
                class="position-absolute btn btn-danger btn-sm"
              >
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>

              <img ref="previewImages" :src="setImageURL(image)" class="img-thumbnail" alt="img" />
            </section>
          </div>
        </template>
        <div class="row">
          <label for="" class="c-input-label"> {{ trans('Industry Type') }}*</label>
          <div class="col-6 mb-2">
            <Multiselect
              @deselect="categories = []"
              @clear="
                () => {
                  categories = []
                  form.category_id = []
                }
              "
              @select="getCategories"
              v-model="form.service_id"
              :options="services"
              label="title"
              valueProp="id"
              placeholder="Select Industry"
              :required="true"
            />
            <InputFieldError :message="form.errors.service_id" />
          </div>
        </div>
        <div class="row m-1 p-2" v-if="categories.length > 0">
          <div class="form-check col-3" v-for="cat in categories" :key="cat.id">
            <input
              @input="addOrUpdateCategory(cat.id)"
              class="form-check-input"
              type="checkbox"
              :id="`cat${cat.id}`"
              :checked="form.category_id.includes(cat.id)"
            />
            <label class="form-check-label" :for="`cat${cat.id}`">
              {{ cat.title }}
            </label>
          </div>
        </div>
        <InputFieldError :message="form.errors.category_id" />
      </div>
      <div v-if="step == 2">
        <div class="dash-input-wrapper mb-2">
          <div class="d-flex justify-content-between align-items-center">
            <label for="">{{ trans('Business Description') }}</label>
            <button
              v-if="descriptionTemplates.length > 0"
              @click="getDescriptionTemplates"
              class="btn-one mb-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#suggestionModal"
            >
              {{ trans('Suggestions') }}
            </button>
          </div>
          <textarea
            required
            v-model="form.business.description"
            placeholder="Business Description"
            class="size-lg"
          ></textarea>
          <InputFieldError :message="form.errors.business?.description" />
        </div>
        <div class="row dash-input-wrapper mb-2">
          <div class="col-6">
            <label for="">{{ trans('Business/ Trade License No') }}</label>
            <input
              placeholder="Business/ Trade License No"
              type="text"
              v-model="form.business.license_no"
            />
            <InputFieldError :message="form.errors.business?.license_no" />
          </div>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans('RL No (Only for Recruiting Agency)') }}</label>
            <div class="input-group">
              <input placeholder="Enter Number Only" type="number" v-model="form.business.rl_no" />
              <InputFieldError :message="form.errors.business?.rl_no" />
            </div>
          </div>
        </div>
        <div class="dash-input-wrapper mb-2">
          <label for="">{{ trans('Website URL') }}</label>
          <input
            placeholder="Website URL"
            type="url"
            v-model="form.business.site_url"
            class="form-control"
          />
          <InputFieldError :message="form.errors.business?.site_url" />
        </div>

        <div class="row mb-2 mt-4">
          <h4 class="dash-title-three mb-2">{{ trans('Contact') }}</h4>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans("Contact Person's Name") }}*</label>
            <input
              required
              placeholder="Contact Person's Name"
              type="text"
              v-model="form.contact.name"
              class="form-control"
            />
            <InputFieldError :message="form.errors.contact?.name" />
          </div>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans("Contact Person's Designation") }}*</label>
            <input
              required
              placeholder="Contact Person's Designation"
              type="text"
              v-model="form.contact.designation"
              class="form-control"
            />
            <InputFieldError :message="form.errors.contact?.designation" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-6 dash-input-wrapper">
            <label for=""> {{ trans("Contact Person's Email") }} *</label>
            <input
              required
              placeholder="Contact Person's Email"
              type="email"
              v-model="form.contact.email"
              class="form-control"
            />
            <InputFieldError :message="form.errors.contact?.email" />
          </div>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans("Contact Person's Mobile") }}</label>
            <input
              placeholder="Contact Person's Mobile"
              type="text"
              v-model="form.contact.mobile"
              class="form-control"
            />
            <InputFieldError :message="form.errors.contact?.mobile" />
          </div>
        </div>

        <div class="row mb-2 mt-4">
          <h4 class="dash-title-three mb-2">{{ trans('Socials Media Account Links') }}</h4>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans('Linkedin') }}</label>
            <input
              placeholder="linkedin"
              type="url"
              v-model="form.social.linkedin"
              class="form-control"
            />
            <InputFieldError :message="form.errors.social?.linkedin" />
          </div>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans('Twitter') }}</label>
            <input
              placeholder="Twitter"
              type="url"
              v-model="form.social.twitter"
              class="form-control"
            />
            <InputFieldError :message="form.errors.social?.twitter" />
          </div>
        </div>
        <div class="row dash-input-wrapper mb-2">
          <div class="col-6">
            <label for="">{{ trans('Facebook') }}</label>
            <input
              placeholder="facebook"
              type="url"
              v-model="form.social.facebook"
              class="form-control"
            />
            <InputFieldError :message="form.errors.social?.facebook" />
          </div>
          <div class="col-6 dash-input-wrapper">
            <label for="">{{ trans('Instagram') }}</label>
            <input
              placeholder="facebook"
              type="url"
              v-model="form.social.instagram"
              class="form-control"
            />
            <InputFieldError :message="form.errors.social?.instagram" />
          </div>
        </div>
        <div class="form-check">
          <input
            required
            class="form-check-input"
            v-model="form.terms"
            type="checkbox"
            id="Policy"
          />
          <label class="form-check-label" for="Policy">
            {{ trans('I Have Read') }}
            <a class="underline" href="/page/privacy-policy">
              <u>{{ trans('Privacy Policy') }}</u>
            </a>
            {{ trans(' And Accepted It.') }}
          </label>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-40 gap-3">
        <button @click="prevStep" v-if="step == 2" class="btn-one btn btn-success">
          {{ trans('Prev') }}
        </button>
        <SpinnerBtn
          v-if="step == 2"
          classes="btn-one d-flex align-items-center"
          :processing="form.processing"
          btn-text="Submit"
        />
        <SpinnerBtn
          classes="btn-one d-flex align-items-center"
          v-else
          @click="nextStep"
          :processing="form.processing"
          btn-text="Next"
        />
      </div>
    </form>
  </div>

  <!-- Modal -->
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
              {{ createdDescription(templates.body) }}
              <button
                type="button"
                @click="() => (form.business.description = createdDescription(templates.body))"
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
