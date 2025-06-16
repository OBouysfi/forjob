<?php

use Illuminate\Support\Facades\Auth;
use  App\Http\Controllers\Web as WEB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\Web\JobController;
use App\Http\Controllers\Auth\SocialLoginController;

require __DIR__ . '/auth.php';

Route::patch('set-locale/{locale}', [LocaleController::class, 'update'])->name('set-locale');
Route::get('clear-cache', [App\Http\Controllers\CacheController::class, 'clear'])->name('clear-cache');

Route::get('/',                      [WEB\WebController::class, 'home'])->name('home');
Route::get('/about-us',                  [WEB\WebController::class, 'about']);
Route::get('/faq',                   [WEB\WebController::class, 'faq']);
Route::get('/pricing',                   [WEB\WebController::class, 'pricing']);
Route::get('/contact-us',               [WEB\ContactController::class, 'index']);
Route::post('/send-mail',              [WEB\ContactController::class, 'sendMail'])
    ->name('send.mail');
Route::post('/newsletter', [WEB\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::resource('/blogs', WEB\BlogController::class)->only(['index', 'show']);
Route::get('blogs/category/{slug}/{id}', [WEB\BlogController::class, 'category']);
Route::get('blogs/tag/{slug}/{id}',      [WEB\BlogController::class, 'tag']);

Route::resource('/companies', WEB\CompanyController::class)
    ->only(['index', 'show']);

Route::resource('/jobs', WEB\JobController::class)
    ->names('jobs')->only(['index', 'show']);
Route::post('/jobs/{job}/bookmark', [WEB\JobController::class, 'toggleBookmark'])->name('jobs.bookmark')->middleware('auth');
Route::get('/jobs/{job}/apply', [WEB\JobController::class, 'apply'])->name('jobs.apply')->middleware('auth');
Route::post('/jobs/{job}/apply', [WEB\JobController::class, 'applyStore'])->name('jobs.apply')->middleware('auth');


Route::get('/candidates/{candidate}/visit', [WEB\CandidateController::class, 'visit'])->name('candidates.visit');
Route::get('/candidates/profile', [WEB\CandidateController::class, 'profile']);
Route::resource('/candidates', WEB\CandidateController::class)->only(['index', 'show']);
Route::post('/candidates/{user}/bookmark', [WEB\CandidateController::class, 'toggleBookmark'])->name('candidates.bookmark')->middleware('auth');
Route::post('/candidates/{candidate}/send-mail', [WEB\CandidateController::class, 'sendMail'])->name('candidates.send-mail');

Route::get('job-category/{slug}', [JobController::class, 'index'])->name('job-categories.show');
Route::get('job-service/{slug}', [JobController::class, 'index'])->name('job-services.show');
Route::get('/page/{slug}',          [WEB\WebController::class, 'page']);

Route::post('/credit/pay', [Web\CreditPayController::class, 'store'])->name('credit.pay');
Route::get('/credit/pay/{status}', [Web\CreditPayController::class, 'status']);


//**======================== Payment Gateway Route Group for merchant ====================**//
Route::group(['middleware' => ['auth', 'web']], function () {
    Route::get('/payment/paypal', '\App\Gateway\Paypal@status');
    Route::post('/stripe/payment', '\App\Gateway\Stripe@status')->name('stripe.payment');
    Route::get('/stripe', '\App\Gateway\Stripe@view')->name('stripe.view');
    Route::get('/stripe-pay/success', '\App\Gateway\Stripe@status')->name('stripe.success');
    Route::get('/stripe-pay/fail', '\App\Gateway\Stripe@fail')->name('stripe.fail');

    Route::get('/payment/mollie', '\App\Gateway\Mollie@status');
    Route::post('/payment/paystack', '\App\Gateway\Paystack@status')->name('paystack.status');
    Route::get('/paystack', '\App\Gateway\Paystack@view')->name('paystack.view');
    Route::get('/payment/mercado', '\App\Gateway\Mercado@status')->name('mercadopago.status');
    Route::get('/razorpay/payment', '\App\Gateway\Razorpay@view')->name('razorpay.view');
    Route::post('/razorpay/status', '\App\Gateway\Razorpay@status');
    Route::get('/payment/flutterwave', '\App\Gateway\Flutterwave@status');
    Route::get('/payment/thawani', '\App\Gateway\Thawani@status');
    Route::get('/payment/instamojo', '\App\Gateway\Instamojo@status');
    Route::get('/payment/toyyibpay', '\App\Gateway\Toyyibpay@status');
    Route::get('/manual/payment', '\App\Gateway\CustomGateway@status');
    Route::get('payu/payment', '\App\Gateway\Payu@view')->name('payu.view');
    Route::post('payu/status', '\App\Gateway\Payu@status')->name('payu.status');
});

Route::get('auth/{provider}', [SocialLoginController::class, 'redirectTo']);
Route::get('auth/callback/{provider}', [SocialLoginController::class, 'handleCallback']);


//**======================== Installler Route Group ====================**//
Route::resource('install',    App\Http\Controllers\Installer\InstallerController::class);
Route::post('install/verify', [App\Http\Controllers\Installer\InstallerController::class,'verify'])->name('install.verify');
Route::post('install/migrate', [App\Http\Controllers\Installer\InstallerController::class,'migrate'])->name('install.migrate');
