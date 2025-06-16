<script setup>
import sharedComposable from '@/Composables/sharedComposable';
import footerData from '@/Composables/footerComposable';
import LanguageSwitch from '@/Components/LanguageSwitch.vue';
const { authUser, logout } = sharedComposable()
const { footerCenter, footerRight, footerLeft, year, socials, email, NEWSLETTER_API, subscribe } =
  footerData()
</script>

<template>
  <div class="footer-one bg-two white-version">
    <div class="container">
      <div class="inner-wrapper">
        <div class="row justify-content-between">
          <div class="col-lg-2 col-md-3 footer-intro mb-15">
            <div class="logo mb-15">
              <a href="/" class="d-flex align-items-center">
                <img v-lazy="$page.props.primaryData.logo" alt="logo" />
              </a>
            </div>
            <img
              src="/assets/images/shape/shape_28.svg"
              alt="shape"
              class="lazy-img mt-50 sm-mt-30 sm-mb-20"
            />
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title text-white">
              {{ footerLeft?.name ? footerLeft.name : trans('Services​') }}
            </h5>
            <ul class="footer-nav-link style-none" v-if="footerLeft && footerLeft?.data">
              <li v-for="item in JSON.parse(footerLeft?.data)" :key="item.id">
                <Link v-if="item.href" :href="item.href" :target="item.target">
                  {{ item.text }}
                </Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title text-white">
              {{ footerCenter?.name ? footerCenter.name : trans('Services​') }}
            </h5>
            <ul class="footer-nav-link style-none" v-if="footerCenter && footerCenter?.data">
              <li v-for="item in JSON.parse(footerCenter?.data)" :key="item.id">
                <Link v-if="item.href" :href="item.href" :target="item.target">
                  {{ item.text }}
                </Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title text-white">
              {{ footerRight?.name ? footerRight.name : 'Support' }}
            </h5>
            <ul class="footer-nav-link style-none" v-if="footerRight && footerRight?.data">
              <li v-for="item in JSON.parse(footerRight?.data)" :key="item.id">
                <Link v-if="item.href" :href="item.href" :target="item.target">
                  {{ item.text }}
                </Link>
              </li>
            </ul>
          </div>
          <div
            class="col-lg-4 footer-newsletter mb-20 text-white"
            v-if="NEWSLETTER_API || Object.entries($page.props.languages)?.length > 1"
          >
            <template v-if="NEWSLETTER_API">
              <h5 class="footer-title text-white">{{ trans('Newsletter') }}</h5>
              <p>{{ trans('Join & get important new regularly') }}</p>
              <form @submit.prevent="subscribe" class="d-flex">
                <input v-model="email" type="email" placeholder="Enter your email*" />
                <button type="submit">{{ trans('Send') }}</button>
              </form>
              <p class="note text-white">
                {{ trans('We only send interesting and relevant emails.') }}
              </p>
            </template>
            <template v-if="Object.entries($page.props.languages)?.length > 1">
              <h5 class="footer-title fs-6 mb-2 mt-2 text-white">{{ trans('Language') }}</h5>
              <LanguageSwitch />
            </template>
          </div>
        </div>
      </div>
      <!-- /.inner-wrapper -->
    </div>
    <div class="bottom-footer mt-50 lg-mt-20">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 order-lg-3 mb-15">
            <ul
              class="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon"
            >
              <li v-for="(social, key) in socials" :href="social" :key="key">
                <a :href="social" target="_blank">
                  <i class="bi" :class="`bi-${key}`"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 order-lg-1 mb-15">
            <ul
              class="d-flex style-none bottom-nav justify-content-center justify-content-lg-start"
            >
              <li>
                <Link href="/page/privacy-policy">{{ trans('Privacy policy') }}</Link>
              </li>
              <li>
                <Link href="/page/terms-and-conditions">{{ trans('Terms') }}</Link>
              </li>
              <li>
                <Link href="/contact-us"> {{ trans('Contact Us') }}</Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 order-lg-2">
            <p class="mb-15 text-center text-white opacity-50">
              {{ trans('Copyright') }} @{{ year }} {{ $page.props.app_name || '' }}.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
