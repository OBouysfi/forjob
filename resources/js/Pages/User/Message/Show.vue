<script setup>
import EmojiPicker from 'vue3-emoji-picker'
import sharedComposable from '@/Composables/sharedComposable'
import UserMessage from '@/Layouts/UserMessage.vue'
import { useMessageStore } from '@/Store/messageStore'
import UserLayout from '@/Layouts/User.vue'
import InputFieldError from '@/Components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import 'vue3-emoji-picker/css'
import { modal } from '@/Composables/modalComposable'

defineOptions({ layout: [UserLayout, UserMessage] })
const intersectionTargetView = ref(null)
let observer = null
const message = useMessageStore()
const props = defineProps(['replies', 'conversation'])
const { authUser, pickBy, textExcerpt, currentRoute, uiAvatar } = sharedComposable()
const messageForm = useForm({
  body: '',
  attachments: [],
  uuid: props.conversation.uuid
})
const messageTextarea = ref(null)
const webSocketConnection = ref(false)
const messageContainer = ref(null)
const allReplies = ref(props.replies.data)
const loadMore = ref(false)
const replyPage = ref(1)
const emojiState = ref(false)
const uniqueReplies = computed(() => {
  const repliesCopy = [...allReplies.value]

  const uniqueReplies = repliesCopy.reduce((acc, current) => {
    if (!acc.some((r) => r.id === current.id)) {
      acc.push(current)
    }
    return acc
  }, [])

  // Sort by 'id'
  uniqueReplies.sort((a, b) => a.id - b.id)

  return uniqueReplies
})
const messageContainerScroll = () => {
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight
}
onMounted(() => {
  if (props.replies.last_page !== 1) {
    loadMore.value = true
  }
  message.$patch({
    activeUuid: props.conversation.uuid,
    activeIndex: message.conversations.findIndex((con) => con.uuid == props.conversation.uuid) + 1
  })
  Echo.connector.pusher.connection.bind('connected', () => {
    webSocketConnection.value = true
  })

  Echo.connector.pusher.connection.bind('disconnected', () => {
    webSocketConnection.value = false
  })
  messageContainerScroll()
  setTimeout(() => {
    if (props.replies?.total > 10) {
      observer = new IntersectionObserver(onIntersection, {
        root: null,
        rootMargin: '10px',
        threshold: 0.5
      })

      observer.observe(intersectionTargetView.value)
    }
  }, 1000)
})
onBeforeUnmount(() => {
  message.$patch({ activeUuid: null })
  if (observer) observer.disconnect()
})
const fetchMoreConversations = async () => {
  replyPage.value++
  loadMore.value = true
  const res = await axios.get(
    route(
      'api-message.show',
      pickBy({
        message: props.conversation.uuid,
        page: replyPage.value
      })
    )
  )
  allReplies.value.unshift(...res.data.data)
  if (res.data.last_page === replyPage.value) {
    loadMore.value = false
  }
}
const onIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && message.conversationsLoadMore && loadMore.value) {
      fetchMoreConversations()
    }
  })
}
const submit = () => {
  messageForm.post(route('user.message.store'), {
    onSuccess: () => {
      messageForm.body = ''
      messageForm.attachments = []
    },
    onFinish: () => {
      if (!webSocketConnection.value) {
        axios.get(route('api-message.show', props.conversation.uuid)).then((res) => {
          allReplies.value = res.data.data
          if (res.data.last_page === replyPage.value) {
            loadMore.value = false
          }
          setTimeout(() => messageContainerScroll(), 500)
        })
        message.fetchConversations()
      }
    }
  })
}
const block = () => {
  modal.init(route('user.message.update', props.conversation.uuid), {
    method: 'patch',
    data: {
      blocked: true
    }
  })
}
const deleteConversation = () => {
  modal.init(route('user.message.update', props.conversation.uuid), {
    method: 'patch',
    data: {
      delete: true
    }
  })
}
if (currentRoute('User/Message/Show')) {
  Echo.channel('reply.' + props.conversation.uuid).listen('Reply', (e) => {
    allReplies.value.push(e)
    message.fetchConversations()
    setTimeout(() => messageContainerScroll(), 200)
  })
}
const previewFlies = (event) => {
  const files = []
  for (const file of event.target.files) {
    files.push(file)
  }
  const maxGallerySize = 5
  const oldFilesCount = Math.max(messageForm.attachments.length + files.length - maxGallerySize, 0)

  const newFiles = files.slice(0, maxGallerySize - oldFilesCount)
  const updatedGallery = messageForm.attachments.slice(oldFilesCount).concat(newFiles)

  messageForm.attachments = updatedGallery
}

const onSelectEmoji = (emoji) => {
  const textarea = messageTextarea.value
  const textBeforeCursor = messageForm.body.slice(0, textarea.selectionStart)
  const textAfterCursor = messageForm.body.slice(textarea.selectionStart)
  messageForm.body = textBeforeCursor + emoji.i + textAfterCursor
}
</script>

