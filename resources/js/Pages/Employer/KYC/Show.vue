<script setup>
import { Head, Link } from "@inertiajs/vue3";
import EmployerLayout from "@/Layouts/Employer.vue";
import moment from "moment";
defineOptions({ layout: EmployerLayout });

const { kyc } = defineProps(["kyc"]);
</script>

<template>
  <Head title="KYC verification | Employer Panel" />

  <h2 class="main-title">{{ trans("KYC verification") }}</h2>
  <div class="card-box border-20 bg-white">
    <div>
      <div class="d-flex justify-content-between">
        <p>
          <strong>{{ trans("Status") }} : </strong>
          <span v-if="kyc.status == 0" class="badge bg-warning">
            {{ trans("Pending") }}</span
          >
          <span v-if="kyc.status == 1" class="badge bg-primary">
            {{ trans("Approved") }}</span
          >
          <span v-if="kyc.status == 2" class="badge bg-danger">
            {{ trans("Rejected") }}</span
          >
          <span v-if="kyc.status == 3" class="badge bg-dark">
            {{ trans("Re-Submitted") }}</span
          >
        </p>

        <p>
          <strong> {{ trans("Submitted At") }}:</strong>
          {{ moment(kyc.created_at).format("DD MMM, YYYY") }}
        </p>
        <p v-if="kyc.status == 2">
          <strong> {{ trans("Rejected At") }}:</strong>
          {{ moment(kyc.rejected_at).format("DD MMM, YYYY") }}
        </p>
      </div>

      <table class="table table-hover border">
        <thead>
          <tr class="bg-light">
            <th>{{ trans("Requirements") }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="border-top">
          <tr v-for="item in kyc.data" :key="item">
            <th>{{ item.label }}</th>
            <td>
              <p v-if="item.type != 'file'">{{ item.value }}</p>
              <a v-else target="_blank" :href="item.value" class="btn-six">{{
                trans("View")
              }}</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <Link :href="route('employer.kyc.index', kyc.id)" class="btn-seven py-2 me-3">
          {{ trans("Back") }}
        </Link>

        <Link
          v-if="kyc.status == 2"
          :href="route('employer.kyc.resubmit', kyc.id)"
          class="btn-one"
        >
          <i class="fas fa-redo"></i>
          {{ trans("Resubmit") }}
        </Link>
      </div>
    </div>
  </div>
</template>
