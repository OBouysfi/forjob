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
  <div class="container">
    <div class="filter-area-tab modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="position-relative">
        <div class="main-title fw-500 text-dark pt-15 pb-15 border-bottom pe-4 ps-4">
          {{ trans('Filter By') }}
        </div>
        <div class="pt-25 pb-30 pe-4 ps-4">
          <div class="row">
            <div class="col-lg-4">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">
                  {{ trans('Search Company') }}
                </div>
                <form @submit.prevent="filter.submit" class="input-box position-relative">
                  <input
                    type="text"
                    v-model="filter.filterForm.keyword"
                    placeholder="Search by Keywords"
                  />
                  <button type="submit">
                    <i class="bi bi-search"></i>
                  </button>
                </form>
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-4">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">
                  {{ trans('Category') }}
                </div>
                <NiceSelect
                  v-model="filter.filterForm.category"
                  :options="filter.services"
                  value-by="slug"
                  label="title"
                  placeholder="Category"
                />
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-4">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">
                  {{ trans('Country') }}
                </div>
                <NiceSelect
                  v-model="filter.filterForm.country"
                  :options="filter.locations"
                  value-by="id"
                  label="name"
                  placeholder="Select Country"
                  @change="filter.getStates"
                />
              </div>
              <!-- /.filter-block -->
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div class="filter-title fw-500 text-dark">
                <LabelWithAjaxLoader text="States" :loading="filter.loading.states" />
              </div>

              <NiceSelect
                v-model="filter.filterForm.state"
                :disabled="!filter.filterForm.country || filter.loading.states"
                :options="filter.states"
                value-by="id"
                label="name"
                placeholder="Select State"
              >
              </NiceSelect>
            </div>
            <div class="col-lg-4">
              <div class="filter-block pb-50 lg-pb-20">
                <div class="filter-title fw-500 text-dark">
                  {{ trans('Company Size') }}
                </div>
                <NiceSelect
                  v-model="filter.filterForm.team"
                  :options="filter.teamSizes"
                  placeholder="Company Size"
                />
              </div>
              <!-- /.filter-block -->
            </div>
            <div class="col-lg-4">
              <div class="filter-block pb-25">
                <div class="filter-title fw-500 text-dark mt-1">
                  {{ trans('Company Status') }}
                </div>
                <div class="main-body">
                  <ul class="style-none filter-input d-flex">
                    <li class="me-3">
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
              <!-- /.filter-block -->
            </div>

            <div class="col-lg-4 m-auto">
              <button
                @click.prevent="filter.submit"
                class="btn-ten fw-500 w-100 tran3s text-center text-white"
              >
                {{ trans('Apply Filter') }}
              </button>
              <button @click="filter.clear" class="btn-nine fw-500 w-100 tran3s mt-30 text-center">
                {{ trans('Clear Filter') }}
              </button>
            </div>
          </div>
        </div>
        <!-- /.filter header -->
      </div>
    </div>
    <!-- /.filter-area-tab -->
  </div>
</template>
