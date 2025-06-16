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
      <label>{{ trans("Worldwide Client") }}</label>
      <input type="text" v-model="home.hero.item1" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Top Talents") }}</label>
      <input type="text" v-model="home.hero.item2" class="input" />
    </div>
    <div class="mb-2">
      <label>{{ trans("Applied Jobs") }}</label>
      <input type="text" v-model="home.hero.item3" class="input" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Slider Image 1") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Slider Image 2") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Slider Image 2") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.hero.image3 = e.target.files[0])"
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
      <label class="mr-2">{{ trans("Step Items") }}</label>
      <div
        class="flex items-center p-2 mb-2 border gap-x-2"
        v-for="(item, index) in home.cta_s1.steps"
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
          <input
            type="text"
            class="input"
            placeholder="item link text"
            v-model="item.text"
          />
          <input
            type="text"
            class="input"
            placeholder="item link"
            v-model="item.link"
          />
        </div>
      </div>
    </div>

    <div class="mb-2">
      <label>{{ trans("Youtube Video ID") }}</label>
      <input type="text" v-model="home.cta_s1.video_id" class="input" />
      <small>https://www.youtube.com/watch?v=<code>XJTD3VOIWuw</code></small>
    </div>

    <div class="mb-2">
      <label>{{ trans("Background Image") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s1.image1 = e.target.files[0])"
      />
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
      <label>{{ trans("Image 1") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 2") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 3") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 4") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image4 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 5") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image5 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 6") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s2.image6 = e.target.files[0])"
      />
    </div>
  </div>
  <h6>{{ trans("Feedback Section") }}</h6>
  <div>

    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.feedback_section.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Background Image") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.feedback_section.image = e.target.files[0])"
      />
    </div>
    
  </div>

  <h6>{{ trans("Call to action 3") }}</h6>
  <div>
    <div class="mb-2">
      <label>{{ trans("Top Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s3.top_title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s3.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Sub title") }}</label>
      <input type="text" class="input" v-model="home.cta_s3.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Text") }}</label>
      <input type="text" class="input" v-model="home.cta_s3.btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Button Link") }}</label>
      <input type="text" class="input" v-model="home.cta_s3.btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Image 1") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image1 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 2") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image2 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 3") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image3 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 4") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image4 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 5") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image5 = e.target.files[0])"
      />
    </div>
    <div class="mb-2">
      <label>{{ trans("Image 6") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s3.image6 = e.target.files[0])"
      />
    </div>
  </div>

  <h6>{{ trans("Footer CTA Section") }}</h6>
  <div>

    <div class="mb-2">
      <label>{{ trans("Title") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.title" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Sub title") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.subtitle" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Left Button Text") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.left_btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Left Button Link") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.left_btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Right Button Text") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.right_btn_text" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Right Button Link") }}</label>
      <input type="text" class="input" v-model="home.cta_s4.right_btn_link" />
    </div>

    <div class="mb-2">
      <label>{{ trans("Background Image") }}</label>
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="(e) => (home.cta_s4.image1 = e.target.files[0])"
      />
    </div>
  </div>
</template>
