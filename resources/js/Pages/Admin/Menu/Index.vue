<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment :title="trans('Menu')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="menuStats" grid="3" />
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="col-2">{{ trans('Menu Name') }}</th>
              <th class="col-2">{{ trans('Position') }}</th>
              <th class="col-2 text-center">{{ trans('Language') }}</th>
              <th class="col-2">{{ trans('Status') }}</th>
              <th class="col-2">{{ trans('Last Update') }}</th>
              <th class="col-2">
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="menu in menus" :key="menu.id">
              <td class="text-left">
                <Link :href="route('admin.menu.show', menu.id)">{{ menu.name }}</Link>
              </td>
              <td class="text-left">
                {{ menu.position }}
              </td>
              <td class="text-center">
                {{ menu.lang }}
              </td>
              <td class="text-left">
                <span class="badge" :class="menu.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ menu.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ menu.created_at_diff }}
              </td>
              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.menu.show', menu.id)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="list"></i>
                          <span>{{ trans('Manage') }}</span>
                        </Link>
                      </li>
                      <li class="dropdown-list-item">
                        <button @click="openEditFaqDrawer(menu)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          class="dropdown-link"
                          @click="deleteRow(route('admin.menu.destroy', menu.id))"
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
      </div>
    </div>
  </main>

  <div id="addNewMenuDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeMenu()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Menu') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div>
          <label class="label label-required mb-1">{{ trans('Menu Name') }}</label>
          <input
            type="text"
            v-model="form.name"
            name="name"
            class="input"
            required
            placeholder="Example"
          />
        </div>
        <div>
          <label class="label label-required mb-1">{{ trans('Select Menu Position') }}</label>
          <select class="input" name="position" v-model="form.position">
            <option value="main-menu">{{ trans('Main Menu') }}</option>
            <option value="footer-left">
              {{ trans('Footer Left') }}
            </option>
            <option value="footer-right">
              {{ trans('Footer right') }}
            </option>
            <option value="footer-center">
              {{ trans('Footer Center') }}
            </option>
          </select>
        </div>
        <div>
          <label class="label label-required mb-1">{{ trans('Select Language') }}</label>
          <select class="input" name="language" v-model="form.language">
            <option
              v-for="(language, languageKey) in languages"
              :key="language.id"
              :value="languageKey"
            >
              {{ language }}
            </option>
          </select>
        </div>
        <div>
          <label class="label label-required mb-1">{{ trans('Menu Status') }}</label>
          <select class="input" name="status" v-model="form.status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Draft') }}</option>
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

  <div id="editMenuDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateMenu()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Menu') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div>
          <label class="label label-required">{{ trans('Menu Name') }}</label>
          <input
            v-model="edit.name"
            type="text"
            name="name"
            class="input"
            required
            placeholder="Name"
          />
        </div>
        <div>
          <label class="label label-required">{{ trans('Select Menu Position') }}</label>
          <select class="input" name="position" v-model="edit.position">
            <option value="main-menu">{{ trans('Main Menu') }}</option>
            <option value="footer-left">
              {{ trans('Footer Left') }}
            </option>
            <option value="footer-right">
              {{ trans('Footer right') }}
            </option>
            <option value="footer-center">
              {{ trans('Footer Center') }}
            </option>
          </select>
        </div>
        <div>
          <label class="label label-required">{{ trans('Select Language') }}</label>
          <select name="language" class="input" v-model="edit.language" required>
            <option
              v-for="(language, languageKey) in languages"
              :key="language.id"
              :value="languageKey"
            >
              {{ language }}
            </option>
          </select>
        </div>
        <div c>
          <label class="label label-required">{{ trans('Menu Status') }}</label>
          <select class="input" name="status" v-model="edit.status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('Draft') }}</option>
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
            :processing="edit.processing"
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
import { useForm, router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
import Overview from '@/Components/Admin/OverviewGrid.vue'

import drawer from '@/Plugins/Admin/drawer'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import { onMounted } from 'vue'
defineOptions({ layout: AdminLayout })

onMounted(() => {
  drawer.init()
})

const props = defineProps([
  'menus',
  'languages',
  'totalMenus',
  'totalActiveMenus',
  'totalDraftMenus',
  'segments',
  'buttons'
])
const { deleteRow } = sharedComposable()

const form = useForm({
  name: null,
  position: null,
  language: 'en',
  status: 0
})
const menuStats = [
  {
    value: props.totalMenus,
    title: trans('Total Menus'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.totalActiveMenus,
    title: trans('Active Menus'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalDraftMenus,
    title: trans('Inactive Menus'),
    iconClass: 'ti ti-thumb-up'
  }
]
const edit = useForm({
  name: null,
  position: null,
  language: 'en',
  status: null,
  id: null
})

const openEditFaqDrawer = (menu) => {
  edit.name = menu.name
  edit.position = menu.position
  edit.language = menu.lang
  edit.status = menu.status
  edit.id = menu.id
  drawer.of('#editMenuDrawer').show()
}

function storeMenu() {
  const url = route('admin.menu.store')
  router.post(url, form, {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Menu has been added successfully'))
      drawer.of('#addNewMenuDrawer').hide()
    }
  })
}

function updateMenu() {
  const url = route('admin.menu.update', edit.id)

  router.patch(url, edit, {
    onSuccess: () => {
      notify.success(trans('Menu has been updated successfully'))
      drawer.of('#editMenuDrawer').hide()
    }
  })
}
</script>
