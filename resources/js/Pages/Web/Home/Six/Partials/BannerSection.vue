<script setup>
import { onMounted, ref } from "vue";
import homeApiService from "@/Composables/homeApiService";
import { useForm } from "@inertiajs/vue3";
import NiceSelect from "@/Components/NiceSelect.vue";
import sharedComposable from "@/Composables/sharedComposable";

const { pickBy } = sharedComposable();

defineProps(["home"]);

const services = ref([]);
const loading = ref(true);

const form = useForm({
  keyword: "",
  service: "",
});

onMounted(async () => {
  homeApiService.get("services").then((res) => {
    services.value = res;
    loading.value = false;
  });
});

const formSubmit = () => {
  form.transform((data) => pickBy(data)).get(route("jobs.index"));
};
</script>

<template>
  <div class="hero-banner-six position-relative pt-170 lg-pt-150 pb-60 lg-pb-40">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="m-auto text-center col-xxl-8 col-xl-9 col-lg-8">
            <h1>{{ home.hero.title }}</h1>
            <p class="text-white text-md mt-25 mb-55 lg-mb-40">
              {{ home.hero.subtitle }}
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="row">
            <div class="m-auto col-xl-8 col-lg-9">
              <div
                class="job-search-one style-two position-relative me-xxl-3 ms-xxl-3 mb-100 lg-mb-50"
              >
                <form @submit.prevent="formSubmit">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="input-box">
                        <div class="label">
                          {{ trans("Your job title, keyword or company?") }}
                        </div>
                        <input
                          type="text"
                          v-model="form.keyword"
                          placeholder="Google"
                          class="keyword"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="input-box border-left">
                        <div class="label">{{ trans("Job Services") }}</div>
                        <NiceSelect
                          v-model="form.service"
                          :options="services"
                          label="title"
                          value-by="slug"
                          placeholder="SELECT"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="fw-500 text-md h-100 w-100 tran3s search-btn-two">
                        {{ trans("Search") }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.job-search-one -->
            </div>
          </div>

          <div class="row">
            <div class="m-auto col-xl-8">
              <div class="row">
                <div class="col-sm-4">
                  <div class="text-center counter-block-two mt-15 wow fadeInUp">
                    <div class="text-white main-count fw-500">{{ home.hero.item1 }}</div>
                    <p class="text-white">{{ trans("Worldwide Client") }}</p>
                  </div>
                  <!-- /.counter-block-two -->
                </div>
                <div class="col-sm-4">
                  <div
                    class="text-center counter-block-two mt-15 wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div class="text-white main-count fw-500">{{ home.hero.item2 }}</div>
                    <p class="text-white">{{ trans("Top Talents") }}</p>
                  </div>
                  <!-- /.counter-block-two -->
                </div>
                <div class="col-sm-4">
                  <div
                    class="text-center counter-block-two mt-15 wow fadeInUp"
                    data-wow-delay="0.35s"
                  >
                    <div class="text-white main-count fw-500">{{ home.hero.item3 }}</div>
                    <p class="text-white">{{ trans("Applied Jobs") }}</p>
                  </div>
                  <!-- /.counter-block-two -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="banner-six-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner w-100 h-100">
        
        <div
          class="carousel-item active"
          :style="`background-image: url(${home.hero.image1})`"
        ></div>
        <div
          class="carousel-item"
          :style="`background-image: url(${home.hero.image2})`"
        ></div>
        <div
          class="carousel-item"
          :style="`background-image: url(${home.hero.image3})`"
        ></div>
      </div>
    </div>
  </div>
</template>
