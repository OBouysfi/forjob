<script setup>
import { ref, onMounted } from "vue"
import tabs from "@/Plugins/Admin/tabs"
import { router } from "@inertiajs/vue3"
import trans from '@/Composables/transComposable'
import notify from "@/Plugins/Admin/notify"
import AdminLayout from "@/Layouts/Admin.vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import HomePageSetting from "@/Pages/Admin/PageSetting/Home/HomePageSetting.vue"
defineOptions({ layout: AdminLayout })

const props = defineProps([
  "primary_data",
  "headerFooter",
  "contact_page",
  "home",
  "features_area",
  "brand_area",
  "account_area",
  "why_choose",
  "buttons",
  "segments",
  "theme"
])


onMounted(() => {
  tabs.init()
})


const isProcessing = ref(false)


const updatePrimaryData = (...data) => {
  const primary_data = Object.assign({}, ...data)

  const fileProperties = ["logo", "favicon", "deep_logo"]
  fileProperties.forEach((property) => {
    if (!(primary_data[property] instanceof File)) {
      primary_data[property] = null
    }
  })

  isProcessing.value = true
  router.post(
    route("admin.page-settings.update", "primary_data"),
    {
      _method: "PUT",
      primary_data: primary_data,
    },
    {
      onSuccess: () => {
        isProcessing.value = false
        notify.success(trans('Primary Data Updated successfully'))
      },
    }
  )
}

const updateContactPage = (...data) => {
  const contact_page = Object.assign({}, ...data)

  router.put(
    route("admin.page-settings.update", "contact-page"),
    {
      contact_page,
    },
    {
      onSuccess: () => {
        isProcessing.value = false

        notify.success(trans('Contact Page Updated successfully'))
      },
    }
  )
}

</script>


<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Page Settings" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div class="card">

        <div class="card-body">
          <div class="tabs tabs-vertical">

            <ul class="tabs-list w-72">
              <li class="tabs-item">

              <li class="tabs-item">
                <button class="tabs-btn active" data-panel-id="#homepage" type="button">
                  <span>{{ trans("Home Page") }}</span>
                </button>
              </li>

              <button class="tabs-btn" data-panel-id="#primary" type="button">
                <span>{{ trans("Primary") }}</span>
              </button>
              </li>


              <li class="tabs-item">
                <button class="tabs-btn" data-panel-id="#contact" type="button">
                  <span>{{ trans("Contact Page") }}</span>
                </button>
              </li>

            </ul>

            <div class="tabs-content">

              <HomePageSetting :data="home" :theme="props.theme" />
              <div class="tabs-panel" id="primary">
                <form method="POST" @submit.prevent="
                  updatePrimaryData(primary_data)
                  " enctype="multipart/form-data">
                  <div class="mb-2">
                    <label>{{ trans("Site Logo - light Color") }}</label>
                    <input type="file" @input="(e) => (primary_data.logo = e.target.files[0])" accept="image/*"
                      name="logo" class="input" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Site Logo - Deep color") }}</label>
                    <input type="file" accept="image/*" name="deep_logo" @input="(e) => (primary_data.deep_logo = e.target.files[0])
                      " class="input" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Favicon") }}</label>
                    <input type="file" accept="image/*" name="favicon" @input="(e) => (primary_data.favicon = e.target.files[0])
                      " class="input" />
                  </div>

                  <div class="mb-2">
                    <label>{{ trans("Contact Email address") }}</label>
                    <input type="email" name="contact_email" v-model="primary_data.contact_email" class="input"
                      required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Contact Phone") }}</label>
                    <input type="number" name="contact_phone" class="input" required
                      v-model="primary_data.contact_phone" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Office Location") }}</label>
                    <input type="text" name="address" class="input" required="" v-model="primary_data.address" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Facebook Profile Link") }}</label>
                    <input type="url" name="socials[facebook]" class="input" v-model="primary_data.socials.facebook" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Youtube Profile Link") }}</label>
                    <input type="url" name="socials[youtube]" class="input" v-model="primary_data.socials.youtube" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Twitter Profile Link") }}</label>
                    <input type="url" name="socials[twitter]" class="input" v-model="primary_data.socials.twitter" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Instagram Profile Link") }}</label>
                    <input type="url" name="socials[instagram]" class="input" v-model="primary_data.socials.instagram" />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Linkedin Profile Link") }}</label>
                    <input type="url" name="socials[linkedin]" class="input" v-model="primary_data.socials.linkedin" />
                  </div>
                  <div class="mb-2">
                    <SpinnerBtn :processing="isProcessing" :btn-text="trans('Save Changes')" />
                  </div>

                </form>
              </div>

              <div class="tabs-panel" id="contact">
                <form method="POST" @submit.prevent="updateContactPage(contact_page)"
                  enctype="multipart/form-data">
                  <div class="mb-2">
                    <label>{{ trans("Office Address") }}</label>
                    <input type="text" class="input" v-model="contact_page.address" required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Country Name") }}</label>
                    <input type="text" class="input" v-model="contact_page.country" required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Google Map Link") }}</label>
                    <input type="text" class="input" v-model="contact_page.map_link" required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Contact Info subtitle") }}</label>
                    <input type="text" class="input" v-model="contact_page.contact_info_text" required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Contact Info Number") }}</label>
                    <input type="tel" class="input" v-model="contact_page.contact_info_number" required />
                  </div>

                  <div class="mb-2">
                    <label>{{ trans("Live Support subtitle") }}</label>
                    <input type="text" class="input" v-model="contact_page.live_chat_service_text" required />
                  </div>
                  <div class="mb-2">
                    <label>{{ trans("Live Support Website") }}</label>
                    <input type="text" class="input" v-model="contact_page.live_chat_service_website" required />
                  </div>

                  <div class="mb-2">
                    <SpinnerBtn :processing="isProcessing" :btn-text="trans('Save Changes')" />
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
hr {
  margin: 30px 0;
}
</style>
