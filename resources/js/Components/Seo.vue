<script setup>
import { Head, usePage } from "@inertiajs/vue3";
const metaData = usePage().props?.seo ?? [];
const site_name = metaData?.title || metaData?.site_name || "";
const current_url = metaData?.current_url ?? window.location.href;
const tags = metaData?.tags || "";
const description = metaData?.description || "";
const preview = metaData?.preview || "";
</script>

<template>
  <Head>
    <title>{{ site_name }}</title>
    <meta name="description" itemprop="description" :content="description" />
    <meta name="keywords" :content="tags" />
    <meta property="og:description" :content="description" />
    <meta property="og:title" :content="site_name" />
    <meta property="og:url" :content="current_url" />

    <meta property="og:site_name" :content="site_name" />
    <meta property="og:image" :content="preview" />
    <meta property="og:image:url" :content="preview" />

    <meta name="twitter:card" :content="description" />
    <meta name="twitter:title" :content="site_name" />
  </Head>
</template>
