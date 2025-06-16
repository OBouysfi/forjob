<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User as USER;
use App\Http\Controllers\User\CompanyReviewController;

Route::group(['prefix' => 'user', 'as' => 'user.', 'middleware' => ['auth', 'user', 'active_account', 'email_verified', 'profile_setup']], function () {
   Route::resource('profile-setup', USER\ProfileSetupController::class)->only(['index', 'store'])->withoutMiddleware('profile_setup');
   Route::get('dashboard', [USER\DashboardController::class, 'index'])->name('dashboard');
   Route::get('resume', [USER\ResumeController::class, 'index'])->name('resume.index');
   Route::post('resume', [USER\ResumeController::class, 'store'])->name('resume.store');
   Route::any('resume/delete', [USER\ResumeController::class, 'destroy'])->name('resume.destroy');
   Route::resource('messages', USER\MessageController::class)->names('message');
   Route::get('job-alert', [USER\UserPanelController::class, 'jobAlert'])->name('job-alert');
   Route::get('saved-job', [USER\UserPanelController::class, 'savedJobs'])->name('saved-job');
   Route::get('applied-job', [USER\UserPanelController::class, 'appliedJob'])->name('applied-job');
   Route::delete('applied-jobs/{id}', [USER\UserPanelController::class, 'jobDestroy'])->name('applied-jobs.destroy');
   
   Route::get('job-reviews', [USER\UserPanelController::class, 'reviews'])->name('reviews');

   Route::put('change-password', [USER\UserPanelController::class, 'updatePassword'])->name('update-password');
   Route::get('account-settings', [USER\UserPanelController::class, 'accountSetting'])->name('account-settings');
   Route::put('account-settings', [USER\UserPanelController::class, 'accountSettingUpdate'])->name('account-settings.update');
   Route::get('change-password', [USER\UserPanelController::class, 'changePassword'])->name('change-password');
   Route::get('profile-edit', [User\ProfileController::class, 'edit'])->name('profile.edit');
   Route::patch('profile-edit', [User\ProfileController::class, 'update'])->name('profile.update');
   Route::resource('portfolios', USER\PortfolioController::class)->only(['store', 'destroy']);
   Route::delete('account-destroy', [USER\UserPanelController::class, 'destroy'])->name('accounts.destroy');

   Route::resource('company-reviews', CompanyReviewController::class)->only('store');
   Route::resource('supports', USER\SupportController::class)->names('support');
   Route::get('notifications', [USER\UserPanelController::class, 'userNotifications'])->name('notifications');
   Route::post('notifications/{notification}', [USER\UserPanelController::class, 'userNotificationsRead'])->name('notifications.read');
   // credits
   Route::get('credit-logs', USER\CreditController::class)->name('credits.index');
   // ai templates
   Route::resource('ai-template', USER\AiTemplateController::class)
      ->only(['index', 'show'])->names('ai-template');
   Route::post('ai-template/bookmark', [USER\AiTemplateController::class, 'bookmark'])->name('ai-template.bookmark');
   Route::resource('ai-generated-history', User\GeneratedHistoryController::class);
});
