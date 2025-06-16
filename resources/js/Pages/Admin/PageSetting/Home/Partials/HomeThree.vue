<script setup>
import trans from '@/Composables/transComposable'
import { ref } from 'vue'

const { data } = defineProps(['data'])
const home = ref({ ...data })

const defaultFeature = {
  title: '',
  body: ''
}

const addFeatureItem = () => {
  home.value.cta_s1.features.push({ ...defaultFeature })
}

const removeFeatureItem = index => {
  home.value.cta_s1.features.splice(index, 1)
}

const AddCatListItem = section => {
  section.items.push({
    text: '',
    url: ''
  })
}

const removeCatListItem = (section, index) => {
  if (section.items.length > 1) {
    section.items.splice(index, 1)
  }
}
</script>

<template>
  <h6>{{ trans('Hero Banner Section') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Top Title') }}</label>
      <input type="text" class="input" v-model="home.hero.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.hero.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.hero.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Text') }}</label>
      <input type="text" class="input" v-model="home.hero.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.hero.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Trusted Partner 1') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image1 = e.target.files[0])"
      />
    </div>

    <div class="mb-2">
      <label>{{ trans('Trusted Partner 2') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Trusted Partner 3') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image3 = e.target.files[0])"
      />
    </div>


    <div class="mb-2">
      <label>{{ trans('Right Main Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image4 = e.target.files[0])"
      />
    </div>

    <div class="mb-2">
      <label>{{ trans('Animation Image (png)') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image5 = e.target.files[0])"
      />
    </div>

    <div class="mb-2">
      <label>{{ trans('Bottom Left Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.hero.image6 = e.target.files[0])"
      />
    </div>

  </div>

  <h6>{{ trans('Call to action 1') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Top Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.title" />
    </div>

    <div class="mb-2">
      <label class="mr-2">{{ trans('List Items') }}</label>
      <div
        class="flex items-center p-2 mb-2 border gap-x-2"
        v-for="(item, index) in home.cta_s1.features"
        :key="index"
      >
        <span class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full">{{
          index + 1
        }}</span>
        <div class="flex flex-col flex-grow gap-1">
          <input type="text" class="input" placeholder="item title" v-model="item.title" />
          <textarea class="textarea" v-model="item.body"> </textarea>
        </div>
        <button type="button" @click="removeFeatureItem(index)" class="btn btn-danger">X</button>
      </div>
      <button type="button" @click="addFeatureItem" class="btn btn-primary">+</button>
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Image 1') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Image 2') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s1.image2 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Call to action 2') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Top Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Completed Jobs') }}</label>
      <input type="text" v-model="home.cta_s2.item1" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans('Worldwide Client') }}</label>
      <input type="text" v-model="home.cta_s2.item2" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans('Applied Jobs') }}</label>
      <input type="text" v-model="home.cta_s2.item3" class="input" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Right Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s2.image1 = e.target.files[0])"
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
      <label>{{ trans('Sub Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s3.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Footer item 1 text') }}</label>
      <input type="text" v-model="home.cta_s3.footer_item1" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans('Footer item 2 text') }}</label>
      <input type="text" v-model="home.cta_s3.footer_item2" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans('Footer item 3 text') }}</label>
      <input type="text" v-model="home.cta_s3.footer_item3" class="input" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Video Link') }}</label>
      <input type="text" v-model="home.cta_s3.video" class="input" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Background Image') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s3.image = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Call to action 4') }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans('Title') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Sub title') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans('CTA Button Text') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Button Link') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Right Circle text upper') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.circle_text1" />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle text lower') }}</label>
      <input type="text" class="input" v-model="home.cta_s4.circle_text2" />
    </div>

    <div class="mb-2">
      <label>{{ trans('Right Circle image 1') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle image 2') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle image 3') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle image 4') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image4 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle image 5') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image5 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans('Right Circle image 6') }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="e => (home.cta_s4.image6 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans('Footer Category Section') }}</h6>
  <div>
    <div v-for="(section, index) in home.footer_cats" :key="index" class="p-3 mb-2 border">
      <div class="flex items-center mt-2 mb-2 space-x-2">
        <input
          type="text"
          class="input"
          v-model="section.title"
          :placeholder="`List ${index + 1} title`"
        />
        <button
          type="button"
          @click="AddCatListItem(section, index)"
          class="btn btn-primary whitespace-nowrap"
        >
          {{ trans('Add Link') }}
        </button>
      </div>

      <div
        v-for="(item, index) in section.items"
        :key="index"
        class="flex items-center pb-4 space-x-2"
      >
        <input type="text" class="input" v-model="item.text" placeholder="text" />
        <input type="text" class="input" v-model="item.url" placeholder="url" />
        <button
          type="button"
          @click="removeCatListItem(section, index)"
          class="btn btn-outline-danger"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>
