
<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm, router } from '@inertiajs/vue3'
import Paginate from '@/Components/Paginate.vue'
import moment from 'moment'
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
  'tags',
  'totalTags',
  'activeTags',
  'inActiveTags',
  'languages',
  'buttons',
  'segments',
  'allCategory'
])

const tagsStats = computed(() => {
  return [
    {
      value: props.totalTags,
      title: trans('Total Skills'),
      iconClass: "bx bx-badge",
    },
    {
      value: props.activeTags,
      title: trans('Active Skills'),
      iconClass: "bx bx-badge-check",
    },
    {
      value: props.inActiveTags,
      title: trans('Inactive Skills'),
      iconClass: "bx bx-x-circle",
    }
  ]
})

const tagForm = useForm({
  title: '',
  category_id: '',
  status: 1
})

const editForm = ref({})

const storeTag = () => {
  tagForm.post(route('admin.job-skills.store'), {
    onSuccess: () => {
      tagForm.reset()
      notify.success(trans('Tag has been added successfully'))
      drawer.of('#addNewCategoryDrawer').hide()
    }
  })
}

const openEditTagDrawer = (tag) => {
  editForm.value = { ...tag }
  drawer.of('#editCategoryDrawer').show()
}

const updateTag = () => {
  router.patch(route('admin.job-skills.update', editForm.value.id), editForm.value, {
    onSuccess: () => {
      editForm.value = {}
      notify.success(trans('Tag has been updated successfully'))
      drawer.of('#editCategoryDrawer').hide()
    }
  })
}
</script>


<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Job Tags" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="tagsStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('Name') }}</th>
              <th class="">{{ trans('Category Title') }}</th>
              <th class="">{{ trans('Slug') }}</th>
              <th class="">{{ trans('Status') }}</th>
              <th class="">{{ trans('Created At') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>

          <tbody v-if="tags.total">
            <tr v-for="tag in tags.data" :key="tag.id">
              <td class="text-left">
                {{ tag.title }}
              </td>
              <td class="text-left">
                {{ tag.parent?.title }}
              </td>
              <td class="text-left">
                {{ tag.slug }}
              </td>
              <td class="text-left">
                <span class="badge" :class="tag.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ tag.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ moment(tag.created_at).format('D-MMM-Y') }}
              </td>
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="w-40 dropdown-content">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <button @click="openEditTagDrawer(tag)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
                          </button>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            as="button"
                            class="dropdown-link"
                            @click="deleteRow(route('admin.job-skills.destroy', tag.id))"
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
      <Paginate :links="tags.links" />
    </div>
  </main>

  <div id="addNewCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeTag()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Skill') }}</h5>
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
          <label class="mb-2 label">{{ trans('Title') }}</label>
          <input v-model="tagForm.title" type="text" name="title" class="input" required />
        </div>
        <div class="mb-2">
          <label class="mb-2 label">{{ trans('Category') }}</label>
          <select required v-model="tagForm.category_id" class="select" name="category_id">
            <option :value="category.id" v-for="category in allCategory" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label class="mb-2 label">{{ trans('Status') }}</label>
          <select required v-model="tagForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="tagForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateTag()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Skill') }}</h5>
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
          <label class="mb-2 label">{{ trans('Title') }}</label>
          <input v-model="editForm.title" type="text" name="title" class="input" required />
        </div>
        <div class="mb-2">
          <label class="mb-2 label">{{ trans('Category') }}</label>
          <select required v-model="editForm.category_id" class="select" name="category_id">
            <option
              :selected="editForm.category_id == category.id"
              :value="category.id"
              v-for="category in allCategory"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label class="mb-2 label">{{ trans('Status') }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Deactive') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
