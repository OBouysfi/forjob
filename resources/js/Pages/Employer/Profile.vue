<script setup>
import InputFieldError from '@/Components/InputFieldError.vue'
import EmployerLayout from '@/Layouts/Employer.vue'
import notify from '@/Plugins/Admin/notify'
import { Head, router, useForm } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import axios from 'axios'
import { ref, computed } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import trans from '@/Composables/transComposable'
import { modal } from '@/Composables/modalComposable'
import sharedComposable from '@/Composables/sharedComposable'
defineOptions({ layout: EmployerLayout })

const { authUser } = sharedComposable()
const props = defineProps(['user', 'service', 'countries', 'states', 'categories', 'shortcodes'])
const categories = ref(props.categories)
const states = ref(props.states)
const descriptionTemplates = ref([])
const companyShortcodes = ref({})
const form = useForm({
  ...props.user,
  country_id: props.user?.countries[0]?.id,
  state_id: props.user?.states[0]?.id,
  tag_id: props.user.categories.map((c) => c.id) // category id
})
const shortCodesForm = computed(() => {
  return {
    company_name: form.meta?.company?.name,
    company_size: form.meta?.company?.size,
    year_of_establishment: form?.meta.company?.year_of_establishment,
    company_address: form.meta?.company?.address,
    company_intro: form.meta?.company?.intro
  }
})
const getState = () => {
  axios.get(route('api.locations', { country_id: form.country_id })).then((res) => {
    states.value = res.data
  })
}
const getCategories = () => {
  axios.get(route('api.categories', { service_id: form.category_id })).then((res) => {
    categories.value = res.data
  })
  getDescriptionTemplates()
}

const submit = () => {
  form.meta.company.name = authUser.value.name
  form.patch(route('employer.profile.update', props.user.id), {
    onSuccess: () => {
      notify.success('Updated Successfully')
    }
  })
}
const updateAvatar = (e) => {
  form.avatar = e.target.files[0]
  form
    .transform((data) => {
      return { _method: 'PATCH', avatar: data.avatar }
    })
    .post(route('employer.profile.update', props.user.id), {
      onSuccess: () => {
        notify.success('Updated Successfully')
      }
    })
}

// video intro
let videoIntroForm = useForm({
  submit_type: 'video_intro',
  video_intro: ''
})

const uploadVideoIntro = () => {
  videoIntroForm.post(route('employer.video_intro.store'), {
    onSuccess: () => {
      videoIntroForm.reset()
      $('#addVideoIntro .btn-close').trigger('click')
    },
    onError: (err) => {
      notify.danger(trans('Something went wrong'))
    }
  })
}

const removeVideoIntro = () => {
  let actionUrl = route('employer.video_intro.destroy')

  modal.init(actionUrl, {
    callback: () => {
      router.delete(actionUrl, {
        data: {
          submit_type: 'video_intro'
        },
        onSuccess: () => {
          notify.danger(trans('Video Intro Removed'))
        }
      })
    }
  })
}
const getDescriptionTemplates = () => {
  companyShortcodes.value = props.shortcodes.reduce((acc, key) => {
    if (key in shortCodesForm.value) {
      acc[key] = shortCodesForm.value[key]
    }
    return acc
  }, {})
  axios
    .get(route('api-description-templates', { service: form.category_id, type: 'company' }))
    .then((res) => {
      descriptionTemplates.value = res.data
    })
}
const createdDescription = (template) => {
  return template.replace(/\[(.*?)\]/g, (match, key) => companyShortcodes.value[key])
}
</script>

