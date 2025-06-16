<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import NoDataFound from "@/Components/Admin/NoDataFound.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import Overview from "@/Components/Admin/OverviewGrid.vue";
import sharedComposable from "@/Composables/sharedComposable";
import Paginate from '@/Components/Paginate.vue'
import { Link } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';

defineOptions({ layout: AdminLayout });
const props = defineProps([
  "templates",
  "shortcodes",
  "buttons",
  "segments",
  "totalTemplates",
  "activeTemplates",
  "inactiveTemplates",
]);

const { deleteRow, textExcerpt } = sharedComposable();
const stats = [
  { value: props.totalTemplates, title: trans("Total Template"), 
  iconClass: "bx bx-bar-chart"
},
  {
    value: props.activeTemplates,
    title: trans("Active Template"),
    iconClass: "bx bx-check-circle"
  },
  {
    value: props.inactiveTemplates,
    title: trans("Inactive Template"),
    iconClass: "bx bx-x-circle"
  },
];
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment
      title="Description Templates"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <table class="table">
        <thead>
          <tr>
            <th>{{ trans("#") }}</th>
            <th>{{ trans("Type") }}</th>
            <th>{{ trans("Body") }}</th>
            <th>{{ trans("Status") }}</th>
            <th>
              <p class="text-right">{{ trans("Action") }}</p>
            </th>
          </tr>
        </thead>
        <tbody v-if="templates.total">
          
          <tr v-for="(template, key) in templates.data" :key="key">
            <td>
              {{ template.id }}
            </td>
            <td>
              <span v-if="template.type == 'company'" class="badge badge-primary">{{
                trans("Business")
              }}</span>
              <span v-if="template.type == 'job'" class="badge badge-success">{{
                trans("Job")
              }}</span>
            </td>
            <td>
              {{ textExcerpt(template.body, 50) }}
            </td>
            <td>
              <span v-if="template.status == 'active'" class="badge badge-success">{{
                trans("Active")
              }}</span>
              <span v-if="template.status == 'inactive'" class="badge badge-danger">{{
                trans("Inactive")
              }}</span>
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
                        :href="route('admin.description-templates.edit', template)"
                        class="dropdown-link"
                      >
                        <i class="h-5 text-slate-400" data-feather="edit"></i>
                        <span>{{ trans("Edit") }}</span>
                      </Link>
                    </li>

                    <li class="dropdown-list-item">
                      <button
                        @click="
                          deleteRow(
                            route('admin.description-templates.destroy', template)
                          )
                        "
                        class="dropdown-link"
                      >
                        <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                        <span>{{ trans("Delete") }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <NoDataFound v-else :for-table="true" />
      </table>
      <Paginate :links="templates.links" />
    </div>
  </main>
</template>
