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
  axios.post(route('employer.notifications.read', item.id)).then((res) => {
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

const menuSearchKeyword = ref('')
const menus = [
  {
    icon: '/assets/dashboard/images/icon/icon_1.svg',
    title: trans('Dashboard'),
    link: route('employer.dashboard')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_2.svg',
    title: trans('My Profile'),
    link: route('employer.profile.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_3.svg',
    title: trans('My Jobs'),
    link: route('employer.jobs.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_4.svg',
    title: trans('Messages'),
    link: route('employer.message.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_39.svg',
    title: trans('Submit Job'),
    link: route('employer.jobs.create')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_6.svg',
    title: trans('Saved Candidate'),
    link: route('employer.saved-candidates')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_5.svg',
    title: trans('Job Applications'),
    link: '/employer/job-applicants'
  },
  {
    icon: '/assets/dashboard/images/icon/icon_3.svg',
    title: trans('Reviews'),
    link: '/employer/job-reviews'
  },
  {
    icon: '/assets/dashboard/images/icon/icon_40.svg',
    title: trans('Membership'),
    link: route('employer.membership.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_7.svg',
    title: trans('Account Settings'),
    link: route('employer.account-settings')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_43.svg',
    title: trans('Ai Templates'),
    link: route('employer.ai-template.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_42.svg',
    title: trans('Credits'),
    link: route('employer.credits.index')
  },
  {
    icon: '/assets/dashboard/images/icon/icon_41.svg',
    title: trans('Supports'),
    link: route('employer.support.index')
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
          <img src="/assets/dashboard/images/icon/icon_10.svg" alt="icon" class="lazy-img m-auto" />
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
          <img v-lazy="'/assets/dashboard/images/icon/icon_11.svg'" alt="" class="lazy-img" />
          <div v-if="unreadNotifications" class="badge-pill"></div>
        </button>
        <ul class="dropdown-menu w-100" aria-labelledby="notification-dropdown">
          <li>
            <h4>{{ trans('Notification') }}</h4>
            <ul class="style-none notify-list">
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
            </ul>
            <ul v-if="notifications.length < 1" class="style-none notify-list">
              <li class="d-flex align-items-center">
                <h6>{{ trans('0 notifications') }}</h6>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <Link
          v-if="currentRouteGroup('Employer/Support')"
          :href="route('employer.support.create')"
          class="job-post-btn tran3s"
        >
          {{ trans('Create Ticket') }}
        </Link>
        <Link
          v-else-if="currentRouteGroup('Employer/AiTemplate/Index')"
          :href="route('employer.ai-generated-history.index')"
          class="job-post-btn tran3s"
        >
          {{ trans('Ai History') }}
        </Link>
        <button
          v-else-if="currentRoute('Employer/Credit') || currentRoute('Employer/AiTemplate/Show')"
          class="job-post-btn tran3s"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#creditModal"
        >
          {{ trans('Buy Credit') }}
        </button>
        <Link v-else :href="route('employer.jobs.create')" class="job-post-btn tran3s">
          {{ trans('Post a Job') }}
        </Link>
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
