<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InterestingPlaceController;
use App\Http\Controllers\MunicipalityCRUD;

use App\Http\Controllers\MeetingCRUD;
use App\Http\Controllers\UserCRUD;
use App\Http\Controllers\TrekCRUD;

use App\Http\Middleware\CheckRoleAdmin;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('meetingCRUD', meetingCRUD::class)->middleware(middleware: CheckRoleAdmin::class);
    Route::resource( 'userCRUD', userCRUD::class)->middleware(middleware: CheckRoleAdmin::class);
    Route::resource( 'municipalityCRUD', controller: municipalityCRUD::class)->middleware(middleware: CheckRoleAdmin::class);
    Route::resource( 'trekCRUD', controller: TrekCRUD::class)->middleware(middleware: CheckRoleAdmin::class);
    Route::resource('interesting_place', InterestingPlaceController::class)->middleware(middleware: CheckRoleAdmin::class);
});

require __DIR__ . '/auth.php';
