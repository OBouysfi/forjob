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

defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps(['expertLevels', 'buttons', 'segments'])

const form = useForm({
  title: ''
})

const editingItem = ref({})

const editForm = useForm({
  title: ''
})

const storeExpertLevel = () => {
  form.post(route('admin.expert-levels.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('ExpertLevel has been added successfully'))
      drawer.of('#addNewExpertLevelDrawer').hide()
    }
  })
}

const setEditDrawerForm = expertLevel => {
  editingItem.value = expertLevel
  editForm.title = expertLevel.title
  drawer.of('#editExpertLevelDrawer').show()
}

const updateExpertLevel = () => {
  let updateRoute = route('admin.expert-levels.update', editingItem.value)
  editForm.put(updateRoute, {
    onSuccess: () => {
      form.reset()
      notify.success(trans('ExpertLevel has been updated successfully'))
      drawer.of('#editExpertLevelDrawer').hide()
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Expert Level" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ trans('Title') }}</th>
              <th>
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(expertLevel, key) in expertLevels" :key="key">
              <td>
                {{ key + 1 }}
              </td>
              <td>
                {{ expertLevel.title }}
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
                         
                          @click="setEditDrawerForm(expertLevel)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>
                      <li class="dropdown-list-item">
                        <button
                          @click="deleteRow(route('admin.expert-levels.destroy', expertLevel))"
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
        </table>
      </div>
    </div>
  </main>

  <div id="addNewExpertLevelDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeExpertLevel()">
      <div class="drawer-header">
        <h5>{{ trans('Add New ExpertLevel') }}</h5>
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
          <label>{{ trans('Title') }}</label>
          <input
            v-model="form.title"
            type="text"
            class="input"
            required
            placeholder="Expert, Intermediate, Beginner"
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

  <div id="editExpertLevelDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateExpertLevel()">
      <div class="drawer-header">
        <h5>{{ trans('Edit ExpertLevel') }}</h5>
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
          <label>{{ trans('Title') }}</label>
          <input
            v-model="editForm.title"
            type="text"
            class="input"
            required
            placeholder="Expert, Intermediate, Beginner"
          />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex gap-1">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary w-full"
            :processing="editForm.processing"
            :btn-text="trans('Update')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
