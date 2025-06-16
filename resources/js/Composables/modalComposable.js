import { reactive } from 'vue'
import { router } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import trans from '@/Composables/transComposable'

export const modal = reactive({
  state: false,
  link: null,
  method: 'delete',
  data: null,
  confirm_text: trans('Are you sure?'),
  message: '',
  accept_btn_text: 'Yes, Confirm!',
  reject_btn_text: 'No, Cancel!',
  callback: null,
  success_message: trans('Submitted Successfully'),

  init (link = null, { method, data = {}, options = {}, callback }) {
    this.link = link
    this.message = options?.message || this.message
    this.confirm_text = options?.confirm_text || this.confirm_text
    this.accept_btn_text = options?.accept_btn_text || this.accept_btn_text
    this.reject_btn_text = options?.reject_btn_text || this.reject_btn_text
    this.success_message = options?.success_message || this.success_message

    if (callback instanceof Function) {
      this.callback = callback
    }

    if (method && data) {
      this.method = method
      this.data = data
    }
    this.state = true
  },

  initCallback (callFn, options = {}) {
    this.init(null, { callback: callFn, options })
  },

  async accept () {
    const validMethods = ['post', 'put', 'patch', 'delete']
    const { method, link, data, callback, success_message } = this

    if (link && validMethods.includes(method)) {
      await router[method](link, data, {
        onSuccess: () => notify.success(success_message)
      })
    }

    if (link && !validMethods.includes(method)) {
      router.delete(link, {
        onSuccess: () => notify.success('Deleted successfully')
      })
    }

    if (callback instanceof Function) {
      callback()
    }

    this.state = false
  },

  reset () {
    Object.assign(this, {
      link: null,
      state: false,
      method: 'delete',
      data: null,
      message: 'You want to delete this?',
      confirm_text: trans('Are you sure?'),
      accept_btn_text: 'Yes, delete it!',
      reject_btn_text: 'No, Cancel!'
    })
  }
})
