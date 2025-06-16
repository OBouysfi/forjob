<script setup>
import UserMessage from '@/Layouts/UserMessage.vue'
import UserLayout from '@/Layouts/User.vue'
import MessageSidebar from '@/Layouts/User/MessageSidebar.vue'
import { Head } from '@inertiajs/vue3'
defineOptions({ layout: [UserLayout, UserMessage] })
</script>

<template>
  <Head :title="trans('Messages')" />

  <div class="col-lg-8 d-flex align-items-center justify-content-center">
    <p>{{ trans('!Opps no conversation records found') }}</p>
  </div>
</template>
