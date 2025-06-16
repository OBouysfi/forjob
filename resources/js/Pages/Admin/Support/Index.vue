<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Supports" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="supportStats" />

      <Filter :request="request" :buttons="buttons" filterType="support" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Ticket No') }}</th>
              <th>{{ trans('Subject') }}</th>
              <th>
                {{ trans('Conversations') }}
              </th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('User') }}</th>
              <th>
                {{ trans('Created At') }}
              </th>
              <th>
                <p class="text-end">{{ trans('Ticket') }}</p>
              </th>
            </tr>
          </thead>

          <tbody v-if="supports.total">
            <tr v-for="support in supports.data" :key="support.id">
              <td class="text-center">
                <Link :href="'/admin/support/' + support.id">
                  {{ support.ticket_no }}
                </Link>
              </td>
              <td>
                <a class="text-dark" :href="'/admin/support/' + support.id">
                  {{ imitedString(support.subject, 50) }}
                </a>
              </td>
              <td class="text-center">
                {{ support.conversations_count }}
              </td>
              <td>
                <span
                  :class="
                    support.status == 2
                      ? 'badge badge-warning'
                      : support.status == 1
                      ? 'badge badge-success'
                      : 'badge badge-danger'
                  "
                >
                  {{
                    trans(support.status == 2 ? 'pending' : support.status == 1 ? 'Open' : 'Closed')
                  }}
                </span>
              </td>
              <td class="text-center">
                <a :href="'/admin/customer/' + support.user_id" class="text-dark">
                  {{ support.user?.name ?? '' }}
                </a>
              </td>
              <td class="text-center">
                {{ moment(support.created_at).format('d MMM y') }}
              </td>
              <td>
                <Link :href="'/admin/support/' + support.id" class="flex w-full justify-end">
                  <i class="h-5 text-slate-400" data-feather="eye"></i>
                </Link>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate v-if="supports.data.length != 0" :links="supports.links" />
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { Link, useForm } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
import Alert from '@/Components/Admin/Alert.vue'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import moment from 'moment'
import Filter from '@/Components/Admin/Filter.vue'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
import Paginate from '@/Components/Paginate.vue'

defineOptions({ layout: AdminLayout })

const props = defineProps([
  'segments',
  'buttons',
  'request',
  'supports',
  'pendingSupport',
  'openSupport',
  'closedSupport',
  'totalSupports',
  'type'
])

const supportStats = [
  {
    value: props.totalSupports,
    title: trans('Total Supports'),
    iconClass: 'bx bx-bar-chart'
  },
  {
    value: props.pendingSupport,
    title: trans('Pending Supports'),
    iconClass: 'bx bx-badge'
  },
  {
    value: props.openSupport,
    title: trans('Open Supports'),
    iconClass: 'bx bx-archive-out'
  },
  {
    value: props.closedSupport,
    title: trans('Closed Supports'),
    iconClass: 'bx bx-archive-in'
  }
]

function imitedString(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}
</script>
