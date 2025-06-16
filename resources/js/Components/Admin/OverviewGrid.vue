<script setup>
const props = defineProps(["items", "grid"]);

const gridClass = `lg:grid-cols-${props.grid ?? 4}`;
</script>

<template>
  <section
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    :class="gridClass"
  >
    <!-- Product Views  -->
    <div class="card" v-for="item in props.items">
      <div class="flex items-center gap-4 card-body">
        <div
          class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 bg-opacity-20 text-primary-500"
        >
          <i class="text-3xl" :class="item.iconClass ?? 'bx bx-box'"></i>
        </div>
        <div class="flex flex-col flex-1 gap-1">
          <p class="text-sm tracking-wide text-slate-500">{{ item.title }}</p>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h4>{{ item.value }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
