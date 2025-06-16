<script setup>
import Sidebar from '@/Layouts/Employer/Sidebar.vue'
import Header from '@/Layouts/Employer/Header.vue'
import Modal from '@/Components/Admin/Modal.vue'
import FlashErrors from '@/Components/FlashErrors.vue'
</script>

<template>
  <FlashErrors />
  <Modal />
  <Sidebar />
  <div class="dashboard-body">
    <div class="position-relative">
      <Header />
      <slot />
    </div>
  </div>
</template>
