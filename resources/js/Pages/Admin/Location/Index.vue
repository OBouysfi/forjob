<script setup>
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { Link, useForm } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import drawer from '@/Plugins/Admin/drawer'
import trans from '@/Composables/transComposable'
import { onMounted, ref } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import AdminLayout from '@/Layouts/Admin.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
import Pagination from '@/Components/Admin/Pagination.vue'

defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps(['countries', 'buttons', 'segments'])

const form = useForm({
  name: ''
})

const editingItem = ref({})
const editForm = useForm({
  name: ''
})

const storeLocation = () => {
  form.post(route('admin.countries.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Country has been added successfully'))
      drawer.of('#addNewLocationDrawer').hide()
    }
  })
}

const setEditDrawerForm = country => {
  editingItem.value = country
  editForm.name = country.name
}

const updateLocation = () => {
  let updateRoute = route('admin.countries.update', editingItem.value)
  editForm.put(updateRoute, {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Country has been updated successfully'))
      drawer.of('#editLocationDrawer').hide()
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Locations" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="w-3/12">{{ trans('Country Name') }}</th>
              <th>{{ trans('States') }}</th>
              <th>
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody v-if="countries.total">
            <tr v-for="(country, key) in countries.data" :key="key">
              <td>
                {{ country.name }}
              </td>
              <td>
                {{ country.children_location_count }}
              </td>
              <td class="flex justify-end">
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="w-40 dropdown-content">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.countries.show', country)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="external-link"></i>
                          <span>States</span>
                        </Link>
                      </li>
                      <li class="dropdown-list-item">
                        <button
                          data-toggle="drawer"
                          data-target="#editLocationDrawer"
                          @click="setEditDrawerForm(country)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>
                      <li class="dropdown-list-item">
                        <button
                          @click="deleteRow(route('admin.countries.destroy', country))"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"></i>
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
        <Pagination :links="countries.links" />
      </div>
    </div>
  </main>

  <div id="addNewLocationDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeLocation()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Country') }}</h5>
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
          <label>{{ trans('Country Name') }}</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="input"
            required
            placeholder="America"
          />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
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

  <div id="editLocationDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateLocation()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Country') }}</h5>
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
          <label>{{ trans('Country Name') }}</label>
          <input
            v-model="editForm.name"
            type="text"
            name="name"
            class="input"
            required
            placeholder="America"
          />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex gap-1">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="editForm.processing"
            :btn-text="trans('Update')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
