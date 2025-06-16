import { router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'message',

  state: () => ({
    isFetched: false,
    link: route('api-message.index'),
    conversations: [],
    data: null,
    conversationsLoadMore: false,
    conversationPage: 1,
    activeUuid: null,
    activeIndex: 0
  }),

  actions: {
    async fetchConversations(link = this.link) {
      const res = await axios.get(link)
      this.conversations = res.data.data
      this.data = res.data
      this.conversationsLoadMore = true
      this.isFetched = false
      this.conversationPage = res.data.current_page
      console.log(this.isFetched)
      if (res.data.last_page === this.conversationPage) {
        this.conversationsLoadMore = false
      }
      this.isFetched = true
      console.log(this.isFetched)
    },

    async fetchMoreConversations() {
      this.conversationPage++
      const res = await axios.get(route('api-message.index', { page: this.conversationPage }))
      this.conversations.push(...res.data.data)
      this.data = res.data
      if (res.data.last_page === this.conversationPage) {
        this.conversationsLoadMore = false
      }
    },
    async next() {
      const conversationIndex = this.conversations.findIndex(
        (conversation) => conversation.uuid === this.activeUuid
      )
      if (this.conversations?.length === conversationIndex + 1) {
        return
      }
      router.get(route('employer.message.show', this.conversations[conversationIndex + 1].uuid))
      this.activeIndex = conversationIndex + 1
    },
    async prev() {
      const conversationIndex = this.conversations.findIndex(
        (conversation) => conversation.uuid === this.activeUuid
      )
      if (conversationIndex === 0) {
        return
      }
      router.get(
        route('employer.message.show', this.conversations[conversationIndex - 1].uuid),
        {},
        {
          onFinish: () => {
            this.activeIndex = conversationIndex - 1
          }
        }
      )
    }
  }
})
