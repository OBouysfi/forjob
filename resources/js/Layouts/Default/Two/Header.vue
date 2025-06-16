<script setup>
import NavMenu from '@/Layouts/Default/Common/NavMenu.vue'
import sharedComposable from '@/Composables/sharedComposable'
const { authUser, currentRouteGroup } = sharedComposable()
</script>

<template>
  <header
    class="theme-main-menu menu-overlay sticky-menu"
    :class="{ 'header-bg-color': !currentRouteGroup('Web/Home/') }"
  >
    <div class="inner-content position-relative">
      <div class="top-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logo order-lg-0">
            <Link href="/" class="d-flex align-items-center">
              <img v-lazy="$page.props.primaryData.deep_logo" alt="logo" />
            </Link>
          </div>
          <!-- logo -->
          <div class="right-widget ms-lg-0 order-lg-3 ms-auto">
            <ul class="d-flex align-items-center style-none">
              <li v-if="!authUser" class="d-none d-md-block">
                <Link :href="route('register')" class="fw-500 text-dark">
                  {{ trans('Register') }}
                </Link>
              </li>
              <li v-if="authUser && authUser.role == 'employer'" class="d-none d-md-block">
                <Link :href="route('employer.jobs.create')" class="fw-500 text-dark">
                  {{ trans('Post Job') }}
                </Link>
              </li>

              <li class="d-none d-md-block ms-4">
                <Link v-if="!authUser" class="btn-five" :href="route('login')">{{
                  trans('Login')
                }}</Link>
                <template v-else>
                  <a
                    v-if="authUser.role == 'admin'"
                    :href="route('admin.dashboard')"
                    class="btn-five"
                    >{{ trans('Dashboard') }}</a
                  >
                  <Link
                    v-else-if="authUser.role == 'user'"
                    :href="route('user.dashboard')"
                    class="btn-five"
                  >
                    {{ trans('Dashboard') }}</Link
                  >
                  <Link
                    v-else-if="authUser.role == 'employer'"
                    :href="route('employer.dashboard')"
                    class="btn-five"
                  >
                    {{ trans('Dashboard') }}
                  </Link>
                </template>
              </li>
            </ul>
          </div>
          <!--/.right-widget-->
          <nav class="navbar navbar-expand-lg p0 ms-lg-0 order-lg-2 ms-3">
            <button
              class="navbar-toggler d-block d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="d-block d-lg-none">
                  <div class="logo">
                    <Link href="/" class="d-block">
                      <img v-lazy="$page.props.primaryData.deep_logo" alt="logo" width="100" />
                    </Link>
                  </div>
                </li>
                <NavMenu />

                <li class="d-md-none mt-5">
                  <Link v-if="!authUser" :href="route('login')" class="btn-five w-100">{{
                    trans('Register')
                  }}</Link>
                  <Link v-else :href="route('login')" class="btn-five w-100">{{
                    trans('Dashboard')
                  }}</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <!--/.top-header-->
    </div>
  </header>
</template>
