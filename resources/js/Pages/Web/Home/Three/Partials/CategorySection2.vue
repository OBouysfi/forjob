<script setup>
defineProps(['home'])
</script>

<template>
  <section class="category-section-four mt-140 lg-mt-60 mb-150 lg-mb-70">
    <div class="container">
      <div class="row">
        <div
          v-for="(section, index) in home.footer_cats ?? []"
          :key="index"
          class="col-lg-3 col-sm-6 mt-30"
        >
          <div class="title fw-500 text-dark">{{ section.title }}</div>
          <ul class="style-none list-item">
            <li v-for="(item, index) in section.items ?? []" :key="index">
              <Link :href="item.url">{{ item.text }}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
