<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm, router } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import drawer from '@/Plugins/Admin/drawer'
import trans from '@/Composables/transComposable'
import { onMounted, ref } from 'vue'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps(['currencies', 'buttons', 'segments'])

const form = useForm({
  name: '',
  code: ''
})
const editForm = ref({})
const isProcessing = ref(false)
const storeCurrency = () => {
  form.post(route('admin.currency.store'), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
      notify.success(trans('Currency has been added successfully'))
      drawer.of('#addNewCurrencyDrawer').hide()
    }
  })
}
const updateCurrency = () => {
  isProcessing.value = true
  router.patch(route('admin.currency.update', editForm.value.id), editForm.value, {
    preserveScroll: true,
    onSuccess: () => {
      editForm.value = {}
      notify.success(trans('Currency has been updated successfully'))
      drawer.of('#editCurrencyDrawer').hide()
    },
    onFinish: () => (isProcessing.value = false)
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Create a Currency" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="col-2">{{ trans('Code') }}</th>
              <th class="col-2">{{ trans('Name') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="currency in currencies" :key="currency.code">
              <td class="text-left">
                {{ currency.code }}
              </td>
              <td class="text-left">
                {{ currency.name }}
              </td>
              <td class="flex justify-end gap-3">
                <button
                  class="delete-confirm btn btn-primary"
                  @click="
                    () => {
                      editForm = { ...currency }
                      drawer.of('#editCurrencyDrawer').show()
                    }
                  "
                >
                  <i class="fas fa-edit"></i>
                </button>
                <a
                  href="javascript:void(0)"
                  class="delete-confirm btn btn-primary"
                  @click="deleteRow(route('admin.currency.destroy', currency.id))"
                  ><i class="fas fa-trash"></i
                ></a>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-if="currencies.length < 1" for-table="true" />
        </table>
      </div>
    </div>
  </main>

  <div id="addNewCurrencyDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeCurrency()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Currency') }}</h5>
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
          <label>{{ trans('Name') }}</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="input"
            required
            placeholder="US"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Code') }}</label>
          <input
            v-model="form.code"
            type="text"
            name="name"
            class="input"
            required
            placeholder="USD"
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
  <div id="editCurrencyDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateCurrency">
      <div class="drawer-header">
        <h5>{{ trans('Edit Currency') }}</h5>
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
          <label class="label mb-2">{{ trans('Name') }}</label>
          <input v-model="editForm.name" type="text" name="name" class="input" required />
        </div>
        <div class="mb-2">
          <label class="label mb-2">{{ trans('Code') }}</label>
          <input v-model="editForm.code" type="text" name="code" class="input" required />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            :processing="isProcessing"
            classes="btn btn-primary"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
