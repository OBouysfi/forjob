<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import Overview from "@/Components/Admin/OverviewGrid.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import trans from '@/Composables/transComposable';
import sharedComposable from "@/Composables/sharedComposable";
import Paginate from "@/Components/Paginate.vue";
import NoDataFound from "@/Components/Admin/NoDataFound.vue";
import { computed } from "vue";
import { useForm } from "@inertiajs/vue3";
const props = defineProps([
  "reviews",
  "request",
  "segments",
  "buttons",
  "total",
  "averageRatings",
  "todaysReviews",
]);

const { textExcerpt, deleteRow } = sharedComposable();
defineOptions({ layout: AdminLayout });

const reviewStats = computed(() => {
  return [
    {
      value: props.total,
      title: trans("Total Reviews"),
      iconClass: "bx bx-bar-chart",
    },
    {
      value: props.averageRatings,
      title: trans("Average Ratings"),
      iconClass: "bx bx-bar-chart-alt",
    },
    {
      value: props.todaysReviews,
      title: trans("Todays Reviews"),
      iconClass: "bx bx-message-alt-detail",
    },
  ];
});

const filterForm = useForm({
  search: props?.request?.search ?? "",
  type: props?.request?.type ?? "company_email",
});

const filter = () => {
  let route = filterForm.action || location.href;
  filterForm.get(route);
};
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      :title="trans('Company Reviews')"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <Overview :items="reviewStats" grid="3" />

      <div
        class="flex flex-col items-center justify-between gap-y-4 md:flex-row md:gap-y-0"
      >
        <div class="flex items-center justify-between w-full gap-x-4 md:w-auto">
          {{ props.title ?? "" }}
        </div>

        <div class="flex items-center justify-between w-full gap-x-4 md:w-auto">
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
              <form @submit.prevent="filter">
                <ul class="p-4 space-y-4 dropdown-list">
                  <li class="dropdown-list-item">
                    <h2 class="my-1 text-sm font-medium">{{ trans("Status") }}</h2>
                    <div class="mb-2">
                      <input
                        type="text"
                        name="search"
                        v-model="filterForm.search"
                        class="input"
                        placeholder="Search......"
                      />
                    </div>
                  </li>
                  <li class="dropdown-list-item">
                    <div class="mb-2">
                      <select class="select" name="type" v-model="filterForm.type">
                        <option value="company_email">
                          {{ trans("Company Email") }}
                        </option>
                        <option value="reviewer_email">
                          {{ trans("Reviewer Email") }}
                        </option>
                      </select>
                    </div>
                  </li>

                  <li class="dropdown-list-item">
                    <button class="w-full btn btn-primary">
                      {{ trans("Filter") }}
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="whitespace-normal table-responsive rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans("Reviewer") }}</th>
              <th>{{ trans("Company") }}</th>
              <th>{{ trans("Job") }}</th>
              <th>{{ trans("Ratting") }}</th>
              <th>{{ trans("Comment") }}</th>
              <th class="flex justify-end">{{ trans("Action") }}</th>
            </tr>
          </thead>
          <tbody v-if="reviews.total > 0">
            <tr v-for="review in reviews.data" :key="review.id">
              <td>
                <div class="flex items-center gap-2" v-if="review.author">
                  <img
                    class="h-12 avatar-img"
                    v-lazy="
                      review.author.avatar == null
                        ? `https://ui-avatars.com/api/?name=${review.author.name}`
                        : `${review.author.avatar}`
                    "
                  />
                  <Link :href="route('admin.candidates.show', review.author.id)">
                    {{ review.author?.name }}</Link
                  >
                </div>
              </td>

              <td>
                <div v-if="review.company?.id">
                  <Link :href="route('admin.companies.show', review.company.id)">
                    {{ review.company?.name }}</Link
                  >
                </div></td>
              <td>
                <div v-if="review.job?.id">
                  <Link :href="route('admin.job.show', review.job.id)">
                    {{ review.job.title }}
                  </Link>
                </div>
              </td>
              <td>
                {{ review.ratting }}
              </td>
              <td>
                {{ textExcerpt(review.comment, 30) }}
              </td>
             
              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="w-40 dropdown-content">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.company-reviews.edit', review.id)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans("Edit") }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <Link
                          as="button"
                          class="dropdown-link"
                          @click="deleteRow('/admin/company-reviews/' + review.id)"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans("Remove") }}></i
                          >
                          <span>{{ trans("Delete") }}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
        <div class="py-4 card-footer">
          <Paginate :links="reviews.links" />
        </div>
      </div>
    </div>
  </main>
</template>
