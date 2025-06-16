<script setup>
import { onMounted, ref } from 'vue'
import homeApiService from "@/Composables/homeApiService"

const faqs = ref([])
const loading = ref(true)

onMounted(async () => {
    homeApiService.get('faqs').then(res => {
        faqs.value = res
        loading.value = false
    })
})

</script>

<template>
    <section class="faq-section position-relative mt-180 xl-mt-150 lg-mt-100 mb-150 lg-mb-100">
        <div class="container">
            <div class="title-one text-center">
                <h2 class="text-dark">{{ trans('Questions & Answers') }}</h2>
            </div>
            <div class="bg-wrapper mt-60 lg-mt-40">
                <div class="accordion accordion-style-two" id="accordionTwo">
                    <div class="accordion-item" v-for="(item, index) in faqs" :key="index">
                        <div class="accordion-header" :id="`Fheading${index}F`">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                :data-bs-target="`#Fcollapse${index}`" aria-expanded="false"
                                :aria-controls="`Fcollapse${index}`">
                                {{ item.title }}
                            </button>
                        </div>
                        <div :id="`Fcollapse${index}`" class="accordion-collapse collapse"
                            :aria-labelledby="`Fheading${index}`" :data-bs-parent="`#accordionTwo`">
                            <div class="accordion-body">
                                <p>{{ item.excerpt?.value }}</p>
                            </div>
                        </div>
                    </div>
                </div> <!-- /.accordion-style-two -->
            </div>
            <!-- ./bg-wrapper -->
            <div class="text-center mt-50 sm-mt-40 wow fadeInUp">
                <div class="btn-eight fw-500">
                    {{ trans('Don’t find the answer? We can help.') }}
                    <Link href="/faq">{{ trans('Click here') }}</Link>
                </div>
            </div>
        </div>
    </section>
</template>