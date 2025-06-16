<script setup>
import { Head } from "@inertiajs/vue3";
import sharedComposable from "@/Composables/sharedComposable";
import moment from "moment";
import EmployerLayout from "@/Layouts/Employer.vue";
import { computed } from "vue";
defineOptions({ layout: EmployerLayout });

const props = defineProps(["user", "plans", "orders"]);
const { formatCurrency } = sharedComposable();

const isNearExpiry = computed(() => {
  if (props.user.will_expire) {
    const userWillExpireDate = moment(props.user.will_expire);
    const daysDifference = userWillExpireDate.diff(moment(), "days");
    return daysDifference < 7;
  }
  return false;
});
const hasExpired = computed(() => {
  if (props.user.will_expire) {
    const userWillExpireDate = moment(props.user.will_expire);
    return userWillExpireDate.isBefore(moment());
  }
  return false;
});
</script>

<template>
  <Head :title="trans('Memberships')" />
  <h2 class="main-title">{{ trans("Membership") }}</h2>
  <div
    class="pb-0 alert alert-danger border-20"
    v-if="!user.will_expire || !user.plan || !user.plan_id"
  >
    <p>{{ trans("You haven't purchased any subscription plans yet.") }}</p>
  </div>
  <div class="pb-0 alert alert-danger border-20" v-if="hasExpired">
    <p>{{ trans("Your subscription has already expired") }}</p>
  </div>
  <div class="pb-0 alert alert-warning border-20" v-else-if="isNearExpiry">
    <p>
      {{ trans("Your current subscription plan is about to expire in less than 7 days") }}
    </p>
  </div>

  <div class="mb-20 membership-plan-wrapper" v-if="user.plan">
    <div class="row gx-0">
      <div class="col-xxl-7 col-lg-6 d-flex flex-column">
        <div class="column w-100 h-100">
          <h4>{{ trans("Current Plan") }} ({{ user.plan.title }})</h4>
          <p>
            {{
              trans(`Unlimited access to our legal document library and online rental application tool,
            billed monthly or yearly.`)
            }}
          </p>
        </div>
      </div>
      <div class="col-xxl-5 col-lg-6 d-flex flex-column">
        <div class="column border-left w-100 h-100">
          <div class="d-flex">
            <h3 class="price m0 text-nowrap">{{ formatCurrency(user.plan.price) }}</h3>
            <div class="flex-fill ps-2">
              <h6>
                {{ user.plan.days === 30 ? "Monthly" : "Yearly" }} {{ trans("Plan") }}
              </h6>
              <span class="text1 d-block">
                {{ trans("Your subscription will expire") }}

                <span class="fw-500">
                  {{ moment(user.will_expire).format("MMM DD, YYYY") }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="pricing-section">
    <div class="row justify-content-center">
      <template v-for="plan in plans" :key="plan.id">
        <div class="col-lg-4 col-md-6">
          <div
            class="mt-2 pricing-card-one 5"
            :class="{
              'popular-two': plan.is_recommended,
              'border-0': plan.is_recommended === 0,
            }"
          >
            <div class="popular-badge" v-if="plan.is_recommended">
              {{ trans("popular") }}
            </div>
            <div class="pack-name">{{ plan.title }}</div>
            <div class="price fw-500">
              <sub>{{ formatCurrency(plan.price)[0] }}</sub>
              {{ plan.price }}
              <sup>{{ plan.days === 30 ? "Monthly" : "Yearly" }}</sup>
            </div>
            <ul class="style-none">
              <li
                class="text-capitalize"
                v-for="(data, key) in plan.data"
                :key="data.key"
              >
                {{ key.replace(/_/g, " ") }} {{ data }}
              </li>
            </ul>
            <a
              :href="route('employer.membership.payment', plan.id)"
              class="get-plan-btn tran3s w-100 mt-30"
            >
              {{ trans("Choose Plan") }}
            </a>
          </div>
        </div>
      </template>
    </div>
  </section>

  <div class="card mt-30 border-20">
    <div class="card-body">
      <h3 class="">{{ trans("Order History") }}</h3>

      <div v-if="orders.total" class="table-responsive">
        <table class="table job-alert-table">
          <thead>
            <tr>
              <th>{{ trans("Invoice No") }}</th>
              <th>{{ trans("Payment ID") }}</th>
              <th>{{ trans("Plan") }}</th>
              <th>{{ trans("Amount") }}</th>
              <th>{{ trans("Tax") }}</th>
              <th>{{ trans("Expire Date") }}</th>
              <th class="text-center">{{ trans("Created Date") }}</th>
            </tr>
          </thead>
          <tbody class="border-0">
            <tr v-for="order in orders.data" :key="order.id">
              <td>{{ order.invoice_no }}</td>
              <td>{{ order.payment_id }}</td>
              <td>{{ order.plan?.title }}</td>
              <td>{{ formatCurrency(order.amount) }}</td>
              <td>{{ formatCurrency(order.tax) }}</td>
              <td>{{ moment(order.will_expire).format("DD MMM, YYYY") }}</td>
              <td class="text-center">
                {{ moment(order.created_at).format("DD MMM, YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 v-else class="text-center text-muted">{{ trans("No record found") }}</h3>
    </div>
  </div>
</template>
