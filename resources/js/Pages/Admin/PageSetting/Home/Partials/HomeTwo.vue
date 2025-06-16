<script setup>
import trans from '@/Composables/transComposable';
import { ref } from "vue";

const { data } = defineProps(["data"]);
const home = ref({ ...data });

const defaultFeature = {
  title: "",
  body: "",
};

const addFeatureItem = () => {
  home.value.cta_s2.features.push({ ...defaultFeature });
};

const removeFeatureItem = (index) => {
  home.value.cta_s2.features.splice(index, 1);
};
</script>

<template>
  <h6>{{ trans("Hero Banner Section") }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.hero.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Sub title") }}</label>
      <input type="text" class="input" v-model="home.hero.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Left Image") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Left Image top overlap") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Left Image center overlap") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Left Image bottom overlap") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image4 = e.target.files[0])"
      />
    </div>

    <div class="mb-2">
      <label>{{ trans("Individual Freelancer") }}</label>
      <input
        type="text"
        class="input"
        v-model="home.hero.footer_item1"
        placeholder="18k+"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Rating text") }}</label>
      <input
        type="text"
        class="input"
        v-model="home.hero.footer_item2"
        placeholder="A+ Ratting"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Rating Point") }}</label>
      <select class="select" v-model="home.hero.footer_item3">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div class="mb-2">
      <label>{{ trans("Ratting point text") }}</label>
      <input
        type="text"
        class="input"
        v-model="home.hero.footer_item4"
        placeholder="5 (300k+)"
      />
    </div>
  </div>

  <h6>{{ trans("Call to action 1") }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s1.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Sub title") }}</label>
      <input type="text" class="input" v-model="home.cta_s1.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Features") }}</label>
      <input type="text" class="input" v-model="home.cta_s1.features" />
      <p>use comma (,) for line break</p>
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Text") }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Link") }}</label>
      <input type="text" class="input" v-model="home.cta_s1.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Image 1") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s1.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 2") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s1.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 3") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s1.image3 = e.target.files[0])"
      />
    </div>

    <div class="mb-2">
      <label>{{ trans("Youtube Video ID") }}</label>
      <input type="text" v-model="home.cta_s1.video_id" class="input" />
      <small>https://www.youtube.com/watch?v=<code>XJTD3VOIWuw</code></small>
    </div>

    <div class="mb-2">
      <label>{{ trans("Completed Jobs") }}</label>
      <input type="text" v-model="home.cta_s1.item1" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Worldwide Client") }}</label>
      <input type="text" v-model="home.cta_s1.item2" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Applied Jobs") }}</label>
      <input type="text" v-model="home.cta_s1.item3" class="input" />
    </div>
  </div>

  <h6>{{ trans("Call to action 2") }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans("Top Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s2.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s2.title" />
    </div>

    <div class="mb-2">
      <label class="mr-2">{{ trans("List Items") }}</label>
      <div
        class="flex items-center p-2 mb-2 border gap-x-2"
        v-for="(item, index) in home.cta_s2.features"
        :key="index"
      >
        <span class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full">{{
          index + 1
        }}</span>
        <div class="flex flex-col flex-grow gap-1">
          <input
            type="text"
            class="input"
            placeholder="item title"
            v-model="item.title"
          />
          <textarea class="textarea" v-model="item.body"> </textarea>
        </div>
        <button type="button" @click="removeFeatureItem(index)" class="btn btn-danger">
          X
        </button>
      </div>
      <button type="button" @click="addFeatureItem" class="btn btn-primary">+</button>
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Text") }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Link") }}</label>
      <input type="text" class="input" v-model="home.cta_s2.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Top Image ") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Container Image") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image2 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans("Feedback Section") }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans("Top Title") }}</label>
      <input type="text" class="input" v-model="home.feedback_section.top_title" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.feedback_section.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Bottom Title") }}</label>
      <input type="text" class="input" v-model="home.feedback_section.bottom_title" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Bottom Sub Title") }}</label>
      <input type="text" class="input" v-model="home.feedback_section.bottom_sub_title" />
    </div>
  </div>
</template>
