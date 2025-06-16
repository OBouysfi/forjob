<script setup>
import trans from '@/Composables/transComposable'
import { ref } from 'vue'

const { data } = defineProps(['data'])
const home = ref({ ...data })
</script>

<template>
  <h6>{{ trans('Hero Banner With Search Section') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.hero.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.hero.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Right Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Category Section') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.category_section.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Right title') }}</label>
      <input type="text" class="input" v-model="home.category_section.title_right" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Text') }}</label>
      <input type="text" class="input" v-model="home.category_section.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.category_section.btn_link" />
    </div>

  </div>

  <h6>{{ trans('Call to action') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Features') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.features" />
      <p>{{ trans('use comma (,) for line break') }}</p>
    </div>

    <div class="mb-2">
      <label>{{ trans('CTA Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Left image 1') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left image 2') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left image 3') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left image 4') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image4 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left image 5') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image5 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left image 6') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image6 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Call to action 2') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Sup Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Main Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('CTA Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Left Circle image 1') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left Circle image 2') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left Circle image 3') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left Circle image 4') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image4 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left Circle image 5') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image5 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Left Circle image 6') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image6 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Call to action 3') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s3.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.cta_s3.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('CTA Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s3.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s3.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Left Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s3.image = e.target.files[0])"
      />
    </div>
  </div>
</template>
