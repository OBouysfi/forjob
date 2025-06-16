
<script setup>
import { Link } from "@inertiajs/vue3"

const props = defineProps(['pages'])
const pages = props.pages ?? []

const links = pages.links ?? []
const currentPage = pages.current_page
const from = pages.from
const lastPage = pages.last_page
const lastPageUrl = pages.last_page_url
const nextpageurl = pages.next_page_url
const perPage = pages.per_page
const prevPageUrl = pages.prev_page_url
const to = pages.to
const total = pages.total



</script>

<template>
    <div class="flex flex-col items-center justify-between gap-y-4 md:flex-row" v-if="perPage < total > 0">
        <p class="text-xs font-normal text-slate-400">{{ trans('Showing') }} {{ from }} {{ trans('to') }} {{ to }} {{
            trans('of') }} {{ total }} {{ trans('result') }}</p>

        <nav class="pagination">
            <ul class="pagination-list">
                <template v-if="links.length > 3">
                    <template v-for="pageLink in links" :key="pageLink">
                        <template v-if="pageLink.url != null">

                            <!-- prev item -->
                            <li v-if="pageLink.label == '&laquo; Previous'" class="pagination-item">
                                <Link class="pagination-link pagination-link-prev-icon" :href="pageLink.url" tabindex="-1">
                                <i data-feather="chevron-left" width="1em" height="1em"></i>
                                </Link>
                            </li>

                            <!-- next item -->
                            <li class="pagination-item" v-else-if="pageLink.label == 'Next &raquo;'">
                                <Link class="pagination-link pagination-link-next-icon" :href="pageLink.url">
                                <i data-feather="chevron-right" width="1em" height="1em"></i>
                                </Link>
                            </li>

                            <!-- regular item -->
                            <li class="pagination-item" :class="{ 'active': pageLink.active == true }" v-else>
                                <Link class="pagination-link" :href="pageLink.url">{{
                                    pageLink.label
                                }}</Link>
                            </li>
                        </template>
                    </template>
                </template>
            </ul>
        </nav>

    </div>
</template>
