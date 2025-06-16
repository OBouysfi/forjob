<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import Paginate from '@/Components/Paginate.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import trans from '@/Composables/transComposable'
import Filter from '@/Components/Admin/Filter.vue'
import Overview from '@/Components/Admin/OverviewGrid.vue'
import moment from 'moment'
import sharedComposable from '@/Composables/sharedComposable'
import NoDataFound from '@/Components/Admin/NoDataFound.vue'
const { deleteRow } = sharedComposable()

defineOptions({ layout: AdminLayout })

const props = defineProps([
  'segments',
  'buttons',
  'request',
  'conversations',
  'type',
  'totalConversation',
  'totalDeleted',
  'totalBlocked'
])

const conversationStats = [
  {
    value: props.totalConversation,
    title: trans('Total Conversation'),
    iconClass: 'bx bx-list-ul'
  },
  {
    value: props.totalDeleted,
    title: trans('Total Deleted'),
    iconClass: 'bx bx-message-rounded-x'
  },
  {
    value: props.totalBlocked,
    title: trans('Total Blocked'),
    iconClass: 'bx bx-user-x'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Conversation Delete Requests')"
      :segments="segments"
      :buttons="buttons"
    />

    <div class="space-y-6">
      <Overview :items="conversationStats" grid="1" />
      <Filter :request="request" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Employer') }}</th>
              <th>{{ trans('Candidate') }}</th>

              <th class="text-left">{{ trans('Created At') }}</th>
              <th class="text-left">{{ trans('Replies') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody class="list" v-if="conversations.total">
            <tr v-for="conversation in conversations.data" :key="conversation.id">
              <td>
                <div
                  class="flex items-center gap-3"
                  v-for="user in conversation.users"
                  :key="user.id"
                >
                  <Link
                    :href="route('admin.companies.show', user.id)"
                    v-if="user.role === 'employer'"
                  >
                    <div class="avatar avatar-circle">
                      <img
                        class="avatar-img"
                        :src="
                          user.avatar == null
                            ? `https://ui-avatars.com/api/?name=${user.name}`
                            : user.avatar
                        "
                      />
                    </div>
                  </Link>
                  <Link
                    :href="route('admin.companies.show', user.id)"
                    v-if="user.role === 'employer'"
                  >
                    {{ user.name }}
                  </Link>
                </div>
              </td>
              <td>
                <div
                  class="flex items-center gap-3"
                  v-for="user in conversation.users"
                  :key="user.id"
                >
                  <Link :href="route('admin.candidates.show', user.id)" v-if="user.role === 'user'">
                    <div class="avatar avatar-circle">
                      <img
                        class="avatar-img"
                        :src="
                          user.avatar == null
                            ? `https://ui-avatars.com/api/?name=${user.name}`
                            : user.avatar
                        "
                      />
                    </div>
                  </Link>
                  <Link :href="route('admin.candidates.show', user.id)" v-if="user.role === 'user'">
                    {{ user.name }}
                  </Link>
                </div>
              </td>

              <td class="text-center">
                {{ moment(conversation.created_at).format('D MMM, YYYY') }}
              </td>
              <td class="text-center">
                {{ conversation.replies_count }}
              </td>
              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.message.show', conversation.uuid)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="external-link"></i>
                          <span>{{ trans('View') }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          @click="deleteRow(route('admin.message.destroy', conversation, id))"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash"></i>
                          {{ trans('Delete') }}
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
        <Paginate :links="conversations.links" />
      </div>
    </div>
  </main>
</template>
