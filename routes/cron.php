<?php
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cron', 'as' => 'cron.'], function (){

    Route::get('/notify-to-user', [App\Http\Controllers\CronController::class, 'notifyToUser']);
    

});

?>