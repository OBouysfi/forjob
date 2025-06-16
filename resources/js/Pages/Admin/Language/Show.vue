<template>
  <main class="container flex-grow p-4 sm:p6">
    <HeaderSegment title="Edit Language" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <form @submit.prevent="updateLanguage" method="post">

        <div class="table-responsive whitespace-nowrap rounded-primary">
          <table class="table">
            <thead>
              <tr>
                <th class="col-6">{{ trans("Translation Key") }}</th>
                <th class="col-6">{{ trans("Translated Value") }}</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(value, key) in posts" :key="key">
                <td>
                  {{ key }}
                </td>
                <td>
                  <input type="text" class="input" v-model="posts[key]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <SpinnerBtn :btn-text="trans('Save Changes')" :processing="isProccessing" />
        </div>
      </form>
    </div>

  </main>

  <div id="addNewLanguageKeyDrawer" class="drawer drawer-right">
    <form @submit.prevent="createKey()">
      <div class="drawer-header">
        <h5>{{ trans("Add New Language") }}</h5>
        <button type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer">
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans("Key") }}</label>
          <input type="text" name="key" v-model="form.key" class="input" required />
        </div>
        <div class="mb-2">
          <label>{{ trans("Value") }}</label>
          <input type="text" name="value" v-model="form.value" class="input" required />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans("Close") }}</span>
          </button>
          <SpinnerBtn classes="w-full btn btn-primary" :processing="form.processing" :btn-text="trans('Create')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import drawer from "@/Plugins/Admin/drawer"
import notify from "@/Plugins/Admin/notify"
import { useForm, router } from "@inertiajs/vue3"
import trans from '@/Composables/transComposable'
import { ref } from "vue"
import { onMounted } from "vue"


defineOptions({ layout: AdminLayout })


onMounted(() => {
  drawer.init()
})


const props = defineProps([
  'posts',
  'id',
  'buttons',
  'segments',
])

const form = useForm({
  key: '',
  value: '',
  id: props.id
})


const createKey = () => {
  form.post('/admin/language/addkey', {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Language key has been added successfully'))
      drawer.of('#addNewLanguageKeyDrawer').hide()
    }
  })
}

const isProccessing = ref(false)

const updateLanguage = () => {
  isProccessing.value = true
  router.patch(route('admin.language.update', props.id), {
    values: props.posts
  }, {
    onSuccess: () => {
      form.reset()
      isProccessing.value = false
      notify.success(trans('Language key has been added successfully'))
    }
  })
}
</script>
