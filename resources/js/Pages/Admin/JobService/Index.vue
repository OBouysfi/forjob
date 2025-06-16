<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm, router } from '@inertiajs/vue3'
import Paginate from '@/Components/Paginate.vue'
import { ref } from 'vue'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted, computed } from 'vue'
import notify from '@/Plugins/Admin/notify'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps([
  'categories',
  'totalCategories',
  'activeCategories',
  'inActiveCategories',
  'languages',
  'buttons',
  'segments'
])
const serviceStats = computed(() => {
  return [
    {
      value: props.totalCategories,
      title: trans('Total Services'),
      iconClass: 'bx bx-badge'
    },
    {
      value: props.activeCategories,
      title: trans('Active Services'),
      iconClass: 'bx bx-badge-check'
    },
    {
      value: props.inActiveCategories,
      title: trans('Inactive Services'),
      iconClass: 'bx bx-x-circle'
    }
  ]
})

const serviceForm = useForm({
  title: '',
  status: 1,
  icon: null,
  preview: null,
  is_menu_item: 0,
  is_featured: 0
})

const editForm = ref({})

const storeService = () => {
  serviceForm.post(route('admin.job-service.store'), {
    onSuccess: () => {
      serviceForm.reset()
      notify.success(trans('Service has been added successfully'))
      drawer.of('#addNewCategoryDrawer').hide()
    }
  })
}

const openEditServiceDrawer = (category) => {
  editForm.value = { ...category }
  drawer.of('#editCategoryDrawer').show()
}

const updateService = () => {
  if (!(editForm.value.preview instanceof File)) {
    editForm.value.preview = null
  }
  router.post(
    route('admin.job-service.update', editForm.value.id),
    {
      _method: 'PATCH',
      service: editForm.value
    },
    {
      onSuccess: () => {
        editForm.value = {}
        notify.success(trans('Service has been updated successfully'))
        drawer.of('#editCategoryDrawer').hide()
      }
    }
  )
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Services" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="serviceStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Name') }}</th>
              <th>{{ trans('Slug') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Featured') }}</th>
              <th>{{ trans('Menu Status') }}</th>
              <th>
                <p class="text-end">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>

          <tbody v-if="categories.total">
            <tr v-for="category in categories.data" :key="category.id">
              <td class="text-left">
                <img class="mr-1 inline w-12 rounded-full" :src="category.preview" alt="preview" />
                {{ category.title }}
              </td>
              <td class="text-left">
                {{ category.slug }}
              </td>

              <td class="text-left">
                <span
                  class="badge"
                  :class="category.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ category.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td class="text-left">
                <span
                  class="badge"
                  :class="category.is_featured == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ category.is_featured == 1 ? trans('Featured') : trans('Not Featured') }}
                </span>
              </td>
              <td class="text-right">
                <span
                  class="badge"
                  :class="category.is_menu_item == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ category.is_menu_item == 1 ? trans('Enabled') : trans('Disabled') }}
                </span>
              </td>
              <td class="">
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <button @click="openEditServiceDrawer(category)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          as="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.job-service.destroy', category.id))"
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
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Paginate :links="categories.links" />
    </div>
  </main>

  <div id="addNewCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeService()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Service') }}</h5>
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
          <label class="label mb-2">{{ trans('Title') }}</label>
          <input v-model="serviceForm.title" type="text" name="title" class="input" required />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Icon') }}</label>
          <input
            @input="(e) => (serviceForm.icon = e.target.files[0])"
            type="file"
            name="icon"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Preview') }}</label>
          <input
            @input="(e) => (serviceForm.preview = e.target.files[0])"
            type="file"
            name="preview"
            class="input"
            required
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Status') }}</label>
          <select required v-model="serviceForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Is Featured') }}</label>
          <select required v-model="serviceForm.is_featured" class="select" name="IsFeatured">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Add to menu') }}</label>
          <select required v-model="serviceForm.is_menu_item" class="select" name="IsFeatured">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary w-full"
            :processing="serviceForm.processing"
            :btn-text="trans('Save Now')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateService()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Category') }}</h5>
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
          <label class="label mb-2">{{ trans('Title') }}</label>
          <input v-model="editForm.title" type="text" name="title" class="input" required />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Icon') }}</label>
          <input
            @input="(e) => (editForm.icon = e.target.files[0])"
            type="file"
            name="icon"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Preview') }}</label>
          <input
            @input="(e) => (editForm.preview = e.target.files[0])"
            type="file"
            name="preview"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Status') }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Is Featured') }}</label>
          <select v-model="editForm.is_featured" class="select" name="is_featured">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Add to menu') }}</label>
          <select v-model="editForm.is_menu_item" class="select" name="is_menu_item">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary w-full"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
