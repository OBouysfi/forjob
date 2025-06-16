<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper"
import { onMounted, ref } from "vue"
import homeApiService from "@/Composables/homeApiService"

import "swiper/css"
import "swiper/css/navigation"

const navigationOptions = {
    nextEl: ".next_a",
    prevEl: ".prev_a"
}
const modules = [Navigation]

const feedbacks = ref([])
const brands = ref([])
const loading = ref(true)

onMounted(() => {
    homeApiService.get('feedbacks').then(res => {
        feedbacks.value = res
    })

    homeApiService.get('brands').then(res => {
        brands.value = res
        loading.value = false
    })
})

</script>

<template>
    <section class="feedback-section-one pt-120 lg-pt-100">
        <div class="container position-relative">
            <div class="row">
                <div class="col-lg-6 col-md-7">
                    <div class="title-one mb-65 md-mb-50">
                        <h2 class="main-font">{{ trans('Trusted by leading startups.') }}</h2>
                    </div>
                </div>
            </div>

            <Swiper :slides-per-view="2" :space-between="30" :modules="modules" :navigation="navigationOptions">
                <SwiperSlide class="feedback-block-one color-two " v-for="(item, index) in feedbacks" :key="index">
                    <div class="logo">
                        <img :src="item.banner_logo" alt="" />
                    </div>
                    <blockquote class="fw-500 mt-50 md-mt-30 mb-50 md-mb-30  text-white">
                        “{{ item.review }}”
                    </blockquote>
                    <div class="name text-white">
                        <span class="fw-500">{{ item.author }},</span> {{ item.author_designation }}
                    </div>
                    <div class="review md-pt-20 md-mt-30 d-flex justify-content-between align-items-center mt-40 pt-40">
                        <div class="text-md fw-500 text-white">{{ item.ratting_point }} {{ item.rating_type }}</div>
                        <ul class="style-none d-flex">
                            <li v-for="sl in 5" :key="sl">
                                <a href="#"><i :class="sl <= item.ratting_point ? 'bi bi-star-fill' : 'bi bi-star'"></i></a>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>
            </Swiper>

            <ul v-if="feedbacks?.length > 2"
                class="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
                <li class="prev_a slick-arrow">
                    <i class="bi bi-arrow-left"></i>
                </li>
                <li class="next_a slick-arrow">
                    <i class="bi bi-arrow-right"></i>
                </li>
            </ul>

        </div>
    </section>
</template>