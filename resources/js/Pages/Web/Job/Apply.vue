<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Default.vue";
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue";
import trans from '@/Composables/transComposable';
import notify from "@/Plugins/Admin/notify";
defineOptions({ layout: DefaultLayout });

const props = defineProps(["job"]);

const form = useForm({
  email: "",
  message: "",
  fields: [...props.job.fields],
});

const submit = () => {
  form.post(route("jobs.apply", props.job.slug), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success("Congratulations! Application has been submitted successfully");
      form.reset();
    },
  });
};
</script>

<template>
  <Head title="Apply to a job" />

  <div class="pb-0 inner-banner-one position-relative">
    <img
      src="/assets/images/shape/shape_02.svg"
      alt=""
      class="lazy-img shapes shape_01"
    />
  </div>

  <section class="contact-us-section pt-100 lg-pt-80">
    <div class="container">
      <div class="border-bottom pb-150 lg-pb-80">
        <div class="text-center title-one">
          <h2>{{ trans("Apply to a job") }}</h2>
          <br />
          {{ form }}
          <h3>
            <Link :href="route('jobs.show', job.slug)">{{ job.title }}</Link>
          </h3>
        </div>

        <div class="row">
          <div class="m-auto col-xl-9">
            <div class="form-style-one mt-85 lg-mt-50 wow fadeInUp">
              <form @submit.prevent="submit">
                <div
                  v-for="field in form.fields"
                  :key="field.label"
                  class="input-group-meta form-group mb-35"
                >
                  <label>{{ field.label }}</label>
                  <input
                    v-if="field.type == 'file'"
                    type="file"
                    @input="field.value = $event.target.files[0]"
                    class="pt-3 mb-20 form-control-file"
                  />

                  <textarea
                    v-else-if="field.type == 'textarea'"
                    v-model="field.value"
                    class="mb-20 form-control"
                    rows="5"
                  >
                  </textarea>

                  <input
                    v-else
                    :type="field.type"
                    v-model="field.value"
                    class="mb-20 form-control"
                  />
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="input-group-meta form-group mb-35">
                      <label for="">{{ trans("Email") }}</label>
                      <input v-model="form.email" type="text" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-group-meta form-group mb-35">
                      <label for="">{{ trans("Message") }}</label>
                      <textarea v-model="form.message"></textarea>
                    </div>
                  </div>

                  <div class="col-12">
                    <SpinnerBtn
                      classes="btn-eleven d-flex align-items-center justify-content-center"
                      type="submit"
                      :processing="form.processing"
                      :btn-text="trans('Submit Application')"
                    />
                  </div>
                </div>
              </form>
            </div>
            <!-- /.form-style-one -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ./contact-us-section -->
</template>
