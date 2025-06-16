<template>
  <section class="job-portal-intro">
    <div class="container">
      <div class="wrapper bottom-border top-border lg-pt-40 pb-65 lg-pb-40 pt-60">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="text-lg-start text-center">
              <h2>{{ trans('Most complete job portal.') }}</h2>
              <p class="text-md m0 md-pb-20">
                {{ trans('Signup and start find your job or talents.') }}
              </p>
            </div>
          </div>
          <div class="col-lg-5">
            <ul class="btn-group style-none d-flex justify-content-center justify-content-lg-end">
              <li class="me-2">
                <a href="/jobs" class="btn-seven border6">{{ trans('Looking for job?') }}</a>
              </li>
              <li class="ms-2">
                <a href="/register" class="btn-five border6">{{ trans('Post a job') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
