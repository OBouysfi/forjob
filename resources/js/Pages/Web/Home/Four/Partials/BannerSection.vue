<script setup>
import { onMounted, ref } from "vue";
import homeApiService from "@/Composables/homeApiService";
import { useForm } from "@inertiajs/vue3";
import NiceSelect from "@/Components/NiceSelect.vue";
import sharedComposable from "@/Composables/sharedComposable";

const { pickBy } = sharedComposable();

defineProps(["home"]);
const categories = ref([]);
const countries = ref([]);
const loading = ref(true);

const form = useForm({
  keyword: "",
  service: "",
  country: "",
});

onMounted(async () => {
  homeApiService.get("services").then((res) => {
    categories.value = res;
    loading.value = false;
  });

  homeApiService.get("countries").then((res) => {
    countries.value = res;
    loading.value = false;
  });
});

const formSubmit = () => {
  form.transform((data) => pickBy(data)).get(route("jobs.index"));
};
</script>

<template>
  <div
    class="hero-banner-four position-relative pt-170 lg-pt-150 pb-300 lg-pb-150 md-pb-100"
    :style="{ backgroundImage: `url(${home.hero.image})` }"
  >
    <div class="container">
      <div class="position-relative pb-70 sm-pb-20">
        <div class="row">
          <div class="m-auto text-center col-xxl-7 col-lg-8">
            <h1>{{ home.hero.title }}</h1>
            <p class="text-md mt-25 mb-45 md-mb-30">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="m-auto col-xxl-8 col-xl-9 col-lg-10">
              <div class="job-search-one style-two position-relative">
                <form @submit.prevent="formSubmit">
                  <div class="row align-items-center">
                    <div class="col-md-3">
                      <div class="input-box">
                        <div class="label">{{ trans("Job Categories") }}</div>
                        <NiceSelect
                          v-model="form.service"
                          :options="categories"
                          value-by="slug"
                          label="title"
                          placeholder="SELECT"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-box">
                        <div class="label">{{ trans("Location") }}</div>
                        <NiceSelect
                          v-model="form.country"
                          :options="countries"
                          value-by="id"
                          label="name"
                          placeholder="SELECT"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-box border-left">
                        <div class="label">{{ trans("Keywords or Title") }}</div>
                        <input
                          type="text"
                          v-model="form.keyword"
                          placeholder="Design, branding"
                          class="keyword"
                        />
                      </div>
                    </div>
                    <div class="col-md-3 sm-mb-10 sm-mt-10">
                      <button class="m-auto text-uppercase btn-five border6 tran3s">
                        {{ trans("Search") }}
                      </button>
                    </div>
                  </div>
                </form>
                <div
                  class="upload-btn position-relative d-flex align-items-center justify-content-between"
                >
                <span><Link :href="home.hero.btn_link" class="fw-500 text-dark me-1">{{ home.hero.btn_text }}</Link></span>
                  <i class="bi bi-file-earmark-arrow-up"></i>
                  
                </div>
              </div>
              <!-- /.job-search-one -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-lazy="home.hero.image1" alt="img" class="lazy-img shapes shape_01" />
    <img v-lazy="home.hero.image2" alt="img" class="lazy-img shapes shape_02" />
    <img v-lazy="home.hero.image3" alt="img" class="lazy-img shapes shape_03" />
    <img v-lazy="home.hero.image4" alt="img" class="lazy-img shapes shape_04" />
  </div>
</template>
