<script setup>
import NavMenu from '@/Layouts/Default/Common/NavMenu.vue'
import sharedComposable from '@/Composables/sharedComposable'
const { authUser } = sharedComposable()
</script>
<template>
  <header class="theme-main-menu menu-overlay menu-style-two sticky-menu">
    <div class="inner-content position-relative">
      <div class="top-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logo order-lg-0">
            <Link href="/" class="d-flex align-items-center">
            <img v-lazy="$page.props.primaryData.logo" alt="logo" />
            </Link>
          </div>
          <!-- logo -->
          <div class="right-widget ms-lg-0 order-lg-2 ms-auto">
            <ul class="d-flex align-items-center style-none">
              <li>
                <Link v-if="!authUser" class="fw-500 login-btn-three tran3s" :href="route('login')">
                {{ trans('Login') }}
                </Link>
                <template v-else>
                  <a v-if="authUser.role == 'admin'" :href="route('admin.dashboard')"
                    class="fw-500 login-btn-three tran3s">{{
                      trans('Dashboard') }}</a>
                  <Link v-else-if="authUser.role == 'user'" :href="route('user.dashboard')"
                    class="fw-500 login-btn-three tran3s">
                  {{ trans('Dashboard') }}</Link>
                  <Link v-else-if="authUser.role == 'employer'" :href="route('employer.dashboard')"
                    class="fw-500 login-btn-three tran3s">
                  {{ trans('Dashboard') }}
                  </Link>
                </template>
              </li>

              <li v-if="authUser && authUser.role == 'employer'" class="d-none d-md-block ms-3">
                <Link :href="route('employer.jobs.create')" class="btn-five">
                {{ trans('Post Job') }}
                </Link>
              </li>
              <li v-else-if="!authUser" class="d-none d-md-block ms-3">
                <Link :href="route('register')" class="btn-five">
                {{ trans('Register') }}
                </Link>
              </li>
            </ul>
          </div>
          <!--/.right-widget-->

          <nav class="navbar navbar-expand-lg p0 ms-lg-5 order-lg-1 ms-3">
            <button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="d-block d-lg-none">
                  <div class="logo">
                    <Link href="/" class="d-block"><img v-lazy="$page.props.primaryData.logo" alt="logo" width="100" />
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
