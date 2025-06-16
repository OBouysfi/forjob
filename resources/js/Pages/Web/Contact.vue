<script setup>
import { useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'
import InputFieldError from '@/Components/InputFieldError.vue'
import { useThemeLoaderStore } from '@/Store/themeLoaderStore'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
const themeLoader = useThemeLoaderStore()
defineOptions({ layout: DefaultLayout })
const props = defineProps(['contact', 'seo', 'recaptchaSiteKey'])
const contact = ref({ ...props.contact })

const form = useForm({
  email: '',
  name: '',
  subject: '',
  message: '',
  recaptcha: false
})

const submit = () => {
  if (props.recaptchaSiteKey && !form.recaptcha) {
    return notify.danger(trans('reCaptcha field is required'))
  }

  form.post(route('send.mail'), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success(trans('Messages has been send successfully'))
      form.reset()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  })
}

onMounted(() => {
  renderRecaptcha()
})

const renderRecaptcha = () => {
  if (props.recaptchaSiteKey) {
    grecaptcha.render('grecaptcha', {
      sitekey: props.recaptchaSiteKey,
      callback: (res) => (form.recaptcha = true)
    })
  }
}

const breadcrumbColor = computed(() => {
  const themes = ['One', 'Six']
  if (themes.includes(themeLoader.theme)) {
    return ''
  }
  return 'inner-breadcrumb-colors'
})
</script>

<template>
  <Seo :metaData="seo" />
  <div class="inner-banner-one position-relative pb-0" :class="breadcrumbColor">
    <div class="map-banner">
      <div class="gmap_canvas h-100 w-100">
        <iframe class="gmap_iframe h-100 w-100" :src="contact.map_link"></iframe>
      </div>
    </div>
    <img src="/assets/images/shape/shape_02.svg" alt="" class="lazy-img shapes shape_01" />
  </div>

  <section class="contact-us-section pt-100 lg-pt-80">
    <div class="container">
      <div class="border-bottom pb-150 lg-pb-80">
        <div class="title-one mb-70 lg-mb-40 text-center">
          <h2>{{ trans('Get in touch') }}</h2>
        </div>
        <div class="row">
          <div class="col-xl-10 m-auto">
            <div class="row">
              <div class="col-md-4">
                <div class="address-block-one wow fadeInUp mb-40 text-center">
                  <div
                    class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  >
                    <img src="/assets/images/icon/icon_57.svg" alt="" />
                  </div>
                  <h5 class="title">{{ trans('Our Address') }}</h5>
                  <p>{{ contact.address }} - {{ contact.country }}</p>
                </div>
                <!-- /.address-block-one -->
              </div>
              <div class="col-md-4">
                <div class="address-block-one wow fadeInUp mb-40 text-center">
                  <div
                    class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  >
                    <img src="/assets/images/icon/icon_58.svg" alt="" />
                  </div>
                  <h5 class="title">{{ trans('Contact Info') }}</h5>
                  <p>
                    {{ contact.contact_info_text }} <br /><a
                      :href="`tel:${contact.contact_info_number}`"
                      class="call"
                      >{{ contact.contact_info_number }}</a
                    >
                  </p>
                </div>
                <!-- /.address-block-one -->
              </div>
              <div class="col-md-4">
                <div class="address-block-one wow fadeInUp mb-40 text-center">
                  <div
                    class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  >
                    <img src="/assets/images/icon/icon_59.svg" alt="" />
                  </div>
                  <h5 class="title">{{ trans('Live Support') }}</h5>
                  <p>
                    {{ contact.live_chat_service_text }} <br /><a href="#" class="webaddress">{{
                      contact.live_chat_service_website
                    }}</a>
                  </p>
                </div>
                <!-- /.address-block-one -->
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-9 m-auto">
            <div class="form-style-one mt-85 lg-mt-50 wow fadeInUp">
              <form @submit.prevent="submit">
                <div class="messages"></div>
                <div class="row controls">
                  <div class="col-sm-6">
                    <div class="input-group-meta form-group mb-30">
                      <label for="">{{ trans('Name') }}*</label>
                      <input v-model="form.name" type="text" placeholder="Your Name*" />
                      <InputFieldError :message="form.errors.name" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="input-group-meta form-group mb-30">
                      <label for="">{{ trans('Email') }} *</label>
                      <input v-model="form.email" type="email" placeholder="Email Address*" />
                      <InputFieldError :message="form.errors.email" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-group-meta form-group mb-35">
                      <label for="">{{ trans('Subject') }} </label>
                      <input
                        v-model="form.subject"
                        type="text"
                        :placeholder="trans('Write about the subject here..')"
                      />
                      <InputFieldError :message="form.errors.subject" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-group-meta form-group mb-35">
                      <textarea v-model="form.message" placeholder="Your message*"></textarea>
                      <InputFieldError :message="form.errors.message" />
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <SpinnerBtn
                      classes="d-flex align-items-center justify-content-center btn-eleven fw-500 tran3s d-block"
                      :processing="form.processing"
                      :btn-text="trans('Send Message')"
                    >
                    </SpinnerBtn>
                  </div>
                </div>
              </form>
            </div>
            <!-- /.form-style-one -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./contact-us-section -->
</template>
