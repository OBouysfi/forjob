<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin as ADMIN;
use App\Http\Controllers\Admin\KycmethodController;

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth', 'admin']], function () {

	Route::resource('plan', 	     			ADMIN\PlanController::class);
	Route::resource('role', 	     			ADMIN\RoleController::class);
	Route::resource('admin', 	     			ADMIN\AdminController::class);
	Route::resource('order', 	     			ADMIN\OrderController::class);
	Route::resource('customer',      			ADMIN\CustomerController::class);
	Route::resource('gateways',      			ADMIN\GatewayController::class);
	Route::resource('cron-job',      			ADMIN\CronjobController::class);
	Route::resource('page', 	     			ADMIN\PageController::class);
	Route::resource('blog', 	     			ADMIN\BlogController::class);
	Route::resource('category', 	     		ADMIN\CategoryController::class);
	Route::resource('faq-category', 	     	ADMIN\FaqCategoryController::class);
	Route::resource('job', 	     				ADMIN\JobController::class)->except(['edit']);
	Route::resource('job-service', 	     		ADMIN\JobServiceController::class);
	Route::resource('job-category', 	     	ADMIN\JobCategoryController::class);
	Route::resource('job-skills', 	     			ADMIN\JobTagController::class);
	Route::resource('tag', 	     		        ADMIN\TagController::class);
	Route::resource('language',      			ADMIN\LanguageController::class);
	Route::resource('currency',      			ADMIN\CurrencyController::class);
	Route::resource('ai-language',      			ADMIN\AiLanguageController::class);
	Route::resource('menu', 	     			ADMIN\MenuController::class);
	Route::patch('/menu-data/{id}', 	       	[ADMIN\MenuController::class, 'updateData'])->name('menu.data.update');
	Route::resource('page-settings', 			ADMIN\SettingsController::class);
	Route::resource('seo', 		     			ADMIN\SeoController::class);
	Route::resource('support', 	     			ADMIN\SupportController::class);
	Route::resource('notification',  			ADMIN\NotifyController::class);
	Route::resource('message',  		        ADMIN\MessageController::class);

	Route::resource('features',     			ADMIN\FeaturesController::class);
	Route::resource('testimonials',     		ADMIN\TestimonialsController::class);
	Route::resource('faq',     		            ADMIN\FaqController::class);
	Route::resource('team',     		        ADMIN\TeamController::class);
	Route::resource('about',     		        ADMIN\AboutController::class);
	Route::resource('message-transactions',     ADMIN\TransactionController::class);
	// Route::resource('app-settings',     		ADMIN\AppSettingsController::class);
	Route::resource('developer-settings',     	ADMIN\DeveloperSettingsController::class);
	Route::resource('partner',     				ADMIN\PartnerController::class);
	Route::resource('update',     				ADMIN\UpdateController::class);

	Route::get('themes', 						[ADMIN\ThemeController::class, 'index'])->name('themes');
	Route::get('dashboard', 					[ADMIN\DashboardController::class, 'index'])->name('dashboard');
	Route::post('/language/addkey',				[ADMIN\LanguageController::class, 'addKey']);
	Route::post('/menu-update/{id}',		    [ADMIN\MenuController::class, 'storeDate'])->name('menu.content.update');
	Route::get('profile', 						[ADMIN\ProfileController::class, 'settings'])->name('profile.setting');
	Route::put('profile/update/{type}', 		[ADMIN\ProfileController::class, 'update'])->name('profile.update');
	Route::put('/option-update/{key}',		    [ADMIN\OptionController::class, 'update'])->name('option.update');
	Route::get('dashboard-static-data',         [ADMIN\DashboardController::class, 'dashboardData'])->name('dashboard.static');
	Route::get('/wa-server-status',				[ADMIN\DashboardController::class, 'waServerStatus']);
	Route::get('/sales-overview',				[ADMIN\DashboardController::class, 'salesOverView']);

	// E
	Route::apiResource('/countries', ADMIN\LocationController::class)->parameters(['countries' => 'location']);
	Route::resource('/states', ADMIN\StateController::class)->only(['store', 'update', 'destroy']);
	Route::apiResource('/qualifications', ADMIN\QualificationController::class);
	Route::apiResource('/expert-levels', ADMIN\ExpertLevelController::class);
	Route::resource('/description-templates', ADMIN\DescriptionTemplateController::class);

	Route::post('/kyc-method/mass-destroy', [ADMIN\KycmethodController::class, 'massDestroy'])->name('kyc-methods.mass-destroy');
	Route::resource('kyc-methods', ADMIN\KycmethodController::class);

	Route::post('kyc-requests/destroy/mass',  [ADMIN\KYCRequestController::class, 'destroyMass'])->name('kyc-requests.destroy.mass');
	Route::resource('kyc-requests', ADMIN\KYCRequestController::class);

	Route::resource('companies', ADMIN\CompanyController::class);
	Route::resource('candidates', ADMIN\CandidateController::class);
	Route::resource('company-reviews', ADMIN\CompanyReviewController::class)->only(['index', 'edit', 'update', 'destroy']);
	Route::resource('candidate-reviews', ADMIN\CandidateReviewController::class)->only(['index', 'edit', 'update', 'destroy']);
	Route::resource('ai-templates', ADMIN\AiTemplateController::class);

	// Route::get('header-notifications', [ADMIN\AdminController::class, 'adminNotifications'])->name('notifications.all');
	Route::post('header-notifications/{notification}', [ADMIN\AdminController::class, 'adminNotificationsRead'])->name('notifications.read');

	Route::resource('credit-logs', ADMIN\CreditController::class)->only(['index', 'update']);
	Route::put('update-credit-fee',     		[ADMIN\CreditController::class, 'updateCreditFee'])->name('update-credit-fee');
	Route::put('update-word-credit',     		[ADMIN\CreditController::class, 'updateWordCredit'])->name('update-credit-word-fee');
	Route::get('ai-generated-history', [ADMIN\GeneratedHistoryController::class, 'index'])->name('ai-generated-history');
});
