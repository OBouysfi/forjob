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
    <section class="faq-section position-relative mt-180 xl-mt-150 lg-mt-80">
        <div class="container">
            <div class="title-one text-center">
                <h2 class="main-font">{{ trans('Questions & Answers') }}</h2>
            </div>
            <div class="mt-60 lg-mt-30">
                <div class="row">
                    <div class="col-xxl-11 m-auto">
                        <div class="accordion accordion-style-two" id="accordionTwo">
                            <div class="accordion-item" v-for="(item, index) in faqs" :key="index">
                                <div class="accordion-header" :id="`Fheading${index}F`">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="`#Fcollapse${index}`" aria-expanded="false" :aria-controls="`Fcollapse${index}`">
                                        {{ item.title }}
                                    </button>
                                </div>
                                <div :id="`Fcollapse${index}`" class="accordion-collapse collapse" :aria-labelledby="`Fheading${index}`"
                                    :data-bs-parent="`#accordionTwo`">
                                    <div class="accordion-body">
                                        <p>{{ item.excerpt?.value }}</p>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- /.accordion-style-two -->
                    </div>
                </div>
            </div>
            <!-- ./bg-wrapper -->
            <div class="text-center mt-50 lg-mt-30 wow fadeInUp">
                <div class="btn-eight fw-500">{{ trans('Don’t find the answer? We can help.') }} <Link href="/faq">{{ trans('Click here') }}</Link></div>
            </div>
        </div>
    </section>
</template>