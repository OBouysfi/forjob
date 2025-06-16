<script setup>
import { ref, onMounted } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import trans from '@/Composables/transComposable'
import { onBeforeMount } from 'vue'

import HomeOne from '@/Pages/Admin/PageSetting/Home/Partials/HomeOne.vue'
import HomeTwo from '@/Pages/Admin/PageSetting/Home/Partials/HomeTwo.vue'
import HomeThree from '@/Pages/Admin/PageSetting/Home/Partials/HomeThree.vue'
import HomeFour from '@/Pages/Admin/PageSetting/Home/Partials/HomeFour.vue'
import HomeFive from '@/Pages/Admin/PageSetting/Home/Partials/HomeFive.vue'
import HomeSix from '@/Pages/Admin/PageSetting/Home/Partials/HomeSix.vue'
import HomeSeven from '@/Pages/Admin/PageSetting/Home/Partials/HomeSeven.vue'

const { data, theme } = defineProps(['data', 'theme'])

const home = ref({ ...data })

const isProcessing = ref(false)

onBeforeMount(() => {
  let properties = ['hero', 'cta_s1', 'cta_s2', 'cta_s3', 'cta_s4', 'footer_cats','category_section','feedback_section']
  properties.forEach(key => (home.value[key] = home.value[key] || {}))

  // home 2 | 4
  if (!home.value.cta_s2?.features?.length && ['themeTwo', 'themeFour'].includes(theme)) {
    home.value.cta_s2.features = [
      {
        title: '',
        body: ''
      }
    ]
  }

  // home 3 | 5 | 7
  if (
    !home.value.cta_s1?.features?.length &&
    ['themeThree', 'themeFive', 'themeSeven'].includes(theme)
  ) {
    home.value.cta_s1.features = [
      {
        title: '',
        body: ''
      }
    ]
  }
  // home 6
  if (
    !home.value.cta_s1?.steps?.length &&
    ['themeSix'].includes(theme)
  ) {
    home.value.cta_s1.steps = [
      {
        title: '',
        text: '',
        link: ''
      },
      {
        title: '',
        text: '',
        link: ''
      },
      {
        title: '',
        text: '',
        link: ''
      },
    ]
  }

  if (!home.value?.footer_cats?.length && ['themeThree'].includes(theme)) {
    home.value.footer_cats = [
      {
        id: 1,
        title: '',
        items: [
          {
            text: '',
            url: ''
          }
        ]
      },
      {
        id: 2,
        title: '',
        items: [
          {
            text: '',
            url: ''
          }
        ]
      },
      {
        id: 3,
        title: '',
        items: [
          {
            text: '',
            url: ''
          }
        ]
      },
      {
        id: 4,
        title: '',
        items: [
          {
            text: '',
            url: ''
          }
        ]
      }
    ]
  }
})

const submit = () => {
  isProcessing.value = true
  router.post(
    route('admin.page-settings.update', 'home-page'),
    {
      _method: 'PUT',
      home: home.value,
      theme: theme
    },
    {
      onSuccess: () => notify.success(trans('Home Page Updated successfully')),
      onFinish: () => (isProcessing.value = false)
    }
  )
}

const addItem = () => {}

const themeForm = useForm({
  theme: theme ?? 'themeOne'
})

const setTheme = () => {
  themeForm.get(location.href)
}
</script>

<template>
  <div class="tabs-panel active" id="homepage">
    <div class="mb-4 text-center">
      Active:
      <span class="px-2 py-1 text-white bg-blue-900 rounded">
        {{ theme }}
      </span>
    </div>

    <select class="mb-4 select" @change="setTheme" v-model="themeForm.theme">
      <option value="themeOne">themeOne</option>
      <option value="themeTwo">themeTwo</option>
      <option value="themeThree">themeThree</option>
      <option value="themeFour">themeFour</option>
      <option value="themeFive">themeFive</option>
      <option value="themeSix">themeSix</option>
      <option value="themeSeven">themeSeven</option>
    </select>

    <form @submit.prevent="submit">
      <HomeOne v-if="theme == 'themeOne'" :data="home" />
      <HomeTwo v-if="theme == 'themeTwo'" :data="home" />
      <HomeThree v-if="theme == 'themeThree'" :data="home" />
      <HomeFour v-if="theme == 'themeFour'" :data="home" />
      <HomeFive v-if="theme == 'themeFive'" :data="home" />
      <HomeSix v-if="theme == 'themeSix'" :data="home" />
      <HomeSeven v-if="theme == 'themeSeven'" :data="home" />

      <div class="mb-2">
        <SpinnerBtn :processing="isProcessing" :btn-text="trans('Save Changes')" />
      </div>
    </form>
  </div>
</template>
