<script setup>
import trans from '@/Composables/transComposable'
import sharedComposable from "@/Composables/sharedComposable"
import { router } from "@inertiajs/vue3"
import { computed } from "vue"
import RouteLink from './RouteLink.vue'
const {
  authUser,
  currentRoute,
  logout,
  currentRouteGroup,
  currentRouteIn,
} = sharedComposable()

const deleteAccount = () => {
  router.delete(route("user.accounts.destroy"), {
    onSuccess: () => {
      notify.success(trans("Account has been deleted successfully!"))
    },
  })
}

const getDynamicIcon = (activeRoute, img_no) => {
  return `/assets/dashboard/images/icon/icon_${img_no}${activeRoute ? "_active" : ""}.svg`
}

const candidateProfileCompleted = computed(() => {
  let user = authUser.value
  let accountOpening = 10
  let emailVerification = user.email_verified_at ? 20 : 0
  let profileSetup = user.category_id ? 40 : 0
  let avatar = user.avatar ? 10 : 0
  let cv = user.meta?.custom_cv ? 20 : 0

  return accountOpening + profileSetup + emailVerification + avatar + cv
})
</script>

<template>
  <aside class="dash-aside-navbar">
    <div class="position-relative">
      <div
        class="logo text-md-center d-md-block d-flex align-items-center justify-content-between"
      >
        <Link href="/">
          <img src="/assets/dashboard/images/logo_01.png" />
        </Link>
        <button class="close-btn d-block d-md-none">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="user-data">
        <div class="user-avatar online position-relative rounded-circle">
          <div class="user-avatar online position-relative rounded-circle">
            <img
              :src="
                authUser.avatar ?? `https://ui-avatars.com/api/?name=${authUser.name}`
              "
            />
          </div>
        </div>
        <!-- /.user-avatar -->
        <div class="user-name-data">
          <button
            class="user-name dropdown-toggle"
            type="button"
            id="profile-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            {{ authUser.name }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="profile-dropdown">
            <li>
              <Link
                class="dropdown-item d-flex align-items-center"
                :href="route('user.profile.edit')"
                ><img src="/assets/dashboard/images/icon/icon_23.svg" alt="" /><span
                  class="ms-2 ps-1"
                >
                  {{ trans("Profile") }}</span
                >
              </Link>
            </li>
            <li>
              <Link
                :href="route('user.account-settings')"
                class="dropdown-item d-flex align-items-center"
                ><img src="/assets/dashboard/images/icon/icon_24.svg" alt="" /><span
                  class="ms-2 ps-1"
                >
                  {{ trans("Account Settings") }}</span
                >
              </Link>
            </li>
            <li>
              <Link
                class="dropdown-item d-flex align-items-center"
                :href="route('user.support.index')"
                ><img
                  src="/assets/dashboard/images/icon/icon_41.svg"
                  alt="img"
                  class="lazy-img"
                /><span class="ms-2 ps-1">{{ trans("Supports") }}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <!-- /.user-data -->
      <nav class="dasboard-main-nav">
        <ul class="style-none">
          <li>
            <Link
              :href="route('user.dashboard')"
              :class="{ active: currentRoute('User/Dashboard') }"
              class="d-flex w-100 align-items-center"
            >
              <img :src="getDynamicIcon(currentRoute('User/Dashboard'), 1)" />
              <span>{{ trans("Dashboard") }}</span>
            </Link>
          </li>

          <li>
            <Link
              :href="route('user.resume.index')"
              class="d-flex w-100 align-items-center"
              :class="{ active: currentRoute('User/Resume') }"
            >
              <img :src="getDynamicIcon(currentRoute('User/Resume'), 3)" />
              <span>{{ trans("Resume") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('user.message.index')"
              :class="{ active: currentRouteGroup('User/Message') }"
              class="d-flex w-100 align-items-center"
            >
              <img :src="getDynamicIcon(currentRouteGroup('User/Message'), 4)" />
              <span>{{ trans("Messages") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('user.saved-job')"
              :class="{ active: currentRoute('User/SavedJob') }"
              class="d-flex w-100 align-items-center"
            >
              <img :src="getDynamicIcon(currentRoute('User/SavedJob'), 6)" />
              <span>{{ trans("Saved Job") }}</span>
            </Link>
          </li>

          <li>
            <Link
              :href="route('user.job-alert')"
              :class="{ active: currentRoute('User/JobAlert') }"
              class="d-flex w-100 align-items-center"
            >
              <img :src="getDynamicIcon(currentRoute('User/JobAlert'), 5)" />
              <span>{{ trans("Job Alert") }}</span>
            </Link>
          </li>

          <li>
            <Link
              :href="route('user.applied-job')"
              :class="{ active: currentRoute('User/AppliedJob') }"
              class="d-flex w-100 align-items-center"
            >
              <img :src="getDynamicIcon(currentRoute('User/AppliedJob'), 6)" />
              <span>{{ trans("Applied Job") }}</span>
            </Link>
          </li>

          <li>
            <RouteLink
              :href="route('user.reviews')"
              text="Reviews"
              icon-name="icon_3"
              :active="currentRoute('User/Reviews')"
            />
          </li>

          <li>
            <Link
              :href="route('user.account-settings')"
              class="d-flex w-100 align-items-center"
              :class="{
                active: currentRouteIn(['User/Settings', 'User/SettingPassChange']),
              }"
            >
              <img
                :src="
                  getDynamicIcon(
                    currentRouteIn(['User/Settings', 'User/SettingPassChange']),
                    7
                  )
                "
              />
              <span>{{ trans("Account Settings") }}</span>
            </Link>
          </li>

          <li>
            <Link
              :href="route('user.ai-template.index')"
              class="d-flex w-100 align-items-center"
              :class="{ active: currentRouteGroup('User/AiTemplate') }"
            >
              <img :src="getDynamicIcon(currentRouteGroup('User/AiTemplate'), 43)" />
              <span>{{ trans("Ai Templates") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('user.ai-generated-history.index')"
              class="d-flex w-100 align-items-center"
              :class="{ active: currentRouteGroup('User/GeneratedHistory/Index') }"
            >
              <img
                :src="
                  getDynamicIcon(currentRouteGroup('User/GeneratedHistory/Index'), 44)
                "
              />
              <span>{{ trans("Ai History") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('user.credits.index')"
              class="d-flex w-100 align-items-center"
              :class="{ active: currentRouteGroup('User/Credit') }"
            >
              <img :src="getDynamicIcon(currentRoute('User/Credit'), 42)" />
              <span>{{ trans("Credits") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('user.support.index')"
              class="d-flex w-100 align-items-center"
              :class="{ active: currentRouteGroup('User/Support') }"
            >
              <img :src="getDynamicIcon(currentRouteGroup('User/Support'), 41)" />
              <span>{{ trans("Supports") }}</span>
            </Link>
          </li>
          <li>
            <Link
              :href="route('candidates.show', authUser.username)"
              class="d-flex w-100 align-items-center"
            >
              <img src="/assets/dashboard/images/icon/icon_2.svg" />
              <span>{{ trans("My Profile") }}</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              class="d-flex w-100 align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <img src="/assets/dashboard/images/icon/icon_8.svg" />
              <span>{{ trans("Delete Account") }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.dasboard-main-nav -->

      <div class="profile-complete-status">
        <div class="progress-value fw-500">{{ candidateProfileCompleted }}%</div>
        <div class="progress-line position-relative">
          <div
            class="inner-line"
            :style="{ width: `${candidateProfileCompleted}%` }"
          ></div>
        </div>
        <p>{{ trans("Profile Complete") }}</p>
      </div>
      <!-- /.profile-complete-status -->

      <a
        href="#logout"
        @click="logout"
        class="d-flex w-100 align-items-center logout-btn"
      >
        <img src="/assets/dashboard/images/icon/icon_9.svg" />
        <span>{{ trans("Logout") }}</span>
      </a>
    </div>
  </aside>

  <!-- Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="container">
        <div class="text-center remove-account-popup modal-content">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <img
            src="/assets/dashboard/images/icon/icon_22.svg"
            alt=""
            class="m-auto lazy-img"
          />
          <h2>{{ trans("Are you sure?") }}</h2>
          <p>
            {{ trans("Are you sure to delete your account? All data will be lost.") }}
          </p>
          <div
            class="button-group d-inline-flex justify-content-center align-items-center pt-15"
          >
            <a @click="deleteAccount" class="confirm-btn fw-500 tran3s me-3">{{
              trans("Yes")
            }}</a>
            <button
              type="button"
              class="btn-close fw-500 ms-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {{ trans("Cancel") }}
            </button>
          </div>
        </div>
        <!-- /.remove-account-popup -->
      </div>
    </div>
  </div>
</template>
