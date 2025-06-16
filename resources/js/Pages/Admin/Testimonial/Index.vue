<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Testimonial" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <table class="table">
        <thead>
          <tr>
            <th>{{ trans('Reviewer Name') }}</th>
            <th>{{ trans('Reviewer Position') }}</th>
            <th>{{ trans('Comment') }}</th>
            <th>{{ trans('Ratings') }}</th>
            <th>{{ trans('Brand Avatar') }}</th>
            <th>
              <p class="text-end">{{ trans('Action') }}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts.data" :key="post.id">
            <td class="flex">
              <img :src="post.preview.value" class="avatar rounded-square mr-3" />
              <span>
                {{ textExcerpt(post.title, 30) }}
              </span>
            </td>
            <td class="text-left">
              {{ textExcerpt(post.slug, 30) }}
            </td>
            <td class="text-left">
              {{ textExcerpt(post.excerpt.value ?? '', 50) }}
            </td>
            <td class="text-right">{{ post.lang }} {{ trans('Star') }}</td>
            <td>
              <img
                v-if="post.banner"
                :src="post.banner?.value"
                class="avatar rounded-square mr-3"
              />
              <span v-else>None</span>
            </td>
            <td>
              <div class="dropdown" data-placement="bottom-start">
                <div class="dropdown-toggle">
                  <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                </div>
                <div class="dropdown-content w-40">
                  <ul class="dropdown-list">
                    <li class="dropdown-list-item">
                      <button @click="openEditTestimonialDrawer(post)" class="dropdown-link">
                        <i class="h-5 text-slate-400" data-feather="edit"></i>
                        <span>{{ trans('Edit') }}</span>
                      </button>
                    </li>

                    <li class="dropdown-list-item">
                      <button
                        class="dropdown-link"
                        @click="deleteRow('/admin/testimonials/' + post.id)"
                      >
                        <i class="h-5 text-slate-400" data-feather="trash-2"
                          >{{ trans('Remove') }}></i
                        >
                        <span>{{ trans('Delete') }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Paginate :links="posts.links" />
    </div>
  </main>

  <div id="addNewTestimonialDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeTestimonial()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Testimonial') }}</h5>
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
          <label>{{ trans('Reviewer Name') }}</label>
          <input
            v-model="form.reviewer_name"
            type="text"
            name="reviewer_name"
            maxlength="150"
            class="input"
            required
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Reviewer Position') }}</label>
          <input
            v-model="form.reviewer_position"
            type="text"
            name="reviewer_position"
            class="input"
            required
            placeholder="CEO of Google"
            maxlength="50"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Reviewer Avatar') }}</label>
          <input
            @input="(e) => (form.reviewer_avatar = e.target.files[0])"
            type="file"
            name="reviewer_avatar"
            accept="image/*"
            class="input"
            required
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Brand Avatar') }}</label>
          <input
            @input="(e) => (form.brand_avatar = e.target.files[0])"
            type="file"
            name="brand_avatar"
            accept="image/*"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Review Star') }}</label>
          <select v-model="form.star" class="select" name="star">
            <option value="5">{{ trans('5 Star') }}</option>
            <option value="4">{{ trans('4 Star') }}</option>
            <option value="3">{{ trans('3 Star') }}</option>
            <option value="2">{{ trans('2 Star') }}</option>
            <option value="1">{{ trans('1 Star') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Comment') }}</label>
          <textarea
            v-model="form.comment"
            class="textarea h-100"
            maxlength="500"
            name="comment"
            required
          ></textarea>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="form.processing"
            :btn-text="trans('Create')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editTestimonialDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateTestimonial()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Testimonial') }}</h5>
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
          <label>{{ trans('Reviewer Name') }}</label>
          <input
            v-model="editTestimonialForm.title"
            type="text"
            name="reviewer_name"
            id="reviewer_name"
            maxlength="150"
            class="input"
            required
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Reviewer Position') }}</label>
          <input
            v-model="editTestimonialForm.slug"
            type="text"
            name="reviewer_position"
            id="reviewer_position"
            class="input"
            required=""
            placeholder="CEO of Google"
            maxlength="50"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Reviewer Avatar') }}</label>
          <input
            @input="(e) => (editTestimonialForm.preview.value = e.target.files[0])"
            type="file"
            name="reviewer_avatar"
            accept="image/*"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Brand Avatar') }}</label>
          <input
            @input="(e) => (editTestimonialForm.banner.value = e.target.files[0])"
            type="file"
            name="reviewer_avatar"
            accept="image/*"
            class="input"
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Review Star') }}</label>
          <select v-model="editTestimonialForm.lang" class="select" name="star" id="star">
            <option value="5">{{ trans('5 Star') }}</option>
            <option value="4">{{ trans('4 Star') }}</option>
            <option value="3">{{ trans('3 Star') }}</option>
            <option value="2">{{ trans('2 Star') }}</option>
            <option value="1">{{ trans('1 Star') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Comment') }}</label>
          <textarea
            :value="editTestimonialForm?.excerpt?.value ?? ''"
            @input="(e) => (editTestimonialForm.excerpt.value = e.target.value)"
            class="textarea h-100"
            maxlength="500"
            name="comment"
            id="comment"
            required
          ></textarea>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="editTestimonialForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import HeaderSegment from '@/Layouts/Admin/HeaderSegment.vue'
import { useForm, router } from '@inertiajs/vue3'
import sharedComposable from '@/Composables/sharedComposable'
import Paginate from '@/Components/Paginate.vue'
import { ref } from 'vue'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/Components/Admin/SpinnerBtn.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted } from 'vue'
import trans from '@/Composables/transComposable'

defineOptions({ layout: AdminLayout })

const { textExcerpt, deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps(['posts', 'buttons', 'segments'])
const form = useForm({
  reviewer_name: '',
  reviewer_position: '',
  reviewer_avatar: '',
  brand_avatar: '',
  star: 0,
  comment: ''
})

const editTestimonialForm = ref({})

function openEditTestimonialDrawer(testimonial) {
  editTestimonialForm.value = { ...testimonial, banner: { value: null } }
  drawer.of('#editTestimonialDrawer').show()
}

const storeTestimonial = () => {
  form.post(route('admin.testimonials.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Testimonial has been added successfully'))
      drawer.of('#addNewTestimonialDrawer').hide()
    }
  })
}

const updateTestimonial = () => {
  if (!(editTestimonialForm.value.preview.value instanceof File)) {
    editTestimonialForm.value.preview.value = null
  }

  router.post(
    route('admin.testimonials.update', editTestimonialForm.value.id),
    {
      _method: 'patch',
      testimonial: editTestimonialForm.value
    },
    {
      onSuccess: () => {
        notify.success('Testimonial Updated successfully')
        drawer.of('#editTestimonialDrawer').hide()
      }
    }
  )
}
</script>

