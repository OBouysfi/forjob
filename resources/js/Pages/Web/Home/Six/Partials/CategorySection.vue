<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from "@/Composables/homeApiService"

const categories = ref([])
const loading = ref(true)

const colors = ['#EAFBFD', '#FFFAEC', '#FFEBFB', '#E8F7E9', '#F7F5FF', '#FFF3EA']


onMounted(async () => {
    homeApiService.get('featuredCategories').then(res => {
        categories.value = res
        loading.value = false
    })
})

</script>

<template>
    <section class="category-section-five position-relative mt-85 md-mt-60">
        <div class="container">
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-8">
                    <div class="title-four text-center text-lg-start">
                        <h2>{{ trans('Most Demanding Categories.') }}</h2>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-flex justify-content-lg-end">
                        <Link href="/jobs" class="btn-six dark d-none d-lg-inline-block">{{ trans('Explore all fields') }}
                        </Link>
                    </div>
                </div>
            </div>
            <div class="card-wrapper d-flex flex-wrap justify-content-center justify-content-lg-between pt-50 lg-pt-30">

                <div v-for="(item, index) in categories" :key="index"
                    class="card-style-seven text-center mt-15 wow fadeInUp">
                    <Link :href="route('job-categories.show', item.slug)" class="wrapper d-flex align-items-center"
                        :style="{ 'background-color': colors[index] }">
                    <div class="icon d-flex align-items-center justify-content-center">
                        <img v-lazy="item.preview" alt="shape" class="lazy-img category-section-img" />
                        </div>
                    <div class="title fw-500">{{ item.title }}</div>
                    </Link>
                </div>

            </div>
            <!-- /.card-wrapper -->
            <div class="text-center mt-40 d-lg-none">
                <Link href="/jobs" class="btn-six dark">{{ trans('Explore all fields') }}</Link>
            </div>
        </div>
    </section>
</template>
