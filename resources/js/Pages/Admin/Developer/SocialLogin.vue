<script>
import AdminLayout from "@/Layouts/Admin.vue";
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import notify from "@/Plugins/Admin/notify";
export default {
  layout: AdminLayout,
};
</script>

<script setup>
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import { useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
const props = defineProps([
  "segments",
  "buttons",
  "id",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URL",
  "FACEBOOK_CLIENT_ID",
  "FACEBOOK_CLIENT_SECRET",
  "FACEBOOK_REDIRECT_URL",
]);

const form = useForm({
  GOOGLE_CLIENT_ID: props.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: props.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: props.GOOGLE_REDIRECT_URL,
  FACEBOOK_CLIENT_ID: props.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: props.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL: props.FACEBOOK_REDIRECT_URL,
});

function update() {
  const url = route("admin.developer-settings.update", props.id);
  form.put(url, {
    onSuccess: () => {
      notify.success(trans("Settings has been updated successfully"));
    },
  });
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Social Login Developer Settings')"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <strong>{{ trans("Social Login Developer Settings") }}</strong>
          <p>{{ trans("Edit you application Social Login Api settings") }}</p>
        </div>
        <div class="lg:col-span-7">
          <form @submit.prevent="update">
            <div class="card">
              <div class="card-body">
                <h6>Google Api</h6>
                <div class="mb-2">
                  <label class="label">{{ trans("Google Client ID") }}</label>
                  <input type="text" v-model="form.GOOGLE_CLIENT_ID" class="input" />
                </div>
                <div class="mb-2">
                  <label class="label">{{ trans("Google Client Secret") }}</label>
                  <input type="text" v-model="form.GOOGLE_CLIENT_SECRET" class="input" />
                </div>
                <div class="mb-2">
                  <label class="label">{{ trans("Google Redirect Url") }}</label>
                 
                  <input type="text" :value="GOOGLE_REDIRECT_URL" disabled class="input" />
                </div>

                <div class="mt-3">
                  <SpinnerBtn
                    :processing="form.processing"
                    :btn-text="trans('Save Changes')"
                  />
                </div>
              </div>
            </div>
            <div class="mt-5 card">
              <div class="card-body">
                <h6>Facebook Graph Api</h6>
                <div class="mb-2">
                  <label class="label">{{ trans("Facebook Client Id") }}</label>
                  <input type="text" v-model="form.FACEBOOK_CLIENT_ID" class="input" />
                </div>
                <div class="mb-2">
                  <label class="label">{{ trans("Facebook Client Secret") }}</label>
                  <input
                    type="text"
                    v-model="form.FACEBOOK_CLIENT_SECRET"
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label class="label">{{ trans("Facebook Redirect Url") }}</label>
                  <input type="text" :value="FACEBOOK_REDIRECT_URL" disabled class="input" />
                </div>

                <div class="mt-3">
                  <SpinnerBtn
                    :processing="form.processing"
                    :btn-text="trans('Save Changes')"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
