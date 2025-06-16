<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import { useMessageStore } from '@/Store/messageStore'
import moment from 'moment'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps(['activeUuid'])

const intersectionTarget = ref(null)
let observer = null

const { textExcerpt, authUser } = sharedComposable()
const message = useMessageStore()
onMounted(async () => {
  if (!message.isFetched) {
    message.fetchConversations()
  }
  observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

  observer.observe(intersectionTarget.value)
})
const onIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && message.conversationsLoadMore && message.isFetched) {
      message.fetchMoreConversations()
    }
  })
}
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
const isMessageRead = (conversation) => {
  if (conversation.last_reply[0]?.user_id === authUser.id) {
    return 'unread'
  }
  if (conversation.last_reply[0]?.user_id === authUser.id && !conversation.last_reply[0]?.read_at) {
    return 'read'
  }
}
</script>
<template>
  <div class="email-read-panel max-h-26-r">
    <template v-if="message.isFetched">
      <template v-for="conversation in message.conversations" :key="conversation.uuid">
        <Link
          :href="route('employer.message.show', conversation.uuid)"
          class="email-list-item ps-xxl-4 pe-xxl-4 w-100 pe-3 ps-3"
          :class="[
            isMessageRead(conversation),
            {
              selected: message.activeUuid === conversation.uuid
            }
          ]"
        >
          <div class="email-short-preview position-relative">
            <div class="d-flex align-items-center justify-content-between">
              <div class="sender-name">{{ conversation.receiver[0]?.name }}</div>
              <div class="date">
                {{ moment(conversation.last_reply[0]?.created_at).format('MMM DD') }}
              </div>
            </div>
            <div class="mail-sub">
              {{ conversation.receiver[0]?.service?.title }}
            </div>
            <div class="mail-text" v-if="conversation.deleted_by !== authUser.id">
              {{ textExcerpt(conversation.last_reply[0]?.body, 100) }}
            </div>
            <div class="mail-text text-muted" v-else>
              {{ trans('Conversation has been Deleted') }}
            </div>
            <div
              v-if="
                conversation.last_reply[0]?.attachments && conversation.deleted_by !== authUser.id
              "
              class="attached-file-preview d-flex align-items-center mt-15"
            >
              <div class="d-flex align-items-center flex-wrap">
                <template
                  v-for="(att, i) in JSON.parse(conversation.last_reply[0].attachments)"
                  :key="i"
                >
                  <div class="file d-flex align-items-center mb-2 me-2">
                    <img
                      src="/assets/dashboard/images/icon/icon_28.svg"
                      alt="icon"
                      class="lazy-img me-2"
                    />
                    <span>{{ textExcerpt(att, 25) }}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </Link>
      </template>
    </template>
    <div
      v-if="message.conversations?.length < 1 && message.isFetched"
      class="ps-xxl-4 pe-xxl-4 w-100 mt-5 pe-3 ps-3"
    >
      <p class="text-center">
        {{ trans('!Opps no conversation records found') }}
      </p>
    </div>
    <div ref="intersectionTarget" />
  </div>
</template>
