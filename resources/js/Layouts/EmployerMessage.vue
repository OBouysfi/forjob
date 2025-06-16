<script setup>
import MessageSidebar from '@/Layouts/Employer/MessageSidebar.vue'
import sharedComposable from '@/Composables/sharedComposable'
import { useMessageStore } from '@/Store/messageStore'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { router } from '@inertiajs/vue3'
import { ref, onUnmounted } from 'vue'
const message = useMessageStore()
const filterForm = ref({
  name: null,
  read: null
})
const messageForm = ref({
  body: '',
  attachments: [],
  email: ''
})
const messageTextarea = ref(null)
const closeButton = ref(null)
const emojiState = ref(false)
const { pickBy, currentRoute, textExcerpt } = sharedComposable()
const filter = () => {
  message.fetchConversations(route('api-message.index', pickBy(filterForm.value)))
}
const setRead = (val) => {
  filterForm.value.read = val
  filter()
}
const submit = () => {
  router.post(route('employer.message.store'), messageForm.value, {
    onSuccess: () => {
      messageForm.value.body = ''
      messageForm.value.attachments = []
      message.fetchConversations()
      closeButton.value.click()
    }
  })
}
const onSelectEmoji = (emoji) => {
  const textarea = messageTextarea.value
  const textBeforeCursor = messageForm.body.slice(0, textarea.selectionStart)
  const textAfterCursor = messageForm.body.slice(textarea.selectionStart)
  messageForm.body = textBeforeCursor + emoji.i + textAfterCursor
}
const previewFlies = (event) => {
  const files = []
  for (const file of event.target.files) {
    files.push(file)
  }
  const maxGallerySize = 5
  const oldFilesCount = Math.max(
    messageForm.value.attachments.length + files.length - maxGallerySize,
    0
  )

  const newFiles = files.slice(0, maxGallerySize - oldFilesCount)
  const updatedGallery = messageForm.value.attachments.slice(oldFilesCount).concat(newFiles)

  messageForm.value.attachments = updatedGallery
}
onUnmounted(() => message.$reset())
</script>

<template>
  <div class="row gx-0 align-items-center">
    <div
      class="offcanvas compose-mail-offcanvas"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="compose-new-email-container">
        <div class="new-email-header position-relative">
          <div class="input-group d-flex align-items-center">
            <div class="w-60px text-center">To</div>
            <input
              required
              v-model="messageForm.email"
              type="email"
              class="flex-fill"
              placeholder="payoneer@inquiry.com"
            />
          </div>
        </div>
        <!-- /.new-email-header -->
        <div class="compose-body">
          <textarea ref="messageTextarea" v-model="messageForm.body"> </textarea>
        </div>
        <!-- /.compose-body -->
        <div class="row mt-10 ps-3" v-if="messageForm?.attachments.length > 0">
          <div
            class="attachments col-3 mb-2 me-2 rounded border p-3"
            v-for="att in messageForm.attachments"
            :key="att"
          >
            <a class="file tran3s d-flex align-items-center" download>
              <div class="icon rounded-circle d-flex align-items-center justify-content-center">
                <img src="/assets/dashboard/images/icon/icon_31.svg" alt="icon" class="lazy-img" />
              </div>
              <div class="ps-1">
                <div class="file-name fs-7">{{ textExcerpt(att.name, 15) }}</div>
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
                type="file"
                @change="previewFlies"
                name="uploadImg"
                title="Insert File"
                accept=".csv,.docx,.pdf,.xlsx,.xls"
              />
            </div>
            <div class="insert-file position-relative me-3">
              <img src="/assets/dashboard/images/icon/icon_34.svg" alt="" class="lazy-img" />
              <input
                multiple
                type="file"
                @change="previewFlies"
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
            <button @click.prevent="submit" class="reply-btn tran3s">{{ trans('Send') }}</button>
          </div>
        </div>
        <!-- /.compose-email-footer -->
      </div>
      <button
        ref="closeButton"
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="col-lg-4">
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="main-title m0">{{ trans('Messages') }}</h2>
        <a
          class="new-message-compose rounded-circle"
          data-bs-toggle="offcanvas"
          href="#offcanvasScrolling"
          role="button"
          aria-controls="offcanvasScrolling"
          >+</a
        >
      </div>
    </div>
    <div
      class="col-lg-8"
      v-if="message.conversations?.length > 1 && currentRoute('Employer/Message/Show')"
    >
      <div
        class="message-pagination ps-lg-4 ps-xxl-5 d-flex align-items-center justify-content-between md-mt-40"
      >
        <button type="button" @click="message.prev" class="prev-msg">
          <img src="/assets/dashboard/images/icon/icon_26.svg" alt="" class="lazy-img" />
        </button>
        <div class="d-flex align-items-center">
          <i class="bi bi-chevron-left"></i>
          <span v-if="message.data">
            {{ message.data.from }}-{{ message.activeIndex }} {{ trans('of') }}
            {{ message.data.total }}
          </span>
          <i class="bi bi-chevron-right"></i>
        </div>
        <button type="button" @click="message.next" class="next-msg">
          <img src="/assets/dashboard/images/icon/icon_27.svg" alt="" class="lazy-img" />
        </button>
      </div>
      <!-- /.message-pagination -->
    </div>
  </div>

  <div class="card-box border-20 p0 mt-30 bg-white">
    <div class="message-wrapper">
      <div class="row gx-0">
        <div class="col-lg-4 max-h-10-r">
          <div class="message-sidebar pt-20">
            <div class="ps-xxl-4 pe-xxl-4 pe-3 ps-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="page-title fw-500">{{ trans('Inbox') }}</div>
              </div>
              <form @submit.prevent="filter" class="search-form mb-20 mt-20">
                <input type="text" placeholder="Search contacts" v-model="filterForm.name" />
                <button type="submit">
                  <img
                    v-lazy="'/assets/dashboard/images/icon/icon_10.svg'"
                    alt="img"
                    class="lazy-img m-auto"
                  />
                </button>
              </form>

              <div
                class="message_filter d-flex align-items-center justify-content-evenly mb-20"
                id="module_btns"
              >
                <button
                  class="filter_btn"
                  @click="setRead(null)"
                  :class="{ active: filterForm.read === null }"
                >
                  {{ trans('All') }}
                </button>
                <button
                  class="filter_btn"
                  @click="setRead('read')"
                  :class="{ active: filterForm.read === 'read' }"
                >
                  <span class="bg-success"></span> {{ trans('Read') }}
                </button>
                <button
                  class="filter_btn"
                  :class="{ active: filterForm.read === 'unread' }"
                  @click="setRead('unread')"
                >
                  <span class="bg-danger"></span> {{ trans('Unread') }}
                </button>
              </div>
            </div>
            <MessageSidebar />
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
