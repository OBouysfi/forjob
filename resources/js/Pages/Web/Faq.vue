<script setup>
import { computed, ref } from 'vue'
import DefaultLayout from '@/Layouts/Default.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'

defineOptions({ layout: DefaultLayout })
const props = defineProps(['faqs', 'seo'])

const tabsItems = computed(() => {
  return new Set(props.faqs.map((f) => f.faq_categories?.[0]?.slug))
})
const activeTabValue = ref('')

const filterFaq = computed(() => {
  if (activeTabValue.value) {
    return props.faqs.filter((faq) => faq.faq_categories?.[0]?.slug.includes(activeTabValue.value))
  } else {
    return props.faqs
  }
})
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumb
    :title="trans('Question & Answers')"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('Question & Answers')"
  />

  <!-- /.inner-banner-one -->

  <section class="faq-section position-relative pt-100 lg-pt-80">
    <div class="container">
      <ul class="nav nav-tabs justify-content-center border-0" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            @click="activeTabValue = ''"
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#fc1"
            role="tab"
          >
            {{ trans('All') }}
          </button>
        </li>
        <li v-for="(tab, i) in tabsItems" :key="i" class="nav-item" role="presentation">
          <button
            @click="activeTabValue = tab"
            class="nav-link text-capitalize"
            data-bs-toggle="tab"
            :data-bs-target="`#fc2`"
            role="tab"
          >
            {{ tab ? tab.replace(/-/g, ' ') : tab }}
          </button>
        </li>
      </ul>
      <div class="bg-wrapper lg-mt-40 mt-60">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" role="tabpanel" id="fc1">
            <div class="accordion accordion-style-two" id="accordionTwo">
              <div class="accordion-item" v-for="(faq, i) in filterFaq" :key="faq.id">
                <div class="accordion-header" id="FheadingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${faq.slug + i}`"
                    aria-expanded="false"
                    :aria-controls="faq.slug + i"
                  >
                    {{ faq.title }}
                  </button>
                </div>
                <div
                  :id="faq.slug + i"
                  class="accordion-collapse collapse"
                  aria-labelledby="FheadingOne"
                  data-bs-parent="#accordionTwo"
                >
                  <div class="accordion-body">
                    <p>
                      {{ faq.excerpt.value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.accordion-style-two -->
          </div>
          <!-- /.tab-pane -->
          <div class="tab-pane fade" role="tabpanel" id="fc2">
            <div class="accordion accordion-style-two" id="accordionThree">
              <div class="accordion-item" v-for="(faq, i) in filterFaq" :key="faq.id">
                <div class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${faq.slug + i}`"
                    aria-expanded="false"
                    :aria-controls="faq.slug + i"
                  >
                    {{ faq.title }}
                  </button>
                </div>
                <div
                  :id="faq.slug + i"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionThree"
                >
                  <div class="accordion-body">
                    <p>
                      {{ faq.excerpt.value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-bottom pb-150 lg-pb-50 lg-mt-40 wow fadeInUp mt-60 text-center">
        <div class="title-three mb-30">
          <h2 class="fw-normal">{{ trans('Don’t get your answer?') }}</h2>
        </div>
        <Link href="/contact-us" class="btn-one">{{ trans('Contact Us') }}</Link>
      </div>
    </div>
  </section>
</template>
