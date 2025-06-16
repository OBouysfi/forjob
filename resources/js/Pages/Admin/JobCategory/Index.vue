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
  'segments',
  'allServices'
])
const stats = computed(() => {
  return [
    {
      value: props.totalCategories,
      title: trans('Total Categories'),
      iconClass: 'bx bx-badge'
    },
    {
      value: props.activeCategories,
      title: trans('Active Categories'),
      iconClass: 'bx bx-badge-check'
    },
    {
      value: props.inActiveCategories,
      title: trans('Inactive Categories'),
      iconClass: 'bx bx-x-circle'
    }
  ]
})

const categoryForm = useForm({
  title: '',
  category_id: '',
  status: 1,
  is_menu_item: 0,
  icon: null,
  preview: null,
  is_featured: 0
})

const editForm = ref({})

const storeCategory = () => {
  categoryForm.post(route('admin.job-category.store'), {
    onSuccess: () => {
      categoryForm.reset()
      notify.success(trans('Category has been added successfully'))
      drawer.of('#addNewCategoryDrawer').hide()
    }
  })
}

const openEditCategoryDrawer = (category) => {
  editForm.value = { ...category }
  drawer.of('#editCategoryDrawer').show()
}

const updateCategory = () => {
  if (!(editForm.value.preview instanceof File)) {
    editForm.value.preview = null
  }
  router.post(
    route('admin.job-category.update', editForm.value.id),
    {
      _method: 'PATCH',
      category: editForm.value
    },
    {
      onSuccess: () => {
        editForm.value = {}
        notify.success(trans('Category has been updated successfully'))
        drawer.of('#editCategoryDrawer').hide()
      }
    }
  )
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Job Categories" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('Name') }}</th>
              <th class="">{{ trans('Service Title') }}</th>
              <th class="">{{ trans('Slug') }}</th>
              <th class="">{{ trans('Status') }}</th>
              <th class="">{{ trans('Featured') }}</th>
              <th class="">{{ trans('Menu Status') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>

          <tbody v-if="categories.total > 0">
            <tr v-for="category in categories.data" :key="category.id">
              <td class="text-left">
                <img class="mr-1 inline w-12 rounded-full" :src="category.preview" alt="preview" />
                {{ category.title }}
              </td>
              <td class="text-left">
                {{ category.parent?.title }}
              </td>
              <td class="text-left">
                {{ category.slug }}
              </td>

              <td class="text-left">
                <span
                  class="badge"
                  :class="category.status == 1 ? 'badge-primary' : 'badge-danger'"
                >
                  {{ category.status == 1 ? trans('Active') : trans('Inactive') }}
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
              
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="dropdown-content w-40">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <button @click="openEditCategoryDrawer(category)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
                          </button>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            as="button"
                            class="dropdown-link"
                            @click="deleteRow(route('admin.job-category.destroy', category.id))"
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
    <form @submit.prevent="storeCategory()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Category') }}</h5>
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
          <input v-model="categoryForm.title" type="text" class="input" required />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Icon') }}</label>
          <input
            @input="(e) => (categoryForm.icon = e.target.files[0])"
            type="file"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Preview') }}</label>
          <input
            @input="(e) => (categoryForm.preview = e.target.files[0])"
            type="file"
            class="input"
            required
          />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Service') }}</label>
          <select required v-model="categoryForm.category_id" class="select" name="category_id">
            <option value="" selected disabled>SELECT SERVICE</option>
            <option :value="service.id" v-for="service in allServices" :key="service.id">
              {{ service.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Status') }}</label>
          <select required v-model="categoryForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Is Featured ?') }}</label>
          <select required v-model="categoryForm.is_featured" class="select" name="IsFeatured">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Add to menu ?') }}</label>
          <select required v-model="categoryForm.is_menu_item" class="select" name="is_menu_item">
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
            classes="btn btn-primary w-full"
            :processing="categoryForm.processing"
            :btn-text="trans('Save Now')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateCategory()">
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
          <input v-model="editForm.title" type="text" class="input" required />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Service') }}</label>
          <select required v-model="editForm.category_id" class="select">
            <option
              :selected="editForm.category_id == service.id"
              :value="service.id"
              v-for="service in allServices"
              :key="service.id"
            >
              {{ service.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Preview') }}</label>
          <input @input="(e) => (editForm.preview = e.target.files[0])" type="file" class="input" />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Status') }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Inactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Is Featured?') }}</label>
          <select v-model="editForm.is_featured" class="select" name="is_featured">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Inactive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Add to menu ?') }}</label>
          <select required v-model="editForm.is_menu_item" class="select" name="is_menu_item">
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
            classes="btn btn-primary w-full"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
