<template>
  <div id="app">
    <Modal />
    <!-- Sidebar Starts -->
    <Sidebar />
    <!-- Sidebar Ends -->

    <div class="wrapper">
      <!-- Header Starts -->
      <HeaderSection />
      <ValidationErrors />
      <!-- Header Ends -->

      <div class="content">
        <!-- Main Content Starts -->
        <slot></slot>
      </div>
      <!-- Page Content Ends -->
    </div>
    <!-- Wrapper Ends -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import modal from '@/Plugins/Admin/modal'
import Sidebar from '@/Layouts/Admin/Sidebar.vue'
import HeaderSection from '@/Layouts/Admin/Headersection.vue'

import ValidationErrors from '@/Components/Admin/ValidationErrors.vue'
import dropdown from '@/Plugins/Admin/dropdown'

//Third party packages
import '@fortawesome/fontawesome-free/js/all'
import feather from 'feather-icons'
import ResizeObserver from 'resize-observer-polyfill'
import { onUpdated } from 'vue'
import Modal from '@/Components/Admin/Modal.vue'

onMounted(() => {
  dropdown.init()
  feather.replace()
  window.ResizeObserver = ResizeObserver
})

onUpdated(() => {
  dropdown.init()
  feather.replace()
})
</script>
