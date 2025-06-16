<script setup>
import NavMenu from '@/Layouts/Default/Common/NavMenu.vue';
import sharedComposable from '@/Composables/sharedComposable';
import homeApiService from '@/Composables/homeApiService';
import { ref, onMounted } from 'vue';
import NiceSelect from '@/Components/NiceSelect.vue';
import { useForm } from '@inertiajs/vue3';
const { authUser, pickBy, getQueryParams } = sharedComposable()
import HeaderCategorySection from '@/Pages/Web/Home/Three/Partials/HeaderCategorySection.vue';

const request = getQueryParams();

const categories = ref([])
const loading = ref(true)
const searchType = ref('Jobs')

const form = useForm({
  keyword: request.keyword ?? '',
})

const submit = () => {
  let url = searchType.value?.toLowerCase() == 'jobs' ? route('jobs.index') : route('candidates.index')
  form.transform(data => pickBy(data)).get(url)
}

onMounted(async () => {
  homeApiService.get('menuCategories').then((res) => {
    categories.value = res
    loading.value = false
  })
})
</script>
<template>
  <header class="theme-main-menu sticky-menu">
    <div class="inner-content position-relative">
      <div class="top-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logo order-lg-0">
            <Link href="/" class="d-flex align-items-center">
            <img v-lazy="$page.props.primaryData.deep_logo" alt="logo" />
            </Link>
          </div>
          <!-- logo -->
          <form @submit.prevent="submit"
            class="header-search position-relative d-none d-sm-block ms-lg-5 ms-md-3 order-lg-1">
            <img src="/assets/images/icon/icon_21.svg" alt="img" class="lazy-img icon" />
            <input type="text" v-model="form.keyword" placeholder="Search here.." />
            <NiceSelect v-model="searchType" :options="['Talents', 'Jobs']" />
          </form>
          <div class="right-widget ms-xl-5 order-lg-3 ms-auto">
            <ul class="d-flex align-items-center style-none">
              <li v-if="!authUser">
                <Link class="fw-500 login-btn-two" :href="route('register')">
                {{ trans('Register') }}
                </Link>
              </li>
              <li v-if="authUser && authUser.role == 'employer'">
                <Link class="fw-500 login-btn-two" :href="route('employer.jobs.create')">
                {{ trans('Post Job') }}
                </Link>
              </li>

              <li class="d-none d-md-block ms-4">
                <Link v-if="!authUser" class="btn-five" :href="route('login')">{{
                  trans('Login')
                }}</Link>
                <template v-else>
                  <a v-if="authUser.role == 'admin'" :href="route('admin.dashboard')" class="btn-five">{{
                    trans('Dashboard') }}</a>
                  <Link v-else-if="authUser.role == 'user'" :href="route('user.dashboard')" class="btn-five">
                  {{ trans('Dashboard') }}</Link>
                  <Link v-else-if="authUser.role == 'employer'" :href="route('employer.dashboard')" class="btn-five">
                  {{ trans('Dashboard') }}
                  </Link>
                </template>
              </li>
            </ul>
          </div>
          <!--/.right-widget-->
          <nav class="navbar navbar-expand-lg p0 ms-lg-auto order-lg-2 ms-3">
            <button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                <li class="d-sm-none xs-mb-20">
                  <form @submit.prevent="submit" class="header-search position-relative">
                    <img src="/assets/images/icon/icon_21.svg" alt="img" class="lazy-img icon" />
                    <input type="text" v-model="form.keyword" placeholder="Search here.." />
                    <NiceSelect v-model="searchType" :options="['Talents', 'Jobs']" />
                  </form>
                </li>
                <li class="nav-item dropdown d-lg-none">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    data-bs-auto-close="outside" aria-expanded="false">{{ trans('Browse Categories') }}</a>
                  <ul class="dropdown-menu">
                    <template v-if="!loading">
                      <li v-for="(category, index) in categories" :key="index">
                        <Link :href="route('job-categories.show', category.slug)" class="dropdown-item">
                        {{ category.title }}</Link>
                      </li>
                    </template>
                    <template v-else>
                      <li class="p-5">{{ trans('Loading Categories') }}...</li>
                    </template>
                  </ul>
                </li>
                <NavMenu />
                <li class="mt-5 d-md-none">
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
    </div>
  </header>

  <HeaderCategorySection />
</template>
