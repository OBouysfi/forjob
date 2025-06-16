<script setup>
import sharedComposable from '@/Composables/sharedComposable'
import JobIntro from '@/Pages/Web/Candidate/Partials/JobIntro.vue'
import DefaultLayout from '@/Layouts/Default.vue'
import Breadcrumb from '@/Components/Breadcrumb.vue'
defineOptions({ layout: DefaultLayout })

const props = defineProps(['plans', 'seo'])
const { formatCurrency, authUser } = sharedComposable()
</script>

<template>
  <Seo/>
  <Breadcrumb
    :title="trans('Pricing')"
    href="/"
    :href-text="trans('Home')"
    :subtitle="trans('Pricing')"
  />

  <section class="pricing-section pt-100 lg-pt-80 pb-120 lg-pb-80">
    <div class="container">
      <div class="text-center title-one mb-55 lg-mb-20">
        <h2 class="text-dark fw-normal">{{ trans('Simple Plan for All') }}</h2>
      </div>

      <div class="row">
        <div class="m-auto col-xxl-10">
          <div class="row justify-content-center">
            <template v-for="plan in plans" :key="plan.id">
              <div class="col-lg-4 col-md-6">
                <div
                  class="pricing-card-one mt-25"
                  :class="{
                    popular: plan.is_recommended === 1
                  }"
                >
                  <div class="popular-badge" v-if="plan.is_recommended">{{ trans('popular') }}</div>
                  <div class="pack-name">{{ plan.title }}</div>
                  <div class="price fw-500">
                    <sub>{{ formatCurrency(plan.price)[0] }}</sub>
                    {{ plan.price }}
                    <sup>{{ formatCurrency(plan.price).split('.')[1] }}</sup>
                  </div>
                  <ul class="style-none">
                    <li class="text-capitalize" v-for="(data, key) in plan.data" :key="data.key">
                      {{ key.replace(/_/g, ' ') }} {{ data }}
                    </li>
                  </ul>
                  <a
                    :href="
                      authUser && authUser.role === 'employer'
                        ? route('employer.membership.payment', plan.id)
                        : route('register', { id: plan.id })
                    "
                    class="get-plan-btn tran3s w-100 mt-30"
                  >
                    {{ trans('Choose Plan') }}
                  </a>
                </div>
              </div>
            </template>
          </div>

          <div class="row">
            <div class="m-auto col-xl-5 col-lg-8">
              <p class="text-center lg-mt-30 mt-60">
                {{
                  trans(`We've done it carefully and simply. Combined with the ingredients makes for
                beautiful landings.`)
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <JobIntro />
</template>
