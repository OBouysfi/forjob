<script setup>
import MessageSidebar from '@/Layouts/User/MessageSidebar.vue'
import sharedComposable from '@/Composables/sharedComposable'
import { useMessageStore } from '@/Store/messageStore'
import { ref, onUnmounted } from 'vue'
const message = useMessageStore()
const filterForm = ref({
  name: null,
  read: null
})

const { pickBy, currentRoute } = sharedComposable()
const filter = () => {
  message.fetchConversations(route('api-message.index', pickBy(filterForm.value)))
}
const setRead = (val) => {
  filterForm.value.read = val
  filter()
}
onUnmounted(() => message.$reset())
</script>

<template>
  <div class="row gx-0 align-items-center">
    <div class="col-lg-4">
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="main-title m0">{{ trans('Messages') }}</h2>
      </div>
    </div>
    <div
      class="col-lg-8"
      v-if="message.conversations?.length > 1 && currentRoute('User/Message/Show')"
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
