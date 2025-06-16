<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from "@/Composables/homeApiService"
import { Link } from '@inertiajs/vue3'

const companies = ref([])
const loading = ref(true)

onMounted(async () => {
    homeApiService.get('companies').then(res => {
        companies.value = res
        loading.value = false
    })
})

</script>

<template>
    <section class="top-company-section pt-100 lg-pt-60 pb-130 lg-pb-80 mt-200 xl-mt-150" v-if="companies.length > 0">
        <div class="container">
            <div class="row justify-content-between align-items-center pb-40 lg-pb-10">
                <div class="col-sm-7">
                    <div class="title-one">
                        <h2 class="main-font">{{ trans('Top Company') }}</h2>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="d-flex justify-content-sm-end">
                        <Link :href="route('companies.index')" class="btn-six d-none d-sm-inline-block">
                        {{ trans('Explore More') }}</Link>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-sm-6" v-for="(item, index) in companies" :key="index">
                    <div class="card-style-ten text-center tran3s mt-25 wow fadeInUp">
                        <img :src="item.avatar == null
                            ? `https://ui-avatars.com/api/?name=${item.name}`
                            : `${item.avatar}`
                            " :alt="item.name" class="lazy-img m-auto">
                        <div class="text-lg fw-500 text-dark mt-15 mb-30">{{ item.name }}</div>
                        <p class="mb-20">{{ item.location }}</p>
                        <Link :href="route('companies.show', item.username)" class="open-job-btn fw-500 tran3s">
                        {{ item.open_jobs_count }} {{ trans('open jobs') }}</Link>
                    </div>
                </div>
            </div>

            <div class="text-center mt-30 d-sm-none">
                <Link :href="route('companies.index')" class="btn-six">{{ trans('Explore More') }}</Link>
            </div>
        </div>
    </section>
</template>