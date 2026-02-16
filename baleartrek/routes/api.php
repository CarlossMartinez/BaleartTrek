<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Trek;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TrekController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('MULTI-AUTH')->group(function () {  // Protegit per 'auth:sanctum' i per 'api-key'

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::middleware('CHECK-ROLEADMIN')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
    });

    Route::get('/user/{userShow}', [UserController::class, 'show']);

    Route::bind('userShow', function ($value) {
        return is_numeric($value)
            ? User::with(['meeting', 'meetings', 'comments.images'])->findOrFail($value)
            : User::with(['meeting', 'meetings', 'comments.images'])->where('email', $value)->firstOrFail();
    });

    Route::put('/user/{userUpdateDestroy}', [UserController::class, 'update']);
    Route::patch('/user/{userUpdateDestroy}', [UserController::class, 'update']);
    Route::delete('/user/{userUpdateDestroy}', [UserController::class, 'destroy']);

    Route::bind('userUpdateDestroy', function ($value) {
        return is_numeric($value)
            ? User::findOrFail($value)
            : User::where('email', $value)->firstOrFail();
    });

    Route::get('/treks', [TrekController::class, 'index']);
    Route::get('/trek/{trekShow}', [TrekController::class, 'show']);

    Route::bind('trekShow', function ($value) {
        return is_numeric($value)
            ? Trek::with(['interestingPlaces.placeType', 'municipality', 'meetings.users.comments'])->findOrFail($value)
            : Trek::with(['interestingPlaces.placeType', 'municipality', 'meetings.users.comments'])->where('regNumber', $value)->firstOrFail();
    });

    Route::post('/trek', [TrekController::class, 'store']);
});