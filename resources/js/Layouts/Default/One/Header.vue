<script setup>
import { ref, onMounted } from 'vue';
import NavMenu from '@/Layouts/Default/Common/NavMenu.vue';
import sharedComposable from '@/Composables/sharedComposable';
const { authUser } = sharedComposable();

import homeApiService from '@/Composables/homeApiService';
import { Link } from '@inertiajs/vue3';
const categories = ref([])
const loading = ref(true)
onMounted(async () => {
  homeApiService.get('homeMenuServices').then(res => {
    categories.value = res
    loading.value = false
  })
})
</script>

<template>
  <header class="theme-main-menu menu-overlay menu-style-one sticky-menu">
    <div class="inner-content position-relative">
      <div class="top-header">
        <div class="d-flex align-items-center">
          <div class="logo order-lg-0">
            <Link href="/" class="d-flex align-items-center">
            <img v-lazy="$page.props.primaryData.logo" alt="logo" />
            </Link>
          </div>
          <!-- logo -->
          <div class="right-widget order-lg-3 ms-auto">
            <ul class="d-flex align-items-center style-none">
              <li v-if="!authUser" class="d-none d-md-block">
                <Link :href="route('register')" class="job-post-btn tran3s">
                {{ trans('Register') }}
                </Link>
              </li>
              <li v-if="authUser && authUser.role == 'employer'" class="d-none d-md-block">
                <a :href="route('employer.jobs.create')" class="job-post-btn tran3s">
                {{ trans('Post Job') }}
                </a>
              </li>
              <li v-if="authUser">
                <a v-if="authUser.role == 'admin'" :href="route('admin.dashboard')" class="login-btn-one">{{
                  trans('Dashboard') }}</a>
                <a v-else-if="authUser.role == 'user'" :href="route('user.dashboard')" class="login-btn-one">
                {{ trans('Dashboard') }}</a>
                <a v-else-if="authUser.role == 'employer'" :href="route('employer.dashboard')" class="login-btn-one">
                {{ trans('Dashboard') }}
                </a>
              </li>
              <li v-else>
                <Link :href="route('login')" class="login-btn-one">
                {{ trans('Login') }}
                </Link>
              </li>

              <li v-else>
                <Link :href="route('login')" class="login-btn-one">{{ trans('Login') }}</Link>
              </li>

              <li class="d-none d-md-block ms-4">
                <Link href="/candidates" class="btn-one">{{ trans('Hire Top Talents') }}</Link>
              </li>
            </ul>
          </div>
          <!--/.right-widget-->
          <nav class="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2 ms-3">
            <button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNav">
              <ul class="navbar-nav align-items-lg-center">
                <li class="d-block d-lg-none">
                  <div class="logo">
                    <Link href="/" class="d-block"><img v-lazy="$page.props.primaryData.logo" alt="logo" width="100" />
                    </Link>
                  </div>
                </li>
                <li class="nav-item dropdown category-btn mega-dropdown-sm">
                  <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-grid-fill"></i> {{
                      trans('Category') }}</Link>
                  <ul class="dropdown-menu category-dropdown">
                    <template v-if="!loading">
                      <li class="row gx-0">
                        <Link v-for="(category, index) in categories" :key="index"
                          :href="route('job-categories.show', category.slug)"
                          class="p-3 m-0 item col-lg-6 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center rounded-circle tran3s">
                          <img :src="category.preview" />
                        </div>
                        <div class="flex-fill ps-3">
                          <div class="fw-500 text-dark">
                            {{ category.title }}
                          </div>
                          <div class="job-count">
                            {{ category.jobs_count }} {{ trans('Jobs') }}
                          </div>
                        </div>
                        </Link>
                        <!-- /.item -->
                      </li>
                      <li>
                        <Link href="/jobs"
                          class="explore-all-btn d-flex align-items-center justify-content-between tran3s">
                        <span class="fw-500">{{ trans('Explore all fields') }}</span>
                        <span class="icon"><i class="bi bi-chevron-right"></i></span>
                        </Link>
                      </li>
                    </template>
                    <template v-else>
                      <p class="p-5">{{ trans('Loading Categories') }}...</p>
                    </template>
                  </ul>
                </li>
                <NavMenu />
                <li class="d-md-none">
                  <a :href="route('employer.jobs.create')" class="job-post-btn tran3s">
                    {{ trans('Post Job') }}</a>
                </li>
                <li class="d-md-none">
                  <Link :href="route('candidates.index')" class="btn-one w-100">
                  {{ trans('Hire Top Talents') }}</Link>
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