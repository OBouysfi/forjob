<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import InputFieldError from "@/Components/InputFieldError.vue";
import UserLayout from "@/Layouts/User.vue";
import notify from "@/Plugins/Admin/notify";
defineOptions({ layout: UserLayout });

const props = defineProps(["user"]);

const form = useForm({
  name: props.user.name,
  email: props.user.email,
  phone: props.user.phone,
  current_password: "",
});

const submit = () => {
  let uri = route("user.account-settings.update");
  form.put(uri, {
    preserveState: true,
    onSuccess: () => {
      notify.success(trans("Account has been updated successfully"));
      form.reset('current_password');
    },
  });
};
</script>

<template>
  <Head :title="trans('Account Settings')" />
  <h2 class="main-title">{{ trans("Account Settings") }}</h2>

  <div class="bg-white card-box border-20">
    <h4 class="dash-title-three">{{ trans("Edit & Update") }}</h4>
    <form @submit.prevent="submit" method="post">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans("Full Name") }}</label>
            <input type="text" v-model="form.name" placeholder="Zubayer" />
            <InputFieldError :message="form.errors.name" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-lg-12" v-if="!user.provider_id">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans("Email") }}</label>
            <input
              type="email"
              v-model="form.email"
              placeholder="zubayerhasan@gmal.com"
            />
            <InputFieldError :message="form.errors.email" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-lg-12">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans("Phone Number") }}</label>
            <input type="tel" v-model="form.phone" placeholder="+810 989 989 989" />
            <InputFieldError :message="form.errors.phone" />
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
        <div class="col-lg-12" v-if="!user.provider_id">
          <div class="mb-20 dash-input-wrapper">
            <label for="">{{ trans("Current Password") }}</label>
            <input
              type="password"
              v-model="form.current_password"
              placeholder="enter your current password"
            />

            <InputFieldError :message="form.errors.current_password" />

            <div
              class="mt-5 info-text d-sm-flex align-items-center justify-content-between"
            >
              <p class="m0">
                {{ trans("Want to change the password?") }}
                <Link :href="route('user.change-password')" class="fw-500">
                  {{ trans("Click here") }}</Link
                >
              </p>
              <Link :href="route('user.change-password')" class="fw-500 chng-pass">
                {{ trans("Change Password") }}</Link
              >
            </div>
          </div>
          <!-- /.dash-input-wrapper -->
        </div>
      </div>

      <div class="button-group d-inline-flex align-items-center mt-30">
        <button type="submit" class="dash-btn-two tran3s me-3 rounded-3">
          {{ trans("Save") }}
        </button>
        <Link :href="route('user.dashboard')" class="dash-cancel-btn tran3s"
          >{{ trans("Cancel") }}
        </Link>
      </div>
    </form>
  </div>
</template>
