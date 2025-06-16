<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
const freelancerCount = ref('18k+')
import sharedComposable from '@/Composables/sharedComposable'

const { pickBy } = sharedComposable()

defineProps(['home'])

const form = useForm({
  keyword: ''
})

const formSubmit = () => {
  form.transform(data => pickBy(data)).get(route('jobs.index'))
}
</script>

<template>
  <div class="hero-banner-five position-relative pt-200 lg-pt-150">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-lg-6 col-md-8">
            <h1>{{ home.hero.title }}</h1>
            <p class="mt-40 text-md lg-mt-20 mb-65 lg-mb-30 pe-xxl-5">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="col-lg-6 col-md-8">
              <div class="job-search-two position-relative me-xxl-5">
                <form @submit.prevent="formSubmit" class="d-flex align-items-center justify-content-between">
                  <input type="text" v-model="form.keyword" placeholder="Search job, title etc...." class="bg-grey"
                     />
                  <button type="submit" class="btn-five h-100">{{ trans('Search') }}</button>
                </form>
              </div>
              <!-- /.job-search-two -->
            </div>
          </div>
        </div>
        <div class="d-sm-flex align-items-center mt-85 lg-mt-50">
          <img v-lazy="home.hero.image2" alt="img" class="lazy-img" />
          <div class="ps-3">
            <div class="fw-500 text-dark text-md">{{ freelancerCount }}</div>
            <div>{{ trans('Individual Freelancer') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="img-meta" :style="{ backgroundImage: `url(${home.hero.image})` }">
      <img src="/assets/images/shape/shape_29.svg" alt="img" class="lazy-img shapes shape_01" />
    </div>
    <a href="#" class="chat-btn tran3s"><i class="bi bi-chat-dots"></i></a>
  </div>
</template>
