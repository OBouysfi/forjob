import { defineStore } from 'pinia'
import axios from 'axios'
import sharedComposable from '@/Composables/sharedComposable'
import { router, useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'
const { pickBy, authUser } = sharedComposable()

export const useCandidateFilterStore = defineStore({
  id: 'CandidateFilterStore',
  state: () => ({
    layout: null,

    loading: {
      categories: false,
      states: false
    },
    sorts: [
      { label: 'Latest', value: 'desc' },
      { label: 'Oldest', value: 'asc' }
    ],
  
    genders: ['Male', 'Female', 'Other'],

    services: [],
    categories: [],
    countries: [],
    states: [],
    expertLevels: [],
    qualifications: [],
    currencies: [],
    highestSalaryAmount: 100000,
    modified: {
      salary: false
    },
    form: {
      v: '',
      keyword: '',
      order_by: '',
      service: '',
      category: '',
      country: '',
      state: '',

      expert_level: '',
      currency: '',
      qualification: '',
      gender: '',
      min_salary: 0,
      max_salary: 0
    }
  }),
  actions: {
    fetchCategories() {
      this.form.category = ''
      this.categories = []

      if (this.form.service) {
        this.loading.categories = true
        axios.get(`/api/categories?service_slug=${this.form.service}`).then((res) => {
          this.categories = res.data
          this.loading.categories = false
        })
      }
    },

    fetchStates(selected_state = '') {
      this.states = []
      this.form.state = selected_state
      if (this.form.country) {
        this.loading.states = true
        axios.get(`/api/locations?location_id=${this.form.country}`).then((res) => {
          this.loading.states = false
          this.states = res.data
        })
      }
    },

    submit() {
      let formData = { ...this.form }
      if (!this.modified.salary) {
        formData.min_salary = ''
        formData.max_salary = ''
      }
      router.get(route('candidates.index'), pickBy(formData), {
        preserveState: true,
      })
    },
    sort() {
      this.submit()
    },
    toggleBookmark(id, isBookmarked) {
      if (authUser?.value?.role != 'employer') {
        return notify.danger(trans('Please login with an employer account to save the candidate'))
      }

      let form = useForm({})
      form.post(route('candidates.bookmark', id), {
        preserveScroll: true,
        onSuccess: () => {
          if (authUser.value) {
            isBookmarked
              ? notify.danger(trans('Candidate has been removed successfully'))
              : notify.success(trans('Candidate has been saved successfully'))
          }
        }
      })
    },

    setExpertLevel(item) {
      if (this.form.expert_level && this.form.expert_level === item) {
        this.form.expert_level = ''
      } else {
        this.form.expert_level = item
      }
    },

    setQualification(item) {
      if (this.form.qualification && this.form.qualification === item) {
        this.form.qualification = ''
      } else {
        this.form.qualification = item
      }
    },

    setGender(item) {
      if (this.form.gender && this.form.gender === item) {
        this.form.gender = ''
      } else {
        this.form.gender = item
      }
    },

    setLayout(layout) {
      this.layout = layout
    },

    clear() {
      let v = this.form.v
      this.form = {
        v: v,
        keyword: '',
        order_by: '',
        service: '',
        category: '',
        country: '',
        state: '',

        expert_level: '',
        currency: '',
        qualification: '',
        gender: '',
        min_salary: '',
        max_salary: ''
      }

      this.modified.salary = false;

      router.get(route('candidates.index'), pickBy(this.form))
      const modal = document.getElementById('filterPopUp')
      const backdrop = document.querySelector('.modal-backdrop')

      if (modal && modal.classList.contains('show') && backdrop) {
        modal.classList.remove('show')
        document.body.removeChild(backdrop)
        document.body.style = ''
      }

    }
  }
})
