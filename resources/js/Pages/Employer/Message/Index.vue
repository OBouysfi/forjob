<script setup>
import EmployerMessage from '@/Layouts/EmployerMessage.vue'
import EmployerLayout from '@/Layouts/Employer.vue'
import { Head } from '@inertiajs/vue3'
defineOptions({ layout: [EmployerLayout, EmployerMessage] })
</script>

<template>
  <Head :title="trans('Messages')" />
  <div class="col-lg-8 d-flex align-items-center justify-content-center">
    <p>{{ trans('!Opps no conversation records found') }}</p>
  </div>
</template>
