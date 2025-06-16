<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
const { currentRouteGroup, currentRoute } = sharedComposable()
const modal = ref({})

// notification
const notifications = ref(usePage().props.notifications ?? [])
const unreadNotifications = computed(() => {
  return notifications.value?.filter((item) => item.seen == 0).length ?? 0
})

const maskAsRead = (item) => {
  axios.post(route('admin.notifications.read', item.id)).then((res) => {
    item.seen = 1
  })
}

onMounted(() => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
  modal.value = new bootstrap.Modal(document.getElementById('menuSearchModal'))
})

// menu search
const menuSearchKeyword = ref('')
const menus = [
  {
    icon: '/assets/dashboard/images/icon/icon_1.svg',
    title: trans('Dashboard'),
    link: route('user.dashboard')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_3.svg',
    title: trans('Resume'),
    link: route('user.resume.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_4.svg',
    title: trans('Messages'),
    link: route('user.message.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_6.svg',
    title: trans('Saved Job'),
    link: route('user.saved-job')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_5.svg',
    title: trans('Job Alert'),
    link: route('user.job-alert')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_14.svg',
    title: trans('Applied Job'),
    link: route('user.applied-job')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_7.svg',
    title: trans('Account Setting'),
    link: route('user.account-settings')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_43.svg',
    title: trans('Ai Templates'),
    link: route('user.ai-template.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_42.svg',
    title: trans('Credits'),
    link: '/user/credit-logs'
  },
  {
    icon: '/assets/dashboard/images/icon/icon_23.svg',
    title: trans('Profile'),
    link: route('user.profile.edit')
  }
]

const filteredMenus = computed(() => {
  return menus.filter((item) =>
    item.title?.toLowerCase().includes(menuSearchKeyword.value.toLowerCase())
  )
})

const goTo = (link) => {
  menuSearchKeyword.value = ''
  modal.value.hide()
  router.get(link)
}
</script>
<template>
  <header class="dashboard-header">
    <div class="d-flex align-items-center justify-content-end">
      <button class="dash-mobile-nav-toggler d-block d-md-none me-auto">
        <span></span>
      </button>
      <div class="search-form">
        <input type="text" placeholder="Search here.." @click="modal.show()" />
        <button @click="modal.show()">
          <img src="/assets/dashboard/images/icon/icon_10.svg" alt="" class="lazy-img m-auto" />
        </button>
      </div>
      <div class="profile-notification ms-md-5 me-4 ms-2">
        <button
          class="noti-btn dropdown-toggle"
          type="button"
          id="notification-dropdown"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          <img src="/assets/dashboard/images/icon/icon_11.svg" alt="" class="lazy-img" />
          <div v-if="unreadNotifications" class="badge-pill"></div>
        </button>
        <ul class="dropdown-menu w-100" aria-labelledby="notification-dropdown">
          <li>
            <h4>{{ trans('Notification') }}</h4>
            <ul class="style-none" :class="{ 'notify-list': notifications.length }">
              <template v-if="notifications.length">
                <li
                  v-for="(item, index) in notifications"
                  :key="index"
                  @click="maskAsRead(item)"
                  class="d-flex align-items-center"
                  :class="{ unread: !item.seen }"
                >
                  <a target="_blank" :href="item.url ? item.url : '#'" class="flex-fill ps-2">
                    <h6>{{ item.title }}</h6>
                    <small data-bs-toggle="tooltip" data-bs-placement="top" :title="item.comment">{{
                      item.comment_short
                    }}</small>
                    <br />
                    <span class="time">{{ item.created_at_human_date }}</span>
                  </a>
                </li>
              </template>
              <li v-else class="text-center">{{ trans('no notifications') }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <Link
          v-if="currentRouteGroup('User/Support')"
          :href="route('user.support.create')"
          class="job-post-btn tran3s"
        >
          {{ trans('Create Ticket') }}
        </Link>
        <Link
          v-if="currentRouteGroup('User/AiTemplate/Index')"
          :href="route('user.ai-generated-history.index')"
          class="job-post-btn tran3s"
        >
          {{ trans('Ai History') }}
        </Link>
        <button
          v-if="currentRoute('User/Credit') || currentRoute('User/AiTemplate/Show')"
          class="job-post-btn tran3s"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#creditModal"
        >
          {{ trans('Buy Credit') }}
        </button>
      </div>
    </div>
  </header>

  <div
    class="modal fade"
    id="menuSearchModal"
    tabindex="-1"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="menuSearchModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="menuSearchModalTitle">{{ trans('Search Menu') }}</h5>
          <button
            type="button"
            class="btn-close"
            id="menuSearchModalClsBtn"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-4">
          <div class="mb-3">
            <input
              v-model="menuSearchKeyword"
              type="text"
              class="form-control py-3"
              id="searchInput"
              placeholder="Search here"
              autofocus
            />
          </div>

          <ul class="list-group" v-if="filteredMenus.length">
            <li
              role="button"
              class="d-flex mb-2 gap-2 rounded border p-3"
              v-for="(menu, index) in filteredMenus"
              :key="index"
              @click="goTo(menu.link)"
            >
              <img :src="menu.icon" alt="" /> {{ menu.title }}
            </li>
          </ul>
          <div class="alert alert-info mb-1 text-center" role="alert" v-else>
            <strong>{{ trans('No result found') }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
