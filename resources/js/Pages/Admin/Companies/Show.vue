<script setup>
import AdminLayout from "@/Layouts/Admin.vue";
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue";
import trans from '@/Composables/transComposable';
import Overview from "@/Components/Admin/OverviewGrid.vue";
import moment from "moment";
import NoDataFound from "@/Components/Admin/NoDataFound.vue";
import sharedComposable from "@/Composables/sharedComposable";
const { deleteRow } = sharedComposable();

defineOptions({ layout: AdminLayout });
const props = defineProps([
  "company",
  "jobs",
  "buttons",
  "segments",
  "job_posted",
  "shortlisted",
  "applications",
  "saved_candidate",
]);

const companyStats = [
  { value: props.job_posted, title: trans("Job Posted"), iconClass: "bx bx-box" },
  {
    value: props.shortlisted,
    title: trans("Shortlisted"),
    iconClass: "bx bx-dollar-circle",
  },
  {
    value: props.applications,
    title: trans("Applications"),
    iconClass: "ti ti-thumb-up",
  },
  {
    value: props.saved_candidate,
    title: trans("Saved Candidates"),
    iconClass: "ti ti-thumb-up",
  },
];
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <HeaderSegment title="Company details" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="companyStats" />

      <!-- User Profile Start  -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <!-- Left Section Start  -->
        <section class="flex flex-col w-full col-span-1 gap-6 h-min lg:sticky lg:top-20">
          <!-- User Avatar & Status  -->
          <div class="card">
            <div class="flex flex-col items-center card-body">
              <div class="relative w-24 h-24 my-2 rounded-full">
                <img
                  :src="
                    company.avatar == null
                      ? `https://ui-avatars.com/api/?name=${company.name}`
                      : `${company.avatar}`
                  "
                  alt=" avatar-img"
                  class="w-full h-full rounded-full"
                />
              </div>
              <div>
                <h2
                  class="mb-4 text-[16px] font-medium text-slate-700 dark:text-slate-200"
                >
                  {{ company.name }}
                </h2>
                <span class="description">{{ trans("Status") }}: </span>
                <span
                  :class="
                    company.status == 1
                      ? 'badge badge-success badge-sm'
                      : 'badge badge-danger badge-sm'
                  "
                  ><small>{{ company.status == 1 ? "Active" : "Suspended" }}</small></span
                >
              </div>

              <div class="text-center">
                <div class="">
                  <i class="mr-2"></i>{{ trans("Join Date: ") }}
                  {{ company.created_at_date }}
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Left Section End  -->
        <!-- Right Section Start  -->
        <section class="col-span-3">
          <div class="flex flex-wrap h-full gap-4">
            <div class="flex-grow">
              <div class="h-full card">
                <div class="space-y-2 card-body">
                  <small class="font-bold text-muted">{{ trans("Bio") }}</small>
                  <p>{{ trans("Name : ") }} {{ company.name }}</p>
                  <p>{{ trans("Email : ") }} {{ company.email }}</p>
                  <p>{{ trans("Phone : ") }} {{ company?.phone || "None" }}</p>
                  <p>{{ trans("Address : ") }} {{ company?.address || "None" }}</p>
                  <h5 class="my-2 font-bold">{{ trans("Details") }}</h5>
                  <div>
                    <h6>{{ trans("Socials") }}</h6>
                    <ul class="flex flex-wrap gap-x-4">
                      <li
                        class="capitalize"
                        v-for="(social, key) in company.meta.social"
                        :key="key"
                      >
                        <a
                          v-if="social"
                          :href="social"
                          target="_blank"
                          class="hover:underline"
                        >
                          <span>{{ key }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6>{{ trans("Description") }}</h6>
                    <div>
                      {{ company.meta.business.description }}
                    </div>
                  </div>
                  <div class="grid grid-cols-4">
                    <div>
                      <h6>{{ trans("Name") }}</h6>
                      <div>
                        {{ company.meta.company.name }}
                      </div>
                    </div>
                    <div>
                      <h6>{{ trans("Size") }}</h6>
                      <div>{{ company.meta.company.size }}+</div>
                    </div>
                    <div>
                      <h6>{{ trans("Address") }}</h6>
                      <div>{{ company.meta.company.address }}</div>
                    </div>
                    <div>
                      <h6>{{ trans("Founded") }}</h6>
                      <div>{{ company.meta.company.year_of_establishment }}</div>
                    </div>
                    <div v-if="company.meta.business.site_url">
                      <h6>{{ trans("Website") }}</h6>
                      <div>
                        <a target="_blank" :href="company.meta.business.site_url">
                          {{ company.meta.business.site_url }}
                        </a>
                      </div>
                    </div>
                    <div v-if="company.meta.business.license_no">
                      <h6>{{ trans("License No") }}</h6>
                      <div>
                        {{ company.meta.business.license_no }}
                      </div>
                    </div>
                    <div v-if="company.meta.business.rl_no">
                      <h6>{{ trans("RL No") }}</h6>
                      <div>
                        {{ company.meta.business.rl_no }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>{{ trans("Contacts") }}</h6>
                    <div class="grid grid-cols-4">
                      <div>
                        <h6>{{ trans("Email") }}</h6>
                        <div>
                          {{ company.meta.contact.email }}
                        </div>
                      </div>
                      <div v-if="company.meta.contact.mobile">
                        <h6>{{ trans("Mobile") }}</h6>
                        <div>
                          {{ company.meta.contact.mobile }}
                        </div>
                      </div>
                      <div>
                        <h6>{{ trans("Designation") }}</h6>
                        <div>
                          {{ company.meta.contact.designation }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Right Section End -->
      </div>

      <div>
        <h5 class="mb-2">{{ trans("Company Jobs") }}</h5>
        <div class="table-responsive whitespace-nowrap rounded-primary">
          <table class="table">
            <thead>
              <tr>
                <th class="w-[5%] uppercase">{{ trans("Title") }}</th>
                <th class="w-[15%] uppercase">{{ trans("Job Created") }}</th>
                <th class="w-[10%] uppercase">{{ trans("Applicants") }}</th>
                <th class="w-[10%] uppercase">{{ trans("Views") }}</th>
                <th class="w-[10%] uppercase">{{ trans("Status") }}</th>
                <th class="w-[5%] !text-right uppercase">{{ trans("Actions") }}</th>
              </tr>
            </thead>

            <tbody v-if="jobs.total">
              <tr v-for="job in jobs.data" :key="job.id">
                <td>
                  <div class="job-name fw-500">
                    {{ job.title }}
                  </div>
                  <div class="info1">
                    {{ job.type.replace("_", " ") }} .
                    <template v-if="JSON.parse(job.meta).is_remote">
                      {{ trans("Remote") }}
                    </template>
                    <template v-else>
                      {{ job.country?.[0]?.name }}
                    </template>
                  </div>
                </td>
                <td>{{ moment(job.created_at).format("D-MMM-Y") }}</td>
                <td>{{ job.applied_applicants_count }} Applications</td>
                <td>{{ job.total_visits }} Views</td>
                <td>
                  <span
                    class="badge"
                    :class="job.status == 1 ? 'badge-primary' : 'badge-danger'"
                  >
                    {{ job.status == 1 ? trans("Active") : trans("Inactive") }}
                  </span>
                </td>
                <td>
                  <div class="dropdown" data-placement="bottom-end">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="w-40 dropdown-content">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link
                            :href="route('admin.job.show', job.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="eye"></i>
                            <span>{{ trans("View") }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            as="button"
                            class="dropdown-link"
                            @click="deleteRow(route('admin.job.destroy', job.id))"
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
            <NoDataFound v-else for-table="true" />
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
