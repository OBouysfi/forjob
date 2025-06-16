<script setup></script>

<template>
  <section class="job-portal-intro">
    <div class="container">
      <div class="wrapper bottom-border pt-65 md-pt-50 pb-65 md-pb-50">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="text-center text-lg-start">
              <h2>{{ trans("Most complete job portal.") }}</h2>
              <p class="text-md m0 md-pb-20">
                {{ trans("Signup and start find your job or talents.") }}
              </p>
            </div>
          </div>
          <div class="col-lg-5">
            <ul
              class="btn-group style-none d-flex flex-wrap justify-content-center justify-content-lg-end"
            >
              <li class="me-2">
                <Link href="/jobs" class="btn-three">{{
                  trans("Looking for job?")
                }}</Link>
              </li>
              <li class="ms-2">
                <Link href="/employer/jobs/create" class="btn-four">{{
                  trans("Post a job")
                }}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
