<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeApiController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DescriptionTemplateController;
use App\Http\Controllers\Api\GenerateController;
use App\Http\Controllers\Api\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['throttle:api']], function () {

   
   
    Route::get('locations', [LocationController::class, 'index'])->name('api.locations');
    Route::get('categories', [CategoryController::class, 'index'])->name('api.categories');

    Route::get('home-categories', [HomeApiController::class, 'homeCategories'])->name('api.home-categories');
    Route::get('home-categories-only/{service}', [HomeApiController::class, 'homeCategoriesByServiceID'])->name('api.home-categories-only');
    Route::get('home-featured-categories', [HomeApiController::class, 'featuredCategories'])->name('api.home-featured-categories');

    Route::get('home-menu-categories', [HomeApiController::class, 'menuCategories'])->name('api.home-menu-categories');
    
    Route::get('home-featured-services', [HomeApiController::class, 'featuredServices'])->name('api.home-featured-services');
    Route::get('home-menu-services', [HomeApiController::class, 'menuServices'])->name('api.home-menu-services');
    Route::get('home-popular-categories', [HomeApiController::class, 'popularCategories'])->name('api.home-popular-categories');
    Route::get('home-features', [HomeApiController::class, 'features'])->name('api.home-features');
    Route::get('home-brands', [HomeApiController::class, 'brands'])->name('api.home-brands');
    Route::get('home-feedbacks', [HomeApiController::class, 'feedbacks'])->name('api.home-feedbacks');
    Route::get('home-blogs', [HomeApiController::class, 'blogs'])->name('api.home-blogs');

    Route::get('home-services', [HomeApiController::class, 'homeServices'])->name('api.home-services');
    Route::get('home-experts', [HomeApiController::class, 'homeExperts'])->name('api.home-experts');
    Route::get('home-companies', [HomeApiController::class, 'homeCompanies'])->name('api.home-companies');
    Route::get('home-faqs', [HomeApiController::class, 'homeFaqs'])->name('api.home-faqs');
    Route::get('home-jobs-list', [HomeApiController::class, 'homeJobs'])->name('api.home-jobs-list');
    Route::get('total-jobs-count', [HomeApiController::class, 'totalJobsCount'])->name('api.total-jobs-count');

    Route::resource('/messages', MessageController::class)
        ->middleware('auth')
        ->only(['index', 'show'])
        ->names('api-message');
    Route::get('/description-templates', [DescriptionTemplateController::class, 'index'])
        ->name('api-description-templates');

    Route::post('ai-generate',  [GenerateController::class, 'aiGenerate'])
        ->name('api-ai-generate');;
});
