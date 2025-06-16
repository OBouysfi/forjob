<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Partners" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <OverviewGrid :items="brandsOverviews" grid="3" />

      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Image') }}</th>
                    <th>{{ trans('Url') }}</th>
                    <th>{{ trans('Type') }}</th>
                    <th>{{ trans('Status') }}</th>
                    <th>{{ trans('Created At') }}</th>
                    <th>
                      <p class="text-end">{{ trans('Action') }}</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in brands.data" :key="row.id">
                    <td class="text-left">
                      <img :src="row.slug" class="avatar rounded-square w-70-per" />
                    </td>
                    <td class="text-left">
                      {{ row.title }}
                    </td>
                    <td class="text-left">
                      {{ row.lang == 'en' ? 'Partner' : row.lang }}
                    </td>

                    <td class="text-left">
                      <span
                        class="badge"
                        :class="row.status == 1 ? 'badge-success' : 'badge-danger'"
                      >
                        {{ row.status == 1 ? trans('Active') : trans('Draft') }}
                      </span>
                    </td>
                    <td>
                      {{ moment(row.created_at).format('D-MMM-Y') }}
                    </td>

                    <td>
                      <div class="dropdown" data-placement="bottom-start">
                        <div class="dropdown-toggle">
                          <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                        </div>
                        <div class="dropdown-content w-40">
                          <ul class="dropdown-list">
                            <li class="dropdown-list-item">
                              <button @click="openEditFaqDrawer(row)" class="dropdown-link">
                                <i class="h-5 text-slate-400" data-feather="edit"></i>
                                <span>{{ trans('Edit') }}</span>
                              </button>
                            </li>

                            <li class="dropdown-list-item">
                              <button
                                class="dropdown-link"
                                @click="deleteRow(route('admin.partner.destroy', row.id))"
                              >
                                <i class="h-5 text-slate-400" data-feather="trash-2"
                                  >{{ trans('Remove') }}></i
                                >
                                <span>{{ trans('Delete') }}</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Alert
                v-if="brands.total == 0"
                type="info"
                :text="trans('Opps you have not created any plan....')"
              />
            </div>
            <Paginate :links="brands.links" />
          </div>
        </div>
      </div>
    </div>
  </main>

  <div id="addNewPartnerDrawer" class="drawer drawer-right">
    <form @submit.prevent="storePartner()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Partner') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans('Brand Url') }}</label>
          <input type="text" name="url" v-model="form.url" class="input" />
        </div>
        <div class="mb-2">
          <label>{{ trans('Brand image') }}</label>
          <input
            @input="(e) => (form.image = e.target.files[0])"
            type="file"
            accept="image/*"
            name="image"
            required
            class="input"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Type') }}</label>
          <select class="select" name="type" v-model="form.type">
            <option value="partner">{{ trans('Partner / Brand') }}</option>
            <option value="integration">
              {{ trans('Integration Partner') }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Status') }}</label>
          <select class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="form.processing"
            :btn-text="trans('Create')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editPartnerDrawer" class="drawer drawer-right">
    <form @submit.prevent="updatePartner()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Partner') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans('Brand Url') }}</label>
          <input type="text" name="url" v-model="editPartnerForm.title" class="input" id="url" />
        </div>
        <div class="mb-2">
          <label>{{ trans('Brand image') }}</label>
          <input
            @input="(e) => (editPartnerForm.slug = e.target.files[0])"
            type="file"
            name="image"
            accept="image/*"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Type') }}</label>
          <select class="select" name="type" v-model="editPartnerForm.lang" id="type" required>
            <option value="partner">{{ trans('Partner / Brand') }}</option>
            <option value="integration">
              {{ trans('Integration Partner') }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Status') }}</label>
          <select v-model="editPartnerForm.status" class="select" name="status" id="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="isProcessing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { Link, useForm, router } from '@inertiajs/vue3'
import Paginate from '@/Components/Paginate.vue'
import moment from 'moment'
import { ref } from 'vue'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
import OverviewGrid from '@/Components/Admin/OverviewGrid.vue'
import Alert from '@/Components/Admin/Alert.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import { onMounted } from 'vue'
import drawer from '@/Plugins/Admin/drawer'

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps([
  'brands',
  'totalBrands',
  'activeBrands',
  'inActiveBrands',
  'buttons',
  'segments'
])

const brandsOverviews = [
  {
    value: props.totalBrands,
    title: trans('Total Partners'),
    iconClass: 'bx bx-bar-chart'
  },
  {
    value: props.activeBrands,
    title: trans('Active Partners'),
    iconClass: 'bx bx-check-circle'
  },
  {
    value: props.inActiveBrands,
    title: trans('Inactive Partners'),
    iconClass: 'bx bx-x-circle'
  }
]

const form = useForm({
  url: '',
  status: '1',
  type: 'partner',
  image: ''
})

const isProcessing = ref(false)
const editPartnerForm = ref({})

const storePartner = () => {
  form.post(route('admin.partner.store'), {
    onSuccess: () => {
      form.reset()
      drawer.of('#addNewPartnerDrawer').hide()
      notify.success(trans('Partner has been created successfully'))
    }
  })
}

function openEditFaqDrawer(partner) {
  editPartnerForm.value = { ...partner }
  drawer.of('#editPartnerDrawer').show()
}

const updatePartner = () => {
  if (!(editPartnerForm.value.slug instanceof File)) {
    editPartnerForm.value.slug = null
  }
  isProcessing.value = true
  router.post(
    route('admin.partner.update', editPartnerForm.value.id),
    {
      _method: 'patch',
      partner: editPartnerForm.value
    },
    {
      onSuccess: () => {
        editPartnerForm.value = {}
        isProcessing.value = false
        drawer.of('#editPartnerDrawer').hide()
        notify.success(trans('Partner has been updated successfully'))
      }
    }
  )
}
</script>
