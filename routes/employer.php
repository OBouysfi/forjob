<?php

use App\Http\Controllers\Employer as Employer;
use App\Models\AiTemplate;
use Illuminate\Support\Facades\Route;

Route::group(
    ['prefix' => 'employer', 'as' => 'employer.', 'middleware' => ['auth', 'email_verified', 'active_account', 'company_info', 'employer', 'saas']],
    function () {

        Route::middleware('kyc_verified')->group(function () {
            Route::post('job-application/seen', [Employer\JobController::class, 'updateSeenAt'])->name('job-application-seen');
            Route::resource('jobs', Employer\JobController::class);
            Route::get('job-applicants', [Employer\JobController::class, 'applicants'])->name('job-applicants');
            Route::get('job-reviews', [Employer\JobController::class, 'reviews'])->name('job-reviews');
            Route::resource('candidate-reviews', Employer\CandidateReviewController::class)->only('store');
            Route::post('hire-candidate', [Employer\EmployerPanelController::class, 'hireCandidate'])->name('hire-candidate');
        });


        // without kyc verification
        Route::get('dashboard', [Employer\DashboardController::class, 'index'])->name('dashboard');
        // kyc verification
        Route::get('kyc/{kyc}/resubmit', [Employer\KYCVerificationController::class, 'resubmit'])->name('kyc.resubmit');
        Route::post('kyc/{kyc}/resubmit', [Employer\KYCVerificationController::class, 'resubmitUpdate']);
        Route::resource('kyc', Employer\KYCVerificationController::class);
        Route::get('memberships', [Employer\MembershipController::class, 'index'])->name('membership.index');
        Route::get('memberships/payment/{id}', [Employer\MembershipController::class, 'payment'])->name('membership.payment');
        Route::post('memberships/subscribe', [Employer\MembershipController::class, 'subscribe'])->name('membership.subscribe');
        Route::get('/memberships/plan/{status}', [Employer\MembershipController::class, 'status']);
        Route::get('company-info', [Employer\CompanyInfoController::class, 'index'])->name('company-info');
        Route::post('company-info', [Employer\CompanyInfoController::class, 'store'])->name('company-info.store');
        Route::resource('messages', Employer\MessageController::class)->names('message');
        Route::resource('supports', Employer\SupportController::class)->names('support');


        // account settings
        Route::get('account-settings', [Employer\EmployerPanelController::class, 'accountSetting'])->name('account-settings');
        Route::get('saved-candidates', [Employer\EmployerPanelController::class, 'savedCandidates'])->name('saved-candidates');
        Route::get('profile', [Employer\ProfileController::class, 'index'])->name('profile.index');
        Route::patch('profile/{id}', [Employer\ProfileController::class, 'update'])->name('profile.update');
        Route::put('account-settings', [Employer\EmployerPanelController::class, 'accountSettingUpdate'])->name('account-settings.update');
        Route::get('change-password', [Employer\EmployerPanelController::class, 'changePassword'])->name('change-password');
        Route::put('change-password', [Employer\EmployerPanelController::class, 'updatePassword'])->name('update-password');

        Route::delete('account-destroy', [Employer\EmployerPanelController::class, 'destroy'])->name('accounts.destroy');

        // Route::get('notifications', [Employer\EmployerPanelController::class, 'userNotifications'])->name('notifications');
        Route::post('notifications/{notification}', [Employer\EmployerPanelController::class, 'userNotificationsRead'])->name('notifications.read');

        Route::post('/profile/video-intro', [Employer\ProfileController::class, 'storeVideoIntro'])->name('video_intro.store');
        Route::delete('/profile/video-intro', [Employer\ProfileController::class, 'destroyVideoIntro'])->name('video_intro.destroy');

        // credits
        Route::get('credit-logs', Employer\CreditController::class)->name('credits.index');

        // ai templates
        Route::resource('ai-template', Employer\AiTemplateController::class)->only(['index', 'show'])->names('ai-template');
        Route::post('ai-template/bookmark', [Employer\AiTemplateController::class, 'bookmark'])->name('ai-template.bookmark');
        Route::resource('ai-generated-history', Employer\GeneratedHistoryController::class)->names('ai-generated-history');
    }
);
