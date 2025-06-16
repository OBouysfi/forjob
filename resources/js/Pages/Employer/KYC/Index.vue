<script setup>
import { Head, Link } from "@inertiajs/vue3";

import EmployerLayout from "@/Layouts/Employer.vue";
import sharedComposable from "@/Composables/sharedComposable";

const { KYCDocuments } = defineProps(["KYCDocuments"]);

const { authUser } = sharedComposable();
defineOptions({ layout: EmployerLayout });
</script>

<template>
  <Head title="KYC Requests | Employer Panel" />

  <h2 class="main-title">{{ trans("KYC Requests") }}</h2>

  <h4 class="fs-2 text-center" v-if="authUser.kyc_verified_at">
    <span class="badge bg-success">
      {{ trans("Congratulations, You are verified now") }}
    </span>
  </h4>

  <div v-else class="alert alert-warning">
    <p>{{ trans("Profile verification is not completed") }}</p>
    <Link class="btn-two" :href="route('employer.kyc.create')">{{
      trans("Verify KYC")
    }}</Link>
  </div>
  <br />
  <div class="card-box border-20 bg-white">
    <div v-if="KYCDocuments.total" class="table-responsive mt-40">
      <table class="job-alert-table table">
        <thead class="border-0">
          <tr>
            <th>{{ trans("Method") }}</th>
            <th>{{ trans("Status") }}</th>
            <th>{{ trans("Note") }}</th>
            <th>{{ trans("Documents") }}</th>
            <th>{{ trans("Action") }}</th>
          </tr>
        </thead>
        <tbody class="border-top-0">
          <tr v-for="(document, index) in KYCDocuments.data" :key="index">
            <td>{{ document.method.title ?? null }}</td>
            <td>
              <span v-if="document.status == 0" class="badge bg-warning">
                {{ trans("Pending") }}</span
              >
              <span v-else-if="document.status == 1" class="badge bg-primary">
                {{ trans("Approved") }}</span
              >
              <span v-else-if="document.status == 2" class="badge bg-danger">
                {{ trans("Rejected") }}</span
              >
              <span v-else-if="document.status == 3" class="badge bg-dark">
                {{ trans("Re-Submitted") }}</span
              >
            </td>
            <td>{{ document.note }}</td>
            <td>{{ document.data?.length ?? 0 }}</td>
            <td class="text-end">
              <Link
                v-if="document.status == 2"
                class="btn-seven me-4 py-2"
                :href="route('employer.kyc.resubmit', document.id)"
              >
                {{ trans("Re Submit") }}
              </Link>

              <Link class="btn-one" :href="route('employer.kyc.show', document.id)">
                <i class="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>

    <div class="border-top pt-30 fw-bold border-2 text-center" v-else>
      {{ trans("No records found") }}
    </div>
  </div>
</template>
