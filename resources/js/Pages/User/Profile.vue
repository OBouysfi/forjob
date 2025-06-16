<script setup>
import InputFieldError from "@/Components/InputFieldError.vue";
import UserLayout from "@/Layouts/User.vue";
import notify from "@/Plugins/Admin/notify";
import { router, Head, useForm } from "@inertiajs/vue3";
import trans from '@/Composables/transComposable';
import { ref } from "vue";

defineOptions({ layout: UserLayout });

const props = defineProps(["user", "countries", "states"]);

const states = ref(props.states);

const form = useForm({
  name: props.user.name,
  meta: {
    ...props.user.meta,
    social: props.user?.meta?.social ?? {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
  },
  country_id: props.user.countries[0]?.id,
  state_id: props.user.states[0]?.id,
});

const submit = () => {
  form.patch(route("user.profile.update"), {
    onSuccess() {
      notify.success(trans("Profile has been updated successfully"));
    },
  });
};

const updateAvatar = (e) => {
  form.avatar = e.target.files[0];
  router.post(route("user.profile.update"), {
    _method: "PATCH",
    avatar: form.avatar,
  });
};
</script>

<template>
  <Head title="Profile" />

  <h2 class="main-title">{{ trans("Profile") }}</h2>

  <div class="card-box border-20 bg-white">
    <div class="user-avatar-setting d-flex align-items-center mb-30">
      <img
        v-lazy="
          user.avatar == null
            ? `https://ui-avatars.com/api/?name=${user.name}`
            : `${user.avatar}`
        "
        alt=""
        class="lazy-img user-img"
      />
      <div class="upload-btn position-relative tran3s me-3 ms-4">
        {{ trans("Upload new photo") }}
        <input
          type="file"
          @input="updateAvatar"
          id="uploadImg"
          name="uploadImg"
          placeholder=""
        />
      </div>
    </div>
    <!-- /.user-avatar-setting -->
    <div class="dash-input-wrapper mb-30">
      <label for="">{{ trans("Full Name") }} *</label>
      <input type="text" placeholder="Zubayer Hasan" v-model="form.name" />
      <InputFieldError :message="form.errors?.name" />
    </div>
   
    <!-- /.dash-input-wrapper -->
  </div>

  <!-- /.card-box -->
  <div class="card-box border-20 mt-40 bg-white">
    <h4 class="dash-title-three">{{ trans("Social Media") }}</h4>
    <div class="row mb-2 mt-4">
      <div class="col-6 dash-input-wrapper">
        <label for="">Linkedin</label>
        <input
          placeholder="linkedin"
          type="url"
          v-model="form.meta.social.linkedin"
          class="form-control"
        />
        <InputFieldError :message="form.errors.meta?.social?.linkedin" />
      </div>
      <div class="col-6 dash-input-wrapper">
        <label for="">Twitter</label>
        <input
          placeholder="Twitter"
          type="url"
          v-model="form.meta.social.twitter"
          class="form-control"
        />
        <InputFieldError :message="form.errors.meta?.social?.twitter" />
      </div>
    </div>
    <div class="row dash-input-wrapper mb-2">
      <div class="col-6">
        <label for="">Facebook</label>
        <input
          placeholder="facebook"
          type="url"
          v-model="form.meta.social.facebook"
          class="form-control"
        />
        <InputFieldError :message="form.errors.meta?.social?.facebook" />
      </div>
      <div class="col-6 dash-input-wrapper">
        <label for="">Instagram</label>
        <input
          placeholder="facebook"
          type="url"
          v-model="form.meta.social.instagram"
          class="form-control"
        />
        <InputFieldError :message="form.errors.meta?.social?.instagram" />
      </div>
    </div>
  </div>

  <!-- /.card-box -->


  <div class="button-group d-inline-flex align-items-center mt-30">
    <button @click="submit" type="button" class="dash-btn-two tran3s me-3">
      {{ trans("Update") }}
    </button>
  </div>
</template>
