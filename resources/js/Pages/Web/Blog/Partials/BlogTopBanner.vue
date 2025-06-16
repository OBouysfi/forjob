<template>
  <div class="inner-banner-one position-relative">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-xl-6 m-auto text-center">
            <div class="title-two">
              <h2 class="text-white">{{ trans('Blog') }}</h2>
            </div>
            <ul class="style-none d-flex justify-content-center page-pagination mt-15">
              <li>
                <Link href="/">{{ trans('Home') }}</Link>
              </li>
              <li><i class="bi bi-chevron-right"></i></li>
              <li>{{ trans('Blog') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <img src="/assets/images/shape/shape_02.svg" alt="" class="lazy-img shapes shape_01" />
    <img src="/assets/images/shape/shape_03.svg" alt="" class="lazy-img shapes shape_02" />
  </div>
  <!-- /.inner-banner-one -->
</template>
