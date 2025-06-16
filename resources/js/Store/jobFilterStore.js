import { defineStore } from 'pinia'
import axios from 'axios'
import sharedComposable from '@/Composables/sharedComposable'
import { router, useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'
const { pickBy, getQueryParams } = sharedComposable()

export const useJobFiltersStore = defineStore({
  id: 'jobFilterFormStore',
  state: () => ({
    layout: null,
    sorts: [
      { name: 'Latest', value: 'created_at', order: 'desc' },
      { name: 'Oldest', value: 'created_at', order: 'asc' }
    ],
    minMaxSalary: 0,
    initialMaxSalary: 0,
    loading: {
      states: false,
      categories: false,
      skills: false
    },

    states: [],
    locations: [],
    currencies: [],

    jobTypes: [],
    JobExperiences: [],

    services: [],
    categories: [],
    skills: [],

    filterForm: {
      keyword: '',
      country: '',
      state: '',
      is_remote: null,
      job_type: '',
      experience: '',
      service: '',
      category: '',
      skills: [],
      min_salary: 0,
      max_salary: 0,
      salary_type: '',
      status: '',
      currency: '',
      order: ''
    }
  }),
  actions: {
    updateInitialState(props) {
      this.services = props.services
      this.categories = props.categories
      this.locations = props.locations
      this.jobTypes = props.jobTypes
      this.JobExperiences = props.JobExperiences
      this.currencies = props.currencies
      this.initialMaxSalary = props.maxSalary
      this.minMaxSalary = props.maxSalary - Math.round((10 / 100) * props.maxSalary)
      // request
      const request = props.request
      this.filterForm.keyword = request?.keyword ?? ''
      this.filterForm.is_remote = request.is_remote ? Boolean(request?.is_remote) : null
      this.filterForm.status = request?.status ?? ''
      this.filterForm.currency = request?.currency ?? ''
      this.filterForm.order = request?.order ?? ''
      this.filterForm.job_type = request?.job_type ?? ''
      this.filterForm.experience = request?.experience ?? ''
      this.filterForm.min_salary = request?.min_salary ?? 0
      this.filterForm.max_salary = request?.max_salary ?? props.maxSalary
      this.filterForm.country = request?.country ? +request?.country : ''
      this.filterForm.category = !this.filterForm.service ? request?.category : ''
      if (this.filterForm.country) {
        this.getStates()
        if (!this.filterForm.state) {
          this.filterForm.state = +request?.state ?? ''
        }
      }
      this.filterForm.service = request?.service ?? ''
      if (this.filterForm.service) {
        this.getCategories()
        this.filterForm.category = request?.category ?? ''
        if (this.filterForm.category) {
          this.getSkills()
          this.filterForm.skills = request?.skills ? request?.skills.map((s) => +s) : []
        }
      }
    },
    getStates() {
      this.states = []

      if (this.filterForm.country) {
        this.loading.states = true

        this.filterForm.state = ''
        axios.get(`/api/locations?location_id=${this.filterForm.country}`).then((res) => {
          this.states = res.data
          this.loading.states = false
        })
      }
    },
    getCategories() {
      if (this.filterForm.service) {
        this.loading.categories = true
        this.filterForm.category = ''
        this.categories = []
        axios
          .get(`/api/categories?with=jobs_count&service_slug=${this.filterForm.service}`)
          .then((res) => {
            this.categories = res.data
            this.loading.categories = false
          })
      }
    },
    getSkills() {
      if (this.filterForm.category) {
        this.filterForm.skills = []
        this.skills = []
        this.loading.skills = true
        axios.get(`/api/categories?category_slug=${this.filterForm.category}`).then((res) => {
          this.skills = res.data
          this.loading.skills = false
        })
      }
    },
    setCategory(cat) {
      this.filterForm.category = cat
      this.getSkills()
    },
    setExperience(value) {
      if (this.filterForm.experience && this.filterForm.experience === value) {
        this.filterForm.experience = ''
      } else {
        this.filterForm.experience = value
      }
    },
    setRemote(value) {
      this.filterForm.state = ''
      this.filterForm.country = ''
      if (this.filterForm.is_remote && this.filterForm.is_remote === value) {
        this.filterForm.is_remote = null
      } else {
        this.filterForm.is_remote = true
      }
    },
    setType(value) {
      if (this.filterForm.job_type && this.filterForm.job_type === value) {
        this.filterForm.job_type = ''
      } else {
        this.filterForm.job_type = value
      }
    },
    setSkill(id) {
      const tagIndex = this.filterForm.skills.indexOf(id)

      if (tagIndex !== -1) {
        this.filterForm.skills.splice(tagIndex, 1)
      } else {
        this.filterForm.skills.push(parseInt(id))
      }
    },
    submit() {
      if (this.filterForm.max_salary < 1 || this.initialMaxSalary === this.filterForm.max_salary) {
        this.filterForm.max_salary = null
        this.filterForm.min_salary = null
      }
      const queryParams = Object.fromEntries(new URLSearchParams(window.location.search))
      const updatedQueryParams = { v: queryParams?.v, type: queryParams?.type, ...this.filterForm }

      router.get(route('jobs.index'), pickBy(updatedQueryParams), {
        preserveState: true,
        preserveScroll: true,
        replace: true
      })

      if (this.filterForm.max_salary < 1 || this.initialMaxSalary === this.filterForm.max_salary) {
        this.filterForm.min_salary = 0
        this.filterForm.max_salary = this.initialMaxSalary
      }
    },

    setLayout(layout) {
      this.layout = layout
    },

    toggleBookmark(job) {
      let form = useForm({})
      form.post(route('jobs.bookmark', job), {
        preserveScroll: true,
        onSuccess: () => {
          notify.success(trans('Job has been saved successfully'))
        }
      })
    },
    clear() {
      const request = getQueryParams()
      const layout = this.layout
      const modal = document.getElementById('filterPopUp')
      const backdrop = document.querySelector('.modal-backdrop')
      this.$reset()
      const filter = {
        type: request.type ?? '',
        v: request.v ?? ''
      }
      router.get(route('jobs.index', pickBy(filter)))
      this.layout = layout
      if (modal && modal.classList.contains('show') && backdrop) {
        modal.classList.remove('show')
        document.body.removeChild(backdrop)
        document.body.style = ''
      }
    }
  }
})