<template>
  <Head :title="trans('Messages')" />

  <div
    v-if="conversation.deleted_by && conversation.deleted_by === authUser.id"
    class="col-lg-8 d-flex align-items-center justify-content-center"
  >
    <p>{{ trans('You Have deleted this conversation') }}</p>
  </div>
  <div class="col-lg-8" v-else>
    <div class="open-email-container pb-40">
      <div class="email-header divider d-flex justify-content-between ps-xxl-5 pe-xxl-5">
        <div class="sender-info d-flex align-items-center">
          <img v-lazy="conversation?.receiver[0]?.avatar" alt="avatar" class="lazy-img logo" />
          <div class="ps-3">
            <div class="sender-name">
              {{ conversation?.receiver[0]?.name }}
            </div>
            <div class="sender-email">
              {{ conversation?.receiver[0]?.email }}
            </div>
          </div>
        </div>
        <div class="email-info">
          <div class="d-flex align-items-center justify-content-end">
            <div class="action-dots float-end">
              <button
                class="action-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    class="dropdown-item"
                    :href="route('companies.show', conversation?.receiver[0]?.username)"
                  >
                    {{ trans('Profile') }}
                  </Link>
                </li>
                <li v-if="conversation.blocked_by && conversation.blocked_by === authUser.id">
                  <button class="dropdown-item" type="button" @click="block">
                    {{ trans('Unblock') }}
                  </button>
                </li>
                <li v-if="!conversation.blocked_by">
                  <button class="dropdown-item" type="button" @click="block">
                    {{ trans('Block') }}
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button" @click="deleteConversation">
                    {{ trans('Delete') }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- /.email-header -->
      <div class="max-h-22-r" ref="messageContainer">
        <div ref="intersectionTargetView" />
        <template v-for="reply in uniqueReplies" :key="reply.id">
          <div class="email-body divider">
            <div class="ps-xxl-5 pe-xxl-5 d-flex align-items-center pe-4 ps-4">
              <img
                v-if="authUser.id !== reply.user_id"
                width="30"
                height="30"
                class="rounded-circle"
                :src="uiAvatar(reply.user.name, reply.user.avatar)"
                alt="avatar"
              />
              <p
                class="w-100 mt-1 ps-2"
                :class="authUser.id === reply.user_id ? 'text-success text-end' : 'text-start'"
              >
                {{ reply.body }}
              </p>
            </div>
          </div>
          <template v-if="reply.attachments">
            <div class="email-footer ps-xxl-5 pe-xxl-5 pe-4 ps-4">
              <div class="attachments mb-30">
                <h6 class="mb-5">
                  {{ JSON.parse(reply.attachments).length }} {{ trans('Attachment') }}
                </h6>

                <div
                  class="d-flex flex-wrap"
                  :class="{
                    ' justify-content-end': authUser.id === reply.user_id
                  }"
                >
                  <a
                    v-for="(att, i) in JSON.parse(reply.attachments)"
                    :key="i"
                    :href="att"
                    class="file tran3s d-flex align-items-center mt-10"
                    download
                  >
                    <div
                      class="icon rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <img
                        src="/assets/dashboard/images/icon/icon_31.svg"
                        alt=""
                        class="lazy-img"
                      />
                    </div>
                    <div class="ps-2">
                      <div class="file-name">{{ textExcerpt(att, 25) }}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>

      <!-- /.email-body -->

      <div class="email-footer">
        <div class="ps-xxl-5 pe-xxl-5 pe-4 ps-4">
          <!-- new message -->
          <div v-if="conversation.blocked_by">{{ trans("You can't not send message") }}</div>
          <div v-else class="compose-new-email-container">
            <div class="compose-body">
              <textarea
                ref="messageTextarea"
                v-model="messageForm.body"
                placeholder="Write message..."
              >
              </textarea>
              <InputFieldError :message="messageForm.errors.body" />
            </div>
            <div class="row mt-10 ps-2" v-if="messageForm?.attachments.length > 0">
              <div class="attachments col-3 mb-2" v-for="att in messageForm.attachments" :key="att">
                <a class="file tran3s d-flex align-items-center" download>
                  <div class="icon rounded-circle d-flex align-items-center justify-content-center">
                    <img
                      src="/assets/dashboard/images/icon/icon_31.svg"
                      alt="icon"
                      class="lazy-img"
                    />
                  </div>
                  <div class="ps-1">
                    <div class="file-name">{{ textExcerpt(att.name, 15) }}</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="compose-email-footer d-flex justify-content-between position-relative">
              <div class="d-flex align-items-center">
                <div class="insert-file position-relative me-3">
                  <img src="/assets/dashboard/images/icon/icon_32.svg" alt="" class="lazy-img" />
                  <input
                    multiple
                    @change="previewFlies"
                    type="file"
                    name="uploadImg"
                    accept=".csv,.docx,.pdf,.xlsx,.xls"
                    title="Insert File"
                  />
                </div>
                <div class="insert-file position-relative me-3">
                  <img src="/assets/dashboard/images/icon/icon_34.svg" alt="" class="lazy-img" />
                  <input
                    multiple
                    @change="previewFlies"
                    type="file"
                    name="uploadImg"
                    accept="image/*"
                    title="Insert Image"
                  />
                </div>
                <!-- emoji-backdrop -->
                <div @click="emojiState = false" class="emoji-backdrop" v-show="emojiState" />
                <div class="m-emoji-container">
                  <EmojiPicker v-show="emojiState" :native="true" @select="onSelectEmoji" />
                </div>
                <button class="insert-emoji me-3" type="button" @click="emojiState = !emojiState">
                  <img src="/assets/dashboard/images/icon/icon_33.svg" alt="" class="lazy-img" />
                </button>
              </div>

              <div class="d-flex align-items-center">
                <button @click.prevent="submit" class="reply-btn tran3s">
                  {{ trans('Reply') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
