<script setup>
import { Head, router, useForm } from '@inertiajs/vue3'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import sharedComposable from '@/Composables/sharedComposable'
import UserLayout from '@/Layouts/User.vue'
import Multiselect from '@vueform/multiselect'
import ckeEditor from '@/Plugins/ckeEditor'
import InputFieldError from '@/Components/InputFieldError.vue'
import axios from 'axios'
import notify from '@/Plugins/Admin/notify'
import { ref, computed } from 'vue'

defineOptions({ layout: UserLayout })
const props = defineProps(['template', 'credits', 'credit_fee', 'gateways', 'languages'])
const { cke, ClassicEditor } = ckeEditor()
const { textExcerpt, pickBy, formatCurrency, authUser, copyToClipboard } = sharedComposable()
const activeGateway = ref(props.gateways[0]?.id || 0)
const credits = ref(null)
const conversionRate = ref(props.credit_fee)
const convertedAmount = computed(() => {
  return credits.value / conversionRate.value
})

const generatedResponse = ref('')
const documentName = ref('')
const fieldErrors = ref({})
const errors = ref({})
const hasError = ref(false)
const isProcessing = ref(false)
const manualPayment = ref({
  image: null,
  comment: ''
})
const form = useForm({
  prompt: '',
  language: '',
  tone: '',
  length: 200,
  result: 1,
  creativity: '',
  template: '',
  model: props.template.ai_model,
  template_id: props.template.id,
  fields: props.template.fields
})
const findGateway = computed(() => {
  return props.gateways.find((gateway) => gateway.id === activeGateway.value)
})
const tones = ['Professional', 'Funny', 'Casual', 'Excited', 'Bold', 'Dramatic']
const creativityLevels = [
  {
    label: 'Optimal',
    value: 0.5
  },
  {
    label: 'Low',
    value: 0.8
  },
  {
    label: 'Medium',
    value: 0.9
  },
  {
    label: 'High',
    value: 1
  }
]
const transformPrompt = () => {
  const fields = []
  form.fields.forEach((element) => {
    if (element.hasOwnProperty('value')) {
      fields[element.name] = element.value
      hasError.value = false
    } else {
      hasError.value = true
      fieldErrors.value[element.name] = `${element.name} is required`

      return
    }
  })
  form.prompt = props.template.prompt.replace(/\[(.*?)\]/g, (match, key) => fields[key])
}
const submit = () => {
  const maxToken = form.length
  const totalCharge = maxToken * form.result * props.credit_fee
  if (totalCharge > props.credits) {
    notify.danger('You dont have enough credits please purchase some credits')
    return
  }
  transformPrompt()
  if (hasError.value) return

  isProcessing.value = true
  axios
    .post(route('api-ai-generate', pickBy(form)))
    .then(async (res) => {
      generatedResponse.value = res.data;
     
    })
    .catch((error) => {
      errors.value = error.response.data.errors
      if (error.response.status == 400) {
        notify.danger('You dont have enough credits please purchase some credits')
      }
    })
    .finally(() => {
      isProcessing.value = false
      fieldErrors.value = []
    })
}
const pay = (gateway_id) => {
  if (findGateway.value.min_amount > convertedAmount.value) {
    notify.danger(
      'The minimum transaction amount is ' + formatCurrency(findGateway.value.min_amount)
    )
    return
  }
  if (findGateway.value.max_amount != -1) {
    if (findGateway.value.max_amount < convertedAmount.value) {
      notify.danger(
        'The maximum transaction amount is ' + formatCurrency(findGateway.value.max_amount)
      )
      return
    }
  }
  isProcessing.value = true
  router.post(
    route('credit.pay'),
    {
      gateway_id: gateway_id,
      total: convertedAmount.value,
      credits: credits.value,
      manualPayment: findGateway.value.is_auto == 0 ? manualPayment.value : null
    },
    {
      onFinish: () => {
        credits.value = 0
        isProcessing.value = false
      }
    }
  )
}
function downloadHTMLFile(textContent, name) {
  const blob = new Blob([textContent], { type: 'text/html' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name ? name.replace(' ', '-') : 'untitled.html'

  a.click()
  URL.revokeObjectURL(url)
}
const transformedLanguages = Object.keys(props.languages).map((key) => {
  return {
    id: props.languages[key].id,
    name: props.languages[key].name
  }
})
</script>

<template>
  <Head title="Ai Template | User Panel" />

  <div class="row d-flex justify-contents-start">
    <div class="col-xl-5 col-lg-6 d-flex">
      <div class="recent-job-tab w-100 rounded bg-white p-4">
        <div class="d-flex mt-20">
          <img :src="template.icon" width="50" height="50" class="rounded-circle" alt="icon" />
          <p class="fs-5 ms-2">{{ template.title }}</p>
        </div>
        <div class="row mt-30">
          <div class="col-lg-6">
            <label class="text-capitalize mb-1">{{ trans('Language') }}*</label>
            <Multiselect
              class="ai-template-multiselect"
              v-model="form.language"
              :options="transformedLanguages"
              valueProp="name"
              label="name"
              placeholder="Language"
            />
            <InputFieldError v-if="errors?.language" :message="errors?.language[0]" />
          </div>
          <div class="col-lg-6">
            <label class="text-capitalize mb-1">{{ trans('Tone') }}*</label>
            <Multiselect
              class="ai-template-multiselect"
              v-model="form.tone"
              :options="tones"
              placeholder="Tone"
            />
            <InputFieldError v-if="errors?.tone" :message="errors?.tone[0]" />
          </div>
        </div>
        <div class="mt-30">
          <div class="mb-20" v-for="(field, i) in form.fields" :key="i">
            <label class="text-capitalize mb-1">{{ field.name }}*</label>
            <input
              required
              v-if="field.type === 'input'"
              v-model="field.value"
              type="text"
              class="w-100 rounded border p-2"
              :placeholder="field.placeholder"
            />
            <textarea
              required
              v-model="field.value"
              v-if="field.type === 'textarea'"
              class="w-100 rounded border p-2"
              :placeholder="field.placeholder"
            ></textarea>
            <InputFieldError v-if="hasError" :message="fieldErrors[field.name]" />
            <InputFieldError
              v-if="!hasError && errors && errors['fields.' + i + '.value']"
              :message="errors['fields.' + i + '.value'][0]"
            />
          </div>
        </div>
        <div class="mt-30">
          <div class="d-flex justify-content-between mb-1">
            <label class="text-capitalize">{{ trans('Maximum Word Limit') }}</label>
            <label class="text-capitalize"> {{ trans('Credit') }}: {{ authUser.credits }}</label>
          </div>
          <input
            v-model.number="form.length"
            type="text"
            class="w-100 rounded border p-2"
            placeholder="Maximum Length"
          />
          <InputFieldError v-if="errors?.length" :message="errors?.length[0]" />
        </div>
        <div class="row mb-30 mt-30">
          <div class="col-lg-6">
            <label class="text-capitalize mb-1">{{ trans('Number Of Result') }}</label>
            <input
              v-model="form.result"
              type="number"
              class="w-100 rounded border p-2"
              placeholder="Number Of Result"
            />
            <InputFieldError v-if="errors?.result" :message="errors?.result[0]" />
          </div>
          <div class="col-lg-6">
            <label class="text-capitalize mb-1">{{ trans('Creativity Level') }}</label>
            <Multiselect
              class="ai-template-multiselect"
              v-model="form.creativity"
              :options="creativityLevels"
              value-by="value"
              label="label"
              placeholder="Creativity Level"
            />
            <InputFieldError v-if="errors?.creativity" :message="errors.creativity[0]" />
          </div>
        </div>
        <SpinnerBtn
          @click.prevent="submit"
          classes="w-100 d-flex justify-content-center btn-one py-3"
          :processing="isProcessing"
          btn-text="Generate Content"
        />
      </div>
    </div>
    <div class="col-xl-7 col-lg-6 d-flex flex-column">
      <div class="user-activity-chart h-100 rounded bg-white p-4">
        <div class="d-flex">
          <button class="me-1" @click="copyToClipboard(generatedResponse)">
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
          <button class="ms-1" @click="downloadHTMLFile(generatedResponse, documentName)">
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
          <cke :editor="ClassicEditor" v-model="generatedResponse" />
        </div>
      </div>
    </div>
  </div>

  <!-- creditModal Modal -->
  <div
    class="modal fade"
    id="creditModal"
    tabindex="-1"
    aria-labelledby="creditModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content p-4">
        <div class="p-2">
          <p class="fs-5 text-center" id="creditModalLabel">{{ trans('Buy Credits') }}</p>
        </div>
        <div class="modal-body px-5">
          <p class="text-center">
            {{ conversionRate }} {{ trans('Credits') }} =
            {{ formatCurrency(1) }}
          </p>

          <input
            class="w-100 rounded border p-3"
            step="5"
            type="number"
            v-model.number="credits"
            placeholder="Enter Credit amount"
          />
          <p class="fw-bold mt-2 text-left">
            {{ trans('Total:') }} {{ formatCurrency(convertedAmount || 0) }}
          </p>
          <div class="row gateways my-4 px-3">
            <template v-for="gateway in gateways" :key="gateway.id">
              <button
                class="col-sm-2 position-relative rounded"
                @click="activeGateway = gateway.id"
                :class="{ border: activeGateway == gateway.id }"
              >
                <div v-show="activeGateway == gateway.id">
                  <i
                    class="fas fa-check rounded-circle position-absolute start-100 translate-middle bg-success top-0 p-1 text-white"
                  ></i>
                </div>

                <img :src="gateway.logo" class="rounded p-1" />
              </button>
            </template>
          </div>
          <template v-for="gateway in gateways" :key="gateway.id">
            <div
              v-show="activeGateway === gateway.id"
              class="col-sm-12 gateway-form"
              :id="'gateway-form' + gateway.id"
            >
              <form
                method="post"
                @submit.prevent="submit(gateway.id)"
                enctype="multipart/form-data"
              >
                <div class="table-responsive">
                  <table class="table-borderless text-fs-sm table">
                    <template v-if="gateway.charge != 0">
                      <tr class="border">
                        <td class="border p-2">
                          {{ trans('Gateway Charge: ') }}
                        </td>
                        <td class="text-center">
                          {{ formatCurrency(gateway.charge) }}
                        </td>
                      </tr>
                    </template>
                  </table>

                  <template v-if="gateway.comment != null">
                    <table class="table-borderless mt-2 table">
                      <tr>
                        <td class="fw-500 text-fs-sm">
                          {{ trans('Payment Instruction: ') }}
                        </td>
                      </tr>

                      <tr>
                        <td class="text-fs-sm">
                          {{ gateway.comment }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-if="gateway.phone_required == 1">
                    <div class="form-group mt-2">
                      <label class="fw-500 text-fs-sm my-2">{{ trans('Your phone number') }}</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Your phone number"
                        class="form-control"
                        required
                        :value="authUser.phone"
                      />
                    </div>
                  </template>
                  <template v-if="gateway.is_auto == 0">
                    <div class="form-group mt-1">
                      <label class="fw-500 text-fs-sm my-2">{{
                        trans('Submit your payment proof')
                      }}</label>
                      <input
                        @input="
                          (e) => {
                            manualPayment.image = e.target.files[0]
                          }
                        "
                        type="file"
                        name="image"
                        class="form-control"
                        required
                        accept="image/*"
                      />
                    </div>
                    <div class="form-group">
                      <label class="fw-500 text-fs-sm my-2">{{ trans('Comment') }}</label>
                      <textarea
                        v-model="manualPayment.comment"
                        class="form-control"
                        required
                        name="comment"
                        placeholder="comment"
                        maxlength="500"
                      ></textarea>
                    </div>
                  </template>
                </div>
                <button :disabled="isProcessing" type="submit" class="btn-one w-100 mt-4">
                  {{ trans('Pay Now') }}
                </button>
              </form>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
