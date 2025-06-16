import { usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'
import trans from '@/Composables/transComposable';
import notify from '@/Plugins/Admin/notify';
import { modal } from '@/Composables/modalComposable';

export default () => {
  const textExcerpt = (text, length) => {
    return text?.length > length ? text?.substring(0, length) + '...' : text
  }

  const currentRouteIn = (routes = []) => {
    return Boolean(routes.find((item) => usePage().component == item))
  }

  const currentRoute = (route) => {
    return usePage().component === route
  }
  const currentRouteGroup = (route) => {
    return usePage().component.startsWith(route)
  }
  const authUser = computed(() => {
    return usePage().props.user
  })

  const logout = () => {
    router.post('/logout')
  }

  const formatNumber = (num, precision = 1) => {
    const map = [
      { suffix: 'T', threshold: 1e12 },
      { suffix: 'B', threshold: 1e9 },
      { suffix: 'M', threshold: 1e6 },
      { suffix: 'K', threshold: 1e3 },
      { suffix: '', threshold: 1 }
    ]

    const found = map.find((x) => Math.abs(num) >= x.threshold)
    if (found) {
      const formatted = (num / found.threshold).toFixed(precision) + found.suffix
      return formatted
    }

    return num
  }

  const deleteRow = (actionUrl, alertMessage = 'Deleted successfully') => {
    modal.init(actionUrl, {
      options: {
        message: trans('You would not be revert it back!'),
        confirm_text: trans('Are you sure?'),
        accept_btn_text: trans('Yes, Delete'),
        reject_btn_text: trans('No, Cancel')
      },
      callback: () => {
        notify.danger(alertMessage)
      }
    })
  }
  const formatCurrency = (amount = 0, iconType = 'name') => {
    let formattedCurrency = ''
    if (!(typeof amount === 'number')) {
      return ''
    }
    const currency = usePage().props.currency
    if (iconType === 'name') {
      formattedCurrency =
        currency.position === 'right'
          ? currency.name + ' ' + amount.toFixed(2)
          : currency.icon + ' ' + amount.toFixed(2)
    } else if (iconType === 'both') {
      formattedCurrency = currency.icon + amount.toFixed(2) + ' ' + currency.name
    } else {
      formattedCurrency =
        currency.position === 'right'
          ? amount.toFixed(2) + currency.icon
          : currency.icon + amount.toFixed(2)
    }

    return formattedCurrency
  }
  const pickBy = (obj) => {
    const result = {}

    for (const key in obj) {
      const value = obj[key]

      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length === 0) {
          continue // Skip empty arrays
        } else if (typeof value === 'object' && Object.keys(value).length === 0) {
          continue // Skip empty objects
        }

        result[key] = value
      }
    }

    return result
  }

  const getQueryParams = () => {
    const obj = {}
    const para = new URLSearchParams(window.location.search)

    for (const [key, value] of para) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          obj[key].push(value)
        } else {
          obj[key] = [obj[key], value]
        }
      } else {
        obj[key] = value
      }
    }

    return obj
  }
  //copy text
  function copyToClipboard(content) {
    const unsecuredCopyToClipboard = (text) => {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        notify.success('Copied to clipboard')
      } catch (err) {
        console.error('Unable to copy to clipboard', err)
      }
      document.body.removeChild(textArea)
    }
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content)
      notify.success('Copied to clipboard')
    } else {
      unsecuredCopyToClipboard(content)
    }
  }
  function uiAvatar(name = null, avatar = null) {
    if (!name || !avatar) {
      return 'https://ui-avatars.com/api/?name=user'
    }
    return avatar ? avatar : `https://ui-avatars.com/api/?name=${name}`
  }
  return {
    authUser,
    textExcerpt,
    currentRoute,
    currentRouteGroup,
    currentRouteIn,
    deleteRow,
    logout,
    formatCurrency,
    pickBy,
    formatNumber,
    getQueryParams,
    copyToClipboard,
    uiAvatar
  }
}
