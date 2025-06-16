<script setup>
import NiceSelect from '@/Components/NiceSelect.vue'
import { useCompanyFilterStore } from '@/Store/companyFilterStore'
import LabelWithAjaxLoader from '@/Components/LabelWithAjaxLoader.vue'
import { onMounted } from 'vue'
const props = defineProps(['services', 'locations', 'request'])
const filter = useCompanyFilterStore()

onMounted(() => {
  filter.updateInitialState(props)
})
</script>

<template>
  <div class="col-xl-3 col-lg-4">
    <button
      type="button"
      class="filter-btn w-100 fw-500 tran3s d-lg-none mb-40 h-auto pb-2 pt-2"
      data-bs-toggle="offcanvas"
      data-bs-target="#filteroffcanvas"
    >
      <i class="bi bi-funnel"></i>
      {{ trans('Filter') }}
    </button>
    <div class="filter-area-tab offcanvas offcanvas-start" id="filteroffcanvas">
      <button
        type="button"
        class="btn-close text-reset d-lg-none"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div class="main-title fw-500 text-dark">
        {{ trans('Filter By') }}
      </div>
      <div class="light-bg border-20 pt-25 pb-30 mt-20 pe-4 ps-4">
        <div class="filter-block bottom-line pb-25">
          <a
            class="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseSemploye"
            role="button"
            aria-expanded="false"
            >{{ trans('Search Company') }}</a
          >
          <div class="show collapse" id="collapseSemploye">
            <div class="main-body">
              <form @submit.prevent="filter.submit" class="input-box position-relative">
                <input v-model="filter.filterForm.keyword" type="text" placeholder="Company Name" />
                <button type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <div class="filter-block bottom-line pb-25 mt-25">
          <a
            class="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseCstatus"
            role="button"
            aria-expanded="false"
            >{{ trans('Company Status') }}</a
          >
          <div class="show collapse" id="collapseCstatus">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li>
                  <input
                    @input="filter.filterForm.status = 'asc'"
                    type="checkbox"
                    name="CompanyStatus"
                    value="asc"
                    :checked="filter.filterForm.status === 'asc'"
                  />
                  <label>{{ trans('New') }}</label>
                </li>

                <li>
                  <input
                    @input="filter.filterForm.status = 'desc'"
                    type="checkbox"
                    name="CompanyStatus"
                    value="desc"
                    :checked="filter.filterForm.status === 'desc'"
                  />
                  <label>{{ trans('Older') }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <div class="filter-block bottom-line pb-25 mt-25">
          <a
            class="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseLocation"
            role="button"
            aria-expanded="false"
            >{{ trans('Location') }}</a
          >
          <div class="show collapse" id="collapseLocation">
            <div class="main-body">
              <div class="mb-2">
                <label for="" class="filter-title fw-500 text-dark">{{ trans('Country') }}</label>
                <NiceSelect
                  v-model="filter.filterForm.country"
                  :options="filter.locations"
                  value-by="id"
                  label="name"
                  placeholder="Select Country"
                  @change="filter.getStates"
                />
              </div>
              <div class="mb-2">
                <LabelWithAjaxLoader
                  class="filter-title fw-500 text-dark"
                  text="States"
                  :loading="filter.loading.states"
                />
                <NiceSelect
                  v-model="filter.filterForm.state"
                  :disabled="!filter.filterForm.country || filter.loading.states"
                  :options="filter.states"
                  value-by="id"
                  label="name"
                  placeholder="Select State"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->

        <div class="filter-block bottom-line pb-25 mt-25">
          <a
            class="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseCategory"
            role="button"
            aria-expanded="false"
            >{{ trans('Category') }}</a
          >
          <div class="collapse" id="collapseCategory">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li v-for="service in filter.services" :key="service.id">
                  <input
                    @change="filter.setCategory(service.slug)"
                    type="checkbox"
                    name="service"
                    :value="service.slug"
                    :checked="filter.filterForm.category === service.slug"
                  />
                  <label
                    >{{ service.title }} <span>{{ service.companies_count }}</span></label
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <div class="filter-block bottom-line pb-25 mt-25">
          <a
            class="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseTeam"
            role="button"
            aria-expanded="false"
            >{{ trans('Team Size') }}</a
          >
          <div class="collapse" id="collapseTeam">
            <div class="main-body">
              <ul class="style-none filter-input">
                <li v-for="size in filter.teamSizes" :key="size">
                  <input
                    type="checkbox"
                    @change="filter.setTeam(size)"
                    name="Team"
                    value="01"
                    :checked="filter.filterForm.team === size"
                  />
                  <label>{{ size }}+</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /.filter-block -->
        <button
          @click.prevent="filter.submit"
          class="btn-ten fw-500 w-100 tran3s mt-30 text-center text-white"
        >
          {{ trans('Apply Filter') }}
        </button>
        <button @click="filter.clear" class="btn-nine fw-500 w-100 tran3s mt-30 text-center">
          {{ trans('Clear Filter') }}
        </button>
      </div>
    </div>
    <!-- /.filter-area-tab -->
  </div>
</template>
