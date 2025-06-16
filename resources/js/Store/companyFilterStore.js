import { defineStore } from 'pinia'
import sharedComposable from '@/Composables/sharedComposable'
import axios from 'axios'
import { router } from '@inertiajs/vue3'
const { pickBy, getQueryParams } = sharedComposable()

export const useCompanyFilterStore = defineStore({
  id: 'companyFilterFormStore',
  state: () => ({
    layout: null,
    filterForm: {
      sort: '',
      keyword: '',
      status: '',
      category: '',
      team: '',
      country: '',
      state: ''
    },
    teamSizes: [
      '1-15',
      '16-30',
      '31-50',
      '51-120',
      '121-300',
      '301-500',
      '501-1000',
      '1001-5000',
      '5001-10000',
      '10000'
    ],
    sorts: [
      { name: 'Latest', value: 'created_at', order: 'desc' },
      { name: 'Oldest', value: 'created_at', order: 'asc' }
    ],
    states: [],
    locations: [],
    services: [],
    loading: {
      states: false
    }
  }),

  actions: {
    updateInitialState(props) {
      this.services = props.services
      this.locations = props.locations
      // request
      const request = props.request
      this.filterForm.keyword = request?.keyword ?? ''
      this.filterForm.status = request?.status ?? ''
      this.filterForm.category = request?.category ?? ''
      this.filterForm.team = request?.team ?? ''
      this.filterForm.country = request?.country ? +request?.country : ''
      if (this.filterForm.country) {
        this.getStates()
        if (!this.filterForm.state) {
          this.filterForm.state = +request?.state ?? ''
        }
      }
    },
    setCategory(cat) {
      if (this.filterForm.category && this.filterForm.category === cat) {
        this.filterForm.category = ''
      } else {
        this.filterForm.category = cat
      }
      this.filter()
    },

    setTeam(size) {
      if (this.filterForm.team && this.filterForm.team === size) {
        this.filterForm.team = ''
      } else {
        this.filterForm.team = size
      }
      this.filter()
    },

    getStates() {
      this.states = []
      this.filterForm.state = ''
      if (this.filterForm.country) {
        this.loading.states = true

        this.filterForm.state = ''
        axios.get(`/api/locations?location_id=${this.filterForm.country}`).then((res) => {
          this.states = res.data
          this.loading.states = false
        })
      }
    },
    setLayout(layout) {
      this.layout = layout
    },
    submit() {
      const queryParams = Object.fromEntries(new URLSearchParams(window.location.search))
      const updatedQueryParams = { v: queryParams?.v, ...this.filterForm }
      router.get('/companies', pickBy(updatedQueryParams), {
        preserveState: true,
        replace: true
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

      router.get('/companies', pickBy(filter))
      this.layout = layout

      if (modal && modal.classList.contains('show') && backdrop) {
        modal.classList.remove('show')
        document.body.removeChild(backdrop)
        document.body.style = ''
      }
    }
  }
})
