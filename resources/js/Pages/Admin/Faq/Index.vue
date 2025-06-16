<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Frequently asked questions')"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans("Question") }}</th>
              <th>{{ trans("Answer") }}</th>
              <th class="text-right">{{ trans("Category") }}</th>
              <th class="text-right">{{ trans("Language") }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="faqs.total">
            <tr v-for="faq in faqs.data" :key="faq.id">
              <td class="text-left">
                {{ textExcerpt(faq.title, 20) }}
              </td>
              <td class="text-left">
                {{ textExcerpt(faq.excerpt.value, 70) }}
              </td>
              <td class="text-left">
                {{ textExcerpt(faq.faq_categories[0]?.title || "", 70) }}
              </td>
              <td class="text-right">
                {{ faq.lang }}
              </td>
              <td class="flex justify-end">
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i
                      class="w-6 text-slate-400"
                      data-feather="more-horizontal"
                    ></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <button
                          type="button"
                          @click="openEditFaqDrawer(faq)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans("Edit") }}</span>
                        </button>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          class="dropdown-link"
                          @click="deleteRow('/admin/faq/' + faq.id)"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans("Remove") }}></i
                          >
                          <span>{{ trans("Delete") }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>

      <div class="card-footer py-4">
        <Paginate :links="faqs.links" />
      </div>
    </div>
  </main>

  <div id="addNewFaqDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeFaq()">
      <div class="drawer-header">
        <h5>{{ trans("Add New Faq") }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans("Question") }}</label>
          <input
            type="text"
            v-model="createFrom.question"
            maxlength="150"
            class="input"
            required=""
          />
        </div>
        <div class="mb-2">
          <label>{{ trans("Answer") }}</label>
          <textarea
            class="textarea h-100"
            maxlength="500"
            v-model="createFrom.answer"
            required=""
          ></textarea>
        </div>

        <div class="mb-2">
          <label>{{ trans("Select Category") }}</label>
          <select
            class="select"
            name="category"
            v-model="createFrom.categories"
            required
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans("Select Language") }}</label>
          <select
            class="select"
            name="language"
            required=""
            v-model="createFrom.language"
          >
            <option
              v-for="(language, languageKey) in languages"
              :key="language.key"
              :value="languageKey"
            >
              {{ language }}
            </option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans("Close") }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="createFrom.processing"
            :btn-text="trans('Create')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editFaqDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateFaq()">
      <div class="drawer-header">
        <h5>{{ trans("Edit Faq") }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans("Question") }}</label>
          <input
            type="text"
            name="question"
            v-model="editForm.question"
            maxlength="150"
            class="input"
            id="question"
            required=""
          />
        </div>
        <div class="mb-2">
          <label>{{ trans("Answer") }}</label>
          <textarea
            class="textarea h-100"
            v-model="editForm.answer"
            maxlength="500"
            name="answer"
            required=""
            id="answer"
          ></textarea>
        </div>

        <div class="mb-2">
          <label>{{ trans("Select Categories") }}</label>
          <select
            class="select"
            name="position"
            v-model="editForm.categories"
            id="position"
            required
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              :selected="category.id == editForm.categories"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans("Select Language") }}</label>
          <select
            class="select"
            name="language"
            required=""
            v-model="editForm.language"
          >
            <option
              v-for="(language, languageKey) in languages"
              :key="language.key"
              :value="languageKey"
            >
              {{ language }}
            </option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans("Close") }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AdminLayout from "@/Layouts/Admin.vue"
import notify from "@/Plugins/Admin/notify"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import { onMounted } from "vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { useForm, router } from "@inertiajs/vue3"
import trans from '@/Composables/transComposable'
import Paginate from "@/Components/Paginate.vue"
import sharedComposable from "@/Composables/sharedComposable"
import drawer from "@/Plugins/Admin/drawer"
import NoDataFound from "@/Components/Admin/NoDataFound.vue"

export default {
  layout: AdminLayout
}
</script>

<script setup>
onMounted(() => {
  drawer.init()
})

const props = defineProps([
  "segments",
  "buttons",
  "faqs",
  "languages",
  "categories"
])
const { textExcerpt, deleteRow } = sharedComposable()

const createFrom = useForm({
  question: null,
  answer: null,
  categories: null,
  language: null
})

const editForm = useForm({
  question: null,
  answer: null,
  categories: null,
  language: null,
  id: null
})

function openEditFaqDrawer(faq) {
  editForm.question = faq.title
  editForm.answer = faq.excerpt.value
  editForm.categories = faq.faq_categories[0]?.id || null
  editForm.language = faq.lang
  editForm.id = faq.id
  drawer.of("#editFaqDrawer").show()
}

const storeFaq = () => {
  createFrom.post(route("admin.faq.store"), {
    onSuccess: () => {
      createFrom.reset()
      notify.success(trans("Faq has been added successfully"))
      drawer.of("#addNewFaqDrawer").hide()
    }
  })
}

const updateFaq = () => {
  router.patch(route("admin.faq.update", editForm.id), editForm, {
    onSuccess: () => {
      editForm.value = {}
      notify.success(trans("Faq has been updated successfully"))
      drawer.of("#editFaqDrawer").hide()
    }
  })
}
</script>
