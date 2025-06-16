<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm } from '@inertiajs/vue3'
import Paginate from '@/Components/Paginate.vue'
import moment from 'moment'
import trans from '@/Composables/transComposable'
import sharedComposable from '@/Composables/sharedComposable'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted } from 'vue'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout })
const { formatCurrency, textExcerpt } = sharedComposable()
onMounted(() => drawer.init())
const props = defineProps([
  'aiGenerated',
  'total',
  'totalCharges',
  'totalResults',
  'buttons',
  'segments',
  'request',
  'type'
])
const filterData = useForm({
  search: props.request.search,
  type: props.type
})
const stats = [
  {
    value: props.total,
    title: trans('Total Records'),
    iconClass: 'bx bx-badge'
  },
  {
    value: props.totalCharges,
    title: trans('Total Charges'),
    iconClass: 'bx bx-badge-check'
  },
  {
    value: props.totalResults,
    title: trans('Total Results'),
    iconClass: 'bx bx-bullseye'
  }
]
const promptData = ref({
  prompt: '',
  content: ''
})
const openDrawer = (data) => {
  promptData.value.prompt = data.prompt
  promptData.value.content = data.content
  drawer.of('#promptDrawer').show()
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment title="Ai Generates" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />
      <div class="flex items-center justify-end gap-x-2">
        <div class="dropdown" data-placement="bottom-end">
          <div class="dropdown-toggle">
            <button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800">
              <i class="w-4" data-feather="filter"></i>
              <span>{{ trans('Filter') }}</span>
              <i class="w-4" data-feather="chevron-down"></i>
            </button>
          </div>

          <div class="dropdown-content w-72 !overflow-visible">
            <form @submit.prevent="filterData.get('/admin/credit-logs')">
              <ul class="dropdown-list space-y-4 p-4">
                <li class="dropdown-list-item">
                  <h2 class="my-1 text-sm font-medium">{{ trans('Status') }}</h2>
                  <div class="mb-2">
                    <input
                      type="text"
                      name="search"
                      v-model="filterData.search"
                      class="input"
                      placeholder="Search......"
                    />
                  </div>
                </li>
                <li class="dropdown-list-item">
                  <div class="mb-2">
                    <select class="select" name="type" v-model="filterData.type">
                      <option value="email">{{ trans('User Email') }}</option>
                      <option value="invoice_no">{{ trans('Invoice No') }}</option>
                    </select>
                  </div>
                </li>

                <li class="dropdown-list-item">
                  <button type="submit" class="btn btn-primary w-full">
                    {{ trans('Filter') }}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Template') }}</th>
              <th>{{ trans('User Name') }}</th>
              <th>{{ trans('Charge') }}</th>

              <th>
                {{ trans('Result') }}
              </th>
              <th>
                {{ trans('Length') }}
              </th>
              <th>
                {{ trans('Prompt') }}
              </th>
              <th>
                {{ trans('Content') }}
              </th>

              <th>
                {{ trans('Date') }}
              </th>
              <th>
                <p class="text-end">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>

          <tbody v-if="aiGenerated.total > 0">
            <tr v-for="generated in aiGenerated.data" :key="generated.id">
              <td>
                {{ textExcerpt(generated.ai_template.title, 30) }}
              </td>
              <td>
                <Link
                  :href="route('admin.companies.show', generated.user_id)"
                  v-if="generated.user.role == 'employer'"
                >
                  {{ textExcerpt(generated.user.name, 30) }}
                </Link>
                <Link
                  :href="route('admin.candidates.show', generated.user_id)"
                  v-if="generated.user.role == 'user'"
                >
                  {{ textExcerpt(generated.user.name, 30) }}
                </Link>
              </td>
              <td>
                {{ formatCurrency(generated.charge) }}
              </td>
              <td>
                {{ generated.result }}
              </td>

              <td>
                {{ generated.length }}
              </td>
              <td>
                {{ textExcerpt(generated.prompt, 30) }}
              </td>
              <td>
                {{ textExcerpt(generated.content, 30) }}
              </td>

              <td>
                {{ moment(generated.updated_at).format('DD MMM, YYYY') }}
              </td>

              <td>
                <button @click="openDrawer(generated)" class="flex w-full justify-end">
                  <i class="h-5 text-slate-400" data-feather="eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Paginate :links="aiGenerated.links" />
    </div>
  </main>
  <div id="promptDrawer" class="drawer drawer-right max-h-screen overflow-y-auto">
    <div class="drawer-header">
      <h5>{{ trans('Content Details') }}</h5>
      <button
        type="button"
        class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        data-dismiss="drawer"
      >
        <i data-feather="x" width="1.5rem" height="1.5rem"></i>
      </button>
    </div>
    <div class="drawer-body space-y-4">
      <div class="rounded-md bg-secondary-200 p-3 dark:bg-secondary-900">
        <label class="label mb-1">Prompt</label>
        <p>{{ promptData?.prompt }}</p>
      </div>
      <div class="rounded-md bg-secondary-200 p-3 dark:bg-secondary-900">
        <label class="label mb-1">Content</label>
        <div class="" v-html="promptData?.content"></div>
      </div>
    </div>
    <div class="drawer-footer">
      <div class="flex justify-between gap-2">
        <button type="button" class="btn btn-dark w-full" data-dismiss="drawer">
          <span> {{ trans('Close') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
