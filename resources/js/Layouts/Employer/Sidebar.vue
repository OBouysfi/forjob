<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import RouteLink from './RouteLink.vue'
import { computed } from 'vue'
import { router } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'
const { authUser, logout, currentRoute, currentRouteGroup } = sharedComposable()

const deleteUser = () => {
  router.delete(route('employer.accounts.destroy'), {
    onSuccess: () => {
      notify.success(trans('Account has been deleted successfully!'))
    }
  })
}

const candidateProfileCompleted = computed(() => {
  let user = authUser.value

  let accountOpening = 10
  let companyInformation = user.meta?.company?.name ? 30 : 0
  let emailVerification = user.email_verified_at ? 20 : 0
  let kycVerification = user.kyc_verified_at ? 30 : 0
  let avatar = user.avatar?.length ? 10 : 0

  return accountOpening + companyInformation + emailVerification + kycVerification + avatar
})
</script>

<template>
  <aside class="dash-aside-navbar">
    <div class="position-relative">
      <div class="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
        <Link href="/">
          <img src="/assets/dashboard/images/logo_01.png" alt="" />
        </Link>
        <button class="close-btn d-block d-md-none">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="user-data">
        <div class="user-avatar online position-relative rounded-circle">
          <img
            v-lazy="
              authUser.avatar == null
                ? `https://ui-avatars.com/api/?name=${authUser.name}`
                : `${authUser.avatar}`
            "
            alt=""
            class="lazy-img"
          />
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
                :href="`/companies/${authUser.username}`"
              >
                <img src="/assets/dashboard/images/icon/icon_23.svg" alt="icon" class="lazy-img" />
                <span class="ms-2 ps-1">{{ trans('Profile') }}</span>
              </Link>
            </li>

            <li>
              <Link
                :href="route('employer.account-settings')"
                class="dropdown-item d-flex align-items-center"
                ><img
                  src="/assets/dashboard/images/icon/icon_24.svg"
                  alt="icon"
                  class="lazy-img"
                /><span class="ms-2 ps-1">{{ trans('Account Settings') }}</span>
              </Link>
            </li>
            <li>
              <Link
                class="dropdown-item d-flex align-items-center"
                :href="route('employer.support.index')"
                ><img
                  src="/assets/dashboard/images/icon/icon_41.svg"
                  alt="img"
                  class="lazy-img"
                /><span class="ms-2 ps-1">{{ trans('Supports') }}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <!-- /.user-data -->
      <nav class="dasboard-main-nav">
        <ul class="style-none">
          <RouteLink
            :href="route('employer.dashboard')"
            text="Dashboard"
            icon-name="icon_1"
            :active="currentRoute('Employer/Dashboard')"
          />

          <RouteLink
            :href="route('employer.profile.index')"
            text="My Profile"
            icon-name="icon_2"
            :active="currentRoute('Employer/Profile')"
          />

          <RouteLink
            :href="route('employer.jobs.index')"
            text="My Jobs"
            icon-name="icon_3"
            :active="currentRouteGroup('Employer/Job') && !currentRoute('Employer/Job/Create')"
          />

          <RouteLink
            :href="route('employer.message.index')"
            text="Messages"
            icon-name="icon_4"
            :active="currentRouteGroup('Employer/Message')"
          />

          <RouteLink
            :href="route('employer.jobs.create')"
            text="Submit Job"
            icon-name="icon_39"
            :active="currentRoute('Employer/Job/Create')"
          />

          <RouteLink
            :href="route('employer.saved-candidates')"
            text="Saved Candidate"
            icon-name="icon_6"
            :active="currentRoute('Employer/SavedCandidate')"
          />

          <RouteLink
            :href="route('employer.job-applicants')"
            text="Job Applicants"
            icon-name="icon_5"
            :active="currentRoute('Employer/Applicants')"
          />

          <RouteLink
            :href="route('employer.job-reviews')"
            text="Reviews"
            icon-name="icon_3"
            :active="currentRoute('Employer/Reviews')"
          />

          <RouteLink
            :href="route('employer.membership.index')"
            text="Membership"
            icon-name="icon_40"
            :active="currentRouteGroup('Employer/Membership')"
          />

          <RouteLink
            :href="route('employer.account-settings')"
            text="Account Settings"
            icon-name="icon_7"
            :active="currentRoute('Employer/Settings')"
          />
          <RouteLink
            :href="route('employer.ai-template.index')"
            text="Ai Templates"
            icon-name="icon_43"
            :active="currentRouteGroup('Employer/AiTemplate')"
          />
          <RouteLink
            :href="route('employer.ai-generated-history.index')"
            text="Ai History"
            icon-name="icon_44"
            :active="currentRoute('Employer/GeneratedHistory/Index')"
          />
          <RouteLink
            :href="route('employer.credits.index')"
            text="Credits"
            icon-name="icon_42"
            :active="currentRoute('Employer/Credit')"
          />

          <RouteLink
            :href="route('employer.support.index')"
            text="Supports"
            icon-name="icon_41"
            :active="currentRouteGroup('Employer/Support')"
          />

          <RouteLink
            v-if="!authUser.kyc_verified_at"
            :href="route('employer.kyc.index')"
            text="KYC Verification"
            icon-name="kyc"
            icon-ext=".png"
            :active="currentRouteGroup('Employer/KYC')"
          />

          <li>
            <a
              href="#"
              class="d-flex w-100 align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <img src="/assets/dashboard/images/icon/icon_8.svg" alt="" class="lazy-img" />
              <span>{{ trans('Delete Account') }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.dasboard-main-nav -->
      <div class="profile-complete-status">
        <div class="progress-value fw-500">{{ candidateProfileCompleted }}%</div>
        <div class="progress-line position-relative">
          <div class="inner-line" :style="{ width: `${candidateProfileCompleted}%` }"></div>
        </div>
        <p>{{ trans('Profile Complete') }}</p>
      </div>
      <!-- /.profile-complete-status -->

      <button @click="logout" class="d-flex w-100 align-items-center logout-btn">
        <img src="/assets/dashboard/images/icon/icon_9.svg" alt="" class="lazy-img" />
        <span>{{ trans('Logout') }}</span>
      </button>
    </div>
  </aside>

  <!-- Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="container">
        <div class="remove-account-popup modal-content text-center">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <img src="/assets/dashboard/images/icon/icon_22.svg" alt="" class="lazy-img m-auto" />
          <h2>{{ trans('Are you sure?') }}</h2>
          <p>{{ trans('Are you sure to delete your account? All data will be lost.') }}</p>
          <div class="button-group d-inline-flex justify-content-center align-items-center pt-15">
            <a href="#" @click="deleteUser()" class="confirm-btn fw-500 tran3s me-3">{{
              trans('Yes')
            }}</a>
            <button
              type="button"
              class="btn-close fw-500 ms-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {{ trans('Cancel') }}
            </button>
          </div>
        </div>
        <!-- /.remove-account-popup -->
      </div>
    </div>
  </div>
</template>
