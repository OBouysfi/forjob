
<script setup>
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import drawer from '@/Plugins/Admin/drawer'
import trans from '@/Composables/transComposable'
import { onMounted, ref } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'

import AdminLayout from '@/Layouts/Admin.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
import Pagination from '@/Components/Admin/Pagination.vue'
import { onUpdated } from 'vue'

defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})
onUpdated(() => {
  drawer.init()
})

const props = defineProps(['country', 'states', 'buttons', 'segments'])

const form = useForm({
  country_id: props.country.id,
  name: ''
})

const storeState = () => {
  form.post(route('admin.states.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('State has been added successfully'))
      drawer.of('#addNewStateDrawer').hide()
    }
  })
}

const editingItem = ref({})
const editForm = useForm({
  name: ''
})

const setEditDrawerForm = state => {
  editingItem.value = state
  editForm.name = state.name
}

const updateState = () => {
  let updateRoute = route('admin.states.update', editingItem.value)
  editForm.put(updateRoute, {
    onSuccess: () => {
      form.reset()
      notify.success(trans('State has been updated successfully'))
      drawer.of('#editStateDrawer').hide()
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="States" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="w-3/12">{{ trans('State') }}</th>
              <th>{{ trans('Country') }}</th>
              <th>
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody v-if="states.total">
            <tr v-for="(state, key) in states.data" :key="key">
              <td>
                {{ state.name }}
              </td>
              <td>
                {{ country.name }}
              </td>
              <td class="flex justify-end">
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="w-40 dropdown-content">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <button
                          data-toggle="drawer"
                          data-target="#editStateDrawer"
                          @click="setEditDrawerForm(state)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>
                      <li class="dropdown-list-item">
                        <button
                          @click="deleteRow(route('admin.states.destroy', state))"
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
        <Pagination :links="states.links" />
      </div>
    </div>
  </main>

  <div id="addNewStateDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeState()">
      <div class="drawer-header">
        <h5>{{ trans('Add New State') }}</h5>
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
          <label>{{ trans('State Name') }}</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="input"
            required
            placeholder="London"
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
            :processing="form.processing"
            :btn-text="trans('Create')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editStateDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateState()">
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
          <label>{{ trans('State Name') }}</label>
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

