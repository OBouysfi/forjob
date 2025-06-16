<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from '@/Composables/homeApiService'
import { Link, useForm } from '@inertiajs/vue3'
import NiceSelect from '@/Components/NiceSelect.vue'
import sharedComposable from '@/Composables/sharedComposable'

const { pickBy } = sharedComposable()

defineProps(['home'])

const services = ref([])
const popularServices = ref([])
const loading = ref(true)

const form = useForm({
  service: '',
  keyword: ''
})

onMounted(async () => {
  homeApiService
    .get('services')
    .then((res) => {
      services.value = res
    })

  homeApiService.get('featuredServices').then((res) => {
    popularServices.value = res
  })

})

const formSubmit = () => {
  form.transform(data => pickBy(data)).get(route('jobs.index'))
}
</script>

<template>
  <div class="hero-banner-seven position-relative pt-200 lg-pt-150 pb-110 md-pb-40">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="m-auto text-center col-xl-7 col-lg-8">
            <h1>{{ home.hero.title }}</h1>
            <p class="mb-40 text-md mt-25">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="m-auto col-xxl-7 col-lg-8 col-md-11">
              <div class="job-search-one style-two border-style position-relative">
                <form @submit.prevent="formSubmit">
                  <div class="row align-items-center">
                    <div class="col-md-5">
                      <div class="input-box">
                        <div class="label">{{ trans('Job Services') }}</div>
                        <NiceSelect :options="services" label="title" value-by="slug"
                          :placeholder="trans('Select Category')" v-model="form.service" />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="input-box border-left">
                        <div class="label">{{ trans('Keywords or Title') }}</div>
                        <input v-model="form.keyword" type="text" placeholder="Design, branding" class="keyword"
                           />
                      </div>
                    </div>
                    <div class="col-md-3 sm-mb-10 sm-mt-10">
                      <button class="m-auto text-uppercase btn-five border6 tran3s">
                        {{ trans('Search') }}
                      </button>
                    </div>
                  </div>
                </form>
                <ul class="flex-wrap filter-tags d-flex justify-content-center style-none mt-25 lg-mt-20">
                  <li class="fw-500 text-dark me-2">{{ trans('Popular') }}:</li>
                  <li v-for="(item, index) in popularServices" :key="index" class="me-2">
                    <Link :href="route('job-services.show', item.slug)">{{
                      item.title
                    }}</Link>
                  </li>
                </ul>
              </div>
              <!-- /.job-search-one -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-lazy="home.hero.image1" alt="image" class="lazy-img shapes screen01" />
    <img v-lazy="home.hero.image2" alt="image" class="lazy-img shapes screen02" />
  </div>
</template>
