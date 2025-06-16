<script setup>
import LanguageSwitch from '@/Components/LanguageSwitch.vue';
import footerData from '@/Composables/footerComposable';
const { footerCenter, footerRight, footerLeft, year, socials, email, NEWSLETTER_API, subscribe } =
  footerData()
</script>

<template>
  <div class="footer-one">
    <div class="container">
      <div class="inner-wrapper">
        <div class="row justify-content-between">
          <div class="col-lg-2 col-md-3 footer-intro mb-15">
            <div class="logo mb-25">
              <Link href="/" class="d-flex align-items-center">
                <img :src="$page.props.primaryData.deep_logo" alt="logo" />
              </Link>
            </div>
            <!-- logo -->
            <a :href="`mailto:${$page.props.primaryData.contact_email}`" class="email fw-500">
              {{ $page.props.primaryData.contact_email }}
            </a>

            <img
              src="/assets/images/shape/shape_28.svg"
              alt="shape"
              class="lazy-img mt-50 sm-mt-30 sm-mb-20"
            />
          </div>
          <div class="col-lg-2 col-md-3 mb-20">
            <h5 class="footer-title">
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
          <div class="col-lg-2 col-md-3 mb-20">
            <h5 class="footer-title">
              {{ footerCenter?.name ? footerCenter.name : 'Company' }}
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
            <h5 class="footer-title">
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
            class="col-lg-4 footer-newsletter mb-20"
            v-if="NEWSLETTER_API || Object.entries($page.props.languages)?.length > 1"
          >
            <template v-if="NEWSLETTER_API">
              <h5 class="footer-title">{{ trans('Newsletter') }}</h5>
              <p>{{ trans('Join & get important new regularly') }}</p>
              <form @submit.prevent="subscribe" class="d-flex">
                <input v-model="email" type="email" placeholder="Enter your email*" />
                <button type="submit">{{ trans('Send') }}</button>
              </form>
              <p class="note">
                {{ trans('We only send interesting and relevant emails.') }}
              </p>
            </template>
            <template v-if="Object.entries($page.props.languages)?.length > 1">
              <h4 class="footer-title fs-6 mb-2 mt-2">{{ trans('Language') }}</h4>
              <LanguageSwitch />
            </template>
          </div>
        </div>
      </div>
      <!-- /.inner-wrapper -->
    </div>
    <div class="bottom-footer">
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
            <p class="mb-15 text-center">
              {{ trans('Copyright') }} @{{ year }} {{ $page.props.app_name || '' }}.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.footer-one -->
</template>
