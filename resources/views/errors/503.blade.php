<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- For IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- For Resposive Device -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- For Window Tab Color -->
    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#244034">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#244034">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="#244034">
    <title>503 Service Unavailable</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="56x56" href="{{ asset('assets/images/fav-icon/icon.png') }}">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap.min.css') }}" media="all">
    <!-- Main style sheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.min.css') }}" media="all">
    <!-- responsive style sheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/responsive.css') }}" media="all">

    <!-- Fix Internet Explorer ______________________________________-->
    <!--[if lt IE 9]>
   <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
   <script src="/assets/vendor/html5shiv.js"></script>
   <script src="/assets/vendor/respond.js"></script>
  <![endif]-->
</head>

<body>
    <div class="main-page-wrapper">
        <!-- ===================================================
    Loading Transition
   ==================================================== -->
       
        <!-- Error Page -->
        <div class="error-page d-flex align-items-center justify-content-center">
            <div class="container">
                <div class="row align-items-center justify-content-center">                    
                    <div class="col-md-6 order-md-first">
                        <img src="{{ asset('uploads/503.svg') }}" alt="" class="sm-mt-60">
                    </div>
                </div>
            </div>
        </div>
     
    </div> <!-- /.main-page-wrapper -->
</body>

</html>
