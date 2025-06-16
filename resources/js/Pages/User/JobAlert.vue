<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import UserLayout from "@/Layouts/User.vue";
import Paginate from "@/Components/Paginate.vue";
import trans from '@/Composables/transComposable';
import NiceSelect from "@/Components/NiceSelect.vue";
import sharedComposable from "@/Composables/sharedComposable";

const { copyToClipboard } = sharedComposable();

defineOptions({ layout: UserLayout });
defineProps(["jobs"]);

const sorts = [
  {
    value: "asc",
    label: "Newest",
  },
  {
    value: "desc",
    label: "Oldest",
  },
];

const sortForm = useForm({
  order_by: "",
});

const sortSubmit = () => {
  sortForm.get(window.location.href, {
    preserveState: true,
  });
};
</script>

<template>
  <Head title="Job Alert" />

  <div class="mb-40 d-flex align-items-center justify-content-between lg-mb-30">
    <h2 class="main-title m0">{{ trans("Job Alerts") }}</h2>
    <div class="short-filter d-flex align-items-center">
      <div class="text-dark fw-500 me-2">{{ trans("Sort by") }}:</div>
      <NiceSelect
        v-model="sortForm.order_by"
        :options="sorts"
        label="label"
        value-by="value"
        placeholder="Default"
        @change="sortSubmit"
      />
    </div>
  </div>

  <div class="bg-white card-box border-20">
    <div v-if="jobs.total" class="table-responsive">
      <table class="table job-alert-table">
        <thead>
          <tr>
            <th scope="col">{{ trans("Title") }}</th>
            <th scope="col">{{ trans("Categories") }}</th>
           
            <th scope="col">{{ trans("Salary Period") }}</th>
            <th scope="col">{{ trans("Actions") }}</th>
          </tr>
        </thead>
        <tbody class="border-0">
          <tr v-for="(job, index) in jobs.data" :key="job.id">
            <td>
              <a :href="route('jobs.show', job.slug)"> {{ job.title }}</a>
            </td>
            <td>
              
              <div>
                <span v-for="cat in job.categories" :key="cat.id"
                  >{{ cat.title }}, &nbsp;</span
                >
              </div>
            </td>
           
            <td><div class="job-type fw-500">{{ job.type }}</div>
              <div>{{ job.salary_type }}{{ trans(" Salary") }} . {{ job.location }}</div></td>
            <td>
              <div class="action-dots float-end">
                <button
                  class="action-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" :href="route('jobs.show', job.slug)"
                      ><img
                        src="/assets/dashboard/images/icon/icon_18.svg"
                        alt=""
                        class="lazy-img"
                      />
                      {{ trans("View in website") }}</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click="copyToClipboard(route('jobs.show', job.slug))"
                      href="#"
                    >
                      <img
                        src="/assets/dashboard/images/icon/icon_19.svg"
                        alt=""
                        class="lazy-img"
                      />
                      {{ trans("Copy Link") }}
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- /.table job-alert-table -->
    </div>
    <div v-else class="text-center fw-bold">{{ trans("No job found") }}</div>
  </div>
  <!-- /.card-box -->

  <div class="d-flex justify-content-end mt-30">
    <Paginate :links="jobs.links" />
  </div>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div
    class="modal fade"
    id="shareModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="shareModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="shareModalTitle">{{ trans("Share") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-info" role="alert">
            <strong>{{ trans("Info") }}:</strong>
            {{ trans("Copy and share this link anywhere") }}
          </div>

          <input type="text" :value="shareableLink" class="px-2 form-control" readonly />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ trans("Close") }}
          </button>
         
        </div>
      </div>
    </div>
  </div>
</template>
