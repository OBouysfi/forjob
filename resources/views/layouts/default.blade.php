<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,  maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- For Window Tab Color -->
    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#244034">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#244034">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="#244034">
    <meta name="app-name" content="{{ config('app.name') }}" />

    <title inertia>{{ SeoMeta::get('title') ?? SeoMeta::get('site_name') }} - {{ config('app.name') }}</title>
    <meta name="description" itemprop="description" inertia content="{{ SeoMeta::get('description') }}" />
    <meta name="keywords" inertia content="{{ SeoMeta::get('keywords') }}" />
    <meta property="og:description" inertia content="{{ SeoMeta::get('description') }}" />
    <meta property="og:title" inertia content="{{ SeoMeta::get('site_name') }}" />
    <meta property="og:url" inertia content="{{ request()->fullUrl() }}" />

    <meta property="og:site_name" inertia content="{{ SeoMeta::get('site_name') }}" />
    <meta property="og:image" inertia content="{{ SeoMeta::get('preview') }}" />
    <meta property="og:image:url" inertia content="{{ SeoMeta::get('preview') }}" />

    <meta name="twitter:card" inertia content="{{ SeoMeta::get('description') }}" />
    <meta name="twitter:title" inertia content="{{ SeoMeta::get('site_name') }}" />
    <!-- Favicon -->
    <link rel="icon" href="{{ asset(get_option('primary_data', true)->favicon ?? '') }}" type="image/png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap.min.css') }}" media="all">
    <!-- Main style sheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.min.css') }}" media="all">
    <!-- responsive style sheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/responsive.css') }}" media="all">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/vendor/toastify/toastify.css') }}" media="all">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/custom.css?v=1.2') }}" media="all">


    <meta name="app-translations" content="{{ getTranslationFile() }}" />


    @vite('resources/js/app.js')
    @inertiaHead
</head>

<body>
    @routes
    @inertia

    <!-- jQuery -->
    <script src="{{ asset('assets/vendor/jquery.min.js') }}"></script>
    <!-- Bootstrap JS -->
    <script src="{{ asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <!-- WOW js -->
    <script src="{{ asset('assets/vendor/wow/wow.min.js') }}"></script>
    <!-- Slick Slider -->
    <script src="{{ asset('assets/vendor/slick/slick.min.js') }}"></script>
    <!-- Fancybox -->
    <script src="{{ asset('assets/vendor/fancybox/dist/jquery.fancybox.min.js') }}"></script>

    <!-- js Counter -->
    <script src="{{ asset('assets/vendor/jquery.counterup.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/jquery.waypoints.min.js') }}"></script>

    <!-- validator js -->
    <script src="{{ asset('assets/vendor/validator.js') }}"></script>
    <!-- isotop -->
    <script src="{{ asset('assets/vendor/isotope.pkgd.min.js') }}"></script>

    <!-- Theme js -->
    <script src="{{ asset('assets/js/theme.js') }}" defer></script>
</body>

</html>
