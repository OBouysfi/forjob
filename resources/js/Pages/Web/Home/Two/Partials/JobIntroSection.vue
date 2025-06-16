<script setup>

</script>

<template>
    <section class="job-portal-intro">
        <div class="container">
            <div class="wrapper bottom-border top-border pt-60 lg-pt-40 pb-65 lg-pb-40">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <div class="text-center text-lg-start">
                            <h2>{{ trans('Most complete job portal.') }}</h2>
                            <p class="text-md m0 md-pb-20">{{ trans('Signup and start find your job or talents.') }}</p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <ul class="btn-group style-none d-flex justify-content-center justify-content-lg-end">
                            <li class="me-2"><Link href="/jobs" class="btn-seven border6">{{ trans('Looking for job?') }}</Link></li>
                            <li class="ms-2"><Link href="/register" class="btn-five border6">{{ trans('Post a job') }}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>