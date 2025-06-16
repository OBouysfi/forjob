<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import Paginate from "@/Components/Paginate.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import trans from '@/Composables/transComposable'
import Alert from "@/Components/Admin/Alert.vue"
import Overview from "@/Components/Admin/OverviewGrid.vue"
import moment from "moment"
import sharedComposable from "@/Composables/sharedComposable"
const { textExcerpt } = sharedComposable()

defineOptions({ layout: AdminLayout })

const props = defineProps([
  "segments",
  "buttons",
  "request",
  "conversation",
  "replies",
  "totalReplies"
])

const ReplyStats = [
  {
    value: props.totalReplies,
    title: trans("Total Replies"),
    iconClass: "bx bx-list-ul"
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Replies')"
      :segments="segments"
      :buttons="buttons"
    />

    <div class="space-y-6">
      <Overview :items="ReplyStats" grid="1" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans("Name") }}</th>
              <th>{{ trans("Email") }}</th>

              <th class="text-left">{{ trans("Message") }}</th>
              <th class="text-left">{{ trans("Attachments") }}</th>
              <th class="text-left">{{ trans("Date") }}</th>
            </tr>
          </thead>
          <tbody class="list" v-if="replies.total != 0">
            <tr v-for="reply in replies.data" :key="reply.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar avatar-circle">
                    <img
                      class="avatar-img"
                      :src="
                        reply.user.avatar == null
                          ? `https://ui-avatars.com/api/?name=${reply.user.name}`
                          : reply.user.avatar
                      "
                    />
                  </div>

                  {{ reply.user.name }}
                </div>
              </td>

              <td>{{ reply.user.email }}</td>
              <td>{{ textExcerpt(reply.body, 40) }}</td>
              <td>
                <template v-if="reply.attachments">
                  <a
                    v-for="(att, i) in JSON.parse(reply.attachments)"
                    :key="i"
                    :href="att"
                    class="mb-1 block"
                    download
                  >
                    <div class="file-name">{{ textExcerpt(att, 25) }}</div>
                  </a>
                </template>
                <span v-else>None</span>
              </td>

              <td class="text-center">
                {{ moment(reply.created_at).format("D MMM, YYYY h:m a") }}
              </td>
            </tr>
          </tbody>
        </table>
        <Paginate :links="replies.links" />

        <Alert
          v-if="replies.total == 0"
          type="info"
          :text="trans('Opps do not have any replies....')"
        />
      </div>
    </div>
  </main>
</template>
