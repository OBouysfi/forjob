<script setup>
import { Head, router } from '@inertiajs/vue3'

import sharedComposable from '@/Composables/sharedComposable'
import UserLayout from '@/Layouts/User.vue'
import trans from '@/Composables/transComposable'
import notify from '@/Plugins/Admin/notify'
import { computed } from 'vue'

defineOptions({ layout: UserLayout })
const props = defineProps(['templates', 'credits', 'bookmarked'])
const { textExcerpt } = sharedComposable()
const stats = computed(() => {
  return [
    {
      value: props.templates.length,
      title: trans('Total'),
      iconSrc: '/assets/dashboard/images/icon/icon_12.svg'
    },
    {
      value: props.bookmarked?.length ?? 0,
      title: trans('Bookmarked'),
      iconSrc: '/assets/dashboard/images/icon/icon_13.svg'
    },
    {
      value: props.credits,
      title: trans('Credits'),
      iconSrc: '/assets/dashboard/images/icon/icon_43.svg'
    }
  ]
})

const bookmark = (id, bookmarked) => {
  router.post(
    route('user.ai-template.bookmark'),
    {
      ai_template_id: id
    },
    {
      onSuccess: () => {
        if (bookmarked == 1) {
          notify.danger('Bookmarked Removed Successfully')
        } else {
          notify.success('Bookmarked Successfully')
        }
      }
    }
  )
}
</script>

<template>
  <Head title="Ai Templates | User Panel" />

  <h2 class="main-title">{{ trans('Ai Templates') }}</h2>

  <div>
    <div class="row">
      <div class="col-lg-4 col-6" v-for="stat in stats" :key="stat">
        <div class="dash-card-one border-30 position-relative mb-15 bg-white">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div
              class="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"
            >
              <img v-lazy="stat.iconSrc" alt="lazy" class="lazy-img" />
            </div>
            <div class="order-sm-0">
              <div class="value fw-500">{{ stat.value }}</div>
              <span>{{ stat.title }}</span>
            </div>
          </div>
        </div>
        <!-- /.dash-card-one -->
      </div>
    </div>

    <div class="row mt-30">
      <div class="col-lg-4 mb-30" v-for="temp in templates" :key="temp.id">
        <div class="job-list-three d-flex h-100 w-100">
          <div class="main-wrapper h-100 w-100">
            <button
              @click="bookmark(temp.id, temp.isBookmarked)"
              type="button"
              class="save-btn rounded-circle tran3s text-center"
              :class="{ 'bg-success': temp.isBookmarked == 1 }"
              title="Save Job"
            >
              <i class="bi bi-bookmark-dash"></i>
            </button>
            <div class="list-header d-flex align-items-center">
              <Link :href="route('user.ai-template.show', temp.uuid)" class="logo"
                ><img
                  v-lazy="
                    temp.icon == null
                      ? `https://ui-avatars.com/api/?name=${temp.title}`
                      : `${temp.icon}`
                  "
                  alt="avatar rounded-circle"
                  class="lazy-img m-auto"
              /></Link>
              <div class="info-wrapper">
                <Link :href="route('user.ai-template.show', temp.uuid)" class="title fw-500 tran3s">
                  {{ temp.title }}
                </Link>
                <ul class="style-none d-flex info-data flex-wrap">
                  <li>{{ temp.ai_model }}</li>
                </ul>
              </div>
            </div>
            <!-- ./.list-header -->
            <div v-html="textExcerpt(temp.description, 100)"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="templates.length < 1" class="fw-bold card-box bg-white text-center">
      {{ trans('No Template found') }}
    </div>
  </div>
</template>