<template>
  <Head :title="trans('Profile')" />

  <h2 class="main-title">{{ trans('Profile') }}</h2>

  <div class="bg-white card-box border-20">
    <div class="user-avatar-setting mb-30">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <img
            v-lazy="
              user.avatar == null
                ? `https://ui-avatars.com/api/?name=${user.name}`
                : `${user.avatar}`
            "
            alt=""
            class="lazy-img user-img"
          />
          <div class="upload-btn position-relative tran3s me-3 ms-4">
            {{ trans('Upload new photo') }}
            <input
              type="file"
              @input="updateAvatar"
              id="uploadImg"
              name="uploadImg"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>

    <!-- /.user-avatar-setting -->
    <div class="dash-input-wrapper mb-30">
      <label for="">{{ trans('Company Name') }}*</label>
      <input type="text" placeholder="John Smith" readonly disabled :value="authUser.name" />
      <InputFieldError :message="form.errors.meta?.company?.name" />
    </div>

    <!-- /.dash-input-wrapper -->
    <div class="row">
      <div class="col-md-4">
        <div class="dash-input-wrapper mb-30">
          <label for="">{{ trans('License No') }}</label>
          <input type="text" placeholder="License No" v-model="form.meta.business.license_no" />
          <InputFieldError :message="form.errors.meta?.business?.license_no" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-4">
        <div class="dash-input-wrapper mb-30">
          <label for="">{{ trans('RL No (Only for Recruiting Agency)') }}</label>
          <input type="number" placeholder="License No" v-model="form.meta.business.rl_no" />
          <InputFieldError :message="form.errors.meta?.business?.rl_no" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-4">
        <div class="dash-input-wrapper mb-30">
          <label for="">{{ trans('Website') }}</label>
          <input
            type="text"
            placeholder="http://somename.come"
            v-model="form.meta.business.site_url"
          />
          <InputFieldError :message="form.errors.meta?.business?.site_url" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-4">
        <div class="dash-input-wrapper mb-30">
          <label for="">{{ trans('Founded Date') }}*</label>
          <input type="date" v-model="form.meta.company.year_of_establishment" />
          <InputFieldError :message="form.errors.meta?.company?.year_of_establishment" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-4">
        <div class="dash-input-wrapper mb-30">
          <label for="">{{ trans('Intro') }}</label>
          <input type="text" placeholder="Intro" v-model="form.meta.company.intro" />
          <InputFieldError :message="form.errors.meta?.company?.intro" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-4">
        <div class="mb-30">
          <label for="" class="c-input-label">{{ trans('Company Size') }}*</label>
          <Multiselect
            v-model="form.meta.company.size"
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
          />
          <InputFieldError :message="form.errors.meta?.company?.size" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>

      <div class="col-md-6">
        <label for="" class="c-input-label">{{ trans('Service') }}*</label>
        <div class="mb-30">
          <Multiselect
            @deselect="categories = []"
            @clear="
              () => {
                form.tag_id = []
                categories = []
              }
            "
            @change="form.tag_id = []"
            @select="getCategories"
            v-model="form.category_id"
            :options="service"
            label="title"
            valueProp="id"
            placeholder="Select Service"
            :required="true"
          />
          <InputFieldError :message="form.errors.category_id" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
      <div class="col-md-6">
        <label for="" class="c-input-label">{{ trans('Category') }}*</label>
        <div class="mb-30">
          <Multiselect
            mode="tags"
            v-model="form.tag_id"
            :options="categories"
            label="title"
            valueProp="id"
            placeholder="Select Category"
            :required="true"
          />
          <InputFieldError :message="form.errors.category_id" />
        </div>
        <!-- /.dash-input-wrapper -->
      </div>
    </div>

    <div class="dash-input-wrapper">
      <div class="d-flex justify-content-between align-items-center">
        <label for="">{{ trans('About Company') }}*</label>
        <button
          v-if="descriptionTemplates.length"
          class="mb-3 btn-one"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#suggestionModal"
        >
          {{ trans('Suggestions') }}
        </button>
      </div>
      <textarea
        v-model="form.meta.business.description"
        class="size-lg"
        placeholder="Write something interesting about you...."
      ></textarea>
      <div class="alert-text">
        {{ trans('Brief description for your company. URLs are hyperlinked') }}.
      </div>
      <InputFieldError :message="form.errors.meta?.business?.description" />
    </div>

    <div class="row">
      <div
        class="col-sm-12 d-flex"
        :class="[user.meta?.company?.video_id ? 'col-lg-6' : 'col-lg-12']"
      >
        <div
          v-if="user.meta?.company?.video_id"
          class="mt-20 intro-video-post position-relative"
          :style="{
            backgroundImage: `url(https://img.youtube.com/vi/${user.meta?.company?.video_id}/sddefault.jpg)`
          }"
        >
          <a
            class="text-center fancybox rounded-circle video-icon tran3s"
            data-fancybox=""
            :href="`https://www.youtube.com/embed/${user.meta?.company?.video_id}`"
          >
            <i class="bi bi-play"></i>
          </a>
          <button type="button" @click="removeVideoIntro" class="close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <!-- /.intro-video-post -->
      </div>
      <div
        class="col-sm-6 d-flex"
        :class="[user.meta?.company?.video_id ? 'col-lg-6' : 'col-lg-12']"
      >
        <div class="mt-20 intro-video-post position-relative empty">
          <button class="w-100 h-100" data-bs-toggle="modal" data-bs-target="#addVideoIntro">
            <span>{{
              trans(`${user.meta?.company?.video_id ? 'Replace' : '+ Add'} Intro Video`)
            }}</span>
          </button>
        </div>
        <!-- /.intro-video-post -->
      </div>
    </div>

    <!-- /.dash-input-wrapper -->
  </div>
  <form @submit.prevent="submit" enctype="multipart/form-data">
    <!-- contact -->
    <div class="mt-40 bg-white card-box border-20">
      <h4 class="dash-title-three">{{ trans('Contacts') }}</h4>
      <div class="row">
        <div class="dash-input-wrapper mb-30 col-md-6">
          <label for="">{{ trans('Name') }}*</label>
          <input
            required
            type="text"
            placeholder="companyinc@gmail.com"
            v-model="form.meta.contact.name"
          />
          <InputFieldError :message="form.errors.meta?.contact?.name" />
        </div>
        <div class="dash-input-wrapper mb-30 col-md-6">
          <label for="">{{ trans('Mobile') }}</label>
          <input
            type="text"
            placeholder="companyinc@gmail.com"
            v-model="form.meta.contact.mobile"
          />
          <InputFieldError :message="form.errors.meta?.contact?.mobile" />
        </div>
        <div class="dash-input-wrapper mb-30 col-md-6">
          <label for="">{{ trans('Email') }}*</label>
          <input
            required
            type="email"
            placeholder="companyinc@gmail.com"
            v-model="form.meta.contact.email"
          />
          <InputFieldError :message="form.errors.meta?.contact?.email" />
        </div>
        <div class="dash-input-wrapper mb-30 col-md-6">
          <label for="">{{ trans('Designation') }}*</label>
          <input
            type="text"
            placeholder="companyinc@gmail.com"
            v-model="form.meta.contact.designation"
          />
          <InputFieldError :message="form.errors.meta?.contact?.designation" />
        </div>
      </div>
    </div>
    <!-- /.card-box -->
    <div class="mt-40 bg-white card-box border-20">
      <h4 class="dash-title-three">{{ trans('Social Media') }}</h4>
      <div class="row">
        <template v-for="(social, key) in form.meta.social" :key="key">
          <div class="mb-20 dash-input-wrapper col-md-6">
            <label for="">{{ key }}</label>
            <input
              type="text"
              :placeholder="`https://www.${key}.com/123`"
              v-model="form.meta.social[key]"
            />

            <InputFieldError :message="form.errors.meta?.social[key]" />
          </div>
        </template>
      </div>
    </div>

    <!-- /.card-box -->

    <div class="mt-40 bg-white card-box border-20">
      <h4 class="dash-title-three">{{ trans('Address & Location') }}</h4>
      <div class="row">
        <div class="col-12">
          <div class="dash-input-wrapper mb-25">
            <label for="">{{ trans('Address') }}*</label>
            <input
              type="text"
              placeholder="Cowrasta, Chandana, Gazipur Sadar"
              v-model="form.meta.company.address"
            />
            <InputFieldError :message="form.errors.meta?.company?.address" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-lg-6">
          <label class="mb-1 c-input-label" for="">{{ trans('Country') }}*</label>
          <Multiselect
            @deselect="states = []"
            @clear="
              () => {
                form.state_id = ''
                states = []
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
        <div class="col-lg-6">
          <label class="mb-1 c-input-label" for="">{{ trans('City') }}*</label>

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
    </div>

    <div class="button-group d-inline-flex align-items-center mt-30">
      <SpinnerBtn :processing="form.processing" btn-text="Update" />
    </div>
  </form>

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
              {{ trans('Video intro') }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-1 dash-input-wrapper">
              <label for="">{{ trans('Youtube video link') }}</label>
              <input
                type="text"
                v-model="videoIntroForm.video_intro"
                placeholder="enter youtube video link"
              />
              <InputFieldError :message="videoIntroForm.errors.video_intro" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="py-2 btn btn-eight" data-bs-dismiss="modal">
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
        <div class="p-3 d-flex align-items-center justify-content-between">
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
              class="p-2 mb-4 rounded shadow-sm d-flex align-items-center justify-content-between fs-7"
              v-for="templates in descriptionTemplates"
              :key="templates.id"
            >
              {{ createdDescription(templates.body) }}
              <button
                type="button"
                @click="
                  () => {
                    form.meta.business.description = createdDescription(templates.body)
                  }
                "
                class="p-2 btn-four ms-3"
                data-bs-dismiss="modal"
              >
                {{ trans('Select') }}
              </button>
            </li>
          </ul>
          <p v-else class="text-center text-danger">
            {{ trans("Opp's! Nothing Found") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
