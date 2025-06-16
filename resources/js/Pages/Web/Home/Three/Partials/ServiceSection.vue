<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from "@/Composables/homeApiService"
import { Link } from '@inertiajs/vue3'
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"

const navigationOptions = {
    nextEl: ".next_a",
    prevEl: ".prev_a"
}
const modules = [Navigation]

const categories = ref([])
const loading = ref(true)

onMounted(async () => {
    homeApiService.get('featuredServices').then(res => {
        categories.value = res
        loading.value = false
    })
})

</script>
<template>
    <section class="category-section-three pt-85 pb-140 lg-pb-100">
        <div class="container">
            <div class="position-relative">
                <div class="title-two mb-60 lg-mb-40">
                    <h2 class="fw-600 color-blue">{{ trans('Trending Services') }}</h2>
                </div>
                <div class="card-wrapper">
                    <Swiper class="item" :slides-per-view="4" :space-between="30" :modules="modules"
                        :navigation="navigationOptions">
                        <SwiperSlide v-for="(item, index) in categories" :key="index">
                            <div class="card-style-six position-relative"
                                :style="{ backgroundImage: `url(${item.preview})` }">
                                <Link :href="route('job-categories.show', item.slug)"
                                    class="w-100 h-100 ps-4 pb-20 d-flex align-items-end">
                                <div class="title text-white fw-500 text-lg">{{ item.title }}</div>
                                </Link>
                            </div>
                            <!-- /.card-style-six -->
                        </SwiperSlide>
                    </Swiper>
                </div>
                <!-- /.card-wrapper -->
                <ul v-show="categories?.length > 4"
                    class="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
                    <li class="prev_a slick-arrow">
                        <i class="bi bi-arrow-left"></i>
                    </li>
                    <li class="next_a slick-arrow">
                        <i class="bi bi-arrow-right"></i>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>