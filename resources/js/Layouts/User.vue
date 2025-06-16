<script setup>
import Sidebar from '@/Layouts/User/Sidebar.vue'
import Header from '@/Layouts/User/Header.vue'
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
      <slot></slot>
    </div>
  </div>
</template>
