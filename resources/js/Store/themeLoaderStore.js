import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
export const useThemeLoaderStore = defineStore({
  id: 'themeLoader',
  state: () => ({
    theme: '',
    loadedComponents: shallowRef({})
  })
})
