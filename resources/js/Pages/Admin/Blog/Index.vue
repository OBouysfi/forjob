<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      title="Create a blog post"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <!-- Overview Section Start -->
      <Overview :items="blogsStats" grid="3" />
      <!-- Overview Section End -->

      <div class="flex items-center justify-end gap-x-2">
        <div class="dropdown" data-placement="bottom-end">
          <div class="dropdown-toggle">
            <button
              type="button"
              class="font-medium bg-white shadow-sm btn dark:bg-slate-800"
            >
              <i class="w-4" data-feather="filter"></i>
              <span>{{ trans("Filter") }}</span>
              <i class="w-4" data-feather="chevron-down"></i>
            </button>
          </div>

          <div class="dropdown-content w-72 !overflow-visible">
            <form @submit.prevent="filterData.get(route('admin.blog.index'))">
              <ul class="p-4 space-y-4 dropdown-list">
                <li class="dropdown-list-item">
                  <h2 class="my-1 text-sm font-medium">
                    {{ trans("Search") }}
                  </h2>
                  <div class="mb-2">
                    <input
                      type="text"
                      name="search"
                      v-model="filterData.search"
                      class="input"
                      placeholder="Search......"
                    />
                  </div>
                </li>
                <li class="dropdown-list-item">
                  <button type="submit" class="w-full btn btn-primary">
                    {{ trans("Filter") }}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>

      <!-- Customer Table Starts -->
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="col-3">{{ trans("Title") }}</th>
            
              <th class="col-1">{{ trans("Status") }}</th>
              <th class="col-2">{{ trans("Created At") }}</th>
              <th class="col-1"><div class="text-right"> {{ trans("Action") }}</div></th>
            </tr>
          </thead>
          <tbody v-if="posts.data != 0">
            <tr v-for="blog in posts.data" :key="blog.id">
              <td class="flex">
                <img
                  :src="blog.preview.value"
                  class="mr-3 avatar rounded-square"
                />
                <p>{{ textExcerpt(blog.title, 80) }}</p>
              </td>
             

              <td class="text-left">
                <span
                  class="badge"
                  :class="blog.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ blog.status == 1 ? trans("Active") : trans("Draft") }}
                </span>
              </td>
              <td>
                {{ moment(blog.created_at).format("D-MMM-Y") }}
              </td>
              <td>
               <div class="flex justify-end">
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i
                      class="w-6 text-slate-400"
                      data-feather="more-horizontal"
                    ></i>
                  </div>
                  <div class="w-40 dropdown-content">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.blog.edit', blog.id)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans("Edit") }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          class="dropdown-link"
                          @click="
                            deleteRow(
                              route('admin.blog.destroy', blog.slug),
                              trans('Blog has been deleted successfully')
                            )
                          "
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
               </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate
          v-if="posts.data.length != 0"
          :links="posts.links"
        />
      </div>
      <!-- Customer Table Ends -->
    </div>
  </main>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { Link, useForm } from "@inertiajs/vue3"
import sharedComposable from "@/Composables/sharedComposable"
import { createToast } from "mosha-vue-toastify"
import Paginate from "@/Components/Paginate.vue"
import moment from "moment"

import trans from '@/Composables/transComposable'
import Alert from "@/Components/Admin/Alert.vue"
import Overview from "@/Components/Admin/OverviewGrid.vue"
import Filter from "@/Components/Admin/Filter.vue"
import NoDataFound from "@/Components/Admin/NoDataFound.vue"

defineOptions({ layout: AdminLayout })

const blogsStats = [
  {
    value: props.totalPosts,
    title: trans("Total Posts"),
    iconClass: "bx bx-bar-chart"
  },
  {
    value: props.totalActivePosts,
    title: trans("Total Active Posts"),
    iconClass: "bx bx-check-circle"
  },
  {
    value: props.totalInActivePosts,
    title: trans("Total Inactive Posts"),
    iconClass: "bx bx-x-circle"
  }
]

const { textExcerpt, deleteRow } = sharedComposable()
const props = defineProps([
  "posts",
  "totalPosts",
  "totalActivePosts",
  "totalInActivePosts",
  "buttons",
  "segments",
  "type",
  "request"
])

const filterData = useForm({
  search: props.request.search
})
</script>

